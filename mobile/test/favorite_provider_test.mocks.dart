// Mocks generated by Mockito 5.3.2 from annotations
// in immich_mobile/test/favorite_provider_test.dart.
// Do not manually edit this file.

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'dart:async' as _i5;

import 'package:hooks_riverpod/hooks_riverpod.dart' as _i7;
import 'package:immich_mobile/modules/favorite/providers/favorite_provider.dart'
    as _i9;
import 'package:immich_mobile/modules/home/ui/asset_grid/asset_grid_data_structure.dart'
    as _i6;
import 'package:immich_mobile/shared/models/asset.dart' as _i4;
import 'package:immich_mobile/shared/providers/asset.provider.dart' as _i2;
import 'package:logging/logging.dart' as _i3;
import 'package:mockito/mockito.dart' as _i1;
import 'package:state_notifier/state_notifier.dart' as _i8;

// ignore_for_file: type=lint
// ignore_for_file: avoid_redundant_argument_values
// ignore_for_file: avoid_setters_without_getters
// ignore_for_file: comment_references
// ignore_for_file: implementation_imports
// ignore_for_file: invalid_use_of_visible_for_testing_member
// ignore_for_file: prefer_const_constructors
// ignore_for_file: unnecessary_parenthesis
// ignore_for_file: camel_case_types
// ignore_for_file: subtype_of_sealed_class

class _FakeAssetsState_0 extends _i1.SmartFake implements _i2.AssetsState {
  _FakeAssetsState_0(
    Object parent,
    Invocation parentInvocation,
  ) : super(
          parent,
          parentInvocation,
        );
}

class _FakeLogger_1 extends _i1.SmartFake implements _i3.Logger {
  _FakeLogger_1(
    Object parent,
    Invocation parentInvocation,
  ) : super(
          parent,
          parentInvocation,
        );
}

class _FakeAssetNotifier_2 extends _i1.SmartFake implements _i2.AssetNotifier {
  _FakeAssetNotifier_2(
    Object parent,
    Invocation parentInvocation,
  ) : super(
          parent,
          parentInvocation,
        );
}

/// A class which mocks [AssetsState].
///
/// See the documentation for Mockito's code generation for more information.
class MockAssetsState extends _i1.Mock implements _i2.AssetsState {
  @override
  List<_i4.Asset> get allAssets => (super.noSuchMethod(
        Invocation.getter(#allAssets),
        returnValue: <_i4.Asset>[],
        returnValueForMissingStub: <_i4.Asset>[],
      ) as List<_i4.Asset>);
  @override
  _i5.Future<_i2.AssetsState> withRenderDataStructure(
          _i6.AssetGridLayoutParameters? layout) =>
      (super.noSuchMethod(
        Invocation.method(
          #withRenderDataStructure,
          [layout],
        ),
        returnValue: _i5.Future<_i2.AssetsState>.value(_FakeAssetsState_0(
          this,
          Invocation.method(
            #withRenderDataStructure,
            [layout],
          ),
        )),
        returnValueForMissingStub:
            _i5.Future<_i2.AssetsState>.value(_FakeAssetsState_0(
          this,
          Invocation.method(
            #withRenderDataStructure,
            [layout],
          ),
        )),
      ) as _i5.Future<_i2.AssetsState>);
  @override
  _i2.AssetsState withAdditionalAssets(List<_i4.Asset>? toAdd) =>
      (super.noSuchMethod(
        Invocation.method(
          #withAdditionalAssets,
          [toAdd],
        ),
        returnValue: _FakeAssetsState_0(
          this,
          Invocation.method(
            #withAdditionalAssets,
            [toAdd],
          ),
        ),
        returnValueForMissingStub: _FakeAssetsState_0(
          this,
          Invocation.method(
            #withAdditionalAssets,
            [toAdd],
          ),
        ),
      ) as _i2.AssetsState);
}

/// A class which mocks [AssetNotifier].
///
/// See the documentation for Mockito's code generation for more information.
class MockAssetNotifier extends _i1.Mock implements _i2.AssetNotifier {
  @override
  _i3.Logger get log => (super.noSuchMethod(
        Invocation.getter(#log),
        returnValue: _FakeLogger_1(
          this,
          Invocation.getter(#log),
        ),
        returnValueForMissingStub: _FakeLogger_1(
          this,
          Invocation.getter(#log),
        ),
      ) as _i3.Logger);
  @override
  set onError(_i7.ErrorListener? _onError) => super.noSuchMethod(
        Invocation.setter(
          #onError,
          _onError,
        ),
        returnValueForMissingStub: null,
      );
  @override
  bool get mounted => (super.noSuchMethod(
        Invocation.getter(#mounted),
        returnValue: false,
        returnValueForMissingStub: false,
      ) as bool);
  @override
  _i5.Stream<_i2.AssetsState> get stream => (super.noSuchMethod(
        Invocation.getter(#stream),
        returnValue: _i5.Stream<_i2.AssetsState>.empty(),
        returnValueForMissingStub: _i5.Stream<_i2.AssetsState>.empty(),
      ) as _i5.Stream<_i2.AssetsState>);
  @override
  _i2.AssetsState get state => (super.noSuchMethod(
        Invocation.getter(#state),
        returnValue: _FakeAssetsState_0(
          this,
          Invocation.getter(#state),
        ),
        returnValueForMissingStub: _FakeAssetsState_0(
          this,
          Invocation.getter(#state),
        ),
      ) as _i2.AssetsState);
  @override
  set state(_i2.AssetsState? value) => super.noSuchMethod(
        Invocation.setter(
          #state,
          value,
        ),
        returnValueForMissingStub: null,
      );
  @override
  _i2.AssetsState get debugState => (super.noSuchMethod(
        Invocation.getter(#debugState),
        returnValue: _FakeAssetsState_0(
          this,
          Invocation.getter(#debugState),
        ),
        returnValueForMissingStub: _FakeAssetsState_0(
          this,
          Invocation.getter(#debugState),
        ),
      ) as _i2.AssetsState);
  @override
  bool get hasListeners => (super.noSuchMethod(
        Invocation.getter(#hasListeners),
        returnValue: false,
        returnValueForMissingStub: false,
      ) as bool);
  @override
  _i5.Future<void> rebuildAssetGridDataStructure() => (super.noSuchMethod(
        Invocation.method(
          #rebuildAssetGridDataStructure,
          [],
        ),
        returnValue: _i5.Future<void>.value(),
        returnValueForMissingStub: _i5.Future<void>.value(),
      ) as _i5.Future<void>);
  @override
  void onNewAssetUploaded(_i4.Asset? newAsset) => super.noSuchMethod(
        Invocation.method(
          #onNewAssetUploaded,
          [newAsset],
        ),
        returnValueForMissingStub: null,
      );
  @override
  dynamic deleteAssets(Set<_i4.Asset>? deleteAssets) => super.noSuchMethod(
        Invocation.method(
          #deleteAssets,
          [deleteAssets],
        ),
        returnValueForMissingStub: null,
      );
  @override
  _i5.Future<bool> toggleFavorite(
    _i4.Asset? asset,
    bool? status,
  ) =>
      (super.noSuchMethod(
        Invocation.method(
          #toggleFavorite,
          [
            asset,
            status,
          ],
        ),
        returnValue: _i5.Future<bool>.value(false),
        returnValueForMissingStub: _i5.Future<bool>.value(false),
      ) as _i5.Future<bool>);
  @override
  bool updateShouldNotify(
    _i2.AssetsState? old,
    _i2.AssetsState? current,
  ) =>
      (super.noSuchMethod(
        Invocation.method(
          #updateShouldNotify,
          [
            old,
            current,
          ],
        ),
        returnValue: false,
        returnValueForMissingStub: false,
      ) as bool);
  @override
  _i7.RemoveListener addListener(
    _i8.Listener<_i2.AssetsState>? listener, {
    bool? fireImmediately = true,
  }) =>
      (super.noSuchMethod(
        Invocation.method(
          #addListener,
          [listener],
          {#fireImmediately: fireImmediately},
        ),
        returnValue: () {},
        returnValueForMissingStub: () {},
      ) as _i7.RemoveListener);
  @override
  void dispose() => super.noSuchMethod(
        Invocation.method(
          #dispose,
          [],
        ),
        returnValueForMissingStub: null,
      );
}

/// A class which mocks [FavoriteSelectionNotifier].
///
/// See the documentation for Mockito's code generation for more information.
class MockFavoriteSelectionNotifier extends _i1.Mock
    implements _i9.FavoriteSelectionNotifier {
  @override
  _i2.AssetsState get assetsState => (super.noSuchMethod(
        Invocation.getter(#assetsState),
        returnValue: _FakeAssetsState_0(
          this,
          Invocation.getter(#assetsState),
        ),
        returnValueForMissingStub: _FakeAssetsState_0(
          this,
          Invocation.getter(#assetsState),
        ),
      ) as _i2.AssetsState);
  @override
  _i2.AssetNotifier get assetNotifier => (super.noSuchMethod(
        Invocation.getter(#assetNotifier),
        returnValue: _FakeAssetNotifier_2(
          this,
          Invocation.getter(#assetNotifier),
        ),
        returnValueForMissingStub: _FakeAssetNotifier_2(
          this,
          Invocation.getter(#assetNotifier),
        ),
      ) as _i2.AssetNotifier);
  @override
  set onError(_i7.ErrorListener? _onError) => super.noSuchMethod(
        Invocation.setter(
          #onError,
          _onError,
        ),
        returnValueForMissingStub: null,
      );
  @override
  bool get mounted => (super.noSuchMethod(
        Invocation.getter(#mounted),
        returnValue: false,
        returnValueForMissingStub: false,
      ) as bool);
  @override
  _i5.Stream<Set<String>> get stream => (super.noSuchMethod(
        Invocation.getter(#stream),
        returnValue: _i5.Stream<Set<String>>.empty(),
        returnValueForMissingStub: _i5.Stream<Set<String>>.empty(),
      ) as _i5.Stream<Set<String>>);
  @override
  Set<String> get state => (super.noSuchMethod(
        Invocation.getter(#state),
        returnValue: <String>{},
        returnValueForMissingStub: <String>{},
      ) as Set<String>);
  @override
  set state(Set<String>? value) => super.noSuchMethod(
        Invocation.setter(
          #state,
          value,
        ),
        returnValueForMissingStub: null,
      );
  @override
  Set<String> get debugState => (super.noSuchMethod(
        Invocation.getter(#debugState),
        returnValue: <String>{},
        returnValueForMissingStub: <String>{},
      ) as Set<String>);
  @override
  bool get hasListeners => (super.noSuchMethod(
        Invocation.getter(#hasListeners),
        returnValue: false,
        returnValueForMissingStub: false,
      ) as bool);
  @override
  _i5.Future<void> toggleFavorite(_i4.Asset? asset) => (super.noSuchMethod(
        Invocation.method(
          #toggleFavorite,
          [asset],
        ),
        returnValue: _i5.Future<void>.value(),
        returnValueForMissingStub: _i5.Future<void>.value(),
      ) as _i5.Future<void>);
  @override
  _i5.Future<void> addToFavorites(Iterable<_i4.Asset>? assets) =>
      (super.noSuchMethod(
        Invocation.method(
          #addToFavorites,
          [assets],
        ),
        returnValue: _i5.Future<void>.value(),
        returnValueForMissingStub: _i5.Future<void>.value(),
      ) as _i5.Future<void>);
  @override
  bool updateShouldNotify(
    Set<String>? old,
    Set<String>? current,
  ) =>
      (super.noSuchMethod(
        Invocation.method(
          #updateShouldNotify,
          [
            old,
            current,
          ],
        ),
        returnValue: false,
        returnValueForMissingStub: false,
      ) as bool);
  @override
  _i7.RemoveListener addListener(
    _i8.Listener<Set<String>>? listener, {
    bool? fireImmediately = true,
  }) =>
      (super.noSuchMethod(
        Invocation.method(
          #addListener,
          [listener],
          {#fireImmediately: fireImmediately},
        ),
        returnValue: () {},
        returnValueForMissingStub: () {},
      ) as _i7.RemoveListener);
  @override
  void dispose() => super.noSuchMethod(
        Invocation.method(
          #dispose,
          [],
        ),
        returnValueForMissingStub: null,
      );
}
