import { UserEntity } from '@app/database/entities/user.entity';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { newUserRepositoryMock } from '../../../test/test-utils';
import { AuthUserDto } from '../../decorators/auth-user.decorator';
import { IUserRepository } from './user-repository';
import { when } from 'jest-when';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let sut: UserService;
  let userRepositoryMock: jest.Mocked<IUserRepository>;

  const adminUserAuth: AuthUserDto = Object.freeze({
    id: 'admin_id',
    email: 'admin@test.com',
    isAdmin: true,
  });

  const immichUserAuth: AuthUserDto = Object.freeze({
    id: 'immich_id',
    email: 'immich@test.com',
    isAdmin: false,
  });

  const adminUser: UserEntity = Object.freeze({
    id: adminUserAuth.id,
    email: 'admin@test.com',
    password: 'admin_password',
    salt: 'admin_salt',
    firstName: 'admin_first_name',
    lastName: 'admin_last_name',
    isAdmin: true,
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '',
    createdAt: '2021-01-01',
    tags: [],
  };

  const immichUser: UserEntity = Object.freeze({
    id: immichUserAuth.id,
    email: 'immich@test.com',
    password: 'immich_password',
    salt: 'immich_salt',
    firstName: 'immich_first_name',
    lastName: 'immich_last_name',
    isAdmin: false,
    oauthId: '',
    shouldChangePassword: false,
    profileImagePath: '',
    createdAt: '2021-01-01',
    tags: [],
  };

  const updatedImmichUser: UserEntity = Object.freeze({
    id: immichUserAuth.id,
    email: 'immich@test.com',
    password: 'immich_password',
    salt: 'immich_salt',
    firstName: 'updated_immich_first_name',
    lastName: 'updated_immich_last_name',
    isAdmin: false,
    oauthId: '',
    shouldChangePassword: true,
    profileImagePath: '',
    createdAt: '2021-01-01',
    tags: [],
  };

  beforeEach(() => {
    userRepositoryMock = newUserRepositoryMock();
    when(userRepositoryMock.get).calledWith(adminUser.id).mockResolvedValue(adminUser);
    when(userRepositoryMock.get).calledWith(adminUser.id, undefined).mockResolvedValue(adminUser);
    when(userRepositoryMock.get).calledWith(immichUser.id, undefined).mockResolvedValue(immichUser);

    sut = new UserService(userRepositoryMock);
  });

  describe('Update user', () => {
    it('should update user', async () => {
      const update: UpdateUserDto = {
        id: immichUser.id,
        shouldChangePassword: true,
      };

      when(userRepositoryMock.update).calledWith(update.id, update).mockResolvedValueOnce(updatedImmichUser);

      const updatedUser = await sut.updateUser(immichUserAuth, update);
      expect(updatedUser.shouldChangePassword).toEqual(true);
    });

    it('user can only update its information', async () => {
      when(userRepositoryMock.get)
        .calledWith('not_immich_auth_user_id', undefined)
        .mockResolvedValueOnce({
          ...immichUser,
          id: 'not_immich_auth_user_id',
        });

      const result = sut.updateUser(immichUserAuth, {
        id: 'not_immich_auth_user_id',
        password: 'I take over your account now',
      });
      await expect(result).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('admin can update any user information', async () => {
      const update: UpdateUserDto = {
        id: immichUser.id,
        shouldChangePassword: true,
      };

      when(userRepositoryMock.update).calledWith(immichUser.id, update).mockResolvedValueOnce(updatedImmichUser);

      const result = await sut.updateUser(adminUserAuth, update);

      expect(result).toBeDefined();
      expect(result.id).toEqual(updatedImmichUser.id);
      expect(result.shouldChangePassword).toEqual(updatedImmichUser.shouldChangePassword);
    });

    it('update user information should throw error if user not found', async () => {
      when(userRepositoryMock.get).calledWith(immichUser.id, undefined).mockResolvedValueOnce(null);

      const result = sut.updateUser(adminUser, {
        id: immichUser.id,
        shouldChangePassword: true,
      });

      await expect(result).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Delete user', () => {
    it('cannot delete admin user', async () => {
      const result = sut.deleteUser(adminUserAuth, adminUserAuth.id);

      await expect(result).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('Create user', () => {
    it('should not create a user if there is no local admin account', async () => {
      when(userRepositoryMock.getAdmin).calledWith().mockResolvedValueOnce(null);

      await expect(
        sut.createUser({
          email: 'john_smith@email.com',
          firstName: 'John',
          lastName: 'Smith',
          password: 'password',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
