import 'package:flutter_cache_manager/flutter_cache_manager.dart';

/// The cache manager for full size images [ImmichRemoteThumbnailProvider]
class ThumbnailImageCacheManager extends CacheManager with ImageCacheManager {
  static const key = 'thumbnailImageCacheKey';
  static final ThumbnailImageCacheManager _instance =
      ThumbnailImageCacheManager._();

  factory ThumbnailImageCacheManager() {
    return _instance;
  }

  ThumbnailImageCacheManager._()
      : super(
          Config(
            key,
            maxNrOfCacheObjects: 5000,
            stalePeriod: const Duration(days: 30),
          ),
        );
}
