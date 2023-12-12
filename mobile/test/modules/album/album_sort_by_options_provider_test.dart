import 'package:collection/collection.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/modules/album/providers/album_sort_by_options.provider.dart';
import 'package:immich_mobile/modules/settings/providers/app_settings.provider.dart';
import 'package:immich_mobile/modules/settings/services/app_settings.service.dart';
import 'package:immich_mobile/shared/models/album.dart';
import 'package:immich_mobile/shared/models/asset.dart';
import 'package:isar/isar.dart';
import 'package:mocktail/mocktail.dart';

import '../../fixtures/album.stub.dart';
import '../../fixtures/asset.stub.dart';
import '../../test_utils.dart';
import '../settings/settings_mocks.dart';

void main() {
  /// Verify the sort modes
  group("AlbumSortMode", () {
    late final Isar db;

    setUpAll(() async {
      db = await TestUtils.initIsar();
    });

    final albums = [
      AlbumStub.emptyAlbum,
      AlbumStub.sharedWithUser,
      AlbumStub.oneAsset,
      AlbumStub.twoAsset,
    ];

    setUp(() {
      db.writeTxnSync(() {
        db.clearSync();
        // Save all assets
        db.assets.putAllSync([AssetStub.image1, AssetStub.image2]);
        db.albums.putAllSync(albums);
        for (final album in albums) {
          album.sharedUsers.saveSync();
          album.assets.saveSync();
        }
      });
      expect(4, db.albums.countSync());
      expect(2, db.assets.countSync());
    });

    group("Album sort - Created Time", () {
      const created = AlbumSortMode.created;
      test("Created time - ASC", () {
        final sorted = created.sortFn(albums, false);
        expect(sorted.isSortedBy((a) => a.createdAt), true);
      });

      test("Created time - DESC", () {
        final sorted = created.sortFn(albums, true);
        expect(
          sorted.isSorted((b, a) => a.createdAt.compareTo(b.createdAt)),
          true,
        );
      });
    });

    group("Album sort - Asset count", () {
      const assetCount = AlbumSortMode.assetCount;
      test("Asset Count - ASC", () {
        final sorted = assetCount.sortFn(albums, false);
        expect(
          sorted.isSorted((a, b) => a.assetCount.compareTo(b.assetCount)),
          true,
        );
      });

      test("Asset Count - DESC", () {
        final sorted = assetCount.sortFn(albums, true);
        expect(
          sorted.isSorted((b, a) => a.assetCount.compareTo(b.assetCount)),
          true,
        );
      });
    });

    group("Album sort - Last modified", () {
      const lastModified = AlbumSortMode.lastModified;
      test("Last modified - ASC", () {
        final sorted = lastModified.sortFn(albums, false);
        expect(
          sorted.isSorted((a, b) => a.modifiedAt.compareTo(b.modifiedAt)),
          true,
        );
      });

      test("Last modified - DESC", () {
        final sorted = lastModified.sortFn(albums, true);
        expect(
          sorted.isSorted((b, a) => a.modifiedAt.compareTo(b.modifiedAt)),
          true,
        );
      });
    });

    group("Album sort - Created", () {
      const created = AlbumSortMode.created;
      test("Created - ASC", () {
        final sorted = created.sortFn(albums, false);
        expect(
          sorted.isSorted((a, b) => a.createdAt.compareTo(b.createdAt)),
          true,
        );
      });

      test("Created - DESC", () {
        final sorted = created.sortFn(albums, true);
        expect(
          sorted.isSorted((b, a) => a.createdAt.compareTo(b.createdAt)),
          true,
        );
      });
    });

    group("Album sort - Most Recent", () {
      const mostRecent = AlbumSortMode.mostRecent;

      test("Most Recent - ASC", () {
        final sorted = mostRecent.sortFn(albums, false);
        expect(
          sorted,
          [
            AlbumStub.sharedWithUser,
            AlbumStub.twoAsset,
            AlbumStub.oneAsset,
            AlbumStub.emptyAlbum,
          ],
        );
      });

      test("Most Recent - DESC", () {
        final sorted = mostRecent.sortFn(albums, true);
        expect(
          sorted,
          [
            AlbumStub.emptyAlbum,
            AlbumStub.oneAsset,
            AlbumStub.twoAsset,
            AlbumStub.sharedWithUser,
          ],
        );
      });
    });

    group("Album sort - Most Oldest", () {
      const mostOldest = AlbumSortMode.mostOldest;

      test("Most Oldest - ASC", () {
        final sorted = mostOldest.sortFn(albums, false);
        expect(
          sorted,
          [
            AlbumStub.twoAsset,
            AlbumStub.emptyAlbum,
            AlbumStub.oneAsset,
            AlbumStub.sharedWithUser,
          ],
        );
      });

      test("Most Oldest - DESC", () {
        final sorted = mostOldest.sortFn(albums, true);
        expect(
          sorted,
          [
            AlbumStub.sharedWithUser,
            AlbumStub.oneAsset,
            AlbumStub.emptyAlbum,
            AlbumStub.twoAsset,
          ],
        );
      });
    });
  });

  /// Verify the sort mode provider
  group('AlbumSortByOptions', () {
    late AppSettingsService settingsMock;
    late ProviderContainer container;

    setUp(() async {
      settingsMock = AppSettingsServiceMock();
      container = TestUtils.createContainer(
        overrides: [
          appSettingsServiceProvider.overrideWith((ref) => settingsMock),
        ],
      );
    });

    test('Returns the default sort mode when none set', () {
      // Returns the default value when nothing is set
      when(
        () => settingsMock.getSetting(AppSettingsEnum.selectedAlbumSortOrder),
      ).thenReturn(0);

      expect(container.read(albumSortByOptionsProvider), AlbumSortMode.created);
    });

    test('Returns the correct sort mode with index from Store', () {
      // Returns the default value when nothing is set
      when(
        () => settingsMock.getSetting(AppSettingsEnum.selectedAlbumSortOrder),
      ).thenReturn(3);

      expect(
        container.read(albumSortByOptionsProvider),
        AlbumSortMode.lastModified,
      );
    });

    test('Properly saves the correct store index of sort mode', () {
      container
          .read(albumSortByOptionsProvider.notifier)
          .changeSortMode(AlbumSortMode.mostOldest);

      verify(
        () => settingsMock.setSetting(
          AppSettingsEnum.selectedAlbumSortOrder,
          AlbumSortMode.mostOldest.storeIndex,
        ),
      );
    });

    test('Notifies listeners on state change', () {
      when(
        () => settingsMock.getSetting(AppSettingsEnum.selectedAlbumSortOrder),
      ).thenReturn(0);

      final listener = ListenerMock<AlbumSortMode>();
      container.listen(
        albumSortByOptionsProvider,
        listener,
        fireImmediately: true,
      );

      // Created -> Most Oldest
      container
          .read(albumSortByOptionsProvider.notifier)
          .changeSortMode(AlbumSortMode.mostOldest);

      // Most Oldest -> Title
      container
          .read(albumSortByOptionsProvider.notifier)
          .changeSortMode(AlbumSortMode.title);

      verifyInOrder([
        () => listener.call(null, AlbumSortMode.created),
        () => listener.call(AlbumSortMode.created, AlbumSortMode.mostOldest),
        () => listener.call(AlbumSortMode.mostOldest, AlbumSortMode.title),
      ]);

      verifyNoMoreInteractions(listener);
    });
  });

  /// Verify the sort order provider
  group('AlbumSortOrder', () {
    late AppSettingsService settingsMock;
    late ProviderContainer container;

    setUp(() async {
      settingsMock = AppSettingsServiceMock();
      container = TestUtils.createContainer(
        overrides: [
          appSettingsServiceProvider.overrideWith((ref) => settingsMock),
        ],
      );
    });

    test('Returns the default sort order when none set - false', () {
      when(
        () => settingsMock.getSetting(AppSettingsEnum.selectedAlbumSortReverse),
      ).thenReturn(false);

      expect(container.read(albumSortOrderProvider), false);
    });

    test('Properly saves the correct order', () {
      container.read(albumSortOrderProvider.notifier).changeSortDirection(true);

      verify(
        () => settingsMock.setSetting(
          AppSettingsEnum.selectedAlbumSortReverse,
          true,
        ),
      );
    });

    test('Notifies listeners on state change', () {
      when(
        () => settingsMock.getSetting(AppSettingsEnum.selectedAlbumSortReverse),
      ).thenReturn(false);

      final listener = ListenerMock<bool>();
      container.listen(
        albumSortOrderProvider,
        listener,
        fireImmediately: true,
      );

      // false -> true
      container.read(albumSortOrderProvider.notifier).changeSortDirection(true);

      // true -> false
      container
          .read(albumSortOrderProvider.notifier)
          .changeSortDirection(false);

      verifyInOrder([
        () => listener.call(null, false),
        () => listener.call(false, true),
        () => listener.call(true, false),
      ]);

      verifyNoMoreInteractions(listener);
    });
  });
}
