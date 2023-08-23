import 'dart:async';

import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/modules/asset_viewer/providers/render_list.provider.dart';
import 'package:immich_mobile/modules/home/ui/asset_grid/asset_grid_data_structure.dart';
import 'package:immich_mobile/modules/home/ui/asset_grid/immich_asset_grid.dart';
import 'package:immich_mobile/modules/home/ui/asset_grid/immich_asset_grid_view.dart';
import 'package:immich_mobile/modules/map/models/map_subscription_event.model.dart';
import 'package:immich_mobile/shared/models/asset.dart';
import 'package:immich_mobile/shared/ui/drag_sheet.dart';
import 'package:immich_mobile/utils/color_filter_generator.dart';
import 'package:immich_mobile/utils/debounce.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';

class AssetsInBoundBottomSheet extends ConsumerStatefulWidget {
  final Stream mapPageEventStream;
  final StreamController bottomSheetEventSC;
  final DraggableScrollableController? scrollableController;
  final ValueNotifier<bool> selectionEnabledHook;
  final ImmichAssetGridSelectionListener selectionlistener;

  final void Function(Asset? asset) onZoomToAssetCb;

  const AssetsInBoundBottomSheet({
    super.key,
    required this.mapPageEventStream,
    required this.bottomSheetEventSC,
    required this.selectionEnabledHook,
    required this.selectionlistener,
    required this.onZoomToAssetCb,
    this.scrollableController,
  });

  @override
  AssetsInBoundBottomSheetState createState() =>
      AssetsInBoundBottomSheetState();
}

class AssetsInBoundBottomSheetState
    extends ConsumerState<AssetsInBoundBottomSheet> {
  // State variables
  bool isSheetExpanded = false;
  bool isSheetScrolled = false;
  // Non-State variables
  List<Asset> assetsInBound = [];
  late final StreamSubscription<dynamic>? _mapPageEventSubscription;
  late final Debounce debounce;
  bool userTappedOnMap = false;
  RenderList? _cachedRenderList;
  int lastAssetOffsetInSheet = -1;

  @override
  void initState() {
    super.initState();
    _mapPageEventSubscription =
        widget.mapPageEventStream.listen(handleMapPageEvents);
    debounce = Debounce(
      const Duration(milliseconds: 200),
    );
  }

  @override
  void didUpdateWidget(covariant AssetsInBoundBottomSheet oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.mapPageEventStream != oldWidget.mapPageEventStream) {
      _mapPageEventSubscription?.cancel();
      _mapPageEventSubscription =
          widget.mapPageEventStream.listen(handleMapPageEvents);
    }
  }

  @override
  void dispose() {
    _mapPageEventSubscription?.cancel();
    super.dispose();
  }

  void handleMapPageEvents(dynamic event) {
    if (event is MapPageAssetsInBoundUpdated) {
      if (mounted) {
        setState(() {
          assetsInBound = event.assets;
        });
      }
    } else if (event is MapPageOnTapEvent) {
      userTappedOnMap = true;
      lastAssetOffsetInSheet = -1;
      if (mounted && isSheetScrolled) {
        setState(() {
          isSheetScrolled = false;
        });
      }
    }
  }

  void _visibleItemsListener(ItemPosition start, ItemPosition end) {
    final renderElement = _cachedRenderList?.elements[start.index];
    if (renderElement == null) {
      return;
    }
    final rowOffset = renderElement.offset;
    if ((-start.itemLeadingEdge) != 0) {
      var columnOffset = -start.itemLeadingEdge ~/ 0.05;
      columnOffset = columnOffset < renderElement.totalCount
          ? columnOffset
          : renderElement.totalCount - 1;
      lastAssetOffsetInSheet = rowOffset + columnOffset;
      final asset = _cachedRenderList?.allAssets?[lastAssetOffsetInSheet];
      userTappedOnMap = false;
      if (!userTappedOnMap && isSheetExpanded) {
        widget.bottomSheetEventSC.add(
          MapPageBottomSheetScrolled(asset),
        );
      }
      if (mounted && !isSheetScrolled && isSheetExpanded) {
        setState(() {
          isSheetScrolled = true;
        });
      }
    }
  }

  void visibleItemsListener(ItemPosition start, ItemPosition end) {
    if (_cachedRenderList == null) {
      debounce.dispose();
      return;
    }
    debounce.call(() => _visibleItemsListener(start, end));
  }

  @override
  Widget build(BuildContext context) {
    var isDarkMode = Theme.of(context).brightness == Brightness.dark;

    Widget buildNoPhotosWidget() {
      const image = Image(
        image: AssetImage('assets/lighthouse.png'),
      );

      return isSheetExpanded
          ? Column(
              children: [
                const SizedBox(
                  height: 80,
                ),
                SizedBox(
                  height: 150,
                  width: 150,
                  child: isDarkMode
                      ? const InvertionFilter(
                          child: SaturationFilter(
                            saturation: -1,
                            child: BrightnessFilter(
                              brightness: -5,
                              child: image,
                            ),
                          ),
                        )
                      : image,
                ),
                const SizedBox(
                  height: 20,
                ),
                Text(
                  "Zoom out to see photos",
                  style: TextStyle(
                    fontSize: 20,
                    color: Theme.of(context).textTheme.displayLarge?.color,
                  ),
                ),
              ],
            )
          : const SizedBox.shrink();
    }

    void onTapMapButton() {
      if (lastAssetOffsetInSheet != -1) {
        widget.onZoomToAssetCb.call(
          _cachedRenderList?.allAssets?[lastAssetOffsetInSheet],
        );
      }
    }

    Widget buildDragHandle(ScrollController scrollController) {
      final textToDisplay = assetsInBound.isNotEmpty
          ? "${assetsInBound.length} photo${assetsInBound.length > 1 ? "s" : ""}"
          : "No photos in this area";
      final dragHandle = Container(
        height: 75,
        width: double.infinity,
        decoration: BoxDecoration(
          color: isDarkMode ? Colors.grey[900] : Colors.grey[100],
        ),
        child: Stack(
          children: [
            Column(
              children: [
                const SizedBox(height: 12),
                const CustomDraggingHandle(),
                const SizedBox(height: 12),
                Text(
                  textToDisplay,
                  style: TextStyle(
                    fontSize: 16,
                    color: Theme.of(context).textTheme.displayLarge?.color,
                  ),
                ),
                Divider(
                  color: Theme.of(context)
                      .textTheme
                      .displayLarge
                      ?.color
                      ?.withOpacity(0.5),
                ),
              ],
            ),
            if (isSheetExpanded && isSheetScrolled)
              Positioned(
                top: 5,
                right: 10,
                child: IconButton(
                  icon: Icon(
                    Icons.map_outlined,
                    color: Theme.of(context).textTheme.displayLarge?.color,
                  ),
                  iconSize: 20,
                  tooltip: 'Zoom to bounds',
                  onPressed: onTapMapButton,
                ),
              ),
          ],
        ),
      );
      return SingleChildScrollView(
        controller: scrollController,
        child: dragHandle,
      );
    }

    return NotificationListener<DraggableScrollableNotification>(
      onNotification: (DraggableScrollableNotification notification) {
        final sheetExtended = notification.extent > 0.2;
        if (!sheetExtended) {
          // reset state
          userTappedOnMap = false;
          lastAssetOffsetInSheet = -1;
        }
        if (mounted && isSheetExpanded != sheetExtended) {
          setState(() {
            isSheetExpanded = sheetExtended;
            if (!sheetExtended && isSheetScrolled) {
              isSheetScrolled = false;
            }
          });
        }

        return true;
      },
      child: DraggableScrollableSheet(
        controller: widget.scrollableController,
        initialChildSize: 0.1,
        minChildSize: 0.1,
        maxChildSize: 0.55,
        snap: true,
        builder: (
          BuildContext context,
          ScrollController scrollController,
        ) {
          return Card(
            color: isDarkMode ? Colors.grey[900] : Colors.grey[100],
            surfaceTintColor: Colors.transparent,
            elevation: 18.0,
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(12),
                topRight: Radius.circular(12),
              ),
            ),
            margin: const EdgeInsets.all(0),
            child: Column(
              children: [
                buildDragHandle(scrollController),
                if (assetsInBound.isNotEmpty)
                  ref
                      .watch(
                        renderListProvider(
                          assetsInBound,
                        ),
                      )
                      .when(
                        data: (renderList) {
                          _cachedRenderList = renderList;
                          final assetGrid = ImmichAssetGrid(
                            shrinkWrap: true,
                            renderList: renderList,
                            showDragScroll: false,
                            selectionActive: widget.selectionEnabledHook.value,
                            showMultiSelectIndicator: false,
                            listener: widget.selectionlistener,
                            visibleItemsListener: visibleItemsListener,
                          );

                          return Expanded(
                            child: isSheetExpanded
                                ? assetGrid
                                : const SizedBox.shrink(),
                          );
                        },
                        error: (error, stackTrace) {
                          log.warning(
                            "Cannot get assets in the current map bounds ${error.toString()}",
                            error,
                            stackTrace,
                          );
                          return const SizedBox.shrink();
                        },
                        loading: () => const SizedBox.shrink(),
                      ),
                if (assetsInBound.isEmpty)
                  Expanded(
                    child: SingleChildScrollView(
                      child: buildNoPhotosWidget(),
                    ),
                  ),
              ],
            ),
          );
        },
      ),
    );
  }
}
