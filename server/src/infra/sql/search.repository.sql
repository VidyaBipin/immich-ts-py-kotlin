-- NOTE: This file is auto generated by ./sql-generator

-- SearchRepository.searchMetadata
SELECT DISTINCT
  "distinctAlias"."asset_id" AS "ids_asset_id",
  "distinctAlias"."asset_fileCreatedAt"
FROM
  (
    SELECT
      "asset"."id" AS "asset_id",
      "asset"."deviceAssetId" AS "asset_deviceAssetId",
      "asset"."ownerId" AS "asset_ownerId",
      "asset"."libraryId" AS "asset_libraryId",
      "asset"."deviceId" AS "asset_deviceId",
      "asset"."type" AS "asset_type",
      "asset"."originalPath" AS "asset_originalPath",
      "asset"."resizePath" AS "asset_resizePath",
      "asset"."webpPath" AS "asset_webpPath",
      "asset"."thumbhash" AS "asset_thumbhash",
      "asset"."encodedVideoPath" AS "asset_encodedVideoPath",
      "asset"."createdAt" AS "asset_createdAt",
      "asset"."updatedAt" AS "asset_updatedAt",
      "asset"."deletedAt" AS "asset_deletedAt",
      "asset"."fileCreatedAt" AS "asset_fileCreatedAt",
      "asset"."localDateTime" AS "asset_localDateTime",
      "asset"."fileModifiedAt" AS "asset_fileModifiedAt",
      "asset"."isFavorite" AS "asset_isFavorite",
      "asset"."isArchived" AS "asset_isArchived",
      "asset"."isExternal" AS "asset_isExternal",
      "asset"."isReadOnly" AS "asset_isReadOnly",
      "asset"."isOffline" AS "asset_isOffline",
      "asset"."checksum" AS "asset_checksum",
      "asset"."duration" AS "asset_duration",
      "asset"."isVisible" AS "asset_isVisible",
      "asset"."livePhotoVideoId" AS "asset_livePhotoVideoId",
      "asset"."originalFileName" AS "asset_originalFileName",
      "asset"."sidecarPath" AS "asset_sidecarPath",
      "asset"."stackId" AS "asset_stackId",
      "stack"."id" AS "stack_id",
      "stack"."primaryAssetId" AS "stack_primaryAssetId",
      "stackedAssets"."id" AS "stackedAssets_id",
      "stackedAssets"."deviceAssetId" AS "stackedAssets_deviceAssetId",
      "stackedAssets"."ownerId" AS "stackedAssets_ownerId",
      "stackedAssets"."libraryId" AS "stackedAssets_libraryId",
      "stackedAssets"."deviceId" AS "stackedAssets_deviceId",
      "stackedAssets"."type" AS "stackedAssets_type",
      "stackedAssets"."originalPath" AS "stackedAssets_originalPath",
      "stackedAssets"."resizePath" AS "stackedAssets_resizePath",
      "stackedAssets"."webpPath" AS "stackedAssets_webpPath",
      "stackedAssets"."thumbhash" AS "stackedAssets_thumbhash",
      "stackedAssets"."encodedVideoPath" AS "stackedAssets_encodedVideoPath",
      "stackedAssets"."createdAt" AS "stackedAssets_createdAt",
      "stackedAssets"."updatedAt" AS "stackedAssets_updatedAt",
      "stackedAssets"."deletedAt" AS "stackedAssets_deletedAt",
      "stackedAssets"."fileCreatedAt" AS "stackedAssets_fileCreatedAt",
      "stackedAssets"."localDateTime" AS "stackedAssets_localDateTime",
      "stackedAssets"."fileModifiedAt" AS "stackedAssets_fileModifiedAt",
      "stackedAssets"."isFavorite" AS "stackedAssets_isFavorite",
      "stackedAssets"."isArchived" AS "stackedAssets_isArchived",
      "stackedAssets"."isExternal" AS "stackedAssets_isExternal",
      "stackedAssets"."isReadOnly" AS "stackedAssets_isReadOnly",
      "stackedAssets"."isOffline" AS "stackedAssets_isOffline",
      "stackedAssets"."checksum" AS "stackedAssets_checksum",
      "stackedAssets"."duration" AS "stackedAssets_duration",
      "stackedAssets"."isVisible" AS "stackedAssets_isVisible",
      "stackedAssets"."livePhotoVideoId" AS "stackedAssets_livePhotoVideoId",
      "stackedAssets"."originalFileName" AS "stackedAssets_originalFileName",
      "stackedAssets"."sidecarPath" AS "stackedAssets_sidecarPath",
      "stackedAssets"."stackId" AS "stackedAssets_stackId"
    FROM
      "assets" "asset"
      LEFT JOIN "exif" "exifInfo" ON "exifInfo"."assetId" = "asset"."id"
      LEFT JOIN "asset_stack" "stack" ON "stack"."id" = "asset"."stackId"
      LEFT JOIN "assets" "stackedAssets" ON "stackedAssets"."stackId" = "stack"."id"
      AND ("stackedAssets"."deletedAt" IS NULL)
    WHERE
      (
        "asset"."fileCreatedAt" >= $1
        AND "exifInfo"."lensModel" = $2
        AND 1 = 1
        AND 1 = 1
        AND "asset"."isFavorite" = $3
        AND (
          "stack"."primaryAssetId" = "asset"."id"
          OR "asset"."stackId" IS NULL
        )
      )
      AND ("asset"."deletedAt" IS NULL)
  ) "distinctAlias"
ORDER BY
  "distinctAlias"."asset_fileCreatedAt" DESC,
  "asset_id" ASC
LIMIT
  101

-- SearchRepository.searchSmart
START TRANSACTION
SET
  LOCAL vectors.enable_prefilter = on;

SET
  LOCAL vectors.search_mode = vbase;

SET
  LOCAL vectors.hnsw_ef_search = 100;
SELECT
  "asset"."id" AS "asset_id",
  "asset"."deviceAssetId" AS "asset_deviceAssetId",
  "asset"."ownerId" AS "asset_ownerId",
  "asset"."libraryId" AS "asset_libraryId",
  "asset"."deviceId" AS "asset_deviceId",
  "asset"."type" AS "asset_type",
  "asset"."originalPath" AS "asset_originalPath",
  "asset"."resizePath" AS "asset_resizePath",
  "asset"."webpPath" AS "asset_webpPath",
  "asset"."thumbhash" AS "asset_thumbhash",
  "asset"."encodedVideoPath" AS "asset_encodedVideoPath",
  "asset"."createdAt" AS "asset_createdAt",
  "asset"."updatedAt" AS "asset_updatedAt",
  "asset"."deletedAt" AS "asset_deletedAt",
  "asset"."fileCreatedAt" AS "asset_fileCreatedAt",
  "asset"."localDateTime" AS "asset_localDateTime",
  "asset"."fileModifiedAt" AS "asset_fileModifiedAt",
  "asset"."isFavorite" AS "asset_isFavorite",
  "asset"."isArchived" AS "asset_isArchived",
  "asset"."isExternal" AS "asset_isExternal",
  "asset"."isReadOnly" AS "asset_isReadOnly",
  "asset"."isOffline" AS "asset_isOffline",
  "asset"."checksum" AS "asset_checksum",
  "asset"."duration" AS "asset_duration",
  "asset"."isVisible" AS "asset_isVisible",
  "asset"."livePhotoVideoId" AS "asset_livePhotoVideoId",
  "asset"."originalFileName" AS "asset_originalFileName",
  "asset"."sidecarPath" AS "asset_sidecarPath",
  "asset"."stackId" AS "asset_stackId",
  "stack"."id" AS "stack_id",
  "stack"."primaryAssetId" AS "stack_primaryAssetId",
  "stackedAssets"."id" AS "stackedAssets_id",
  "stackedAssets"."deviceAssetId" AS "stackedAssets_deviceAssetId",
  "stackedAssets"."ownerId" AS "stackedAssets_ownerId",
  "stackedAssets"."libraryId" AS "stackedAssets_libraryId",
  "stackedAssets"."deviceId" AS "stackedAssets_deviceId",
  "stackedAssets"."type" AS "stackedAssets_type",
  "stackedAssets"."originalPath" AS "stackedAssets_originalPath",
  "stackedAssets"."resizePath" AS "stackedAssets_resizePath",
  "stackedAssets"."webpPath" AS "stackedAssets_webpPath",
  "stackedAssets"."thumbhash" AS "stackedAssets_thumbhash",
  "stackedAssets"."encodedVideoPath" AS "stackedAssets_encodedVideoPath",
  "stackedAssets"."createdAt" AS "stackedAssets_createdAt",
  "stackedAssets"."updatedAt" AS "stackedAssets_updatedAt",
  "stackedAssets"."deletedAt" AS "stackedAssets_deletedAt",
  "stackedAssets"."fileCreatedAt" AS "stackedAssets_fileCreatedAt",
  "stackedAssets"."localDateTime" AS "stackedAssets_localDateTime",
  "stackedAssets"."fileModifiedAt" AS "stackedAssets_fileModifiedAt",
  "stackedAssets"."isFavorite" AS "stackedAssets_isFavorite",
  "stackedAssets"."isArchived" AS "stackedAssets_isArchived",
  "stackedAssets"."isExternal" AS "stackedAssets_isExternal",
  "stackedAssets"."isReadOnly" AS "stackedAssets_isReadOnly",
  "stackedAssets"."isOffline" AS "stackedAssets_isOffline",
  "stackedAssets"."checksum" AS "stackedAssets_checksum",
  "stackedAssets"."duration" AS "stackedAssets_duration",
  "stackedAssets"."isVisible" AS "stackedAssets_isVisible",
  "stackedAssets"."livePhotoVideoId" AS "stackedAssets_livePhotoVideoId",
  "stackedAssets"."originalFileName" AS "stackedAssets_originalFileName",
  "stackedAssets"."sidecarPath" AS "stackedAssets_sidecarPath",
  "stackedAssets"."stackId" AS "stackedAssets_stackId"
FROM
  "assets" "asset"
  LEFT JOIN "exif" "exifInfo" ON "exifInfo"."assetId" = "asset"."id"
  LEFT JOIN "asset_stack" "stack" ON "stack"."id" = "asset"."stackId"
  LEFT JOIN "assets" "stackedAssets" ON "stackedAssets"."stackId" = "stack"."id"
  AND ("stackedAssets"."deletedAt" IS NULL)
  INNER JOIN "smart_search" "search" ON "search"."assetId" = "asset"."id"
WHERE
  (
    "asset"."fileCreatedAt" >= $1
    AND "exifInfo"."lensModel" = $2
    AND 1 = 1
    AND 1 = 1
    AND "asset"."isFavorite" = $3
    AND (
      "stack"."primaryAssetId" = "asset"."id"
      OR "asset"."stackId" IS NULL
    )
    AND "asset"."ownerId" IN ($4)
  )
  AND ("asset"."deletedAt" IS NULL)
ORDER BY
  "search"."embedding" <= > $5 ASC
LIMIT
  101
COMMIT

-- SearchRepository.searchFaces
START TRANSACTION
SET
  LOCAL vectors.enable_prefilter = on;

SET
  LOCAL vectors.search_mode = vbase;

SET
  LOCAL vectors.hnsw_ef_search = 100;
WITH
  "cte" AS (
    SELECT
      "faces"."id" AS "id",
      "faces"."assetId" AS "assetId",
      "faces"."personId" AS "personId",
      "faces"."imageWidth" AS "imageWidth",
      "faces"."imageHeight" AS "imageHeight",
      "faces"."boundingBoxX1" AS "boundingBoxX1",
      "faces"."boundingBoxY1" AS "boundingBoxY1",
      "faces"."boundingBoxX2" AS "boundingBoxX2",
      "faces"."boundingBoxY2" AS "boundingBoxY2",
      "faces"."embedding" <= > $1 AS "distance"
    FROM
      "asset_faces" "faces"
      INNER JOIN "assets" "asset" ON "asset"."id" = "faces"."assetId"
      AND ("asset"."deletedAt" IS NULL)
    WHERE
      "asset"."ownerId" IN ($2)
    ORDER BY
      "faces"."embedding" <= > $1 ASC
    LIMIT
      100
  )
SELECT
  res.*
FROM
  "cte" "res"
WHERE
  res.distance <= $3
COMMIT

-- SearchRepository.searchPlaces
SELECT
  "geoplaces"."id" AS "geoplaces_id",
  "geoplaces"."name" AS "geoplaces_name",
  "geoplaces"."longitude" AS "geoplaces_longitude",
  "geoplaces"."latitude" AS "geoplaces_latitude",
  "geoplaces"."countryCode" AS "geoplaces_countryCode",
  "geoplaces"."admin1Code" AS "geoplaces_admin1Code",
  "geoplaces"."admin2Code" AS "geoplaces_admin2Code",
  "geoplaces"."admin1Name" AS "geoplaces_admin1Name",
  "geoplaces"."admin2Name" AS "geoplaces_admin2Name",
  "geoplaces"."modificationDate" AS "geoplaces_modificationDate"
FROM
  "geodata_places" "geoplaces"
WHERE
  f_unaccent (name) ~* ('\m' || f_unaccent ($1))
  OR f_unaccent ("admin2Name") ~* ('\m' || f_unaccent ($1))
  OR f_unaccent ("admin1Name") ~* ('\m' || f_unaccent ($1))
ORDER BY
  f_unaccent (name) <->>> f_unaccent ($1) ASC,
  f_unaccent ("admin2Name") <->>> f_unaccent ($1) ASC,
  f_unaccent ("admin1Name") <->>> f_unaccent ($1) ASC
LIMIT
  20
