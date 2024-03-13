import 'dart:async';
import 'dart:io';
import 'dart:ui' as ui;

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:openapi/api.dart' as api;

import 'package:flutter/foundation.dart';
import 'package:flutter/painting.dart';
import 'package:immich_mobile/modules/settings/services/app_settings.service.dart';
import 'package:immich_mobile/shared/models/asset.dart';
import 'package:immich_mobile/shared/models/store.dart';
import 'package:immich_mobile/utils/image_url_builder.dart';

/// Our Image Provider HTTP client to make the request
final _httpClient = HttpClient()
  ..autoUncompress = false
  ..maxConnectionsPerHost = 10;

/// The remote image provider for full size remote images
class ImmichRemoteImageProvider
    extends ImageProvider<ImmichRemoteImageProvider> {
  /// The [Asset.remoteId] of the asset to fetch
  final String assetId;

  final BaseCacheManager? cacheManager;

  ImmichRemoteImageProvider({
    required this.assetId,
    this.cacheManager,
  });

  /// Converts an [ImageProvider]'s settings plus an [ImageConfiguration] to a key
  /// that describes the precise image to load.
  @override
  Future<ImmichRemoteImageProvider> obtainKey(
    ImageConfiguration configuration,
  ) {
    return SynchronousFuture(this);
  }

  @override
  ImageStreamCompleter loadImage(
    ImmichRemoteImageProvider key,
    ImageDecoderCallback decode,
  ) {
    final chunkEvents = StreamController<ImageChunkEvent>();
    return MultiImageStreamCompleter(
      codec: _codec(key, decode, chunkEvents),
      scale: 1.0,
      chunkEvents: chunkEvents.stream,
    );
  }

  /// Whether to show the original file or load a compressed version
  bool get _useOriginal => Store.get(
        AppSettingsEnum.loadOriginal.storeKey,
        AppSettingsEnum.loadOriginal.defaultValue,
      );

  /// Whether to load the preview thumbnail first or not
  bool get _loadPreview => Store.get(
        AppSettingsEnum.loadPreview.storeKey,
        AppSettingsEnum.loadPreview.defaultValue,
      );

  // Streams in each stage of the image as we ask for it
  Stream<ui.Codec> _codec(
    ImmichRemoteImageProvider key,
    ImageDecoderCallback decode,
    StreamController<ImageChunkEvent> chunkEvents,
  ) async* {
    // Load a preview to the chunk events
    if (_loadPreview) {
      final preview = getThumbnailUrlForRemoteId(
        key.assetId,
        type: api.ThumbnailFormat.WEBP,
      );

      yield await _loadFromUri(
        Uri.parse(preview),
        decode,
        chunkEvents,
      );
    }

    // Load the higher resolution version of the image
    final url = getThumbnailUrlForRemoteId(
      key.assetId,
      type: api.ThumbnailFormat.JPEG,
    );
    final codec = await _loadFromUri(Uri.parse(url), decode, chunkEvents);
    yield codec;

    // Load the final remote image
    if (_useOriginal) {
      // Load the original image
      final url = getImageUrlFromId(key.assetId);
      final codec = await _loadFromUri(Uri.parse(url), decode, chunkEvents);
      yield codec;
    }
    await chunkEvents.close();
  }

  // Loads the codec from the URI and sends the events to the [chunkEvents] stream
  Future<ui.Codec> _loadFromUri(
    Uri uri,
    ImageDecoderCallback decode,
    StreamController<ImageChunkEvent> chunkEvents,
  ) async {
    final request = await _httpClient.getUrl(uri);
    request.headers.add(
      'x-immich-user-token',
      Store.get(StoreKey.accessToken),
    );
    final response = await request.close();
    // Chunks of the completed image can be shown
    final data = await consolidateHttpClientResponseBytes(
      response,
      onBytesReceived: (cumulative, total) {
        chunkEvents.add(
          ImageChunkEvent(
            cumulativeBytesLoaded: cumulative,
            expectedTotalBytes: total,
          ),
        );
      },
    );

    // Decode the response
    final buffer = await ui.ImmutableBuffer.fromUint8List(data);
    return decode(buffer);
  }

  @override
  bool operator ==(Object other) {
    if (other is! ImmichRemoteImageProvider) return false;
    if (identical(this, other)) return true;
    return assetId == other.assetId;
  }

  @override
  int get hashCode => assetId.hashCode;
}
