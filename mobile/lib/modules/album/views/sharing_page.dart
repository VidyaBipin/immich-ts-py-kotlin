import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/extensions/build_context_extensions.dart';
import 'package:immich_mobile/modules/album/providers/shared_album.provider.dart';
import 'package:immich_mobile/modules/album/ui/album_thumbnail_card.dart';
import 'package:immich_mobile/modules/partner/providers/partner.provider.dart';
import 'package:immich_mobile/modules/partner/ui/partner_list.dart';
import 'package:immich_mobile/routing/router.dart';
import 'package:immich_mobile/shared/models/album.dart';
import 'package:immich_mobile/shared/providers/user.provider.dart';
import 'package:immich_mobile/shared/ui/immich_app_bar.dart';
import 'package:immich_mobile/shared/ui/immich_image.dart';

class SharingPage extends HookConsumerWidget {
  const SharingPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final List<Album> sharedAlbums = ref.watch(sharedAlbumProvider);
    final userId = ref.watch(currentUserProvider)?.id;
    final partner = ref.watch(partnerSharedWithProvider);

    useEffect(
      () {
        ref.read(sharedAlbumProvider.notifier).getAllSharedAlbums();
        return null;
      },
      [],
    );

    buildAlbumGrid() {
      return SliverPadding(
        padding: const EdgeInsets.all(18.0),
        sliver: SliverGrid(
          gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
            maxCrossAxisExtent: 250,
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: .7,
          ),
          delegate: SliverChildBuilderDelegate(
            (context, index) {
              return AlbumThumbnailCard(
                album: sharedAlbums[index],
                showOwner: true,
                onTap: () {
                  context.autoPush(
                    AlbumViewerRoute(albumId: sharedAlbums[index].id),
                  );
                },
              );
            },
            childCount: sharedAlbums.length,
          ),
        ),
      );
    }

    buildAlbumList() {
      return SliverList(
        delegate: SliverChildBuilderDelegate(
          (BuildContext context, int index) {
            final album = sharedAlbums[index];
            final isOwner = album.ownerId == userId;

            return ListTile(
              contentPadding: const EdgeInsets.symmetric(horizontal: 12),
              leading: ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: ImmichImage(
                  album.thumbnail.value,
                  width: 60,
                  height: 60,
                ),
              ),
              title: Text(
                album.name,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: context.textTheme.titleSmall?.copyWith(
                  color: context.primaryColor,
                ),
              ),
              subtitle: isOwner
                  ? Text(
                      'album_thumbnail_owned'.tr(),
                      style: context.textTheme.bodySmall,
                    )
                  : album.ownerName != null
                      ? Text(
                          'album_thumbnail_shared_by'
                              .tr(args: [album.ownerName!]),
                          style: context.textTheme.bodySmall,
                        )
                      : null,
              onTap: () {
                context.autoPush(
                  AlbumViewerRoute(albumId: sharedAlbums[index].id),
                );
              },
            );
          },
          childCount: sharedAlbums.length,
        ),
      );
    }

    buildTopBottons() {
      return Padding(
        padding: const EdgeInsets.only(
          left: 12.0,
          right: 12.0,
          top: 24.0,
          bottom: 12.0,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Expanded(
              child: ElevatedButton.icon(
                onPressed: () {
                  context.autoPush(CreateAlbumRoute(isSharedAlbum: true));
                },
                icon: const Icon(
                  Icons.photo_album_outlined,
                  size: 20,
                ),
                label: const Text(
                  "sharing_silver_appbar_create_shared_album",
                  maxLines: 1,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 11,
                  ),
                ).tr(),
              ),
            ),
            const SizedBox(width: 12.0),
            Expanded(
              child: ElevatedButton.icon(
                onPressed: () => context.autoPush(const SharedLinkRoute()),
                icon: const Icon(
                  Icons.link,
                  size: 20,
                ),
                label: const Text(
                  "sharing_silver_appbar_shared_links",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 11,
                  ),
                  maxLines: 1,
                ).tr(),
              ),
            ),
          ],
        ),
      );
    }

    buildEmptyListIndication() {
      return SliverToBoxAdapter(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Card(
            elevation: 0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
              side: const BorderSide(
                color: Colors.grey,
                width: 0.5,
              ),
            ),
            child: Padding(
              padding: const EdgeInsets.all(18.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 5.0, bottom: 5),
                    child: Icon(
                      Icons.insert_photo_rounded,
                      size: 50,
                      color: context.primaryColor,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(
                      'sharing_page_empty_list',
                      style: context.textTheme.displaySmall,
                    ).tr(),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(
                      'sharing_page_description',
                      style: context.textTheme.bodyMedium,
                    ).tr(),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    }

    Widget sharePartnerButton() {
      return InkWell(
        onTap: () => context.autoPush(const PartnerRoute()),
        borderRadius: BorderRadius.circular(12),
        child: const Icon(
          Icons.swap_horizontal_circle_rounded,
          size: 25,
        ),
      );
    }

    return Scaffold(
      appBar: ImmichAppBar(
        action: sharePartnerButton(),
      ),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(child: buildTopBottons()),
          if (partner.isNotEmpty)
            SliverPadding(
              padding: const EdgeInsets.all(12),
              sliver: SliverToBoxAdapter(
                child: Text(
                  "partner_page_title",
                  style: context.textTheme.bodyLarge?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                ).tr(),
              ),
            ),
          if (partner.isNotEmpty) PartnerList(partner: partner),
          SliverPadding(
            padding: const EdgeInsets.all(12),
            sliver: SliverToBoxAdapter(
              child: Text(
                "sharing_page_album",
                style: context.textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ).tr(),
            ),
          ),
          SliverLayoutBuilder(
            builder: (context, constraints) {
              if (sharedAlbums.isEmpty) {
                return buildEmptyListIndication();
              }

              if (constraints.crossAxisExtent < 600) {
                return buildAlbumList();
              } else {
                return buildAlbumGrid();
              }
            },
          ),
        ],
      ),
    );
  }
}
