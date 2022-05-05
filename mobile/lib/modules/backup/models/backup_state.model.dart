import 'package:dio/dio.dart';
import 'package:equatable/equatable.dart';
import 'package:photo_manager/photo_manager.dart';

import 'package:immich_mobile/modules/backup/models/available_album.model.dart';
import 'package:immich_mobile/shared/models/server_info.model.dart';

enum BackUpProgressEnum { idle, inProgress, done }

class BackUpState extends Equatable {
  // enum
  final BackUpProgressEnum backupProgress;
  final int totalAssetCount;
  final List<String> assetOnDatabase;
  final int backingUpAssetCount;
  final double progressInPercentage;
  final CancelToken cancelToken;
  final ServerInfo serverInfo;
  final List<AvailableAlbum> availableAlbums;
  final Set<AssetPathEntity> selectedBackupAlbums;
  final Set<AssetPathEntity> excludedBackupAlbums;
  final Set<AssetEntity> assetsToBeBackup;

  const BackUpState({
    required this.backupProgress,
    required this.totalAssetCount,
    required this.assetOnDatabase,
    required this.backingUpAssetCount,
    required this.progressInPercentage,
    required this.cancelToken,
    required this.serverInfo,
    required this.availableAlbums,
    required this.selectedBackupAlbums,
    required this.excludedBackupAlbums,
    required this.assetsToBeBackup,
  });

  BackUpState copyWith({
    BackUpProgressEnum? backupProgress,
    int? totalAssetCount,
    List<String>? assetOnDatabase,
    int? backingUpAssetCount,
    double? progressInPercentage,
    CancelToken? cancelToken,
    ServerInfo? serverInfo,
    List<AvailableAlbum>? availableAlbums,
    Set<AssetPathEntity>? selectedBackupAlbums,
    Set<AssetPathEntity>? excludedBackupAlbums,
    Set<AssetEntity>? assetsToBeBackup,
  }) {
    return BackUpState(
      backupProgress: backupProgress ?? this.backupProgress,
      totalAssetCount: totalAssetCount ?? this.totalAssetCount,
      assetOnDatabase: assetOnDatabase ?? this.assetOnDatabase,
      backingUpAssetCount: backingUpAssetCount ?? this.backingUpAssetCount,
      progressInPercentage: progressInPercentage ?? this.progressInPercentage,
      cancelToken: cancelToken ?? this.cancelToken,
      serverInfo: serverInfo ?? this.serverInfo,
      availableAlbums: availableAlbums ?? this.availableAlbums,
      selectedBackupAlbums: selectedBackupAlbums ?? this.selectedBackupAlbums,
      excludedBackupAlbums: excludedBackupAlbums ?? this.excludedBackupAlbums,
      assetsToBeBackup: assetsToBeBackup ?? this.assetsToBeBackup,
    );
  }

  @override
  String toString() {
    return 'BackUpState(backupProgress: $backupProgress, totalAssetCount: $totalAssetCount, assetOnDatabase: $assetOnDatabase, backingUpAssetCount: $backingUpAssetCount, progressInPercentage: $progressInPercentage, cancelToken: $cancelToken, serverInfo: $serverInfo, availableAlbums: $availableAlbums, selectedBackupAlbums: $selectedBackupAlbums, excludedBackupAlbums: $excludedBackupAlbums, assetsToBeBackup: $assetsToBeBackup)';
  }

  @override
  List<Object> get props {
    return [
      backupProgress,
      totalAssetCount,
      assetOnDatabase,
      backingUpAssetCount,
      progressInPercentage,
      cancelToken,
      serverInfo,
      availableAlbums,
      selectedBackupAlbums,
      excludedBackupAlbums,
      assetsToBeBackup,
    ];
  }
}
