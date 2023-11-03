import { uploadAssetsStore } from '$lib/stores/upload';
import { addAssetsToAlbum } from '$lib/utils/asset-utils';
import { api, AssetFileUploadResponseDto } from '@api';
import { notificationController, NotificationType } from './../components/shared-components/notification/notification';
import { UploadState } from '$lib/models/upload-asset';
import { ExecutorQueue } from '$lib/utils/executor-queue';
import { Upload } from 'tus-js-client';

let _extensions: string[];

export const uploadExecutionQueue = new ExecutorQueue({ concurrency: 2 });

const getExtensions = async () => {
  if (!_extensions) {
    const { data } = await api.serverInfoApi.getSupportedMediaTypes();
    _extensions = [...data.image, ...data.video];
  }
  return _extensions;
};

export const openFileUploadDialog = async (albumId: string | undefined = undefined) => {
  const extensions = await getExtensions();

  return new Promise<(string | undefined)[]>((resolve, reject) => {
    try {
      const fileSelector = document.createElement('input');

      fileSelector.type = 'file';
      fileSelector.multiple = true;
      fileSelector.accept = extensions.join(',');
      fileSelector.onchange = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (!target.files) {
          return;
        }
        const files = Array.from(target.files);

        resolve(fileUploadHandler(files, albumId));
      };

      fileSelector.click();
    } catch (e) {
      console.log('Error selecting file', e);
      reject(e);
    }
  });
};

export const fileUploadHandler = async (files: File[], albumId: string | undefined = undefined): Promise<string[]> => {
  const extensions = await getExtensions();
  const promises: Promise<string | undefined>[] = [];
  for (const file of files) {
    const name = file.name.toLowerCase();
    // if (extensions.some((ext) => name.endsWith(ext))) {
    //   uploadAssetsStore.addNewUploadAsset({ id: getDeviceAssetId(file), file, albumId });
    //   promises.push(uploadExecutionQueue.addTask(() => fileUploader(file, albumId)));
    // }

    const fileCreatedAt = new Date(file.lastModified).toISOString();
    const deviceAssetId = getDeviceAssetId(file);
    const upload = new Upload(file, {
      endpoint: 'http://localhost:2283/api/asset/upload-tus',
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: file.name,
        deviceAssetId: deviceAssetId,
        deviceId: 'WEB',
        fileCreatedAt,
        fileModifiedAt: new Date(file.lastModified).toISOString(),
        isFavorite: 'false',
        duration: '0:00:00.000000',
      },
      onError: function (error) {
        console.log('Failed because: ' + error);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + '%');
      },
      onSuccess: function () {
        console.log('Download %s from %s', file.name, upload.url);
      },
    });

    // Check if there are any previous uploads to continue.
    upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        console.log('Found previous upload');
        console.log(previousUploads[0]);

        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      // Start the upload
      upload.start();
    });
  }

  const results = await Promise.all(promises);
  return results.filter((result): result is string => !!result);
};

function getDeviceAssetId(asset: File) {
  return 'web' + '-' + asset.name + '-' + asset.lastModified;
}

// TODO: should probably use the @api SDK
async function fileUploader(asset: File, albumId: string | undefined = undefined): Promise<string | undefined> {
  const fileCreatedAt = new Date(asset.lastModified).toISOString();
  const deviceAssetId = getDeviceAssetId(asset);

  return new Promise((resolve) => resolve(uploadAssetsStore.markStarted(deviceAssetId)))
    .then(() =>
      api.assetApi.uploadFile(
        {
          deviceAssetId,
          deviceId: 'WEB',
          fileCreatedAt,
          fileModifiedAt: new Date(asset.lastModified).toISOString(),
          isFavorite: false,
          duration: '0:00:00.000000',
          assetData: new File([asset], asset.name),
          key: api.getKey(),
        },
        {
          onUploadProgress: ({ loaded, total }) => {
            uploadAssetsStore.updateProgress(deviceAssetId, loaded, total);
          },
        },
      ),
    )
    .then(async (response) => {
      if (response.status == 200 || response.status == 201) {
        const res: AssetFileUploadResponseDto = response.data;

        if (res.duplicate) {
          uploadAssetsStore.duplicateCounter.update((count) => count + 1);
        }

        if (albumId && res.id) {
          uploadAssetsStore.updateAsset(deviceAssetId, { message: 'Adding to album...' });
          await addAssetsToAlbum(albumId, [res.id]);
          uploadAssetsStore.updateAsset(deviceAssetId, { message: 'Added to album' });
        }

        uploadAssetsStore.updateAsset(deviceAssetId, {
          state: res.duplicate ? UploadState.DUPLICATED : UploadState.DONE,
        });
        uploadAssetsStore.successCounter.update((c) => c + 1);

        setTimeout(() => {
          uploadAssetsStore.removeUploadAsset(deviceAssetId);
        }, 1000);

        return res.id;
      }
    })
    .catch((reason) => {
      console.log('error uploading file ', reason);
      uploadAssetsStore.updateAsset(deviceAssetId, { state: UploadState.ERROR, error: reason });
      handleUploadError(asset, JSON.stringify(reason));
      return undefined;
    });
}

function handleUploadError(asset: File, respBody = '{}', extraMessage?: string) {
  try {
    const res = JSON.parse(respBody);
    const extraMsg = res ? ' ' + res?.message : '';

    notificationController.show({
      type: NotificationType.Error,
      message: `Cannot upload file ${asset.name} ${extraMsg}${extraMessage}`,
      timeout: 5000,
    });
  } catch (e) {
    console.error('ERROR parsing data JSON in handleUploadError');
  }
}
