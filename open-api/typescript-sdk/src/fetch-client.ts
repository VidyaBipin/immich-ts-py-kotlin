/**
 * Immich
 * 1.105.1
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "/api",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: "/api"
};
export type UserResponseDto = {
    avatarColor: UserAvatarColor;
    email: string;
    id: string;
    name: string;
    profileImagePath: string;
};
export type ActivityResponseDto = {
    assetId: string | null;
    comment?: string | null;
    createdAt: string;
    id: string;
    "type": Type;
    user: UserResponseDto;
};
export type ActivityCreateDto = {
    albumId: string;
    assetId?: string;
    comment?: string;
    "type": ReactionType;
};
export type ActivityStatisticsResponseDto = {
    comments: number;
};
export type UserAdminResponseDto = {
    avatarColor: UserAvatarColor;
    createdAt: string;
    deletedAt: string | null;
    email: string;
    id: string;
    isAdmin: boolean;
    name: string;
    oauthId: string;
    profileImagePath: string;
    quotaSizeInBytes: number | null;
    quotaUsageInBytes: number | null;
    shouldChangePassword: boolean;
    status: UserStatus;
    storageLabel: string | null;
    updatedAt: string;
};
export type UserAdminCreateDto = {
    email: string;
    name: string;
    notify?: boolean;
    password: string;
    quotaSizeInBytes?: number | null;
    shouldChangePassword?: boolean;
    storageLabel?: string | null;
};
export type UserAdminDeleteDto = {
    force?: boolean;
};
export type UserAdminUpdateDto = {
    email?: string;
    name?: string;
    password?: string;
    quotaSizeInBytes?: number | null;
    shouldChangePassword?: boolean;
    storageLabel?: string | null;
};
export type AvatarResponse = {
    color: UserAvatarColor;
};
export type EmailNotificationsResponse = {
    albumInvite: boolean;
    albumUpdate: boolean;
    enabled: boolean;
};
export type MemoryResponse = {
    enabled: boolean;
};
export type UserPreferencesResponseDto = {
    avatar: AvatarResponse;
    emailNotifications: EmailNotificationsResponse;
    memories: MemoryResponse;
};
export type AvatarUpdate = {
    color?: UserAvatarColor;
};
export type EmailNotificationsUpdate = {
    albumInvite?: boolean;
    albumUpdate?: boolean;
    enabled?: boolean;
};
export type MemoryUpdate = {
    enabled?: boolean;
};
export type UserPreferencesUpdateDto = {
    avatar?: AvatarUpdate;
    emailNotifications?: EmailNotificationsUpdate;
    memories?: MemoryUpdate;
};
export type AlbumUserResponseDto = {
    role: AlbumUserRole;
    user: UserResponseDto;
};
export type ExifResponseDto = {
    city?: string | null;
    country?: string | null;
    dateTimeOriginal?: string | null;
    description?: string | null;
    exifImageHeight?: number | null;
    exifImageWidth?: number | null;
    exposureTime?: string | null;
    fNumber?: number | null;
    fileSizeInByte?: number | null;
    focalLength?: number | null;
    iso?: number | null;
    latitude?: number | null;
    lensModel?: string | null;
    longitude?: number | null;
    make?: string | null;
    model?: string | null;
    modifyDate?: string | null;
    orientation?: string | null;
    projectionType?: string | null;
    state?: string | null;
    timeZone?: string | null;
};
export type AssetFaceWithoutPersonResponseDto = {
    boundingBoxX1: number;
    boundingBoxX2: number;
    boundingBoxY1: number;
    boundingBoxY2: number;
    id: string;
    imageHeight: number;
    imageWidth: number;
};
export type PersonWithFacesResponseDto = {
    birthDate: string | null;
    faces: AssetFaceWithoutPersonResponseDto[];
    id: string;
    isHidden: boolean;
    name: string;
    thumbnailPath: string;
};
export type SmartInfoResponseDto = {
    objects?: string[] | null;
    tags?: string[] | null;
};
export type TagResponseDto = {
    id: string;
    name: string;
    "type": TagTypeEnum;
    userId: string;
};
export type AssetResponseDto = {
    /** base64 encoded sha1 hash */
    checksum: string;
    deviceAssetId: string;
    deviceId: string;
    duplicateId?: string | null;
    duration: string;
    exifInfo?: ExifResponseDto;
    fileCreatedAt: string;
    fileModifiedAt: string;
    hasMetadata: boolean;
    id: string;
    isArchived: boolean;
    isFavorite: boolean;
    isOffline: boolean;
    isTrashed: boolean;
    /** This property was deprecated in v1.106.0 */
    libraryId?: string | null;
    livePhotoVideoId?: string | null;
    localDateTime: string;
    originalFileName: string;
    originalPath: string;
    owner?: UserResponseDto;
    ownerId: string;
    people?: PersonWithFacesResponseDto[];
    resized: boolean;
    smartInfo?: SmartInfoResponseDto;
    stack?: AssetResponseDto[];
    stackCount: number | null;
    stackParentId?: string | null;
    tags?: TagResponseDto[];
    thumbhash: string | null;
    "type": AssetTypeEnum;
    unassignedFaces?: AssetFaceWithoutPersonResponseDto[];
    updatedAt: string;
};
export type AlbumResponseDto = {
    albumName: string;
    albumThumbnailAssetId: string | null;
    albumUsers: AlbumUserResponseDto[];
    assetCount: number;
    assets: AssetResponseDto[];
    createdAt: string;
    description: string;
    endDate?: string;
    hasSharedLink: boolean;
    id: string;
    isActivityEnabled: boolean;
    lastModifiedAssetTimestamp?: string;
    order?: AssetOrder;
    owner: UserResponseDto;
    ownerId: string;
    shared: boolean;
    startDate?: string;
    updatedAt: string;
};
export type AlbumUserCreateDto = {
    role: AlbumUserRole;
    userId: string;
};
export type CreateAlbumDto = {
    albumName: string;
    albumUsers?: AlbumUserCreateDto[];
    assetIds?: string[];
    description?: string;
};
export type AlbumCountResponseDto = {
    notShared: number;
    owned: number;
    shared: number;
};
export type UpdateAlbumDto = {
    albumName?: string;
    albumThumbnailAssetId?: string;
    description?: string;
    isActivityEnabled?: boolean;
    order?: AssetOrder;
};
export type BulkIdsDto = {
    ids: string[];
};
export type BulkIdResponseDto = {
    error?: Error;
    id: string;
    success: boolean;
};
export type UpdateAlbumUserDto = {
    role: AlbumUserRole;
};
export type AlbumUserAddDto = {
    role?: AlbumUserRole;
    userId: string;
};
export type AddUsersDto = {
    albumUsers: AlbumUserAddDto[];
};
export type ApiKeyResponseDto = {
    createdAt: string;
    id: string;
    name: string;
    updatedAt: string;
};
export type ApiKeyCreateDto = {
    name?: string;
};
export type ApiKeyCreateResponseDto = {
    apiKey: ApiKeyResponseDto;
    secret: string;
};
export type ApiKeyUpdateDto = {
    name: string;
};
export type AssetBulkDeleteDto = {
    force?: boolean;
    ids: string[];
};
export type AssetMediaCreateDto = {
    assetData: Blob;
    deviceAssetId: string;
    deviceId: string;
    duration?: string;
    fileCreatedAt: string;
    fileModifiedAt: string;
    isArchived?: boolean;
    isFavorite?: boolean;
    isOffline?: boolean;
    isVisible?: boolean;
    livePhotoVideoId?: string;
    sidecarData?: Blob;
};
export type AssetMediaResponseDto = {
    id: string;
    status: AssetMediaStatus;
};
export type AssetBulkUpdateDto = {
    dateTimeOriginal?: string;
    duplicateId?: string | null;
    ids: string[];
    isArchived?: boolean;
    isFavorite?: boolean;
    latitude?: number;
    longitude?: number;
    removeParent?: boolean;
    stackParentId?: string;
};
export type AssetBulkUploadCheckItem = {
    /** base64 or hex encoded sha1 hash */
    checksum: string;
    id: string;
};
export type AssetBulkUploadCheckDto = {
    assets: AssetBulkUploadCheckItem[];
};
export type AssetBulkUploadCheckResult = {
    action: Action;
    assetId?: string;
    id: string;
    reason?: Reason;
};
export type AssetBulkUploadCheckResponseDto = {
    results: AssetBulkUploadCheckResult[];
};
export type CheckExistingAssetsDto = {
    deviceAssetIds: string[];
    deviceId: string;
};
export type CheckExistingAssetsResponseDto = {
    existingIds: string[];
};
export type AssetJobsDto = {
    assetIds: string[];
    name: AssetJobName;
};
export type MemoryLaneResponseDto = {
    assets: AssetResponseDto[];
    yearsAgo: number;
};
export type UpdateStackParentDto = {
    newParentId: string;
    oldParentId: string;
};
export type AssetStatsResponseDto = {
    images: number;
    total: number;
    videos: number;
};
export type UpdateAssetDto = {
    dateTimeOriginal?: string;
    description?: string;
    isArchived?: boolean;
    isFavorite?: boolean;
    latitude?: number;
    longitude?: number;
};
export type AssetMediaReplaceDto = {
    assetData: Blob;
    deviceAssetId: string;
    deviceId: string;
    duration?: string;
    fileCreatedAt: string;
    fileModifiedAt: string;
};
export type AuditDeletesResponseDto = {
    ids: string[];
    needsFullSync: boolean;
};
export type SignUpDto = {
    email: string;
    name: string;
    password: string;
};
export type ChangePasswordDto = {
    newPassword: string;
    password: string;
};
export type LoginCredentialDto = {
    email: string;
    password: string;
};
export type LoginResponseDto = {
    accessToken: string;
    isAdmin: boolean;
    name: string;
    profileImagePath: string;
    shouldChangePassword: boolean;
    userEmail: string;
    userId: string;
};
export type LogoutResponseDto = {
    redirectUri: string;
    successful: boolean;
};
export type ValidateAccessTokenResponseDto = {
    authStatus: boolean;
};
export type AssetIdsDto = {
    assetIds: string[];
};
export type DownloadInfoDto = {
    albumId?: string;
    archiveSize?: number;
    assetIds?: string[];
    userId?: string;
};
export type DownloadArchiveInfo = {
    assetIds: string[];
    size: number;
};
export type DownloadResponseDto = {
    archives: DownloadArchiveInfo[];
    totalSize: number;
};
export type DuplicateResponseDto = {
    assets: AssetResponseDto[];
    duplicateId: string;
};
export type PersonResponseDto = {
    birthDate: string | null;
    id: string;
    isHidden: boolean;
    name: string;
    thumbnailPath: string;
};
export type AssetFaceResponseDto = {
    boundingBoxX1: number;
    boundingBoxX2: number;
    boundingBoxY1: number;
    boundingBoxY2: number;
    id: string;
    imageHeight: number;
    imageWidth: number;
    person: (PersonResponseDto) | null;
};
export type FaceDto = {
    id: string;
};
export type JobCountsDto = {
    active: number;
    completed: number;
    delayed: number;
    failed: number;
    paused: number;
    waiting: number;
};
export type QueueStatusDto = {
    isActive: boolean;
    isPaused: boolean;
};
export type JobStatusDto = {
    jobCounts: JobCountsDto;
    queueStatus: QueueStatusDto;
};
export type AllJobStatusResponseDto = {
    backgroundTask: JobStatusDto;
    duplicateDetection: JobStatusDto;
    faceDetection: JobStatusDto;
    facialRecognition: JobStatusDto;
    library: JobStatusDto;
    metadataExtraction: JobStatusDto;
    migration: JobStatusDto;
    notifications: JobStatusDto;
    search: JobStatusDto;
    sidecar: JobStatusDto;
    smartSearch: JobStatusDto;
    storageTemplateMigration: JobStatusDto;
    thumbnailGeneration: JobStatusDto;
    videoConversion: JobStatusDto;
};
export type JobCommandDto = {
    command: JobCommand;
    force: boolean;
};
export type LibraryResponseDto = {
    assetCount: number;
    createdAt: string;
    exclusionPatterns: string[];
    id: string;
    importPaths: string[];
    name: string;
    ownerId: string;
    refreshedAt: string | null;
    updatedAt: string;
};
export type CreateLibraryDto = {
    exclusionPatterns?: string[];
    importPaths?: string[];
    name?: string;
    ownerId: string;
};
export type UpdateLibraryDto = {
    exclusionPatterns?: string[];
    importPaths?: string[];
    name?: string;
};
export type ScanLibraryDto = {
    refreshAllFiles?: boolean;
    refreshModifiedFiles?: boolean;
};
export type LibraryStatsResponseDto = {
    photos: number;
    total: number;
    usage: number;
    videos: number;
};
export type ValidateLibraryDto = {
    exclusionPatterns?: string[];
    importPaths?: string[];
};
export type ValidateLibraryImportPathResponseDto = {
    importPath: string;
    isValid: boolean;
    message?: string;
};
export type ValidateLibraryResponseDto = {
    importPaths?: ValidateLibraryImportPathResponseDto[];
};
export type MapMarkerResponseDto = {
    city: string | null;
    country: string | null;
    id: string;
    lat: number;
    lon: number;
    state: string | null;
};
export type OnThisDayDto = {
    year: number;
};
export type MemoryResponseDto = {
    assets: AssetResponseDto[];
    createdAt: string;
    data: OnThisDayDto;
    deletedAt?: string;
    id: string;
    isSaved: boolean;
    memoryAt: string;
    ownerId: string;
    seenAt?: string;
    "type": Type2;
    updatedAt: string;
};
export type MemoryCreateDto = {
    assetIds?: string[];
    data: OnThisDayDto;
    isSaved?: boolean;
    memoryAt: string;
    seenAt?: string;
    "type": MemoryType;
};
export type MemoryUpdateDto = {
    isSaved?: boolean;
    memoryAt?: string;
    seenAt?: string;
};
export type SmtpVerificationDto = {
    "from": string;
    host: string;
    ignoreCert?: boolean;
    password?: string;
    port?: number;
    username?: string;
};
export type OAuthConfigDto = {
    redirectUri: string;
};
export type OAuthAuthorizeResponseDto = {
    url: string;
};
export type OAuthCallbackDto = {
    url: string;
};
export type PartnerResponseDto = {
    avatarColor: UserAvatarColor;
    email: string;
    id: string;
    inTimeline?: boolean;
    name: string;
    profileImagePath: string;
};
export type UpdatePartnerDto = {
    inTimeline: boolean;
};
export type PeopleResponseDto = {
    hidden: number;
    people: PersonResponseDto[];
    total: number;
};
export type PersonCreateDto = {
    /** Person date of birth.
    Note: the mobile app cannot currently set the birth date to null. */
    birthDate?: string | null;
    /** Person visibility */
    isHidden?: boolean;
    /** Person name. */
    name?: string;
};
export type PeopleUpdateItem = {
    /** Person date of birth.
    Note: the mobile app cannot currently set the birth date to null. */
    birthDate?: string | null;
    /** Asset is used to get the feature face thumbnail. */
    featureFaceAssetId?: string;
    /** Person id. */
    id: string;
    /** Person visibility */
    isHidden?: boolean;
    /** Person name. */
    name?: string;
};
export type PeopleUpdateDto = {
    people: PeopleUpdateItem[];
};
export type PersonUpdateDto = {
    /** Person date of birth.
    Note: the mobile app cannot currently set the birth date to null. */
    birthDate?: string | null;
    /** Asset is used to get the feature face thumbnail. */
    featureFaceAssetId?: string;
    /** Person visibility */
    isHidden?: boolean;
    /** Person name. */
    name?: string;
};
export type MergePersonDto = {
    ids: string[];
};
export type AssetFaceUpdateItem = {
    assetId: string;
    personId: string;
};
export type AssetFaceUpdateDto = {
    data: AssetFaceUpdateItem[];
};
export type PersonStatisticsResponseDto = {
    assets: number;
};
export type FileReportItemDto = {
    checksum?: string;
    entityId: string;
    entityType: PathEntityType;
    pathType: PathType;
    pathValue: string;
};
export type FileReportDto = {
    extras: string[];
    orphans: FileReportItemDto[];
};
export type FileChecksumDto = {
    filenames: string[];
};
export type FileChecksumResponseDto = {
    checksum: string;
    filename: string;
};
export type FileReportFixDto = {
    items: FileReportItemDto[];
};
export type SearchExploreItem = {
    data: AssetResponseDto;
    value: string;
};
export type SearchExploreResponseDto = {
    fieldName: string;
    items: SearchExploreItem[];
};
export type MetadataSearchDto = {
    checksum?: string;
    city?: string;
    country?: string;
    createdAfter?: string;
    createdBefore?: string;
    deviceAssetId?: string;
    deviceId?: string;
    encodedVideoPath?: string;
    id?: string;
    isArchived?: boolean;
    isEncoded?: boolean;
    isFavorite?: boolean;
    isMotion?: boolean;
    isNotInAlbum?: boolean;
    isOffline?: boolean;
    isVisible?: boolean;
    lensModel?: string;
    libraryId?: string;
    make?: string;
    model?: string;
    order?: AssetOrder;
    originalFileName?: string;
    originalPath?: string;
    page?: number;
    personIds?: string[];
    previewPath?: string;
    size?: number;
    state?: string;
    takenAfter?: string;
    takenBefore?: string;
    thumbnailPath?: string;
    trashedAfter?: string;
    trashedBefore?: string;
    "type"?: AssetTypeEnum;
    updatedAfter?: string;
    updatedBefore?: string;
    withArchived?: boolean;
    withDeleted?: boolean;
    withExif?: boolean;
    withPeople?: boolean;
    withStacked?: boolean;
};
export type SearchFacetCountResponseDto = {
    count: number;
    value: string;
};
export type SearchFacetResponseDto = {
    counts: SearchFacetCountResponseDto[];
    fieldName: string;
};
export type SearchAlbumResponseDto = {
    count: number;
    facets: SearchFacetResponseDto[];
    items: AlbumResponseDto[];
    total: number;
};
export type SearchAssetResponseDto = {
    count: number;
    facets: SearchFacetResponseDto[];
    items: AssetResponseDto[];
    nextPage: string | null;
    total: number;
};
export type SearchResponseDto = {
    albums: SearchAlbumResponseDto;
    assets: SearchAssetResponseDto;
};
export type PlacesResponseDto = {
    admin1name?: string;
    admin2name?: string;
    latitude: number;
    longitude: number;
    name: string;
};
export type SmartSearchDto = {
    city?: string;
    country?: string;
    createdAfter?: string;
    createdBefore?: string;
    deviceId?: string;
    isArchived?: boolean;
    isEncoded?: boolean;
    isFavorite?: boolean;
    isMotion?: boolean;
    isNotInAlbum?: boolean;
    isOffline?: boolean;
    isVisible?: boolean;
    lensModel?: string;
    libraryId?: string;
    make?: string;
    model?: string;
    page?: number;
    personIds?: string[];
    query: string;
    size?: number;
    state?: string;
    takenAfter?: string;
    takenBefore?: string;
    trashedAfter?: string;
    trashedBefore?: string;
    "type"?: AssetTypeEnum;
    updatedAfter?: string;
    updatedBefore?: string;
    withArchived?: boolean;
    withDeleted?: boolean;
    withExif?: boolean;
};
export type ServerConfigDto = {
    externalDomain: string;
    isInitialized: boolean;
    isOnboarded: boolean;
    loginPageMessage: string;
    oauthButtonText: string;
    trashDays: number;
    userDeleteDelay: number;
};
export type ServerFeaturesDto = {
    configFile: boolean;
    duplicateDetection: boolean;
    email: boolean;
    facialRecognition: boolean;
    map: boolean;
    oauth: boolean;
    oauthAutoLaunch: boolean;
    passwordLogin: boolean;
    reverseGeocoding: boolean;
    search: boolean;
    sidecar: boolean;
    smartSearch: boolean;
    trash: boolean;
};
export type ServerMediaTypesResponseDto = {
    image: string[];
    sidecar: string[];
    video: string[];
};
export type ServerPingResponse = {};
export type ServerPingResponseRead = {
    res: string;
};
export type UsageByUserDto = {
    photos: number;
    quotaSizeInBytes: number | null;
    usage: number;
    userId: string;
    userName: string;
    videos: number;
};
export type ServerStatsResponseDto = {
    photos: number;
    usage: number;
    usageByUser: UsageByUserDto[];
    videos: number;
};
export type ServerStorageResponseDto = {
    diskAvailable: string;
    diskAvailableRaw: number;
    diskSize: string;
    diskSizeRaw: number;
    diskUsagePercentage: number;
    diskUse: string;
    diskUseRaw: number;
};
export type ServerThemeDto = {
    customCss: string;
};
export type ServerVersionResponseDto = {
    major: number;
    minor: number;
    patch: number;
};
export type SessionResponseDto = {
    createdAt: string;
    current: boolean;
    deviceOS: string;
    deviceType: string;
    id: string;
    updatedAt: string;
};
export type SharedLinkResponseDto = {
    album?: AlbumResponseDto;
    allowDownload: boolean;
    allowUpload: boolean;
    assets: AssetResponseDto[];
    createdAt: string;
    description: string | null;
    expiresAt: string | null;
    id: string;
    key: string;
    password: string | null;
    showMetadata: boolean;
    token?: string | null;
    "type": SharedLinkType;
    userId: string;
};
export type SharedLinkCreateDto = {
    albumId?: string;
    allowDownload?: boolean;
    allowUpload?: boolean;
    assetIds?: string[];
    description?: string;
    expiresAt?: string | null;
    password?: string;
    showMetadata?: boolean;
    "type": SharedLinkType;
};
export type SharedLinkEditDto = {
    allowDownload?: boolean;
    allowUpload?: boolean;
    /** Few clients cannot send null to set the expiryTime to never.
    Setting this flag and not sending expiryAt is considered as null instead.
    Clients that can send null values can ignore this. */
    changeExpiryTime?: boolean;
    description?: string;
    expiresAt?: string | null;
    password?: string;
    showMetadata?: boolean;
};
export type AssetIdsResponseDto = {
    assetId: string;
    error?: Error2;
    success: boolean;
};
export type AssetDeltaSyncDto = {
    updatedAfter: string;
    userIds: string[];
};
export type AssetDeltaSyncResponseDto = {
    deleted: string[];
    needsFullSync: boolean;
    upserted: AssetResponseDto[];
};
export type AssetFullSyncDto = {
    lastCreationDate?: string;
    lastId?: string;
    limit: number;
    updatedUntil: string;
    userId?: string;
};
export type SystemConfigFFmpegDto = {
    accel: TranscodeHWAccel;
    accelDecode: boolean;
    acceptedAudioCodecs: AudioCodec[];
    acceptedVideoCodecs: VideoCodec[];
    bframes: number;
    cqMode: CQMode;
    crf: number;
    gopSize: number;
    maxBitrate: string;
    npl: number;
    preferredHwDevice: string;
    preset: string;
    refs: number;
    targetAudioCodec: AudioCodec;
    targetResolution: string;
    targetVideoCodec: VideoCodec;
    temporalAQ: boolean;
    threads: number;
    tonemap: ToneMapping;
    transcode: TranscodePolicy;
    twoPass: boolean;
};
export type SystemConfigImageDto = {
    colorspace: Colorspace;
    extractEmbedded: boolean;
    previewFormat: ImageFormat;
    previewSize: number;
    quality: number;
    thumbnailFormat: ImageFormat;
    thumbnailSize: number;
};
export type JobSettingsDto = {
    concurrency: number;
};
export type SystemConfigJobDto = {
    backgroundTask: JobSettingsDto;
    faceDetection: JobSettingsDto;
    library: JobSettingsDto;
    metadataExtraction: JobSettingsDto;
    migration: JobSettingsDto;
    notifications: JobSettingsDto;
    search: JobSettingsDto;
    sidecar: JobSettingsDto;
    smartSearch: JobSettingsDto;
    thumbnailGeneration: JobSettingsDto;
    videoConversion: JobSettingsDto;
};
export type SystemConfigLibraryScanDto = {
    cronExpression: string;
    enabled: boolean;
};
export type SystemConfigLibraryWatchDto = {
    enabled: boolean;
};
export type SystemConfigLibraryDto = {
    scan: SystemConfigLibraryScanDto;
    watch: SystemConfigLibraryWatchDto;
};
export type SystemConfigLoggingDto = {
    enabled: boolean;
    level: LogLevel;
};
export type ClipConfig = {
    enabled: boolean;
    mode?: CLIPMode;
    modelName: string;
    modelType?: ModelType;
};
export type DuplicateDetectionConfig = {
    enabled: boolean;
    maxDistance: number;
};
export type RecognitionConfig = {
    enabled: boolean;
    maxDistance: number;
    minFaces: number;
    minScore: number;
    modelName: string;
    modelType?: ModelType;
};
export type SystemConfigMachineLearningDto = {
    clip: ClipConfig;
    duplicateDetection: DuplicateDetectionConfig;
    enabled: boolean;
    facialRecognition: RecognitionConfig;
    url: string;
};
export type SystemConfigMapDto = {
    darkStyle: string;
    enabled: boolean;
    lightStyle: string;
};
export type SystemConfigNewVersionCheckDto = {
    enabled: boolean;
};
export type SystemConfigSmtpTransportDto = {
    host: string;
    ignoreCert: boolean;
    password: string;
    port: number;
    username: string;
};
export type SystemConfigSmtpDto = {
    enabled: boolean;
    "from": string;
    replyTo: string;
    transport: SystemConfigSmtpTransportDto;
};
export type SystemConfigNotificationsDto = {
    smtp: SystemConfigSmtpDto;
};
export type SystemConfigOAuthDto = {
    autoLaunch: boolean;
    autoRegister: boolean;
    buttonText: string;
    clientId: string;
    clientSecret: string;
    defaultStorageQuota: number;
    enabled: boolean;
    issuerUrl: string;
    mobileOverrideEnabled: boolean;
    mobileRedirectUri: string;
    scope: string;
    signingAlgorithm: string;
    storageLabelClaim: string;
    storageQuotaClaim: string;
};
export type SystemConfigPasswordLoginDto = {
    enabled: boolean;
};
export type SystemConfigReverseGeocodingDto = {
    enabled: boolean;
};
export type SystemConfigServerDto = {
    externalDomain: string;
    loginPageMessage: string;
};
export type SystemConfigStorageTemplateDto = {
    enabled: boolean;
    hashVerificationEnabled: boolean;
    template: string;
};
export type SystemConfigThemeDto = {
    customCss: string;
};
export type SystemConfigTrashDto = {
    days: number;
    enabled: boolean;
};
export type SystemConfigUserDto = {
    deleteDelay: number;
};
export type SystemConfigDto = {
    ffmpeg: SystemConfigFFmpegDto;
    image: SystemConfigImageDto;
    job: SystemConfigJobDto;
    library: SystemConfigLibraryDto;
    logging: SystemConfigLoggingDto;
    machineLearning: SystemConfigMachineLearningDto;
    map: SystemConfigMapDto;
    newVersionCheck: SystemConfigNewVersionCheckDto;
    notifications: SystemConfigNotificationsDto;
    oauth: SystemConfigOAuthDto;
    passwordLogin: SystemConfigPasswordLoginDto;
    reverseGeocoding: SystemConfigReverseGeocodingDto;
    server: SystemConfigServerDto;
    storageTemplate: SystemConfigStorageTemplateDto;
    theme: SystemConfigThemeDto;
    trash: SystemConfigTrashDto;
    user: SystemConfigUserDto;
};
export type SystemConfigTemplateStorageOptionDto = {
    dayOptions: string[];
    hourOptions: string[];
    minuteOptions: string[];
    monthOptions: string[];
    presetOptions: string[];
    secondOptions: string[];
    weekOptions: string[];
    yearOptions: string[];
};
export type AdminOnboardingUpdateDto = {
    isOnboarded: boolean;
};
export type ReverseGeocodingStateResponseDto = {
    lastImportFileName: string | null;
    lastUpdate: string | null;
};
export type CreateTagDto = {
    name: string;
    "type": TagTypeEnum;
};
export type UpdateTagDto = {
    name?: string;
};
export type TimeBucketResponseDto = {
    count: number;
    timeBucket: string;
};
export type UserUpdateMeDto = {
    email?: string;
    name?: string;
    password?: string;
};
export type CreateProfileImageDto = {
    file: Blob;
};
export type CreateProfileImageResponseDto = {
    profileImagePath: string;
    userId: string;
};
export function getActivities({ albumId, assetId, level, $type, userId }: {
    albumId: string;
    assetId?: string;
    level?: ReactionLevel;
    $type?: ReactionType;
    userId?: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ActivityResponseDto[];
    }>(`/activities${QS.query(QS.explode({
        albumId,
        assetId,
        level,
        "type": $type,
        userId
    }))}`, {
        ...opts
    }));
}
export function createActivity({ activityCreateDto }: {
    activityCreateDto: ActivityCreateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: ActivityResponseDto;
    }>("/activities", oazapfts.json({
        ...opts,
        method: "POST",
        body: activityCreateDto
    })));
}
export function getActivityStatistics({ albumId, assetId }: {
    albumId: string;
    assetId?: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ActivityStatisticsResponseDto;
    }>(`/activities/statistics${QS.query(QS.explode({
        albumId,
        assetId
    }))}`, {
        ...opts
    }));
}
export function deleteActivity({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/activities/${encodeURIComponent(id)}`, {
        ...opts,
        method: "DELETE"
    }));
}
export function searchUsersAdmin({ withDeleted }: {
    withDeleted?: boolean;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserAdminResponseDto[];
    }>(`/admin/users${QS.query(QS.explode({
        withDeleted
    }))}`, {
        ...opts
    }));
}
export function createUserAdmin({ userAdminCreateDto }: {
    userAdminCreateDto: UserAdminCreateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: UserAdminResponseDto;
    }>("/admin/users", oazapfts.json({
        ...opts,
        method: "POST",
        body: userAdminCreateDto
    })));
}
export function deleteUserAdmin({ id, userAdminDeleteDto }: {
    id: string;
    userAdminDeleteDto: UserAdminDeleteDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserAdminResponseDto;
    }>(`/admin/users/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body: userAdminDeleteDto
    })));
}
export function getUserAdmin({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserAdminResponseDto;
    }>(`/admin/users/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
export function updateUserAdmin({ id, userAdminUpdateDto }: {
    id: string;
    userAdminUpdateDto: UserAdminUpdateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserAdminResponseDto;
    }>(`/admin/users/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: userAdminUpdateDto
    })));
}
export function getUserPreferencesAdmin({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserPreferencesResponseDto;
    }>(`/admin/users/${encodeURIComponent(id)}/preferences`, {
        ...opts
    }));
}
export function updateUserPreferencesAdmin({ id, userPreferencesUpdateDto }: {
    id: string;
    userPreferencesUpdateDto: UserPreferencesUpdateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserPreferencesResponseDto;
    }>(`/admin/users/${encodeURIComponent(id)}/preferences`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: userPreferencesUpdateDto
    })));
}
export function restoreUserAdmin({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: UserAdminResponseDto;
    }>(`/admin/users/${encodeURIComponent(id)}/restore`, {
        ...opts,
        method: "POST"
    }));
}
export function getAllAlbums({ assetId, shared }: {
    assetId?: string;
    shared?: boolean;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AlbumResponseDto[];
    }>(`/albums${QS.query(QS.explode({
        assetId,
        shared
    }))}`, {
        ...opts
    }));
}
export function createAlbum({ createAlbumDto }: {
    createAlbumDto: CreateAlbumDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: AlbumResponseDto;
    }>("/albums", oazapfts.json({
        ...opts,
        method: "POST",
        body: createAlbumDto
    })));
}
export function getAlbumCount(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AlbumCountResponseDto;
    }>("/albums/count", {
        ...opts
    }));
}
export function deleteAlbum({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/albums/${encodeURIComponent(id)}`, {
        ...opts,
        method: "DELETE"
    }));
}
export function getAlbumInfo({ id, key, withoutAssets }: {
    id: string;
    key?: string;
    withoutAssets?: boolean;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AlbumResponseDto;
    }>(`/albums/${encodeURIComponent(id)}${QS.query(QS.explode({
        key,
        withoutAssets
    }))}`, {
        ...opts
    }));
}
export function updateAlbumInfo({ id, updateAlbumDto }: {
    id: string;
    updateAlbumDto: UpdateAlbumDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AlbumResponseDto;
    }>(`/albums/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateAlbumDto
    })));
}
export function removeAssetFromAlbum({ id, bulkIdsDto }: {
    id: string;
    bulkIdsDto: BulkIdsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: BulkIdResponseDto[];
    }>(`/albums/${encodeURIComponent(id)}/assets`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body: bulkIdsDto
    })));
}
export function addAssetsToAlbum({ id, key, bulkIdsDto }: {
    id: string;
    key?: string;
    bulkIdsDto: BulkIdsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: BulkIdResponseDto[];
    }>(`/albums/${encodeURIComponent(id)}/assets${QS.query(QS.explode({
        key
    }))}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: bulkIdsDto
    })));
}
export function removeUserFromAlbum({ id, userId }: {
    id: string;
    userId: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/albums/${encodeURIComponent(id)}/user/${encodeURIComponent(userId)}`, {
        ...opts,
        method: "DELETE"
    }));
}
export function updateAlbumUser({ id, userId, updateAlbumUserDto }: {
    id: string;
    userId: string;
    updateAlbumUserDto: UpdateAlbumUserDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/albums/${encodeURIComponent(id)}/user/${encodeURIComponent(userId)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: updateAlbumUserDto
    })));
}
export function addUsersToAlbum({ id, addUsersDto }: {
    id: string;
    addUsersDto: AddUsersDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AlbumResponseDto;
    }>(`/albums/${encodeURIComponent(id)}/users`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: addUsersDto
    })));
}
export function getApiKeys(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ApiKeyResponseDto[];
    }>("/api-keys", {
        ...opts
    }));
}
export function createApiKey({ apiKeyCreateDto }: {
    apiKeyCreateDto: ApiKeyCreateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: ApiKeyCreateResponseDto;
    }>("/api-keys", oazapfts.json({
        ...opts,
        method: "POST",
        body: apiKeyCreateDto
    })));
}
export function deleteApiKey({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/api-keys/${encodeURIComponent(id)}`, {
        ...opts,
        method: "DELETE"
    }));
}
export function getApiKey({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ApiKeyResponseDto;
    }>(`/api-keys/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
export function updateApiKey({ id, apiKeyUpdateDto }: {
    id: string;
    apiKeyUpdateDto: ApiKeyUpdateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ApiKeyResponseDto;
    }>(`/api-keys/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: apiKeyUpdateDto
    })));
}
export function deleteAssets({ assetBulkDeleteDto }: {
    assetBulkDeleteDto: AssetBulkDeleteDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/assets", oazapfts.json({
        ...opts,
        method: "DELETE",
        body: assetBulkDeleteDto
    })));
}
export function uploadAsset({ key, xImmichChecksum, assetMediaCreateDto }: {
    key?: string;
    xImmichChecksum?: string;
    assetMediaCreateDto: AssetMediaCreateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: AssetMediaResponseDto;
    }>(`/assets${QS.query(QS.explode({
        key
    }))}`, oazapfts.multipart({
        ...opts,
        method: "POST",
        body: assetMediaCreateDto,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            "x-immich-checksum": xImmichChecksum
        })
    })));
}
export function updateAssets({ assetBulkUpdateDto }: {
    assetBulkUpdateDto: AssetBulkUpdateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/assets", oazapfts.json({
        ...opts,
        method: "PUT",
        body: assetBulkUpdateDto
    })));
}
/**
 * Checks if assets exist by checksums
 */
export function checkBulkUpload({ assetBulkUploadCheckDto }: {
    assetBulkUploadCheckDto: AssetBulkUploadCheckDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetBulkUploadCheckResponseDto;
    }>("/assets/bulk-upload-check", oazapfts.json({
        ...opts,
        method: "POST",
        body: assetBulkUploadCheckDto
    })));
}
/**
 * Get all asset of a device that are in the database, ID only.
 */
export function getAllUserAssetsByDeviceId({ deviceId }: {
    deviceId: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: string[];
    }>(`/assets/device/${encodeURIComponent(deviceId)}`, {
        ...opts
    }));
}
/**
 * Checks if multiple assets exist on the server and returns all existing - used by background backup
 */
export function checkExistingAssets({ checkExistingAssetsDto }: {
    checkExistingAssetsDto: CheckExistingAssetsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CheckExistingAssetsResponseDto;
    }>("/assets/exist", oazapfts.json({
        ...opts,
        method: "POST",
        body: checkExistingAssetsDto
    })));
}
export function runAssetJobs({ assetJobsDto }: {
    assetJobsDto: AssetJobsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/assets/jobs", oazapfts.json({
        ...opts,
        method: "POST",
        body: assetJobsDto
    })));
}
export function getMemoryLane({ day, month }: {
    day: number;
    month: number;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: MemoryLaneResponseDto[];
    }>(`/assets/memory-lane${QS.query(QS.explode({
        day,
        month
    }))}`, {
        ...opts
    }));
}
export function getRandom({ count }: {
    count?: number;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetResponseDto[];
    }>(`/assets/random${QS.query(QS.explode({
        count
    }))}`, {
        ...opts
    }));
}
export function updateStackParent({ updateStackParentDto }: {
    updateStackParentDto: UpdateStackParentDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/assets/stack/parent", oazapfts.json({
        ...opts,
        method: "PUT",
        body: updateStackParentDto
    })));
}
export function getAssetStatistics({ isArchived, isFavorite, isTrashed }: {
    isArchived?: boolean;
    isFavorite?: boolean;
    isTrashed?: boolean;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetStatsResponseDto;
    }>(`/assets/statistics${QS.query(QS.explode({
        isArchived,
        isFavorite,
        isTrashed
    }))}`, {
        ...opts
    }));
}
export function getAssetInfo({ id, key }: {
    id: string;
    key?: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetResponseDto;
    }>(`/assets/${encodeURIComponent(id)}${QS.query(QS.explode({
        key
    }))}`, {
        ...opts
    }));
}
export function updateAsset({ id, updateAssetDto }: {
    id: string;
    updateAssetDto: UpdateAssetDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetResponseDto;
    }>(`/assets/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: updateAssetDto
    })));
}
export function downloadAsset({ id, key }: {
    id: string;
    key?: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchBlob<{
        status: 200;
        data: Blob;
    }>(`/assets/${encodeURIComponent(id)}/original${QS.query(QS.explode({
        key
    }))}`, {
        ...opts
    }));
}
/**
 * Replace the asset with new file, without changing its id
 */
export function replaceAsset({ id, key, assetMediaReplaceDto }: {
    id: string;
    key?: string;
    assetMediaReplaceDto: AssetMediaReplaceDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetMediaResponseDto;
    }>(`/assets/${encodeURIComponent(id)}/original${QS.query(QS.explode({
        key
    }))}`, oazapfts.multipart({
        ...opts,
        method: "PUT",
        body: assetMediaReplaceDto
    })));
}
export function viewAsset({ id, key, size }: {
    id: string;
    key?: string;
    size?: AssetMediaSize;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchBlob<{
        status: 200;
        data: Blob;
    }>(`/assets/${encodeURIComponent(id)}/thumbnail${QS.query(QS.explode({
        key,
        size
    }))}`, {
        ...opts
    }));
}
export function playAssetVideo({ id, key }: {
    id: string;
    key?: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchBlob<{
        status: 200;
        data: Blob;
    }>(`/assets/${encodeURIComponent(id)}/video/playback${QS.query(QS.explode({
        key
    }))}`, {
        ...opts
    }));
}
export function getAuditDeletes({ after, entityType, userId }: {
    after: string;
    entityType: EntityType;
    userId?: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AuditDeletesResponseDto;
    }>(`/audit/deletes${QS.query(QS.explode({
        after,
        entityType,
        userId
    }))}`, {
        ...opts
    }));
}
export function signUpAdmin({ signUpDto }: {
    signUpDto: SignUpDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: UserAdminResponseDto;
    }>("/auth/admin-sign-up", oazapfts.json({
        ...opts,
        method: "POST",
        body: signUpDto
    })));
}
export function changePassword({ changePasswordDto }: {
    changePasswordDto: ChangePasswordDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserAdminResponseDto;
    }>("/auth/change-password", oazapfts.json({
        ...opts,
        method: "POST",
        body: changePasswordDto
    })));
}
export function login({ loginCredentialDto }: {
    loginCredentialDto: LoginCredentialDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: LoginResponseDto;
    }>("/auth/login", oazapfts.json({
        ...opts,
        method: "POST",
        body: loginCredentialDto
    })));
}
export function logout(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: LogoutResponseDto;
    }>("/auth/logout", {
        ...opts,
        method: "POST"
    }));
}
export function validateAccessToken(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ValidateAccessTokenResponseDto;
    }>("/auth/validateToken", {
        ...opts,
        method: "POST"
    }));
}
export function downloadArchive({ key, assetIdsDto }: {
    key?: string;
    assetIdsDto: AssetIdsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchBlob<{
        status: 200;
        data: Blob;
    }>(`/download/archive${QS.query(QS.explode({
        key
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body: assetIdsDto
    })));
}
export function getDownloadInfo({ key, downloadInfoDto }: {
    key?: string;
    downloadInfoDto: DownloadInfoDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: DownloadResponseDto;
    }>(`/download/info${QS.query(QS.explode({
        key
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body: downloadInfoDto
    })));
}
export function getAssetDuplicates(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: DuplicateResponseDto[];
    }>("/duplicates", {
        ...opts
    }));
}
export function getFaces({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetFaceResponseDto[];
    }>(`/faces${QS.query(QS.explode({
        id
    }))}`, {
        ...opts
    }));
}
export function reassignFacesById({ id, faceDto }: {
    id: string;
    faceDto: FaceDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PersonResponseDto;
    }>(`/faces/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: faceDto
    })));
}
export function getAllJobsStatus(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AllJobStatusResponseDto;
    }>("/jobs", {
        ...opts
    }));
}
export function sendJobCommand({ id, jobCommandDto }: {
    id: JobName;
    jobCommandDto: JobCommandDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: JobStatusDto;
    }>(`/jobs/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: jobCommandDto
    })));
}
export function getAllLibraries(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: LibraryResponseDto[];
    }>("/libraries", {
        ...opts
    }));
}
export function createLibrary({ createLibraryDto }: {
    createLibraryDto: CreateLibraryDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: LibraryResponseDto;
    }>("/libraries", oazapfts.json({
        ...opts,
        method: "POST",
        body: createLibraryDto
    })));
}
export function deleteLibrary({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/libraries/${encodeURIComponent(id)}`, {
        ...opts,
        method: "DELETE"
    }));
}
export function getLibrary({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: LibraryResponseDto;
    }>(`/libraries/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
export function updateLibrary({ id, updateLibraryDto }: {
    id: string;
    updateLibraryDto: UpdateLibraryDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: LibraryResponseDto;
    }>(`/libraries/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: updateLibraryDto
    })));
}
export function removeOfflineFiles({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/libraries/${encodeURIComponent(id)}/removeOffline`, {
        ...opts,
        method: "POST"
    }));
}
export function scanLibrary({ id, scanLibraryDto }: {
    id: string;
    scanLibraryDto: ScanLibraryDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/libraries/${encodeURIComponent(id)}/scan`, oazapfts.json({
        ...opts,
        method: "POST",
        body: scanLibraryDto
    })));
}
export function getLibraryStatistics({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: LibraryStatsResponseDto;
    }>(`/libraries/${encodeURIComponent(id)}/statistics`, {
        ...opts
    }));
}
export function validate({ id, validateLibraryDto }: {
    id: string;
    validateLibraryDto: ValidateLibraryDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ValidateLibraryResponseDto;
    }>(`/libraries/${encodeURIComponent(id)}/validate`, oazapfts.json({
        ...opts,
        method: "POST",
        body: validateLibraryDto
    })));
}
export function getMapMarkers({ fileCreatedAfter, fileCreatedBefore, isArchived, isFavorite, withPartners, withSharedAlbums }: {
    fileCreatedAfter?: string;
    fileCreatedBefore?: string;
    isArchived?: boolean;
    isFavorite?: boolean;
    withPartners?: boolean;
    withSharedAlbums?: boolean;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: MapMarkerResponseDto[];
    }>(`/map/markers${QS.query(QS.explode({
        fileCreatedAfter,
        fileCreatedBefore,
        isArchived,
        isFavorite,
        withPartners,
        withSharedAlbums
    }))}`, {
        ...opts
    }));
}
export function getMapStyle({ key, theme }: {
    key?: string;
    theme: MapTheme;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: object;
    }>(`/map/style.json${QS.query(QS.explode({
        key,
        theme
    }))}`, {
        ...opts
    }));
}
export function searchMemories(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: MemoryResponseDto[];
    }>("/memories", {
        ...opts
    }));
}
export function createMemory({ memoryCreateDto }: {
    memoryCreateDto: MemoryCreateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: MemoryResponseDto;
    }>("/memories", oazapfts.json({
        ...opts,
        method: "POST",
        body: memoryCreateDto
    })));
}
export function deleteMemory({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/memories/${encodeURIComponent(id)}`, {
        ...opts,
        method: "DELETE"
    }));
}
export function getMemory({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: MemoryResponseDto;
    }>(`/memories/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
export function updateMemory({ id, memoryUpdateDto }: {
    id: string;
    memoryUpdateDto: MemoryUpdateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: MemoryResponseDto;
    }>(`/memories/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: memoryUpdateDto
    })));
}
export function removeMemoryAssets({ id, bulkIdsDto }: {
    id: string;
    bulkIdsDto: BulkIdsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: BulkIdResponseDto[];
    }>(`/memories/${encodeURIComponent(id)}/assets`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body: bulkIdsDto
    })));
}
export function addMemoryAssets({ id, bulkIdsDto }: {
    id: string;
    bulkIdsDto: BulkIdsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: BulkIdResponseDto[];
    }>(`/memories/${encodeURIComponent(id)}/assets`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: bulkIdsDto
    })));
}
export function testEmailNotification({ smtpVerificationDto }: {
    smtpVerificationDto: SmtpVerificationDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/notifications/test-email", oazapfts.json({
        ...opts,
        method: "POST",
        body: smtpVerificationDto
    })));
}
export function startOAuth({ oAuthConfigDto }: {
    oAuthConfigDto: OAuthConfigDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: OAuthAuthorizeResponseDto;
    }>("/oauth/authorize", oazapfts.json({
        ...opts,
        method: "POST",
        body: oAuthConfigDto
    })));
}
export function finishOAuth({ oAuthCallbackDto }: {
    oAuthCallbackDto: OAuthCallbackDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: LoginResponseDto;
    }>("/oauth/callback", oazapfts.json({
        ...opts,
        method: "POST",
        body: oAuthCallbackDto
    })));
}
export function linkOAuthAccount({ oAuthCallbackDto }: {
    oAuthCallbackDto: OAuthCallbackDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: UserAdminResponseDto;
    }>("/oauth/link", oazapfts.json({
        ...opts,
        method: "POST",
        body: oAuthCallbackDto
    })));
}
export function redirectOAuthToMobile(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/oauth/mobile-redirect", {
        ...opts
    }));
}
export function unlinkOAuthAccount(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: UserAdminResponseDto;
    }>("/oauth/unlink", {
        ...opts,
        method: "POST"
    }));
}
export function getPartners({ direction }: {
    direction: "shared-by" | "shared-with";
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PartnerResponseDto[];
    }>(`/partners${QS.query(QS.explode({
        direction
    }))}`, {
        ...opts
    }));
}
export function removePartner({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/partners/${encodeURIComponent(id)}`, {
        ...opts,
        method: "DELETE"
    }));
}
export function createPartner({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: PartnerResponseDto;
    }>(`/partners/${encodeURIComponent(id)}`, {
        ...opts,
        method: "POST"
    }));
}
export function updatePartner({ id, updatePartnerDto }: {
    id: string;
    updatePartnerDto: UpdatePartnerDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PartnerResponseDto;
    }>(`/partners/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: updatePartnerDto
    })));
}
export function getAllPeople({ withHidden }: {
    withHidden?: boolean;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PeopleResponseDto;
    }>(`/people${QS.query(QS.explode({
        withHidden
    }))}`, {
        ...opts
    }));
}
export function createPerson({ personCreateDto }: {
    personCreateDto: PersonCreateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: PersonResponseDto;
    }>("/people", oazapfts.json({
        ...opts,
        method: "POST",
        body: personCreateDto
    })));
}
export function updatePeople({ peopleUpdateDto }: {
    peopleUpdateDto: PeopleUpdateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: BulkIdResponseDto[];
    }>("/people", oazapfts.json({
        ...opts,
        method: "PUT",
        body: peopleUpdateDto
    })));
}
export function getPerson({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PersonResponseDto;
    }>(`/people/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
export function updatePerson({ id, personUpdateDto }: {
    id: string;
    personUpdateDto: PersonUpdateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PersonResponseDto;
    }>(`/people/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: personUpdateDto
    })));
}
export function getPersonAssets({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetResponseDto[];
    }>(`/people/${encodeURIComponent(id)}/assets`, {
        ...opts
    }));
}
export function mergePerson({ id, mergePersonDto }: {
    id: string;
    mergePersonDto: MergePersonDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: BulkIdResponseDto[];
    }>(`/people/${encodeURIComponent(id)}/merge`, oazapfts.json({
        ...opts,
        method: "POST",
        body: mergePersonDto
    })));
}
export function reassignFaces({ id, assetFaceUpdateDto }: {
    id: string;
    assetFaceUpdateDto: AssetFaceUpdateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PersonResponseDto[];
    }>(`/people/${encodeURIComponent(id)}/reassign`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: assetFaceUpdateDto
    })));
}
export function getPersonStatistics({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PersonStatisticsResponseDto;
    }>(`/people/${encodeURIComponent(id)}/statistics`, {
        ...opts
    }));
}
export function getPersonThumbnail({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchBlob<{
        status: 200;
        data: Blob;
    }>(`/people/${encodeURIComponent(id)}/thumbnail`, {
        ...opts
    }));
}
export function getAuditFiles(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: FileReportDto;
    }>("/reports", {
        ...opts
    }));
}
export function getFileChecksums({ fileChecksumDto }: {
    fileChecksumDto: FileChecksumDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: FileChecksumResponseDto[];
    }>("/reports/checksum", oazapfts.json({
        ...opts,
        method: "POST",
        body: fileChecksumDto
    })));
}
export function fixAuditFiles({ fileReportFixDto }: {
    fileReportFixDto: FileReportFixDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/reports/fix", oazapfts.json({
        ...opts,
        method: "POST",
        body: fileReportFixDto
    })));
}
export function getAssetsByCity(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetResponseDto[];
    }>("/search/cities", {
        ...opts
    }));
}
export function getExploreData(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SearchExploreResponseDto[];
    }>("/search/explore", {
        ...opts
    }));
}
export function searchMetadata({ metadataSearchDto }: {
    metadataSearchDto: MetadataSearchDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SearchResponseDto;
    }>("/search/metadata", oazapfts.json({
        ...opts,
        method: "POST",
        body: metadataSearchDto
    })));
}
export function searchPerson({ name, withHidden }: {
    name: string;
    withHidden?: boolean;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PersonResponseDto[];
    }>(`/search/person${QS.query(QS.explode({
        name,
        withHidden
    }))}`, {
        ...opts
    }));
}
export function searchPlaces({ name }: {
    name: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PlacesResponseDto[];
    }>(`/search/places${QS.query(QS.explode({
        name
    }))}`, {
        ...opts
    }));
}
export function searchSmart({ smartSearchDto }: {
    smartSearchDto: SmartSearchDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SearchResponseDto;
    }>("/search/smart", oazapfts.json({
        ...opts,
        method: "POST",
        body: smartSearchDto
    })));
}
export function getSearchSuggestions({ country, make, model, state, $type }: {
    country?: string;
    make?: string;
    model?: string;
    state?: string;
    $type: SearchSuggestionType;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: string[];
    }>(`/search/suggestions${QS.query(QS.explode({
        country,
        make,
        model,
        state,
        "type": $type
    }))}`, {
        ...opts
    }));
}
export function getServerConfig(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ServerConfigDto;
    }>("/server-info/config", {
        ...opts
    }));
}
export function getServerFeatures(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ServerFeaturesDto;
    }>("/server-info/features", {
        ...opts
    }));
}
export function getSupportedMediaTypes(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ServerMediaTypesResponseDto;
    }>("/server-info/media-types", {
        ...opts
    }));
}
export function pingServer(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ServerPingResponseRead;
    }>("/server-info/ping", {
        ...opts
    }));
}
export function getServerStatistics(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ServerStatsResponseDto;
    }>("/server-info/statistics", {
        ...opts
    }));
}
export function getStorage(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ServerStorageResponseDto;
    }>("/server-info/storage", {
        ...opts
    }));
}
export function getTheme(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ServerThemeDto;
    }>("/server-info/theme", {
        ...opts
    }));
}
export function getServerVersion(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ServerVersionResponseDto;
    }>("/server-info/version", {
        ...opts
    }));
}
export function deleteAllSessions(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/sessions", {
        ...opts,
        method: "DELETE"
    }));
}
export function getSessions(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SessionResponseDto[];
    }>("/sessions", {
        ...opts
    }));
}
export function deleteSession({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/sessions/${encodeURIComponent(id)}`, {
        ...opts,
        method: "DELETE"
    }));
}
export function getAllSharedLinks(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SharedLinkResponseDto[];
    }>("/shared-links", {
        ...opts
    }));
}
export function createSharedLink({ sharedLinkCreateDto }: {
    sharedLinkCreateDto: SharedLinkCreateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: SharedLinkResponseDto;
    }>("/shared-links", oazapfts.json({
        ...opts,
        method: "POST",
        body: sharedLinkCreateDto
    })));
}
export function getMySharedLink({ key, password, token }: {
    key?: string;
    password?: string;
    token?: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SharedLinkResponseDto;
    }>(`/shared-links/me${QS.query(QS.explode({
        key,
        password,
        token
    }))}`, {
        ...opts
    }));
}
export function removeSharedLink({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/shared-links/${encodeURIComponent(id)}`, {
        ...opts,
        method: "DELETE"
    }));
}
export function getSharedLinkById({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SharedLinkResponseDto;
    }>(`/shared-links/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
export function updateSharedLink({ id, sharedLinkEditDto }: {
    id: string;
    sharedLinkEditDto: SharedLinkEditDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SharedLinkResponseDto;
    }>(`/shared-links/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: sharedLinkEditDto
    })));
}
export function removeSharedLinkAssets({ id, key, assetIdsDto }: {
    id: string;
    key?: string;
    assetIdsDto: AssetIdsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetIdsResponseDto[];
    }>(`/shared-links/${encodeURIComponent(id)}/assets${QS.query(QS.explode({
        key
    }))}`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body: assetIdsDto
    })));
}
export function addSharedLinkAssets({ id, key, assetIdsDto }: {
    id: string;
    key?: string;
    assetIdsDto: AssetIdsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetIdsResponseDto[];
    }>(`/shared-links/${encodeURIComponent(id)}/assets${QS.query(QS.explode({
        key
    }))}`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: assetIdsDto
    })));
}
export function getDeltaSync({ assetDeltaSyncDto }: {
    assetDeltaSyncDto: AssetDeltaSyncDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetDeltaSyncResponseDto;
    }>("/sync/delta-sync", oazapfts.json({
        ...opts,
        method: "POST",
        body: assetDeltaSyncDto
    })));
}
export function getFullSyncForUser({ assetFullSyncDto }: {
    assetFullSyncDto: AssetFullSyncDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetResponseDto[];
    }>("/sync/full-sync", oazapfts.json({
        ...opts,
        method: "POST",
        body: assetFullSyncDto
    })));
}
export function getConfig(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SystemConfigDto;
    }>("/system-config", {
        ...opts
    }));
}
export function updateConfig({ systemConfigDto }: {
    systemConfigDto: SystemConfigDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SystemConfigDto;
    }>("/system-config", oazapfts.json({
        ...opts,
        method: "PUT",
        body: systemConfigDto
    })));
}
export function getConfigDefaults(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SystemConfigDto;
    }>("/system-config/defaults", {
        ...opts
    }));
}
export function getStorageTemplateOptions(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SystemConfigTemplateStorageOptionDto;
    }>("/system-config/storage-template-options", {
        ...opts
    }));
}
export function getAdminOnboarding(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AdminOnboardingUpdateDto;
    }>("/system-metadata/admin-onboarding", {
        ...opts
    }));
}
export function updateAdminOnboarding({ adminOnboardingUpdateDto }: {
    adminOnboardingUpdateDto: AdminOnboardingUpdateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/system-metadata/admin-onboarding", oazapfts.json({
        ...opts,
        method: "POST",
        body: adminOnboardingUpdateDto
    })));
}
export function getReverseGeocodingState(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ReverseGeocodingStateResponseDto;
    }>("/system-metadata/reverse-geocoding-state", {
        ...opts
    }));
}
export function getAllTags(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: TagResponseDto[];
    }>("/tags", {
        ...opts
    }));
}
export function createTag({ createTagDto }: {
    createTagDto: CreateTagDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: TagResponseDto;
    }>("/tags", oazapfts.json({
        ...opts,
        method: "POST",
        body: createTagDto
    })));
}
export function deleteTag({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/tags/${encodeURIComponent(id)}`, {
        ...opts,
        method: "DELETE"
    }));
}
export function getTagById({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: TagResponseDto;
    }>(`/tags/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
export function updateTag({ id, updateTagDto }: {
    id: string;
    updateTagDto: UpdateTagDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: TagResponseDto;
    }>(`/tags/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateTagDto
    })));
}
export function untagAssets({ id, assetIdsDto }: {
    id: string;
    assetIdsDto: AssetIdsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetIdsResponseDto[];
    }>(`/tags/${encodeURIComponent(id)}/assets`, oazapfts.json({
        ...opts,
        method: "DELETE",
        body: assetIdsDto
    })));
}
export function getTagAssets({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetResponseDto[];
    }>(`/tags/${encodeURIComponent(id)}/assets`, {
        ...opts
    }));
}
export function tagAssets({ id, assetIdsDto }: {
    id: string;
    assetIdsDto: AssetIdsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetIdsResponseDto[];
    }>(`/tags/${encodeURIComponent(id)}/assets`, oazapfts.json({
        ...opts,
        method: "PUT",
        body: assetIdsDto
    })));
}
export function getTimeBucket({ albumId, isArchived, isFavorite, isTrashed, key, order, personId, size, timeBucket, userId, withPartners, withStacked }: {
    albumId?: string;
    isArchived?: boolean;
    isFavorite?: boolean;
    isTrashed?: boolean;
    key?: string;
    order?: AssetOrder;
    personId?: string;
    size: TimeBucketSize;
    timeBucket: string;
    userId?: string;
    withPartners?: boolean;
    withStacked?: boolean;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AssetResponseDto[];
    }>(`/timeline/bucket${QS.query(QS.explode({
        albumId,
        isArchived,
        isFavorite,
        isTrashed,
        key,
        order,
        personId,
        size,
        timeBucket,
        userId,
        withPartners,
        withStacked
    }))}`, {
        ...opts
    }));
}
export function getTimeBuckets({ albumId, isArchived, isFavorite, isTrashed, key, order, personId, size, userId, withPartners, withStacked }: {
    albumId?: string;
    isArchived?: boolean;
    isFavorite?: boolean;
    isTrashed?: boolean;
    key?: string;
    order?: AssetOrder;
    personId?: string;
    size: TimeBucketSize;
    userId?: string;
    withPartners?: boolean;
    withStacked?: boolean;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: TimeBucketResponseDto[];
    }>(`/timeline/buckets${QS.query(QS.explode({
        albumId,
        isArchived,
        isFavorite,
        isTrashed,
        key,
        order,
        personId,
        size,
        userId,
        withPartners,
        withStacked
    }))}`, {
        ...opts
    }));
}
export function emptyTrash(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/trash/empty", {
        ...opts,
        method: "POST"
    }));
}
export function restoreTrash(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/trash/restore", {
        ...opts,
        method: "POST"
    }));
}
export function restoreAssets({ bulkIdsDto }: {
    bulkIdsDto: BulkIdsDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/trash/restore/assets", oazapfts.json({
        ...opts,
        method: "POST",
        body: bulkIdsDto
    })));
}
export function searchUsers(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserResponseDto[];
    }>("/users", {
        ...opts
    }));
}
export function getMyUser(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserAdminResponseDto;
    }>("/users/me", {
        ...opts
    }));
}
export function updateMyUser({ userUpdateMeDto }: {
    userUpdateMeDto: UserUpdateMeDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserAdminResponseDto;
    }>("/users/me", oazapfts.json({
        ...opts,
        method: "PUT",
        body: userUpdateMeDto
    })));
}
export function getMyPreferences(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserPreferencesResponseDto;
    }>("/users/me/preferences", {
        ...opts
    }));
}
export function updateMyPreferences({ userPreferencesUpdateDto }: {
    userPreferencesUpdateDto: UserPreferencesUpdateDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserPreferencesResponseDto;
    }>("/users/me/preferences", oazapfts.json({
        ...opts,
        method: "PUT",
        body: userPreferencesUpdateDto
    })));
}
export function deleteProfileImage(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/users/profile-image", {
        ...opts,
        method: "DELETE"
    }));
}
export function createProfileImage({ createProfileImageDto }: {
    createProfileImageDto: CreateProfileImageDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: CreateProfileImageResponseDto;
    }>("/users/profile-image", oazapfts.multipart({
        ...opts,
        method: "POST",
        body: createProfileImageDto
    })));
}
export function getUser({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserResponseDto;
    }>(`/users/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
export function getProfileImage({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchBlob<{
        status: 200;
        data: Blob;
    }>(`/users/${encodeURIComponent(id)}/profile-image`, {
        ...opts
    }));
}
export enum ReactionLevel {
    Album = "album",
    Asset = "asset"
}
export enum ReactionType {
    Comment = "comment",
    Like = "like"
}
export enum Type {
    Comment = "comment",
    Like = "like"
}
export enum UserAvatarColor {
    Primary = "primary",
    Pink = "pink",
    Red = "red",
    Yellow = "yellow",
    Blue = "blue",
    Green = "green",
    Purple = "purple",
    Orange = "orange",
    Gray = "gray",
    Amber = "amber"
}
export enum UserStatus {
    Active = "active",
    Removing = "removing",
    Deleted = "deleted"
}
export enum AlbumUserRole {
    Editor = "editor",
    Viewer = "viewer"
}
export enum TagTypeEnum {
    Object = "OBJECT",
    Face = "FACE",
    Custom = "CUSTOM"
}
export enum AssetTypeEnum {
    Image = "IMAGE",
    Video = "VIDEO",
    Audio = "AUDIO",
    Other = "OTHER"
}
export enum AssetOrder {
    Asc = "asc",
    Desc = "desc"
}
export enum Error {
    Duplicate = "duplicate",
    NoPermission = "no_permission",
    NotFound = "not_found",
    Unknown = "unknown"
}
export enum AssetMediaStatus {
    Created = "created",
    Replaced = "replaced",
    Duplicate = "duplicate"
}
export enum Action {
    Accept = "accept",
    Reject = "reject"
}
export enum Reason {
    Duplicate = "duplicate",
    UnsupportedFormat = "unsupported-format"
}
export enum AssetJobName {
    RegenerateThumbnail = "regenerate-thumbnail",
    RefreshMetadata = "refresh-metadata",
    TranscodeVideo = "transcode-video"
}
export enum AssetMediaSize {
    Preview = "preview",
    Thumbnail = "thumbnail"
}
export enum EntityType {
    Asset = "ASSET",
    Album = "ALBUM"
}
export enum JobName {
    ThumbnailGeneration = "thumbnailGeneration",
    MetadataExtraction = "metadataExtraction",
    VideoConversion = "videoConversion",
    FaceDetection = "faceDetection",
    FacialRecognition = "facialRecognition",
    SmartSearch = "smartSearch",
    DuplicateDetection = "duplicateDetection",
    BackgroundTask = "backgroundTask",
    StorageTemplateMigration = "storageTemplateMigration",
    Migration = "migration",
    Search = "search",
    Sidecar = "sidecar",
    Library = "library",
    Notifications = "notifications"
}
export enum JobCommand {
    Start = "start",
    Pause = "pause",
    Resume = "resume",
    Empty = "empty",
    ClearFailed = "clear-failed"
}
export enum MapTheme {
    Light = "light",
    Dark = "dark"
}
export enum Type2 {
    OnThisDay = "on_this_day"
}
export enum MemoryType {
    OnThisDay = "on_this_day"
}
export enum PathEntityType {
    Asset = "asset",
    Person = "person",
    User = "user"
}
export enum PathType {
    Original = "original",
    Preview = "preview",
    Thumbnail = "thumbnail",
    EncodedVideo = "encoded_video",
    Sidecar = "sidecar",
    Face = "face",
    Profile = "profile"
}
export enum SearchSuggestionType {
    Country = "country",
    State = "state",
    City = "city",
    CameraMake = "camera-make",
    CameraModel = "camera-model"
}
export enum SharedLinkType {
    Album = "ALBUM",
    Individual = "INDIVIDUAL"
}
export enum Error2 {
    Duplicate = "duplicate",
    NoPermission = "no_permission",
    NotFound = "not_found"
}
export enum TranscodeHWAccel {
    Nvenc = "nvenc",
    Qsv = "qsv",
    Vaapi = "vaapi",
    Rkmpp = "rkmpp",
    Disabled = "disabled"
}
export enum AudioCodec {
    Mp3 = "mp3",
    Aac = "aac",
    Libopus = "libopus"
}
export enum VideoCodec {
    H264 = "h264",
    Hevc = "hevc",
    Vp9 = "vp9",
    Av1 = "av1"
}
export enum CQMode {
    Auto = "auto",
    Cqp = "cqp",
    Icq = "icq"
}
export enum ToneMapping {
    Hable = "hable",
    Mobius = "mobius",
    Reinhard = "reinhard",
    Disabled = "disabled"
}
export enum TranscodePolicy {
    All = "all",
    Optimal = "optimal",
    Bitrate = "bitrate",
    Required = "required",
    Disabled = "disabled"
}
export enum Colorspace {
    Srgb = "srgb",
    P3 = "p3"
}
export enum ImageFormat {
    Jpeg = "jpeg",
    Webp = "webp"
}
export enum LogLevel {
    Verbose = "verbose",
    Debug = "debug",
    Log = "log",
    Warn = "warn",
    Error = "error",
    Fatal = "fatal"
}
export enum CLIPMode {
    Vision = "vision",
    Text = "text"
}
export enum ModelType {
    FacialRecognition = "facial-recognition",
    Clip = "clip"
}
export enum TimeBucketSize {
    Day = "DAY",
    Month = "MONTH"
}
