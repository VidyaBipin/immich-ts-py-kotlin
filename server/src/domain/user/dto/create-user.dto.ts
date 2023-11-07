import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Optional, toEmail, toSanitized } from '../../domain.util';

export class CreateUserDto {
  @IsEmail({ require_tld: false })
  @Transform(toEmail)
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @Optional({ nullable: true })
  @IsString()
  @Transform(toSanitized)
  storageLabel?: string | null;

  @Optional({ nullable: true })
  @IsString()
  externalPath?: string | null;

  @Optional()
  @IsBoolean()
  memoriesEnabled?: boolean;
}

export class CreateAdminDto {
  @IsNotEmpty()
  isAdmin!: true;

  @IsEmail({ require_tld: false })
  @Transform(({ value }) => value?.toLowerCase())
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  fullName!: string;
}

export class CreateUserOAuthDto {
  @IsEmail({ require_tld: false })
  @Transform(({ value }) => value?.toLowerCase())
  email!: string;

  @IsNotEmpty()
  oauthId!: string;

  fullName?: string;
}
