import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/modules/sharing/ui/asset_grid_by_month.dart';
import 'package:immich_mobile/modules/sharing/ui/month_group_title.dart';
import 'package:immich_mobile/shared/providers/asset.provider.dart';
import 'package:immich_mobile/modules/home/ui/draggable_scrollbar.dart';

class AssetSelectionPage extends HookConsumerWidget {
  const AssetSelectionPage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ScrollController _scrollController = useScrollController();
    var assetGroupMonthYear = ref.watch(assetGroupByMonthYearProvider);
    List<Widget> _imageGridGroup = [];

    Widget _buildBody() {
      assetGroupMonthYear.forEach((monthYear, assetGroup) {
        // Add month title
        _imageGridGroup.add(MonthGroupTitle(month: monthYear, assetGroup: assetGroup));

        _imageGridGroup.add(AssetGridByMonth(assetGroup: assetGroup));
      });

      return Stack(
        children: [
          DraggableScrollbar.semicircle(
            backgroundColor: Theme.of(context).primaryColor,
            controller: _scrollController,
            heightScrollThumb: 48.0,
            child: CustomScrollView(
              controller: _scrollController,
              slivers: [..._imageGridGroup],
            ),
          ),
        ],
      );
    }

    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close_rounded),
          onPressed: () {
            AutoRouter.of(context).pop();
          },
        ),
        title: const Text(
          'Add photos',
          style: TextStyle(fontSize: 18),
        ),
        centerTitle: false,
      ),
      body: _buildBody(),
    );
  }
}
