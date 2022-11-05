import 'package:flutter/foundation.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/modules/home/services/asset.service.dart';
import 'package:immich_mobile/modules/home/services/asset_cache.service.dart';
import 'package:immich_mobile/shared/models/asset.dart';
import 'package:immich_mobile/shared/services/device_info.service.dart';
import 'package:collection/collection.dart';
import 'package:intl/intl.dart';
import 'package:openapi/api.dart';
import 'package:photo_manager/photo_manager.dart';

class AssetNotifier extends StateNotifier<List<Asset>> {
  final AssetService _assetService;
  final AssetCacheService _assetCacheService;

  final DeviceInfoService _deviceInfoService = DeviceInfoService();

  AssetNotifier(this._assetService, this._assetCacheService) : super([]);

  _cacheState() {
    _assetCacheService.put(state);
  }

  getAllAsset() async {
    final stopwatch = Stopwatch();

    if (await _assetCacheService.isValid() && state.isEmpty) {
      stopwatch.start();
      state = await _assetCacheService.get();
      debugPrint(
          "Reading assets from cache: ${stopwatch.elapsedMilliseconds}ms");
      stopwatch.reset();
    }

    stopwatch.start();
    var allAssets = await _assetService.getAllAsset();
    debugPrint("Query assets from API: ${stopwatch.elapsedMilliseconds}ms");
    stopwatch.reset();

    state = allAssets;

    stopwatch.start();
    _cacheState();
    debugPrint("Store assets in cache: ${stopwatch.elapsedMilliseconds}ms");
    stopwatch.reset();
  }

  clearAllAsset() {
    state = [];
    _cacheState();
  }

  onNewAssetUploaded(AssetResponseDto newAsset) {
    state = [...state, Asset.remote(newAsset)];
    _cacheState();
  }

  deleteAssets(Set<Asset> deleteAssets) async {
    var deviceInfo = await _deviceInfoService.getDeviceInfo();
    var deviceId = deviceInfo["deviceId"];
    var deleteIdList = <String>[];
    // Delete asset from device
    for (var asset in deleteAssets) {
      // Delete asset on device if present
      if (asset.deviceId == deviceId) {
        var localAsset = await AssetEntity.fromId(asset.deviceAssetId);

        if (localAsset != null) {
          deleteIdList.add(localAsset.id);
        }
      }
    }

    try {
      await PhotoManager.editor.deleteWithIds(deleteIdList);
    } catch (e) {
      debugPrint("Delete asset from device failed: $e");
    }

    // Delete asset on server
    List<DeleteAssetResponseDto>? deleteAssetResult =
        await _assetService.deleteAssets(deleteAssets
            .where((e) => e.isRemote)
            .map((e) => e.remote!)
            .toSet());

    if (deleteAssetResult == null) {
      return;
    }

    for (var asset in deleteAssetResult) {
      if (asset.status == DeleteAssetStatus.SUCCESS) {
        state =
            state.where((immichAsset) => immichAsset.id != asset.id).toList();
      }
    }

    _cacheState();
  }
}

final assetProvider = StateNotifierProvider<AssetNotifier, List<Asset>>((ref) {
  return AssetNotifier(
      ref.watch(assetServiceProvider), ref.watch(assetCacheServiceProvider));
});

final assetGroupByDateTimeProvider = StateProvider((ref) {
  var assets = ref.watch(assetProvider);

  assets.sortByCompare<DateTime>(
    (e) => e.createdAt,
    (a, b) => b.compareTo(a),
  );
  return assets.groupListsBy(
    (element) => DateFormat('y-MM-dd').format(element.createdAt.toLocal()),
  );
});

final assetGroupByMonthYearProvider = StateProvider((ref) {
  var assets = ref.watch(assetProvider);

  // TODO: remove once temporary workaround is no longer needed (to only allow remote assets to be added to album)
  assets = assets.where((e) => e.isRemote).toList();

  assets.sortByCompare<DateTime>(
    (e) => e.createdAt,
    (a, b) => b.compareTo(a),
  );

  return assets.groupListsBy(
    (element) => DateFormat('MMMM, y').format(element.createdAt.toLocal()),
  );
});
