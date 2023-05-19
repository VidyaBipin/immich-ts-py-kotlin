import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/shared/models/user.dart';
import 'package:immich_mobile/shared/providers/api.provider.dart';
import 'package:immich_mobile/shared/providers/db.provider.dart';
import 'package:immich_mobile/shared/services/api.service.dart';
import 'package:isar/isar.dart';

final partnerServiceProvider = Provider(
  (ref) => PartnerService(
    ref.watch(apiServiceProvider),
    ref.watch(dbProvider),
  ),
);

enum PartnerDirection {
  sharedWith("shared-with"),
  sharedBy("shared-by");

  const PartnerDirection(
    this._value,
  );

  final String _value;
}

class PartnerService {
  final ApiService _apiService;
  final Isar _db;

  PartnerService(this._apiService, this._db);

  Future<List<User>?> getPartners(PartnerDirection direction) async {
    try {
      final userDtos =
          await _apiService.partnerApi.getPartners(direction._value);
      if (userDtos != null) {
        return userDtos.map((u) => User.fromDto(u)).toList();
      }
    } catch (e) {
      debugPrint("");
    }
    return null;
  }

  Future<bool> removePartner(User partner) async {
    try {
      await _apiService.partnerApi.removePartner(partner.id);
      partner.isPartnerSharedBy = false;
      await _db.writeTxn(() => _db.users.put(partner));
    } catch (e) {
      return false;
    }
    return true;
  }

  Future<bool> addPartner(User partner) async {
    try {
      final dto = await _apiService.partnerApi.createPartner(partner.id);
      if (dto != null) {
        partner.isPartnerSharedBy = true;
        await _db.writeTxn(() => _db.users.put(partner));
        return true;
      }
    } catch (e) {
      debugPrint("Failed to add partner");
    }
    return false;
  }
}
