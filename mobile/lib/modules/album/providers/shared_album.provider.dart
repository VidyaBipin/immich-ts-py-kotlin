import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/modules/album/services/album.service.dart';
import 'package:immich_mobile/modules/home/ui/asset_grid/asset_grid_data_structure.dart';
import 'package:immich_mobile/shared/models/album.dart';
import 'package:immich_mobile/shared/models/asset.dart';
import 'package:immich_mobile/shared/models/user.dart';
import 'package:immich_mobile/shared/providers/db.provider.dart';
import 'package:isar/isar.dart';

class SharedAlbumNotifier extends StateNotifier<List<Album>> {
  SharedAlbumNotifier(this._albumService, Isar db) : super([]) {
    final query = db.albums.filter().sharedEqualTo(true).sortByCreatedAtDesc();
    query.findAll().then((value) => state = value);
    query.watch().listen((data) => state = data);
  }

  final AlbumService _albumService;

  Future<Album?> createSharedAlbum(
    String albumName,
    Iterable<Asset> assets,
    Iterable<User> sharedUsers,
  ) async {
    try {
      return await _albumService.createAlbum(
        albumName,
        assets,
        sharedUsers,
      );
    } catch (e) {
      debugPrint("Error createSharedAlbum  ${e.toString()}");
    }
    return null;
  }

  Future<void> getAllSharedAlbums() =>
      _albumService.refreshRemoteAlbums(isShared: true);

  Future<bool> deleteAlbum(Album album) => _albumService.deleteAlbum(album);

  Future<bool> leaveAlbum(Album album) async {
    var res = await _albumService.leaveAlbum(album);

    if (res) {
      await deleteAlbum(album);
      return true;
    } else {
      return false;
    }
  }

  Future<bool> removeAssetFromAlbum(Album album, Iterable<Asset> assets) {
    return _albumService.removeAssetFromAlbum(album, assets);
  }
}

final sharedAlbumProvider =
    StateNotifierProvider<SharedAlbumNotifier, List<Album>>((ref) {
  return SharedAlbumNotifier(
    ref.watch(albumServiceProvider),
    ref.watch(dbProvider),
  );
});

final sharedAlbumDetailProvider =
    FutureProvider.autoDispose.family<Album, int>((ref, albumId) async {
  final AlbumService sharedAlbumService = ref.watch(albumServiceProvider);

  final Album? a = await sharedAlbumService.getAlbumDetail(albumId);
  if (a == null) {
    throw Exception("Album with ID=$albumId does not exist anymore!");
  }
  await a.loadRenderList(GroupAssetsBy.none);
  return a;
});
