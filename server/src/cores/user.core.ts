import { BadRequestException, ForbiddenException } from '@nestjs/common';
import sanitize from 'sanitize-filename';
import { SALT_ROUNDS } from 'src/constants';
import { UserResponseDto } from 'src/dtos/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { ICryptoRepository } from 'src/interfaces/crypto.interface';
import { IUserRepository } from 'src/interfaces/user.interface';

let instance: UserCore | null;

export class UserCore {
  private constructor(
    private cryptoRepository: ICryptoRepository,
    private userRepository: IUserRepository,
  ) {}

  static create(cryptoRepository: ICryptoRepository, userRepository: IUserRepository) {
    if (!instance) {
      instance = new UserCore(cryptoRepository, userRepository);
    }

    return instance;
  }

  static reset() {
    instance = null;
  }

  // TODO: move auth related checks to the service layer
  async updateUser(user: UserEntity | UserResponseDto, id: string, dto: Partial<UserEntity>): Promise<UserEntity> {
    if (!user.isAdmin && user.id !== id) {
      throw new ForbiddenException('You are not allowed to update this user');
    }

    if (!user.isAdmin) {
      // Users can never update the isAdmin property.
      delete dto.isAdmin;
      delete dto.storageLabel;
    } else if (dto.isAdmin && user.id !== id) {
      // Admin cannot create another admin.
      throw new BadRequestException('The server already has an admin');
    }

    if (dto.email) {
      const duplicate = await this.userRepository.getByEmail(dto.email);
      if (duplicate && duplicate.id !== id) {
        throw new BadRequestException('Email already in use by another account');
      }
    }

    if (dto.storageLabel) {
      const duplicate = await this.userRepository.getByStorageLabel(dto.storageLabel);
      if (duplicate && duplicate.id !== id) {
        throw new BadRequestException('Storage label already in use by another account');
      }
    }

    if (dto.password) {
      dto.password = await this.cryptoRepository.hashBcrypt(dto.password, SALT_ROUNDS);
    }

    if (dto.storageLabel === '') {
      dto.storageLabel = null;
    }

    return this.userRepository.update(id, { ...dto, updatedAt: new Date() });
  }

  async createUser(dto: Partial<UserEntity> & { email: string }): Promise<UserEntity> {
    const user = await this.userRepository.getByEmail(dto.email);
    if (user) {
      throw new BadRequestException('User exists');
    }

    if (!dto.isAdmin) {
      const localAdmin = await this.userRepository.getAdmin();
      if (!localAdmin) {
        throw new BadRequestException('The first registered account must the administrator.');
      }
    }

    const payload: Partial<UserEntity> = { ...dto };
    if (payload.password) {
      payload.password = await this.cryptoRepository.hashBcrypt(payload.password, SALT_ROUNDS);
    }
    if (payload.storageLabel) {
      payload.storageLabel = sanitize(payload.storageLabel.replaceAll('.', ''));
    }

    return this.userRepository.create(payload);
  }
}
