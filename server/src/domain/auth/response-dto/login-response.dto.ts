import { UserEntity } from '@app/infra/entities';
import { ApiResponseProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiResponseProperty()
  accessToken!: string;

  @ApiResponseProperty()
  userId!: string;

  @ApiResponseProperty()
  userEmail!: string;

  @ApiResponseProperty()
  name!: string;

  @ApiResponseProperty()
  profileImagePath!: string;

  @ApiResponseProperty()
  isAdmin!: boolean;

  @ApiResponseProperty()
  shouldChangePassword!: boolean;
}

export function mapLoginResponse(entity: UserEntity, accessToken: string): LoginResponseDto {
  return {
    accessToken: accessToken,
    userId: entity.id,
    userEmail: entity.email,
    name: entity.name,
    isAdmin: entity.isAdmin,
    profileImagePath: entity.profileImagePath,
    shouldChangePassword: entity.shouldChangePassword,
  };
}
