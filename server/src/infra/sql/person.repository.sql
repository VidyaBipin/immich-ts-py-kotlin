-- NOTE: This file is auto generated by ./sql-generator

-- PersonRepository.reassignFaces
UPDATE "asset_faces"
SET
  "personId" = $1
WHERE
  "personId" = $2

-- PersonRepository.getAllForUser
SELECT
  "person"."id" AS "person_id",
  "person"."createdAt" AS "person_createdAt",
  "person"."updatedAt" AS "person_updatedAt",
  "person"."ownerId" AS "person_ownerId",
  "person"."name" AS "person_name",
  "person"."birthDate" AS "person_birthDate",
  "person"."thumbnailPath" AS "person_thumbnailPath",
  "person"."faceAssetId" AS "person_faceAssetId",
  "person"."isHidden" AS "person_isHidden"
FROM
  "person" "person"
  LEFT JOIN "asset_faces" "face" ON "face"."personId" = "person"."id"
  INNER JOIN "assets" "asset" ON "asset"."id" = "face"."assetId"
  AND ("asset"."deletedAt" IS NULL)
WHERE
  "person"."ownerId" = $1
  AND "asset"."isArchived" = false
  AND "person"."isHidden" = false
GROUP BY
  "person"."id"
HAVING
  "person"."name" != ''
  OR COUNT("face"."assetId") >= $2
ORDER BY
  "person"."isHidden" ASC,
  NULLIF("person"."name", '') IS NULL ASC,
  COUNT("face"."assetId") DESC,
  NULLIF("person"."name", '') ASC NULLS LAST
LIMIT
  500

-- PersonRepository.getAllWithoutFaces
SELECT
  "person"."id" AS "person_id",
  "person"."createdAt" AS "person_createdAt",
  "person"."updatedAt" AS "person_updatedAt",
  "person"."ownerId" AS "person_ownerId",
  "person"."name" AS "person_name",
  "person"."birthDate" AS "person_birthDate",
  "person"."thumbnailPath" AS "person_thumbnailPath",
  "person"."faceAssetId" AS "person_faceAssetId",
  "person"."isHidden" AS "person_isHidden"
FROM
  "person" "person"
  LEFT JOIN "asset_faces" "face" ON "face"."personId" = "person"."id"
GROUP BY
  "person"."id"
HAVING
  COUNT("face"."assetId") = 0

-- PersonRepository.getFaces
SELECT
  "AssetFaceEntity"."id" AS "AssetFaceEntity_id",
  "AssetFaceEntity"."assetId" AS "AssetFaceEntity_assetId",
  "AssetFaceEntity"."personId" AS "AssetFaceEntity_personId",
  "AssetFaceEntity"."imageWidth" AS "AssetFaceEntity_imageWidth",
  "AssetFaceEntity"."imageHeight" AS "AssetFaceEntity_imageHeight",
  "AssetFaceEntity"."boundingBoxX1" AS "AssetFaceEntity_boundingBoxX1",
  "AssetFaceEntity"."boundingBoxY1" AS "AssetFaceEntity_boundingBoxY1",
  "AssetFaceEntity"."boundingBoxX2" AS "AssetFaceEntity_boundingBoxX2",
  "AssetFaceEntity"."boundingBoxY2" AS "AssetFaceEntity_boundingBoxY2",
  "AssetFaceEntity__AssetFaceEntity_person"."id" AS "AssetFaceEntity__AssetFaceEntity_person_id",
  "AssetFaceEntity__AssetFaceEntity_person"."createdAt" AS "AssetFaceEntity__AssetFaceEntity_person_createdAt",
  "AssetFaceEntity__AssetFaceEntity_person"."updatedAt" AS "AssetFaceEntity__AssetFaceEntity_person_updatedAt",
  "AssetFaceEntity__AssetFaceEntity_person"."ownerId" AS "AssetFaceEntity__AssetFaceEntity_person_ownerId",
  "AssetFaceEntity__AssetFaceEntity_person"."name" AS "AssetFaceEntity__AssetFaceEntity_person_name",
  "AssetFaceEntity__AssetFaceEntity_person"."birthDate" AS "AssetFaceEntity__AssetFaceEntity_person_birthDate",
  "AssetFaceEntity__AssetFaceEntity_person"."thumbnailPath" AS "AssetFaceEntity__AssetFaceEntity_person_thumbnailPath",
  "AssetFaceEntity__AssetFaceEntity_person"."faceAssetId" AS "AssetFaceEntity__AssetFaceEntity_person_faceAssetId",
  "AssetFaceEntity__AssetFaceEntity_person"."isHidden" AS "AssetFaceEntity__AssetFaceEntity_person_isHidden"
FROM
  "asset_faces" "AssetFaceEntity"
  LEFT JOIN "person" "AssetFaceEntity__AssetFaceEntity_person" ON "AssetFaceEntity__AssetFaceEntity_person"."id" = "AssetFaceEntity"."personId"
WHERE
  ("AssetFaceEntity"."assetId" = $1)

-- PersonRepository.getFaceById
SELECT DISTINCT
  "distinctAlias"."AssetFaceEntity_id" AS "ids_AssetFaceEntity_id"
FROM
  (
    SELECT
      "AssetFaceEntity"."id" AS "AssetFaceEntity_id",
      "AssetFaceEntity"."assetId" AS "AssetFaceEntity_assetId",
      "AssetFaceEntity"."personId" AS "AssetFaceEntity_personId",
      "AssetFaceEntity"."imageWidth" AS "AssetFaceEntity_imageWidth",
      "AssetFaceEntity"."imageHeight" AS "AssetFaceEntity_imageHeight",
      "AssetFaceEntity"."boundingBoxX1" AS "AssetFaceEntity_boundingBoxX1",
      "AssetFaceEntity"."boundingBoxY1" AS "AssetFaceEntity_boundingBoxY1",
      "AssetFaceEntity"."boundingBoxX2" AS "AssetFaceEntity_boundingBoxX2",
      "AssetFaceEntity"."boundingBoxY2" AS "AssetFaceEntity_boundingBoxY2",
      "AssetFaceEntity__AssetFaceEntity_person"."id" AS "AssetFaceEntity__AssetFaceEntity_person_id",
      "AssetFaceEntity__AssetFaceEntity_person"."createdAt" AS "AssetFaceEntity__AssetFaceEntity_person_createdAt",
      "AssetFaceEntity__AssetFaceEntity_person"."updatedAt" AS "AssetFaceEntity__AssetFaceEntity_person_updatedAt",
      "AssetFaceEntity__AssetFaceEntity_person"."ownerId" AS "AssetFaceEntity__AssetFaceEntity_person_ownerId",
      "AssetFaceEntity__AssetFaceEntity_person"."name" AS "AssetFaceEntity__AssetFaceEntity_person_name",
      "AssetFaceEntity__AssetFaceEntity_person"."birthDate" AS "AssetFaceEntity__AssetFaceEntity_person_birthDate",
      "AssetFaceEntity__AssetFaceEntity_person"."thumbnailPath" AS "AssetFaceEntity__AssetFaceEntity_person_thumbnailPath",
      "AssetFaceEntity__AssetFaceEntity_person"."faceAssetId" AS "AssetFaceEntity__AssetFaceEntity_person_faceAssetId",
      "AssetFaceEntity__AssetFaceEntity_person"."isHidden" AS "AssetFaceEntity__AssetFaceEntity_person_isHidden"
    FROM
      "asset_faces" "AssetFaceEntity"
      LEFT JOIN "person" "AssetFaceEntity__AssetFaceEntity_person" ON "AssetFaceEntity__AssetFaceEntity_person"."id" = "AssetFaceEntity"."personId"
    WHERE
      ("AssetFaceEntity"."id" = $1)
  ) "distinctAlias"
ORDER BY
  "AssetFaceEntity_id" ASC
LIMIT
  1

-- PersonRepository.getFaceByIdWithAssets
SELECT DISTINCT
  "distinctAlias"."AssetFaceEntity_id" AS "ids_AssetFaceEntity_id"
FROM
  (
    SELECT
      "AssetFaceEntity"."id" AS "AssetFaceEntity_id",
      "AssetFaceEntity"."assetId" AS "AssetFaceEntity_assetId",
      "AssetFaceEntity"."personId" AS "AssetFaceEntity_personId",
      "AssetFaceEntity"."imageWidth" AS "AssetFaceEntity_imageWidth",
      "AssetFaceEntity"."imageHeight" AS "AssetFaceEntity_imageHeight",
      "AssetFaceEntity"."boundingBoxX1" AS "AssetFaceEntity_boundingBoxX1",
      "AssetFaceEntity"."boundingBoxY1" AS "AssetFaceEntity_boundingBoxY1",
      "AssetFaceEntity"."boundingBoxX2" AS "AssetFaceEntity_boundingBoxX2",
      "AssetFaceEntity"."boundingBoxY2" AS "AssetFaceEntity_boundingBoxY2",
      "AssetFaceEntity__AssetFaceEntity_person"."id" AS "AssetFaceEntity__AssetFaceEntity_person_id",
      "AssetFaceEntity__AssetFaceEntity_person"."createdAt" AS "AssetFaceEntity__AssetFaceEntity_person_createdAt",
      "AssetFaceEntity__AssetFaceEntity_person"."updatedAt" AS "AssetFaceEntity__AssetFaceEntity_person_updatedAt",
      "AssetFaceEntity__AssetFaceEntity_person"."ownerId" AS "AssetFaceEntity__AssetFaceEntity_person_ownerId",
      "AssetFaceEntity__AssetFaceEntity_person"."name" AS "AssetFaceEntity__AssetFaceEntity_person_name",
      "AssetFaceEntity__AssetFaceEntity_person"."birthDate" AS "AssetFaceEntity__AssetFaceEntity_person_birthDate",
      "AssetFaceEntity__AssetFaceEntity_person"."thumbnailPath" AS "AssetFaceEntity__AssetFaceEntity_person_thumbnailPath",
      "AssetFaceEntity__AssetFaceEntity_person"."faceAssetId" AS "AssetFaceEntity__AssetFaceEntity_person_faceAssetId",
      "AssetFaceEntity__AssetFaceEntity_person"."isHidden" AS "AssetFaceEntity__AssetFaceEntity_person_isHidden",
      "AssetFaceEntity__AssetFaceEntity_asset"."id" AS "AssetFaceEntity__AssetFaceEntity_asset_id",
      "AssetFaceEntity__AssetFaceEntity_asset"."deviceAssetId" AS "AssetFaceEntity__AssetFaceEntity_asset_deviceAssetId",
      "AssetFaceEntity__AssetFaceEntity_asset"."ownerId" AS "AssetFaceEntity__AssetFaceEntity_asset_ownerId",
      "AssetFaceEntity__AssetFaceEntity_asset"."libraryId" AS "AssetFaceEntity__AssetFaceEntity_asset_libraryId",
      "AssetFaceEntity__AssetFaceEntity_asset"."deviceId" AS "AssetFaceEntity__AssetFaceEntity_asset_deviceId",
      "AssetFaceEntity__AssetFaceEntity_asset"."type" AS "AssetFaceEntity__AssetFaceEntity_asset_type",
      "AssetFaceEntity__AssetFaceEntity_asset"."originalPath" AS "AssetFaceEntity__AssetFaceEntity_asset_originalPath",
      "AssetFaceEntity__AssetFaceEntity_asset"."resizePath" AS "AssetFaceEntity__AssetFaceEntity_asset_resizePath",
      "AssetFaceEntity__AssetFaceEntity_asset"."webpPath" AS "AssetFaceEntity__AssetFaceEntity_asset_webpPath",
      "AssetFaceEntity__AssetFaceEntity_asset"."thumbhash" AS "AssetFaceEntity__AssetFaceEntity_asset_thumbhash",
      "AssetFaceEntity__AssetFaceEntity_asset"."encodedVideoPath" AS "AssetFaceEntity__AssetFaceEntity_asset_encodedVideoPath",
      "AssetFaceEntity__AssetFaceEntity_asset"."createdAt" AS "AssetFaceEntity__AssetFaceEntity_asset_createdAt",
      "AssetFaceEntity__AssetFaceEntity_asset"."updatedAt" AS "AssetFaceEntity__AssetFaceEntity_asset_updatedAt",
      "AssetFaceEntity__AssetFaceEntity_asset"."deletedAt" AS "AssetFaceEntity__AssetFaceEntity_asset_deletedAt",
      "AssetFaceEntity__AssetFaceEntity_asset"."fileCreatedAt" AS "AssetFaceEntity__AssetFaceEntity_asset_fileCreatedAt",
      "AssetFaceEntity__AssetFaceEntity_asset"."localDateTime" AS "AssetFaceEntity__AssetFaceEntity_asset_localDateTime",
      "AssetFaceEntity__AssetFaceEntity_asset"."fileModifiedAt" AS "AssetFaceEntity__AssetFaceEntity_asset_fileModifiedAt",
      "AssetFaceEntity__AssetFaceEntity_asset"."isFavorite" AS "AssetFaceEntity__AssetFaceEntity_asset_isFavorite",
      "AssetFaceEntity__AssetFaceEntity_asset"."isArchived" AS "AssetFaceEntity__AssetFaceEntity_asset_isArchived",
      "AssetFaceEntity__AssetFaceEntity_asset"."isExternal" AS "AssetFaceEntity__AssetFaceEntity_asset_isExternal",
      "AssetFaceEntity__AssetFaceEntity_asset"."isReadOnly" AS "AssetFaceEntity__AssetFaceEntity_asset_isReadOnly",
      "AssetFaceEntity__AssetFaceEntity_asset"."isOffline" AS "AssetFaceEntity__AssetFaceEntity_asset_isOffline",
      "AssetFaceEntity__AssetFaceEntity_asset"."checksum" AS "AssetFaceEntity__AssetFaceEntity_asset_checksum",
      "AssetFaceEntity__AssetFaceEntity_asset"."duration" AS "AssetFaceEntity__AssetFaceEntity_asset_duration",
      "AssetFaceEntity__AssetFaceEntity_asset"."isVisible" AS "AssetFaceEntity__AssetFaceEntity_asset_isVisible",
      "AssetFaceEntity__AssetFaceEntity_asset"."livePhotoVideoId" AS "AssetFaceEntity__AssetFaceEntity_asset_livePhotoVideoId",
      "AssetFaceEntity__AssetFaceEntity_asset"."originalFileName" AS "AssetFaceEntity__AssetFaceEntity_asset_originalFileName",
      "AssetFaceEntity__AssetFaceEntity_asset"."sidecarPath" AS "AssetFaceEntity__AssetFaceEntity_asset_sidecarPath",
      "AssetFaceEntity__AssetFaceEntity_asset"."stackId" AS "AssetFaceEntity__AssetFaceEntity_asset_stackId"
    FROM
      "asset_faces" "AssetFaceEntity"
      LEFT JOIN "person" "AssetFaceEntity__AssetFaceEntity_person" ON "AssetFaceEntity__AssetFaceEntity_person"."id" = "AssetFaceEntity"."personId"
      LEFT JOIN "assets" "AssetFaceEntity__AssetFaceEntity_asset" ON "AssetFaceEntity__AssetFaceEntity_asset"."id" = "AssetFaceEntity"."assetId"
      AND (
        "AssetFaceEntity__AssetFaceEntity_asset"."deletedAt" IS NULL
      )
    WHERE
      ("AssetFaceEntity"."id" = $1)
  ) "distinctAlias"
ORDER BY
  "AssetFaceEntity_id" ASC
LIMIT
  1

-- PersonRepository.reassignFace
UPDATE "asset_faces"
SET
  "personId" = $1
WHERE
  "id" = $2

-- PersonRepository.getByName
SELECT
  "person"."id" AS "person_id",
  "person"."createdAt" AS "person_createdAt",
  "person"."updatedAt" AS "person_updatedAt",
  "person"."ownerId" AS "person_ownerId",
  "person"."name" AS "person_name",
  "person"."birthDate" AS "person_birthDate",
  "person"."thumbnailPath" AS "person_thumbnailPath",
  "person"."faceAssetId" AS "person_faceAssetId",
  "person"."isHidden" AS "person_isHidden"
FROM
  "person" "person"
  LEFT JOIN "asset_faces" "face" ON "face"."personId" = "person"."id"
WHERE
  "person"."ownerId" = $1
  AND (
    LOWER("person"."name") LIKE $2
    OR LOWER("person"."name") LIKE $3
  )
GROUP BY
  "person"."id"
ORDER BY
  COUNT("face"."assetId") DESC
LIMIT
  20

-- PersonRepository.getStatistics
SELECT DISTINCT
  COUNT(DISTINCT ("face"."id")) AS "cnt"
FROM
  "asset_faces" "face"
  LEFT JOIN "assets" "asset" ON "asset"."id" = "face"."assetId"
  AND ("asset"."deletedAt" IS NULL)
WHERE
  "face"."personId" = $1
  AND "asset"."isArchived" = false
  AND "asset"."deletedAt" IS NULL
  AND "asset"."livePhotoVideoId" IS NULL

-- PersonRepository.getAssets
SELECT DISTINCT
  "distinctAlias"."AssetEntity_id" AS "ids_AssetEntity_id",
  "distinctAlias"."AssetEntity_fileCreatedAt"
FROM
  (
    SELECT
      "AssetEntity"."id" AS "AssetEntity_id",
      "AssetEntity"."deviceAssetId" AS "AssetEntity_deviceAssetId",
      "AssetEntity"."ownerId" AS "AssetEntity_ownerId",
      "AssetEntity"."libraryId" AS "AssetEntity_libraryId",
      "AssetEntity"."deviceId" AS "AssetEntity_deviceId",
      "AssetEntity"."type" AS "AssetEntity_type",
      "AssetEntity"."originalPath" AS "AssetEntity_originalPath",
      "AssetEntity"."resizePath" AS "AssetEntity_resizePath",
      "AssetEntity"."webpPath" AS "AssetEntity_webpPath",
      "AssetEntity"."thumbhash" AS "AssetEntity_thumbhash",
      "AssetEntity"."encodedVideoPath" AS "AssetEntity_encodedVideoPath",
      "AssetEntity"."createdAt" AS "AssetEntity_createdAt",
      "AssetEntity"."updatedAt" AS "AssetEntity_updatedAt",
      "AssetEntity"."deletedAt" AS "AssetEntity_deletedAt",
      "AssetEntity"."fileCreatedAt" AS "AssetEntity_fileCreatedAt",
      "AssetEntity"."localDateTime" AS "AssetEntity_localDateTime",
      "AssetEntity"."fileModifiedAt" AS "AssetEntity_fileModifiedAt",
      "AssetEntity"."isFavorite" AS "AssetEntity_isFavorite",
      "AssetEntity"."isArchived" AS "AssetEntity_isArchived",
      "AssetEntity"."isExternal" AS "AssetEntity_isExternal",
      "AssetEntity"."isReadOnly" AS "AssetEntity_isReadOnly",
      "AssetEntity"."isOffline" AS "AssetEntity_isOffline",
      "AssetEntity"."checksum" AS "AssetEntity_checksum",
      "AssetEntity"."duration" AS "AssetEntity_duration",
      "AssetEntity"."isVisible" AS "AssetEntity_isVisible",
      "AssetEntity"."livePhotoVideoId" AS "AssetEntity_livePhotoVideoId",
      "AssetEntity"."originalFileName" AS "AssetEntity_originalFileName",
      "AssetEntity"."sidecarPath" AS "AssetEntity_sidecarPath",
      "AssetEntity"."stackId" AS "AssetEntity_stackId",
      "AssetEntity__AssetEntity_faces"."id" AS "AssetEntity__AssetEntity_faces_id",
      "AssetEntity__AssetEntity_faces"."assetId" AS "AssetEntity__AssetEntity_faces_assetId",
      "AssetEntity__AssetEntity_faces"."personId" AS "AssetEntity__AssetEntity_faces_personId",
      "AssetEntity__AssetEntity_faces"."imageWidth" AS "AssetEntity__AssetEntity_faces_imageWidth",
      "AssetEntity__AssetEntity_faces"."imageHeight" AS "AssetEntity__AssetEntity_faces_imageHeight",
      "AssetEntity__AssetEntity_faces"."boundingBoxX1" AS "AssetEntity__AssetEntity_faces_boundingBoxX1",
      "AssetEntity__AssetEntity_faces"."boundingBoxY1" AS "AssetEntity__AssetEntity_faces_boundingBoxY1",
      "AssetEntity__AssetEntity_faces"."boundingBoxX2" AS "AssetEntity__AssetEntity_faces_boundingBoxX2",
      "AssetEntity__AssetEntity_faces"."boundingBoxY2" AS "AssetEntity__AssetEntity_faces_boundingBoxY2",
      "8258e303a73a72cf6abb13d73fb592dde0d68280"."id" AS "8258e303a73a72cf6abb13d73fb592dde0d68280_id",
      "8258e303a73a72cf6abb13d73fb592dde0d68280"."createdAt" AS "8258e303a73a72cf6abb13d73fb592dde0d68280_createdAt",
      "8258e303a73a72cf6abb13d73fb592dde0d68280"."updatedAt" AS "8258e303a73a72cf6abb13d73fb592dde0d68280_updatedAt",
      "8258e303a73a72cf6abb13d73fb592dde0d68280"."ownerId" AS "8258e303a73a72cf6abb13d73fb592dde0d68280_ownerId",
      "8258e303a73a72cf6abb13d73fb592dde0d68280"."name" AS "8258e303a73a72cf6abb13d73fb592dde0d68280_name",
      "8258e303a73a72cf6abb13d73fb592dde0d68280"."birthDate" AS "8258e303a73a72cf6abb13d73fb592dde0d68280_birthDate",
      "8258e303a73a72cf6abb13d73fb592dde0d68280"."thumbnailPath" AS "8258e303a73a72cf6abb13d73fb592dde0d68280_thumbnailPath",
      "8258e303a73a72cf6abb13d73fb592dde0d68280"."faceAssetId" AS "8258e303a73a72cf6abb13d73fb592dde0d68280_faceAssetId",
      "8258e303a73a72cf6abb13d73fb592dde0d68280"."isHidden" AS "8258e303a73a72cf6abb13d73fb592dde0d68280_isHidden",
      "AssetEntity__AssetEntity_exifInfo"."assetId" AS "AssetEntity__AssetEntity_exifInfo_assetId",
      "AssetEntity__AssetEntity_exifInfo"."description" AS "AssetEntity__AssetEntity_exifInfo_description",
      "AssetEntity__AssetEntity_exifInfo"."exifImageWidth" AS "AssetEntity__AssetEntity_exifInfo_exifImageWidth",
      "AssetEntity__AssetEntity_exifInfo"."exifImageHeight" AS "AssetEntity__AssetEntity_exifInfo_exifImageHeight",
      "AssetEntity__AssetEntity_exifInfo"."fileSizeInByte" AS "AssetEntity__AssetEntity_exifInfo_fileSizeInByte",
      "AssetEntity__AssetEntity_exifInfo"."orientation" AS "AssetEntity__AssetEntity_exifInfo_orientation",
      "AssetEntity__AssetEntity_exifInfo"."dateTimeOriginal" AS "AssetEntity__AssetEntity_exifInfo_dateTimeOriginal",
      "AssetEntity__AssetEntity_exifInfo"."modifyDate" AS "AssetEntity__AssetEntity_exifInfo_modifyDate",
      "AssetEntity__AssetEntity_exifInfo"."timeZone" AS "AssetEntity__AssetEntity_exifInfo_timeZone",
      "AssetEntity__AssetEntity_exifInfo"."latitude" AS "AssetEntity__AssetEntity_exifInfo_latitude",
      "AssetEntity__AssetEntity_exifInfo"."longitude" AS "AssetEntity__AssetEntity_exifInfo_longitude",
      "AssetEntity__AssetEntity_exifInfo"."projectionType" AS "AssetEntity__AssetEntity_exifInfo_projectionType",
      "AssetEntity__AssetEntity_exifInfo"."city" AS "AssetEntity__AssetEntity_exifInfo_city",
      "AssetEntity__AssetEntity_exifInfo"."livePhotoCID" AS "AssetEntity__AssetEntity_exifInfo_livePhotoCID",
      "AssetEntity__AssetEntity_exifInfo"."autoStackId" AS "AssetEntity__AssetEntity_exifInfo_autoStackId",
      "AssetEntity__AssetEntity_exifInfo"."state" AS "AssetEntity__AssetEntity_exifInfo_state",
      "AssetEntity__AssetEntity_exifInfo"."country" AS "AssetEntity__AssetEntity_exifInfo_country",
      "AssetEntity__AssetEntity_exifInfo"."make" AS "AssetEntity__AssetEntity_exifInfo_make",
      "AssetEntity__AssetEntity_exifInfo"."model" AS "AssetEntity__AssetEntity_exifInfo_model",
      "AssetEntity__AssetEntity_exifInfo"."lensModel" AS "AssetEntity__AssetEntity_exifInfo_lensModel",
      "AssetEntity__AssetEntity_exifInfo"."fNumber" AS "AssetEntity__AssetEntity_exifInfo_fNumber",
      "AssetEntity__AssetEntity_exifInfo"."focalLength" AS "AssetEntity__AssetEntity_exifInfo_focalLength",
      "AssetEntity__AssetEntity_exifInfo"."iso" AS "AssetEntity__AssetEntity_exifInfo_iso",
      "AssetEntity__AssetEntity_exifInfo"."exposureTime" AS "AssetEntity__AssetEntity_exifInfo_exposureTime",
      "AssetEntity__AssetEntity_exifInfo"."profileDescription" AS "AssetEntity__AssetEntity_exifInfo_profileDescription",
      "AssetEntity__AssetEntity_exifInfo"."colorspace" AS "AssetEntity__AssetEntity_exifInfo_colorspace",
      "AssetEntity__AssetEntity_exifInfo"."bitsPerSample" AS "AssetEntity__AssetEntity_exifInfo_bitsPerSample",
      "AssetEntity__AssetEntity_exifInfo"."fps" AS "AssetEntity__AssetEntity_exifInfo_fps"
    FROM
      "assets" "AssetEntity"
      LEFT JOIN "asset_faces" "AssetEntity__AssetEntity_faces" ON "AssetEntity__AssetEntity_faces"."assetId" = "AssetEntity"."id"
      LEFT JOIN "person" "8258e303a73a72cf6abb13d73fb592dde0d68280" ON "8258e303a73a72cf6abb13d73fb592dde0d68280"."id" = "AssetEntity__AssetEntity_faces"."personId"
      LEFT JOIN "exif" "AssetEntity__AssetEntity_exifInfo" ON "AssetEntity__AssetEntity_exifInfo"."assetId" = "AssetEntity"."id"
    WHERE
      (
        (
          "AssetEntity__AssetEntity_faces"."personId" = $1
          AND "AssetEntity"."isVisible" = $2
          AND "AssetEntity"."isArchived" = $3
        )
      )
      AND ("AssetEntity"."deletedAt" IS NULL)
  ) "distinctAlias"
ORDER BY
  "distinctAlias"."AssetEntity_fileCreatedAt" DESC,
  "AssetEntity_id" ASC
LIMIT
  1000

-- PersonRepository.getNumberOfPeople
SELECT
  COUNT(DISTINCT ("person"."id")) AS "cnt"
FROM
  "person" "person"
  LEFT JOIN "asset_faces" "face" ON "face"."personId" = "person"."id"
WHERE
  "person"."ownerId" = $1
HAVING
  COUNT("face"."assetId") != 0

-- PersonRepository.getFacesByIds
SELECT
  "AssetFaceEntity"."id" AS "AssetFaceEntity_id",
  "AssetFaceEntity"."assetId" AS "AssetFaceEntity_assetId",
  "AssetFaceEntity"."personId" AS "AssetFaceEntity_personId",
  "AssetFaceEntity"."imageWidth" AS "AssetFaceEntity_imageWidth",
  "AssetFaceEntity"."imageHeight" AS "AssetFaceEntity_imageHeight",
  "AssetFaceEntity"."boundingBoxX1" AS "AssetFaceEntity_boundingBoxX1",
  "AssetFaceEntity"."boundingBoxY1" AS "AssetFaceEntity_boundingBoxY1",
  "AssetFaceEntity"."boundingBoxX2" AS "AssetFaceEntity_boundingBoxX2",
  "AssetFaceEntity"."boundingBoxY2" AS "AssetFaceEntity_boundingBoxY2",
  "AssetFaceEntity__AssetFaceEntity_asset"."id" AS "AssetFaceEntity__AssetFaceEntity_asset_id",
  "AssetFaceEntity__AssetFaceEntity_asset"."deviceAssetId" AS "AssetFaceEntity__AssetFaceEntity_asset_deviceAssetId",
  "AssetFaceEntity__AssetFaceEntity_asset"."ownerId" AS "AssetFaceEntity__AssetFaceEntity_asset_ownerId",
  "AssetFaceEntity__AssetFaceEntity_asset"."libraryId" AS "AssetFaceEntity__AssetFaceEntity_asset_libraryId",
  "AssetFaceEntity__AssetFaceEntity_asset"."deviceId" AS "AssetFaceEntity__AssetFaceEntity_asset_deviceId",
  "AssetFaceEntity__AssetFaceEntity_asset"."type" AS "AssetFaceEntity__AssetFaceEntity_asset_type",
  "AssetFaceEntity__AssetFaceEntity_asset"."originalPath" AS "AssetFaceEntity__AssetFaceEntity_asset_originalPath",
  "AssetFaceEntity__AssetFaceEntity_asset"."resizePath" AS "AssetFaceEntity__AssetFaceEntity_asset_resizePath",
  "AssetFaceEntity__AssetFaceEntity_asset"."webpPath" AS "AssetFaceEntity__AssetFaceEntity_asset_webpPath",
  "AssetFaceEntity__AssetFaceEntity_asset"."thumbhash" AS "AssetFaceEntity__AssetFaceEntity_asset_thumbhash",
  "AssetFaceEntity__AssetFaceEntity_asset"."encodedVideoPath" AS "AssetFaceEntity__AssetFaceEntity_asset_encodedVideoPath",
  "AssetFaceEntity__AssetFaceEntity_asset"."createdAt" AS "AssetFaceEntity__AssetFaceEntity_asset_createdAt",
  "AssetFaceEntity__AssetFaceEntity_asset"."updatedAt" AS "AssetFaceEntity__AssetFaceEntity_asset_updatedAt",
  "AssetFaceEntity__AssetFaceEntity_asset"."deletedAt" AS "AssetFaceEntity__AssetFaceEntity_asset_deletedAt",
  "AssetFaceEntity__AssetFaceEntity_asset"."fileCreatedAt" AS "AssetFaceEntity__AssetFaceEntity_asset_fileCreatedAt",
  "AssetFaceEntity__AssetFaceEntity_asset"."localDateTime" AS "AssetFaceEntity__AssetFaceEntity_asset_localDateTime",
  "AssetFaceEntity__AssetFaceEntity_asset"."fileModifiedAt" AS "AssetFaceEntity__AssetFaceEntity_asset_fileModifiedAt",
  "AssetFaceEntity__AssetFaceEntity_asset"."isFavorite" AS "AssetFaceEntity__AssetFaceEntity_asset_isFavorite",
  "AssetFaceEntity__AssetFaceEntity_asset"."isArchived" AS "AssetFaceEntity__AssetFaceEntity_asset_isArchived",
  "AssetFaceEntity__AssetFaceEntity_asset"."isExternal" AS "AssetFaceEntity__AssetFaceEntity_asset_isExternal",
  "AssetFaceEntity__AssetFaceEntity_asset"."isReadOnly" AS "AssetFaceEntity__AssetFaceEntity_asset_isReadOnly",
  "AssetFaceEntity__AssetFaceEntity_asset"."isOffline" AS "AssetFaceEntity__AssetFaceEntity_asset_isOffline",
  "AssetFaceEntity__AssetFaceEntity_asset"."checksum" AS "AssetFaceEntity__AssetFaceEntity_asset_checksum",
  "AssetFaceEntity__AssetFaceEntity_asset"."duration" AS "AssetFaceEntity__AssetFaceEntity_asset_duration",
  "AssetFaceEntity__AssetFaceEntity_asset"."isVisible" AS "AssetFaceEntity__AssetFaceEntity_asset_isVisible",
  "AssetFaceEntity__AssetFaceEntity_asset"."livePhotoVideoId" AS "AssetFaceEntity__AssetFaceEntity_asset_livePhotoVideoId",
  "AssetFaceEntity__AssetFaceEntity_asset"."originalFileName" AS "AssetFaceEntity__AssetFaceEntity_asset_originalFileName",
  "AssetFaceEntity__AssetFaceEntity_asset"."sidecarPath" AS "AssetFaceEntity__AssetFaceEntity_asset_sidecarPath",
  "AssetFaceEntity__AssetFaceEntity_asset"."stackId" AS "AssetFaceEntity__AssetFaceEntity_asset_stackId"
FROM
  "asset_faces" "AssetFaceEntity"
  LEFT JOIN "assets" "AssetFaceEntity__AssetFaceEntity_asset" ON "AssetFaceEntity__AssetFaceEntity_asset"."id" = "AssetFaceEntity"."assetId"
WHERE
  (
    (
      "AssetFaceEntity"."assetId" = $1
      AND "AssetFaceEntity"."personId" = $2
    )
  )

-- PersonRepository.getRandomFace
SELECT
  "AssetFaceEntity"."id" AS "AssetFaceEntity_id",
  "AssetFaceEntity"."assetId" AS "AssetFaceEntity_assetId",
  "AssetFaceEntity"."personId" AS "AssetFaceEntity_personId",
  "AssetFaceEntity"."imageWidth" AS "AssetFaceEntity_imageWidth",
  "AssetFaceEntity"."imageHeight" AS "AssetFaceEntity_imageHeight",
  "AssetFaceEntity"."boundingBoxX1" AS "AssetFaceEntity_boundingBoxX1",
  "AssetFaceEntity"."boundingBoxY1" AS "AssetFaceEntity_boundingBoxY1",
  "AssetFaceEntity"."boundingBoxX2" AS "AssetFaceEntity_boundingBoxX2",
  "AssetFaceEntity"."boundingBoxY2" AS "AssetFaceEntity_boundingBoxY2"
FROM
  "asset_faces" "AssetFaceEntity"
WHERE
  ("AssetFaceEntity"."personId" = $1)
LIMIT
  1
