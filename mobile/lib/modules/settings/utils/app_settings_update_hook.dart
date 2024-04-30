import 'package:flutter/cupertino.dart';
import 'package:flutter_hooks/flutter_hooks.dart' hide Store;
import 'package:immich_mobile/modules/settings/services/app_settings.service.dart';
import 'package:immich_mobile/domain/entities/store.dart';

ValueNotifier<T> useAppSettingsState<T>(
  AppSettingsEnum<T> key,
) {
  final notifier = useState<T>(Store.get(key.storeKey, key.defaultValue));

  // Listen to changes to the notifier and update app settings
  useValueChanged(
    notifier.value,
    (_, __) => Store.put(key.storeKey, notifier.value),
  );

  return notifier;
}
