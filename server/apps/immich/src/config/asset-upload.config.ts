import { APP_UPLOAD_LOCATION } from '@app/common/constants';
import { UnauthorizedException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { createHash, randomUUID } from 'crypto';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage, StorageEngine } from 'multer';
import { join } from 'path';
import sanitize from 'sanitize-filename';
import { AuthUserDto } from '../decorators/auth-user.decorator';
import { patchFormData } from '../utils/path-form-data.util';

export interface ImmichFile extends Express.Multer.File {
  /** sha1 hash of file */
  checksum: Buffer;
}

export const assetUploadOption: MulterOptions = {
  fileFilter,
  storage: customStorage(),
};

export function customStorage(): StorageEngine {
  const storage = diskStorage({ destination, filename });

  return {
    _handleFile(req, file, callback) {
      const hash = createHash('sha1');
      file.stream.on('data', (chunk) => hash.update(chunk));

      storage._handleFile(req, file, (error, response) => {
        if (error) {
          hash.destroy();
          callback(error);
        } else {
          callback(null, { ...response, checksum: hash.digest() } as ImmichFile);
        }
      });
    },

    _removeFile(req, file, callback) {
      storage._removeFile(req, file, callback);
    },
  };
}

export const multerUtils = { fileFilter, filename, destination };

function fileFilter(req: Request, file: any, cb: any) {
  if (!req.user || (req.user.isPublicUser && !req.user.isAllowUpload)) {
    return cb(new UnauthorizedException());
  }
  // TODO: Create new API endpoint for mimetypes and use that here as browser's
  //  file mimetype is not to be trusted.
  // Reference about issue with it: https://stackoverflow.com/questions/26149389/mime-type-missing-for-rar-and-tar/26222177#26222177
  cb(null, true);
  //if (
  //  file.mimetype.match(
  //    /\/(jpg|jpeg|png|gif|mp4|webm|x-msvideo|quicktime|heic|heif|dng|x-adobe-dng|webp|tiff|3gpp|nef|x-nikon-nef)$/,
  //  )
  //) {
  //  cb(null, true);
  //} else {
  //  logger.error(`Unsupported file type ${extname(file.originalname)} file MIME type ${filetype}`);
  //  cb(new BadRequestException(`Unsupported file type ${extname(file.originalname)}`), false);
  // }
}

function destination(req: Request, file: Express.Multer.File, cb: any) {
  if (!req.user || (req.user.isPublicUser && !req.user.isAllowUpload)) {
    return cb(new UnauthorizedException());
  }

  const user = req.user as AuthUserDto;

  const basePath = APP_UPLOAD_LOCATION;
  const sanitizedDeviceId = sanitize(String(req.body['deviceId']));
  const originalUploadFolder = join(basePath, user.id, 'original', sanitizedDeviceId);

  if (!existsSync(originalUploadFolder)) {
    mkdirSync(originalUploadFolder, { recursive: true });
  }

  // Save original to disk
  cb(null, originalUploadFolder);
}

function filename(req: Request, file: Express.Multer.File, cb: any) {
  if (!req.user || (req.user.isPublicUser && !req.user.isAllowUpload)) {
    return cb(new UnauthorizedException());
  }

  file.originalname = patchFormData(file.originalname);

  const fileNameUUID = randomUUID();

  if (file.fieldname === 'livePhotoData') {
    const livePhotoFileName = `${fileNameUUID}.mov`;
    return cb(null, sanitize(livePhotoFileName));
  }

  const fileName = `${fileNameUUID}${req.body['fileExtension'].toLowerCase()}`;
  return cb(null, sanitize(fileName));
}
