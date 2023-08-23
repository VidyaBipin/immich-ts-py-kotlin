import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/modules/map/providers/map_state.provider.dart';
import 'package:immich_mobile/modules/settings/providers/app_settings.provider.dart';
import 'package:immich_mobile/modules/settings/services/app_settings.service.dart';

class MapSettingsDialog extends HookConsumerWidget {
  const MapSettingsDialog({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final appSettingsStore = ref.watch(appSettingsServiceProvider);
    final mapSettings = ref.watch(mapStateNotifier.notifier);
    final isDarkMode = useState(AppSettingsEnum.mapThemeMode.defaultValue);
    final showFavoriteOnly =
        useState(AppSettingsEnum.mapShowFavoriteOnly.defaultValue);
    final showRelativeDate =
        useState(AppSettingsEnum.mapRelativeDate.defaultValue);
    final ThemeData theme = Theme.of(context);

    useEffect(
      () {
        isDarkMode.value =
            appSettingsStore.getSetting(AppSettingsEnum.mapThemeMode);
        showFavoriteOnly.value =
            appSettingsStore.getSetting(AppSettingsEnum.mapShowFavoriteOnly);
        showRelativeDate.value =
            appSettingsStore.getSetting(AppSettingsEnum.mapRelativeDate);
        return null;
      },
      [appSettingsStore],
    );

    Widget buildMapThemeSetting() {
      return SwitchListTile.adaptive(
        value: isDarkMode.value,
        onChanged: (value) {
          isDarkMode.value = value;
        },
        activeColor: theme.primaryColor,
        dense: true,
        title: Text(
          "Allow dark mode".tr(),
          style:
              theme.textTheme.labelLarge?.copyWith(fontWeight: FontWeight.bold),
        ),
      );
    }

    Widget buildFavoriteOnlySetting() {
      return SwitchListTile.adaptive(
        value: showFavoriteOnly.value,
        onChanged: (value) {
          showFavoriteOnly.value = value;
        },
        activeColor: theme.primaryColor,
        dense: true,
        title: Text(
          "Show Favorite Only".tr(),
          style:
              theme.textTheme.labelLarge?.copyWith(fontWeight: FontWeight.bold),
        ),
      );
    }

    Widget buildDateRangeSetting() {
      final now = DateTime.now();
      return DropdownMenu(
        enableSearch: false,
        enableFilter: false,
        initialSelection: showRelativeDate.value,
        onSelected: (value) {
          showRelativeDate.value = value!;
        },
        dropdownMenuEntries: [
          const DropdownMenuEntry(value: 0, label: "All"),
          const DropdownMenuEntry(
            value: 1,
            label: "Past 24 hours",
          ),
          const DropdownMenuEntry(
            value: 7,
            label: "Past 7 days",
          ),
          const DropdownMenuEntry(
            value: 30,
            label: "Past 30 days",
          ),
          DropdownMenuEntry(
            value: now
                .difference(
                  DateTime(
                    now.year - 1,
                    now.month,
                    now.day,
                    now.hour,
                    now.minute,
                    now.second,
                  ),
                )
                .inDays,
            label: "Past year",
          ),
          DropdownMenuEntry(
            value: now
                .difference(
                  DateTime(
                    now.year - 3,
                    now.month,
                    now.day,
                    now.hour,
                    now.minute,
                    now.second,
                  ),
                )
                .inDays,
            label: "Past 3 years",
          ),
        ],
      );
    }

    List<Widget> getDialogActions() {
      return <Widget>[
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          style: TextButton.styleFrom(
            backgroundColor:
                mapSettings.isDarkTheme ? Colors.grey[100] : Colors.grey[700],
          ),
          child: Text(
            "Cancel",
            style: theme.textTheme.labelSmall?.copyWith(
              fontWeight: FontWeight.bold,
              color:
                  mapSettings.isDarkTheme ? Colors.grey[900] : Colors.grey[100],
            ),
          ),
        ),
        TextButton(
          onPressed: () {
            // Save App settings
            appSettingsStore.setSetting(
              AppSettingsEnum.mapThemeMode,
              isDarkMode.value,
            );
            appSettingsStore.setSetting(
              AppSettingsEnum.mapShowFavoriteOnly,
              showFavoriteOnly.value,
            );
            appSettingsStore.setSetting(
              AppSettingsEnum.mapRelativeDate,
              showRelativeDate.value,
            );
            // Notify listeners
            mapSettings.switchTheme(isDarkMode.value);
            mapSettings.switchFavoriteOnly(showFavoriteOnly.value);
            mapSettings.setRelativeTime(showRelativeDate.value);
            Navigator.of(context).pop();
          },
          style: TextButton.styleFrom(
            backgroundColor: theme.primaryColor,
          ),
          child: Text(
            "Save",
            style: theme.textTheme.labelSmall?.copyWith(
              fontWeight: FontWeight.bold,
              color: theme.primaryTextTheme.labelLarge?.color,
            ),
          ),
        ),
      ];
    }

    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      title: Center(
        child: Text(
          "Map Settings",
          style: TextStyle(
            color: theme.primaryColor,
            fontWeight: FontWeight.bold,
            fontSize: 18,
          ),
        ),
      ),
      content: SizedBox(
        width: double.maxFinite,
        child: ConstrainedBox(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.of(context).size.height * 0.6,
          ),
          child: ListView(
            shrinkWrap: true,
            children: [
              buildMapThemeSetting(),
              buildFavoriteOnlySetting(),
              const SizedBox(
                height: 10,
              ),
              Padding(
                padding: const EdgeInsets.only(left: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Date range",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    buildDateRangeSetting(),
                  ],
                ),
              ),
            ].toList(),
          ),
        ),
      ),
      actions: getDialogActions(),
      actionsAlignment: MainAxisAlignment.spaceEvenly,
    );
  }
}
