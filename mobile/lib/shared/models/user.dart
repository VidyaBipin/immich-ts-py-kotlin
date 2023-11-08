import 'package:immich_mobile/shared/models/album.dart';
import 'package:immich_mobile/utils/hash.dart';
import 'package:isar/isar.dart';
import 'package:openapi/api.dart';

part 'user.g.dart';

@Collection(inheritance: false)
class User {
  User({
    required this.id,
    required this.updatedAt,
    required this.email,
    required this.fullName,
    required this.isAdmin,
    this.isPartnerSharedBy = false,
    this.isPartnerSharedWith = false,
    this.profileImagePath = '',
    this.memoryEnabled = true,
  });

  Id get isarId => fastHash(id);

  User.fromDto(UserResponseDto dto)
      : id = dto.id,
        updatedAt = dto.updatedAt,
        email = dto.email,
        fullName = dto.fullName,
        isPartnerSharedBy = false,
        isPartnerSharedWith = false,
        profileImagePath = dto.profileImagePath,
        isAdmin = dto.isAdmin,
        memoryEnabled = dto.memoriesEnabled;

  @Index(unique: true, replace: false, type: IndexType.hash)
  String id;
  DateTime updatedAt;
  String email;
  String fullName;
  bool isPartnerSharedBy;
  bool isPartnerSharedWith;
  bool isAdmin;
  String profileImagePath;
  bool? memoryEnabled;
  @Backlink(to: 'owner')
  final IsarLinks<Album> albums = IsarLinks<Album>();
  @Backlink(to: 'sharedUsers')
  final IsarLinks<Album> sharedAlbums = IsarLinks<Album>();

  @override
  bool operator ==(other) {
    if (other is! User) return false;
    return id == other.id &&
        updatedAt.isAtSameMomentAs(other.updatedAt) &&
        email == other.email &&
        fullName == other.fullName &&
        isPartnerSharedBy == other.isPartnerSharedBy &&
        isPartnerSharedWith == other.isPartnerSharedWith &&
        profileImagePath == other.profileImagePath &&
        isAdmin == other.isAdmin &&
        memoryEnabled == other.memoryEnabled;
  }

  @override
  @ignore
  int get hashCode =>
      id.hashCode ^
      updatedAt.hashCode ^
      email.hashCode ^
      fullName.hashCode ^
      isPartnerSharedBy.hashCode ^
      isPartnerSharedWith.hashCode ^
      profileImagePath.hashCode ^
      isAdmin.hashCode ^
      memoryEnabled.hashCode;
}
