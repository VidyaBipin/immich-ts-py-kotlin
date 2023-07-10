import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/modules/asset_viewer/ui/description_input.dart';
import 'package:immich_mobile/shared/models/asset.dart';
import 'package:immich_mobile/shared/ui/drag_sheet.dart';
import 'package:immich_mobile/utils/bytes_units.dart';
import 'package:latlong2/latlong.dart';
import 'package:timezone/timezone.dart';
import 'package:url_launcher/url_launcher.dart';

class ExifBottomSheet extends HookConsumerWidget {
  final Asset asset;

  const ExifBottomSheet({Key? key, required this.asset}) : super(key: key);

  bool get showMap =>
      asset.exifInfo?.latitude != null && asset.exifInfo?.longitude != null;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final exifInfo = asset.exifInfo;
    var isDarkTheme = Theme.of(context).brightness == Brightness.dark;
    var textColor = isDarkTheme ? Colors.white : Colors.black;

    buildMap() {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 16.0),
        child: LayoutBuilder(
          builder: (context, constraints) {
            return Container(
              height: 150,
              width: constraints.maxWidth,
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.all(Radius.circular(15)),
              ),
              child: FlutterMap(
                options: MapOptions(
                  interactiveFlags: InteractiveFlag.none,
                  center: LatLng(
                    exifInfo?.latitude ?? 0,
                    exifInfo?.longitude ?? 0,
                  ),
                  zoom: 16.0,
                ),
                nonRotatedChildren: [
                  RichAttributionWidget(
                    attributions: [
                      TextSourceAttribution(
                        'OpenStreetMap contributors',
                        onTap: () => launchUrl(
                          Uri.parse('https://openstreetmap.org/copyright'),
                        ),
                      ),
                    ],
                  ),
                ],
                children: [
                  TileLayer(
                    urlTemplate:
                        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    subdomains: const ['a', 'b', 'c'],
                  ),
                  MarkerLayer(
                    markers: [
                      Marker(
                        anchorPos: AnchorPos.align(AnchorAlign.top),
                        point: LatLng(
                          exifInfo?.latitude ?? 0,
                          exifInfo?.longitude ?? 0,
                        ),
                        builder: (ctx) => const Image(
                          image: AssetImage('assets/location-pin.png'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            );
          },
        ),
      );
    }

    buildSizeText(Asset a) {
      String resolution = a.width != null && a.height != null
          ? "${a.height} x ${a.width}  "
          : "";
      String fileSize = a.exifInfo?.fileSize != null
          ? formatBytes(a.exifInfo!.fileSize!)
          : "";
      String text = resolution + fileSize;
      return text.isEmpty ? null : Text(text);
    }

    buildDragHeader() {
      return const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(height: 12),
          Align(
            alignment: Alignment.center,
            child: CustomDraggingHandle(),
          ),
          SizedBox(height: 12),
        ],
      );
    }

    buildLocation() {
      // Guard no lat/lng
      if (!showMap) {
        return Container();
      }

      return Column(
        children: [
          // Location
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "exif_bottom_sheet_location",
                style: TextStyle(
                  fontSize: 11,
                  color: textColor,
                  fontWeight: FontWeight.bold,
                ),
              ).tr(),
              buildMap(),
              RichText(
                text: TextSpan(
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: textColor,
                    fontFamily: 'WorkSans',
                  ),
                  children: [
                    if (exifInfo != null && exifInfo.city != null)
                      TextSpan(
                        text: exifInfo.city,
                      ),
                    if (exifInfo != null &&
                        exifInfo.city != null &&
                        exifInfo.state != null)
                      const TextSpan(
                        text: ", ",
                      ),
                    if (exifInfo != null && exifInfo.state != null)
                      TextSpan(
                        text: "${exifInfo.state}",
                      ),
                  ],
                ),
              ),
              Text(
                "${exifInfo!.latitude!.toStringAsFixed(4)}, ${exifInfo.longitude!.toStringAsFixed(4)}",
                style: const TextStyle(fontSize: 12),
              )
            ],
          ),
        ],
      );
    }

    /// Returns the adjusted original DateTime to the
    /// provided TZ identifier, if no or an invalid
    /// identifier is provided, the original date is
    /// provided
    getOriginalDate(DateTime date, String? timezone) {
      if (timezone != null && timezone.contains('/')) {
        final parsedTZ = getLocation(timezone);
        return TZDateTime.from(date, parsedTZ);
      }

      return date;
    }

    String formatUtcOffset(Duration utcOffset) {
      final sign = utcOffset.isNegative ? '-' : '+';
      final hours = utcOffset.inHours.abs().toString().padLeft(2, '0');
      final minutes =
          utcOffset.inMinutes.remainder(60).abs().toString().padLeft(2, '0');
      return 'GMT$sign$hours:$minutes';
    }

    String formatDateTime(DateTime dateTime) {
      final date = DateFormat.yMMMEd().format(dateTime);
      final time = DateFormat.jm().format(dateTime);

      return '$date • $time';
    }

    buildDate() {
      // Handle offset timezones
      if (exifInfo != null &&
          exifInfo.timeZone != null &&
          exifInfo.timeZone!.contains("UTC")) {
        List<String> parts = exifInfo.timeZone!
            .substring(exifInfo.timeZone!.indexOf('UTC') + 3)
            .split(':');
        int hours = int.parse(parts[0]);
        int minutes = int.parse(parts.length == 2 ? parts[1] : "00");
        Duration utcOffset = Duration(hours: hours, minutes: minutes);

        final adjustedDate = asset.fileCreatedAt.toUtc().add(utcOffset);

        return Text(
          '${formatDateTime(adjustedDate)} ${formatUtcOffset(utcOffset)}',
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 14,
          ),
        );
      }

      // Handle null and IANA timezones
      final fileCreatedAt =
          getOriginalDate(asset.fileCreatedAt, exifInfo?.timeZone);

      return Text(
        '${formatDateTime(fileCreatedAt)} ${formatUtcOffset(fileCreatedAt.timeZoneOffset)}',
        style: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 14,
        ),
      );
    }

    buildDetail() {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Text(
              "exif_bottom_sheet_details",
              style: TextStyle(
                fontSize: 11,
                color: textColor,
                fontWeight: FontWeight.bold,
              ),
            ).tr(),
          ),
          ListTile(
            contentPadding: const EdgeInsets.all(0),
            dense: true,
            leading: Icon(
              Icons.image,
              color: textColor.withAlpha(200),
            ),
            title: Text(
              asset.fileName,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: textColor,
              ),
            ),
            subtitle: buildSizeText(asset),
          ),
          if (exifInfo?.make != null)
            ListTile(
              contentPadding: const EdgeInsets.all(0),
              dense: true,
              leading: Icon(
                Icons.camera,
                color: textColor.withAlpha(200),
              ),
              title: Text(
                "${exifInfo!.make} ${exifInfo.model}",
                style: TextStyle(
                  color: textColor,
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(
                "ƒ/${exifInfo.fNumber}   ${exifInfo.exposureTime}   ${exifInfo.focalLength} mm   ISO${exifInfo.iso} ",
              ),
            ),
        ],
      );
    }

    return GestureDetector(
      onTap: () {
        // FocusScope.of(context).unfocus();
      },
      child: SingleChildScrollView(
        child: Card(
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(15),
              topRight: Radius.circular(15),
            ),
          ),
          margin: const EdgeInsets.all(0),
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 16.0),
            child: LayoutBuilder(
              builder: (context, constraints) {
                if (constraints.maxWidth > 600) {
                  // Two column
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        buildDragHeader(),
                        buildDate(),
                        if (asset.isRemote) DescriptionInput(asset: asset),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Flexible(
                              flex: showMap ? 5 : 0,
                              child: Padding(
                                padding: const EdgeInsets.only(right: 8.0),
                                child: buildLocation(),
                              ),
                            ),
                            Flexible(
                              flex: 5,
                              child: Padding(
                                padding: const EdgeInsets.only(left: 8.0),
                                child: buildDetail(),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 50),
                      ],
                    ),
                  );
                }

                // One column
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    buildDragHeader(),
                    buildDate(),
                    if (asset.isRemote) DescriptionInput(asset: asset),
                    const SizedBox(height: 8.0),
                    buildLocation(),
                    SizedBox(height: showMap ? 16.0 : 0.0),
                    buildDetail(),
                    const SizedBox(height: 50),
                  ],
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}
