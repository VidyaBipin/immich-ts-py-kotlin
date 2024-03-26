const copyExif = async (originalAsset: Blob, newBlob: Blob): Promise<Blob> => {
  // Retrieve the EXIF data from the original asset
  const exif = await retrieveExif(originalAsset);

  // Create a new blob with the EXIF data and the data from the new blob
  const blobWithExif = new Blob([newBlob.slice(0, 2), exif, newBlob.slice(2)], {
    type: 'image/jpeg',
  });

  return blobWithExif;
};

const retrieveExif = (imageBlob: Blob): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    imageBlob
      .arrayBuffer()
      .then((buffer) => {
        const dataView = new DataView(buffer);
        let offset = 0;

        // Check if the image is a valid JPEG
        if (dataView.getUint16(offset) !== 0xFF_D8) {
          return reject('Not a valid JPEG');
        }

        offset += 2;

        let found = false;

        //TODO: Use some kind of validation to make sure we don't get stuck in an infinite loop
        while (!found) {
          const marker = dataView.getUint16(offset);

          // Break if we've reached the start of the image data
          if (marker === 0xFF_DA) {
            break;
          }

          const size = dataView.getUint16(offset + 2);

          // If we've found the EXIF data, return it
          if (marker === 0xFF_E1 && dataView.getUint32(offset + 4) === 0x45_78_69_66) {
            found = true;
            return resolve(new Blob([imageBlob.slice(offset, offset + 2 + size)]));
          }

          offset += 2 + size;
        }

        // If there's no EXIF data, return an empty blob
        return resolve(new Blob());
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export default copyExif;
