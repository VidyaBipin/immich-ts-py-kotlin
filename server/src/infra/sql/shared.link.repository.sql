-- NOTE: This file is auto generated by ./sql-generator

-- SharedLinkRepository.get
SELECT DISTINCT
  "distinctAlias"."SharedLinkEntity_id" AS "ids_SharedLinkEntity_id",
  "distinctAlias"."SharedLinkEntity_createdAt",
  "distinctAlias"."SharedLinkEntity__SharedLinkEntity_assets_fileCreatedAt",
  "distinctAlias"."4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_fileCreatedAt"
FROM
  (
    SELECT
      "SharedLinkEntity"."id" AS "SharedLinkEntity_id",
      "SharedLinkEntity"."description" AS "SharedLinkEntity_description",
      "SharedLinkEntity"."password" AS "SharedLinkEntity_password",
      "SharedLinkEntity"."userId" AS "SharedLinkEntity_userId",
      "SharedLinkEntity"."key" AS "SharedLinkEntity_key",
      "SharedLinkEntity"."type" AS "SharedLinkEntity_type",
      "SharedLinkEntity"."createdAt" AS "SharedLinkEntity_createdAt",
      "SharedLinkEntity"."expiresAt" AS "SharedLinkEntity_expiresAt",
      "SharedLinkEntity"."allowUpload" AS "SharedLinkEntity_allowUpload",
      "SharedLinkEntity"."allowDownload" AS "SharedLinkEntity_allowDownload",
      "SharedLinkEntity"."showExif" AS "SharedLinkEntity_showExif",
      "SharedLinkEntity"."albumId" AS "SharedLinkEntity_albumId",
      "SharedLinkEntity__SharedLinkEntity_assets"."id" AS "SharedLinkEntity__SharedLinkEntity_assets_id",
      "SharedLinkEntity__SharedLinkEntity_assets"."deviceAssetId" AS "SharedLinkEntity__SharedLinkEntity_assets_deviceAssetId",
      "SharedLinkEntity__SharedLinkEntity_assets"."ownerId" AS "SharedLinkEntity__SharedLinkEntity_assets_ownerId",
      "SharedLinkEntity__SharedLinkEntity_assets"."libraryId" AS "SharedLinkEntity__SharedLinkEntity_assets_libraryId",
      "SharedLinkEntity__SharedLinkEntity_assets"."deviceId" AS "SharedLinkEntity__SharedLinkEntity_assets_deviceId",
      "SharedLinkEntity__SharedLinkEntity_assets"."type" AS "SharedLinkEntity__SharedLinkEntity_assets_type",
      "SharedLinkEntity__SharedLinkEntity_assets"."originalPath" AS "SharedLinkEntity__SharedLinkEntity_assets_originalPath",
      "SharedLinkEntity__SharedLinkEntity_assets"."resizePath" AS "SharedLinkEntity__SharedLinkEntity_assets_resizePath",
      "SharedLinkEntity__SharedLinkEntity_assets"."webpPath" AS "SharedLinkEntity__SharedLinkEntity_assets_webpPath",
      "SharedLinkEntity__SharedLinkEntity_assets"."thumbhash" AS "SharedLinkEntity__SharedLinkEntity_assets_thumbhash",
      "SharedLinkEntity__SharedLinkEntity_assets"."encodedVideoPath" AS "SharedLinkEntity__SharedLinkEntity_assets_encodedVideoPath",
      "SharedLinkEntity__SharedLinkEntity_assets"."createdAt" AS "SharedLinkEntity__SharedLinkEntity_assets_createdAt",
      "SharedLinkEntity__SharedLinkEntity_assets"."updatedAt" AS "SharedLinkEntity__SharedLinkEntity_assets_updatedAt",
      "SharedLinkEntity__SharedLinkEntity_assets"."deletedAt" AS "SharedLinkEntity__SharedLinkEntity_assets_deletedAt",
      "SharedLinkEntity__SharedLinkEntity_assets"."fileCreatedAt" AS "SharedLinkEntity__SharedLinkEntity_assets_fileCreatedAt",
      "SharedLinkEntity__SharedLinkEntity_assets"."localDateTime" AS "SharedLinkEntity__SharedLinkEntity_assets_localDateTime",
      "SharedLinkEntity__SharedLinkEntity_assets"."fileModifiedAt" AS "SharedLinkEntity__SharedLinkEntity_assets_fileModifiedAt",
      "SharedLinkEntity__SharedLinkEntity_assets"."isFavorite" AS "SharedLinkEntity__SharedLinkEntity_assets_isFavorite",
      "SharedLinkEntity__SharedLinkEntity_assets"."isArchived" AS "SharedLinkEntity__SharedLinkEntity_assets_isArchived",
      "SharedLinkEntity__SharedLinkEntity_assets"."isExternal" AS "SharedLinkEntity__SharedLinkEntity_assets_isExternal",
      "SharedLinkEntity__SharedLinkEntity_assets"."isReadOnly" AS "SharedLinkEntity__SharedLinkEntity_assets_isReadOnly",
      "SharedLinkEntity__SharedLinkEntity_assets"."isOffline" AS "SharedLinkEntity__SharedLinkEntity_assets_isOffline",
      "SharedLinkEntity__SharedLinkEntity_assets"."checksum" AS "SharedLinkEntity__SharedLinkEntity_assets_checksum",
      "SharedLinkEntity__SharedLinkEntity_assets"."duration" AS "SharedLinkEntity__SharedLinkEntity_assets_duration",
      "SharedLinkEntity__SharedLinkEntity_assets"."isVisible" AS "SharedLinkEntity__SharedLinkEntity_assets_isVisible",
      "SharedLinkEntity__SharedLinkEntity_assets"."livePhotoVideoId" AS "SharedLinkEntity__SharedLinkEntity_assets_livePhotoVideoId",
      "SharedLinkEntity__SharedLinkEntity_assets"."originalFileName" AS "SharedLinkEntity__SharedLinkEntity_assets_originalFileName",
      "SharedLinkEntity__SharedLinkEntity_assets"."sidecarPath" AS "SharedLinkEntity__SharedLinkEntity_assets_sidecarPath",
      "SharedLinkEntity__SharedLinkEntity_assets"."stackId" AS "SharedLinkEntity__SharedLinkEntity_assets_stackId",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."assetId" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_assetId",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."description" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_description",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."exifImageWidth" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_exifImageWidth",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."exifImageHeight" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_exifImageHeight",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."fileSizeInByte" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_fileSizeInByte",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."orientation" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_orientation",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."dateTimeOriginal" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_dateTimeOriginal",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."modifyDate" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_modifyDate",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."timeZone" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_timeZone",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."latitude" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_latitude",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."longitude" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_longitude",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."projectionType" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_projectionType",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."city" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_city",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."livePhotoCID" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_livePhotoCID",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."autoStackId" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_autoStackId",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."state" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_state",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."country" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_country",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."make" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_make",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."model" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_model",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."lensModel" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_lensModel",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."fNumber" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_fNumber",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."focalLength" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_focalLength",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."iso" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_iso",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."exposureTime" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_exposureTime",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."profileDescription" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_profileDescription",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."colorspace" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_colorspace",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."bitsPerSample" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_bitsPerSample",
      "9b1d35b344d838023994a3233afd6ffe098be6d8"."fps" AS "9b1d35b344d838023994a3233afd6ffe098be6d8_fps",
      "SharedLinkEntity__SharedLinkEntity_album"."id" AS "SharedLinkEntity__SharedLinkEntity_album_id",
      "SharedLinkEntity__SharedLinkEntity_album"."ownerId" AS "SharedLinkEntity__SharedLinkEntity_album_ownerId",
      "SharedLinkEntity__SharedLinkEntity_album"."albumName" AS "SharedLinkEntity__SharedLinkEntity_album_albumName",
      "SharedLinkEntity__SharedLinkEntity_album"."description" AS "SharedLinkEntity__SharedLinkEntity_album_description",
      "SharedLinkEntity__SharedLinkEntity_album"."createdAt" AS "SharedLinkEntity__SharedLinkEntity_album_createdAt",
      "SharedLinkEntity__SharedLinkEntity_album"."updatedAt" AS "SharedLinkEntity__SharedLinkEntity_album_updatedAt",
      "SharedLinkEntity__SharedLinkEntity_album"."deletedAt" AS "SharedLinkEntity__SharedLinkEntity_album_deletedAt",
      "SharedLinkEntity__SharedLinkEntity_album"."albumThumbnailAssetId" AS "SharedLinkEntity__SharedLinkEntity_album_albumThumbnailAssetId",
      "SharedLinkEntity__SharedLinkEntity_album"."isActivityEnabled" AS "SharedLinkEntity__SharedLinkEntity_album_isActivityEnabled",
      "SharedLinkEntity__SharedLinkEntity_album"."order" AS "SharedLinkEntity__SharedLinkEntity_album_order",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."id" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_id",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."deviceAssetId" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_deviceAssetId",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."ownerId" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_ownerId",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."libraryId" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_libraryId",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."deviceId" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_deviceId",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."type" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_type",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."originalPath" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_originalPath",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."resizePath" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_resizePath",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."webpPath" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_webpPath",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."thumbhash" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_thumbhash",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."encodedVideoPath" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_encodedVideoPath",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."createdAt" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_createdAt",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."updatedAt" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_updatedAt",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."deletedAt" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_deletedAt",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."fileCreatedAt" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_fileCreatedAt",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."localDateTime" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_localDateTime",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."fileModifiedAt" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_fileModifiedAt",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."isFavorite" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_isFavorite",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."isArchived" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_isArchived",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."isExternal" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_isExternal",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."isReadOnly" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_isReadOnly",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."isOffline" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_isOffline",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."checksum" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_checksum",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."duration" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_duration",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."isVisible" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_isVisible",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."livePhotoVideoId" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_livePhotoVideoId",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."originalFileName" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_originalFileName",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."sidecarPath" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_sidecarPath",
      "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."stackId" AS "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_stackId",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."assetId" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_assetId",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."description" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_description",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."exifImageWidth" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_exifImageWidth",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."exifImageHeight" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_exifImageHeight",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."fileSizeInByte" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_fileSizeInByte",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."orientation" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_orientation",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."dateTimeOriginal" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_dateTimeOriginal",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."modifyDate" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_modifyDate",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."timeZone" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_timeZone",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."latitude" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_latitude",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."longitude" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_longitude",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."projectionType" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_projectionType",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."city" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_city",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."livePhotoCID" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_livePhotoCID",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."autoStackId" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_autoStackId",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."state" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_state",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."country" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_country",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."make" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_make",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."model" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_model",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."lensModel" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_lensModel",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."fNumber" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_fNumber",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."focalLength" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_focalLength",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."iso" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_iso",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."exposureTime" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_exposureTime",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."profileDescription" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_profileDescription",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."colorspace" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_colorspace",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."bitsPerSample" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_bitsPerSample",
      "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."fps" AS "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f_fps",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."id" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_id",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."name" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_name",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."avatarColor" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_avatarColor",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."isAdmin" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_isAdmin",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."email" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_email",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."storageLabel" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_storageLabel",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."oauthId" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_oauthId",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."profileImagePath" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_profileImagePath",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."shouldChangePassword" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_shouldChangePassword",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."createdAt" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_createdAt",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."deletedAt" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_deletedAt",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."status" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_status",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."updatedAt" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_updatedAt",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."memoriesEnabled" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_memoriesEnabled",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."quotaSizeInBytes" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_quotaSizeInBytes",
      "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."quotaUsageInBytes" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_quotaUsageInBytes"
    FROM
      "shared_links" "SharedLinkEntity"
      LEFT JOIN "shared_link__asset" "SharedLinkEntity__SharedLinkEntity_assets_SharedLinkEntity" ON "SharedLinkEntity__SharedLinkEntity_assets_SharedLinkEntity"."sharedLinksId" = "SharedLinkEntity"."id"
      LEFT JOIN "assets" "SharedLinkEntity__SharedLinkEntity_assets" ON "SharedLinkEntity__SharedLinkEntity_assets"."id" = "SharedLinkEntity__SharedLinkEntity_assets_SharedLinkEntity"."assetsId"
      AND (
        "SharedLinkEntity__SharedLinkEntity_assets"."deletedAt" IS NULL
      )
      LEFT JOIN "exif" "9b1d35b344d838023994a3233afd6ffe098be6d8" ON "9b1d35b344d838023994a3233afd6ffe098be6d8"."assetId" = "SharedLinkEntity__SharedLinkEntity_assets"."id"
      LEFT JOIN "albums" "SharedLinkEntity__SharedLinkEntity_album" ON "SharedLinkEntity__SharedLinkEntity_album"."id" = "SharedLinkEntity"."albumId"
      AND (
        "SharedLinkEntity__SharedLinkEntity_album"."deletedAt" IS NULL
      )
      LEFT JOIN "albums_assets_assets" "760f12c00d97bdcec1ce224d1e3bf449859942b6" ON "760f12c00d97bdcec1ce224d1e3bf449859942b6"."albumsId" = "SharedLinkEntity__SharedLinkEntity_album"."id"
      LEFT JOIN "assets" "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6" ON "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."id" = "760f12c00d97bdcec1ce224d1e3bf449859942b6"."assetsId"
      AND (
        "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."deletedAt" IS NULL
      )
      LEFT JOIN "exif" "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f" ON "d9f2f4dd8920bad1d6907cdb1d699732daff3c2f"."assetId" = "4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6"."id"
      LEFT JOIN "users" "6d7fd45329a05fd86b3dbcacde87fe76e33a422d" ON "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."id" = "SharedLinkEntity__SharedLinkEntity_album"."ownerId"
      AND (
        "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."deletedAt" IS NULL
      )
    WHERE
      (
        ("SharedLinkEntity"."id" = $1)
        AND ("SharedLinkEntity"."userId" = $2)
      )
  ) "distinctAlias"
ORDER BY
  "distinctAlias"."SharedLinkEntity_createdAt" DESC,
  "distinctAlias"."SharedLinkEntity__SharedLinkEntity_assets_fileCreatedAt" ASC,
  "distinctAlias"."4a35f463ae8c5544ede95c4b6d9ce8c686b6bfe6_fileCreatedAt" ASC,
  "SharedLinkEntity_id" ASC
LIMIT
  1

-- SharedLinkRepository.getAll
SELECT
  "SharedLinkEntity"."id" AS "SharedLinkEntity_id",
  "SharedLinkEntity"."description" AS "SharedLinkEntity_description",
  "SharedLinkEntity"."password" AS "SharedLinkEntity_password",
  "SharedLinkEntity"."userId" AS "SharedLinkEntity_userId",
  "SharedLinkEntity"."key" AS "SharedLinkEntity_key",
  "SharedLinkEntity"."type" AS "SharedLinkEntity_type",
  "SharedLinkEntity"."createdAt" AS "SharedLinkEntity_createdAt",
  "SharedLinkEntity"."expiresAt" AS "SharedLinkEntity_expiresAt",
  "SharedLinkEntity"."allowUpload" AS "SharedLinkEntity_allowUpload",
  "SharedLinkEntity"."allowDownload" AS "SharedLinkEntity_allowDownload",
  "SharedLinkEntity"."showExif" AS "SharedLinkEntity_showExif",
  "SharedLinkEntity"."albumId" AS "SharedLinkEntity_albumId",
  "SharedLinkEntity__SharedLinkEntity_assets"."id" AS "SharedLinkEntity__SharedLinkEntity_assets_id",
  "SharedLinkEntity__SharedLinkEntity_assets"."deviceAssetId" AS "SharedLinkEntity__SharedLinkEntity_assets_deviceAssetId",
  "SharedLinkEntity__SharedLinkEntity_assets"."ownerId" AS "SharedLinkEntity__SharedLinkEntity_assets_ownerId",
  "SharedLinkEntity__SharedLinkEntity_assets"."libraryId" AS "SharedLinkEntity__SharedLinkEntity_assets_libraryId",
  "SharedLinkEntity__SharedLinkEntity_assets"."deviceId" AS "SharedLinkEntity__SharedLinkEntity_assets_deviceId",
  "SharedLinkEntity__SharedLinkEntity_assets"."type" AS "SharedLinkEntity__SharedLinkEntity_assets_type",
  "SharedLinkEntity__SharedLinkEntity_assets"."originalPath" AS "SharedLinkEntity__SharedLinkEntity_assets_originalPath",
  "SharedLinkEntity__SharedLinkEntity_assets"."resizePath" AS "SharedLinkEntity__SharedLinkEntity_assets_resizePath",
  "SharedLinkEntity__SharedLinkEntity_assets"."webpPath" AS "SharedLinkEntity__SharedLinkEntity_assets_webpPath",
  "SharedLinkEntity__SharedLinkEntity_assets"."thumbhash" AS "SharedLinkEntity__SharedLinkEntity_assets_thumbhash",
  "SharedLinkEntity__SharedLinkEntity_assets"."encodedVideoPath" AS "SharedLinkEntity__SharedLinkEntity_assets_encodedVideoPath",
  "SharedLinkEntity__SharedLinkEntity_assets"."createdAt" AS "SharedLinkEntity__SharedLinkEntity_assets_createdAt",
  "SharedLinkEntity__SharedLinkEntity_assets"."updatedAt" AS "SharedLinkEntity__SharedLinkEntity_assets_updatedAt",
  "SharedLinkEntity__SharedLinkEntity_assets"."deletedAt" AS "SharedLinkEntity__SharedLinkEntity_assets_deletedAt",
  "SharedLinkEntity__SharedLinkEntity_assets"."fileCreatedAt" AS "SharedLinkEntity__SharedLinkEntity_assets_fileCreatedAt",
  "SharedLinkEntity__SharedLinkEntity_assets"."localDateTime" AS "SharedLinkEntity__SharedLinkEntity_assets_localDateTime",
  "SharedLinkEntity__SharedLinkEntity_assets"."fileModifiedAt" AS "SharedLinkEntity__SharedLinkEntity_assets_fileModifiedAt",
  "SharedLinkEntity__SharedLinkEntity_assets"."isFavorite" AS "SharedLinkEntity__SharedLinkEntity_assets_isFavorite",
  "SharedLinkEntity__SharedLinkEntity_assets"."isArchived" AS "SharedLinkEntity__SharedLinkEntity_assets_isArchived",
  "SharedLinkEntity__SharedLinkEntity_assets"."isExternal" AS "SharedLinkEntity__SharedLinkEntity_assets_isExternal",
  "SharedLinkEntity__SharedLinkEntity_assets"."isReadOnly" AS "SharedLinkEntity__SharedLinkEntity_assets_isReadOnly",
  "SharedLinkEntity__SharedLinkEntity_assets"."isOffline" AS "SharedLinkEntity__SharedLinkEntity_assets_isOffline",
  "SharedLinkEntity__SharedLinkEntity_assets"."checksum" AS "SharedLinkEntity__SharedLinkEntity_assets_checksum",
  "SharedLinkEntity__SharedLinkEntity_assets"."duration" AS "SharedLinkEntity__SharedLinkEntity_assets_duration",
  "SharedLinkEntity__SharedLinkEntity_assets"."isVisible" AS "SharedLinkEntity__SharedLinkEntity_assets_isVisible",
  "SharedLinkEntity__SharedLinkEntity_assets"."livePhotoVideoId" AS "SharedLinkEntity__SharedLinkEntity_assets_livePhotoVideoId",
  "SharedLinkEntity__SharedLinkEntity_assets"."originalFileName" AS "SharedLinkEntity__SharedLinkEntity_assets_originalFileName",
  "SharedLinkEntity__SharedLinkEntity_assets"."sidecarPath" AS "SharedLinkEntity__SharedLinkEntity_assets_sidecarPath",
  "SharedLinkEntity__SharedLinkEntity_assets"."stackId" AS "SharedLinkEntity__SharedLinkEntity_assets_stackId",
  "SharedLinkEntity__SharedLinkEntity_album"."id" AS "SharedLinkEntity__SharedLinkEntity_album_id",
  "SharedLinkEntity__SharedLinkEntity_album"."ownerId" AS "SharedLinkEntity__SharedLinkEntity_album_ownerId",
  "SharedLinkEntity__SharedLinkEntity_album"."albumName" AS "SharedLinkEntity__SharedLinkEntity_album_albumName",
  "SharedLinkEntity__SharedLinkEntity_album"."description" AS "SharedLinkEntity__SharedLinkEntity_album_description",
  "SharedLinkEntity__SharedLinkEntity_album"."createdAt" AS "SharedLinkEntity__SharedLinkEntity_album_createdAt",
  "SharedLinkEntity__SharedLinkEntity_album"."updatedAt" AS "SharedLinkEntity__SharedLinkEntity_album_updatedAt",
  "SharedLinkEntity__SharedLinkEntity_album"."deletedAt" AS "SharedLinkEntity__SharedLinkEntity_album_deletedAt",
  "SharedLinkEntity__SharedLinkEntity_album"."albumThumbnailAssetId" AS "SharedLinkEntity__SharedLinkEntity_album_albumThumbnailAssetId",
  "SharedLinkEntity__SharedLinkEntity_album"."isActivityEnabled" AS "SharedLinkEntity__SharedLinkEntity_album_isActivityEnabled",
  "SharedLinkEntity__SharedLinkEntity_album"."order" AS "SharedLinkEntity__SharedLinkEntity_album_order",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."id" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_id",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."name" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_name",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."avatarColor" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_avatarColor",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."isAdmin" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_isAdmin",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."email" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_email",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."storageLabel" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_storageLabel",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."oauthId" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_oauthId",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."profileImagePath" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_profileImagePath",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."shouldChangePassword" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_shouldChangePassword",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."createdAt" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_createdAt",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."deletedAt" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_deletedAt",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."status" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_status",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."updatedAt" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_updatedAt",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."memoriesEnabled" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_memoriesEnabled",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."quotaSizeInBytes" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_quotaSizeInBytes",
  "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."quotaUsageInBytes" AS "6d7fd45329a05fd86b3dbcacde87fe76e33a422d_quotaUsageInBytes"
FROM
  "shared_links" "SharedLinkEntity"
  LEFT JOIN "shared_link__asset" "SharedLinkEntity__SharedLinkEntity_assets_SharedLinkEntity" ON "SharedLinkEntity__SharedLinkEntity_assets_SharedLinkEntity"."sharedLinksId" = "SharedLinkEntity"."id"
  LEFT JOIN "assets" "SharedLinkEntity__SharedLinkEntity_assets" ON "SharedLinkEntity__SharedLinkEntity_assets"."id" = "SharedLinkEntity__SharedLinkEntity_assets_SharedLinkEntity"."assetsId"
  AND (
    "SharedLinkEntity__SharedLinkEntity_assets"."deletedAt" IS NULL
  )
  LEFT JOIN "albums" "SharedLinkEntity__SharedLinkEntity_album" ON "SharedLinkEntity__SharedLinkEntity_album"."id" = "SharedLinkEntity"."albumId"
  AND (
    "SharedLinkEntity__SharedLinkEntity_album"."deletedAt" IS NULL
  )
  LEFT JOIN "users" "6d7fd45329a05fd86b3dbcacde87fe76e33a422d" ON "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."id" = "SharedLinkEntity__SharedLinkEntity_album"."ownerId"
  AND (
    "6d7fd45329a05fd86b3dbcacde87fe76e33a422d"."deletedAt" IS NULL
  )
WHERE
  (("SharedLinkEntity"."userId" = $1))
ORDER BY
  "SharedLinkEntity"."createdAt" DESC

-- SharedLinkRepository.getByKey
SELECT DISTINCT
  "distinctAlias"."SharedLinkEntity_id" AS "ids_SharedLinkEntity_id"
FROM
  (
    SELECT
      "SharedLinkEntity"."id" AS "SharedLinkEntity_id",
      "SharedLinkEntity"."description" AS "SharedLinkEntity_description",
      "SharedLinkEntity"."password" AS "SharedLinkEntity_password",
      "SharedLinkEntity"."userId" AS "SharedLinkEntity_userId",
      "SharedLinkEntity"."key" AS "SharedLinkEntity_key",
      "SharedLinkEntity"."type" AS "SharedLinkEntity_type",
      "SharedLinkEntity"."createdAt" AS "SharedLinkEntity_createdAt",
      "SharedLinkEntity"."expiresAt" AS "SharedLinkEntity_expiresAt",
      "SharedLinkEntity"."allowUpload" AS "SharedLinkEntity_allowUpload",
      "SharedLinkEntity"."allowDownload" AS "SharedLinkEntity_allowDownload",
      "SharedLinkEntity"."showExif" AS "SharedLinkEntity_showExif",
      "SharedLinkEntity"."albumId" AS "SharedLinkEntity_albumId",
      "SharedLinkEntity__SharedLinkEntity_user"."id" AS "SharedLinkEntity__SharedLinkEntity_user_id",
      "SharedLinkEntity__SharedLinkEntity_user"."name" AS "SharedLinkEntity__SharedLinkEntity_user_name",
      "SharedLinkEntity__SharedLinkEntity_user"."avatarColor" AS "SharedLinkEntity__SharedLinkEntity_user_avatarColor",
      "SharedLinkEntity__SharedLinkEntity_user"."isAdmin" AS "SharedLinkEntity__SharedLinkEntity_user_isAdmin",
      "SharedLinkEntity__SharedLinkEntity_user"."email" AS "SharedLinkEntity__SharedLinkEntity_user_email",
      "SharedLinkEntity__SharedLinkEntity_user"."storageLabel" AS "SharedLinkEntity__SharedLinkEntity_user_storageLabel",
      "SharedLinkEntity__SharedLinkEntity_user"."oauthId" AS "SharedLinkEntity__SharedLinkEntity_user_oauthId",
      "SharedLinkEntity__SharedLinkEntity_user"."profileImagePath" AS "SharedLinkEntity__SharedLinkEntity_user_profileImagePath",
      "SharedLinkEntity__SharedLinkEntity_user"."shouldChangePassword" AS "SharedLinkEntity__SharedLinkEntity_user_shouldChangePassword",
      "SharedLinkEntity__SharedLinkEntity_user"."createdAt" AS "SharedLinkEntity__SharedLinkEntity_user_createdAt",
      "SharedLinkEntity__SharedLinkEntity_user"."deletedAt" AS "SharedLinkEntity__SharedLinkEntity_user_deletedAt",
      "SharedLinkEntity__SharedLinkEntity_user"."status" AS "SharedLinkEntity__SharedLinkEntity_user_status",
      "SharedLinkEntity__SharedLinkEntity_user"."updatedAt" AS "SharedLinkEntity__SharedLinkEntity_user_updatedAt",
      "SharedLinkEntity__SharedLinkEntity_user"."memoriesEnabled" AS "SharedLinkEntity__SharedLinkEntity_user_memoriesEnabled",
      "SharedLinkEntity__SharedLinkEntity_user"."quotaSizeInBytes" AS "SharedLinkEntity__SharedLinkEntity_user_quotaSizeInBytes",
      "SharedLinkEntity__SharedLinkEntity_user"."quotaUsageInBytes" AS "SharedLinkEntity__SharedLinkEntity_user_quotaUsageInBytes"
    FROM
      "shared_links" "SharedLinkEntity"
      LEFT JOIN "users" "SharedLinkEntity__SharedLinkEntity_user" ON "SharedLinkEntity__SharedLinkEntity_user"."id" = "SharedLinkEntity"."userId"
      AND (
        "SharedLinkEntity__SharedLinkEntity_user"."deletedAt" IS NULL
      )
    WHERE
      (("SharedLinkEntity"."key" = $1))
  ) "distinctAlias"
ORDER BY
  "SharedLinkEntity_id" ASC
LIMIT
  1
