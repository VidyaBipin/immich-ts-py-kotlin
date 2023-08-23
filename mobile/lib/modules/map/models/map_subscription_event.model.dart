import 'package:immich_mobile/shared/models/asset.dart';

enum MapPageEventType {
  mapTap,
  bottomSheetScrolled,
  assetsInBoundUpdated,
}

class MapPageEventBase {
  final MapPageEventType type;

  const MapPageEventBase(this.type);
}

class MapPageOnTapEvent extends MapPageEventBase {
  const MapPageOnTapEvent() : super(MapPageEventType.mapTap);
}

class MapPageAssetsInBoundUpdated extends MapPageEventBase {
  List<Asset> assets;
  MapPageAssetsInBoundUpdated(this.assets)
      : super(MapPageEventType.assetsInBoundUpdated);
}

class MapPageBottomSheetScrolled extends MapPageEventBase {
  Asset? asset;
  MapPageBottomSheetScrolled(this.asset)
      : super(MapPageEventType.bottomSheetScrolled);
}
