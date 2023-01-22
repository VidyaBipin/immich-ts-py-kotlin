import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserEntity } from '@app/infra';
import { LoginResponseDto } from '../../api-v1/auth/response-dto/login-response.dto';
import { AuthType } from '../../constants/jwt.constant';
import { ImmichJwtService } from './immich-jwt.service';
import { UserService } from '@app/domain';

describe('ImmichJwtService', () => {
  let jwtServiceMock: jest.Mocked<JwtService>;
  let userServiceMock: jest.Mocked<UserService>;
  let sut: ImmichJwtService;

  beforeEach(() => {
    jwtServiceMock = {
      sign: jest.fn(),
      verifyAsync: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    userServiceMock = {
      getUserById: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    sut = new ImmichJwtService(jwtServiceMock, userServiceMock);
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('getCookieNames', () => {
    it('should return the cookie names', async () => {
      expect(sut.getCookieNames()).toEqual(['immich_access_token', 'immich_auth_type']);
    });
  });

  describe('getCookies', () => {
    it('should generate the cookie headers (secure)', async () => {
      jwtServiceMock.sign.mockImplementation((value) => value as string);
      const dto = { accessToken: 'test-user@immich.com', userId: 'test-user' };
      const cookies = sut.getCookies(dto as LoginResponseDto, AuthType.PASSWORD, true);
      expect(cookies).toEqual([
        'immich_access_token=test-user@immich.com; Secure; Path=/; Max-Age=604800; SameSite=Strict;',
        'immich_auth_type=password; Secure; Path=/; Max-Age=604800; SameSite=Strict;',
      ]);
    });

    it('should generate the cookie headers (insecure)', () => {
      jwtServiceMock.sign.mockImplementation((value) => value as string);
      const dto = { accessToken: 'test-user@immich.com', userId: 'test-user' };
      const cookies = sut.getCookies(dto as LoginResponseDto, AuthType.PASSWORD, false);
      expect(cookies).toEqual([
        'immich_access_token=test-user@immich.com; HttpOnly; Path=/; Max-Age=604800 SameSite=Strict;',
        'immich_auth_type=password; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict;',
      ]);
    });
  });

  describe('createLoginResponse', () => {
    it('should create the login response', async () => {
      jwtServiceMock.sign.mockReturnValue('fancy-token');
      const user: UserEntity = {
        id: 'user',
        firstName: 'immich',
        lastName: 'user',
        isAdmin: false,
        email: 'test@immich.com',
        password: 'changeme',
        oauthId: '',
        profileImagePath: '',
        shouldChangePassword: false,
        createdAt: 'today',
        tags: [],
      };

      const dto: LoginResponseDto = {
        accessToken: 'fancy-token',
        firstName: 'immich',
        isAdmin: false,
        lastName: 'user',
        profileImagePath: '',
        shouldChangePassword: false,
        userEmail: 'test@immich.com',
        userId: 'user',
      };
      await expect(sut.createLoginResponse(user)).resolves.toEqual(dto);
    });
  });

  describe('validateToken', () => {
    it('should validate the token', async () => {
      const dto = { userId: 'test-user', email: 'test-user@immich.com' };
      jwtServiceMock.verifyAsync.mockImplementation(() => dto as any);
      const response = await sut.validateToken('access-token');

      expect(jwtServiceMock.verifyAsync).toHaveBeenCalledTimes(1);
      expect(response).toEqual({ userId: 'test-user', status: true });
    });

    it('should handle an invalid token', async () => {
      jwtServiceMock.verifyAsync.mockImplementation(() => {
        throw new Error('Invalid token!');
      });

      const error = jest.spyOn(Logger, 'error');
      error.mockImplementation(() => null);
      const response = await sut.validateToken('access-token');

      expect(jwtServiceMock.verifyAsync).toHaveBeenCalledTimes(1);
      expect(error).toHaveBeenCalledTimes(1);
      expect(response).toEqual({ userId: null, status: false });
    });
  });

  describe('extractJwtFromHeader', () => {
    it('should handle no authorization header', () => {
      const request = {
        headers: {},
      } as Request;
      const token = sut.extractJwtFromHeader(request.headers);
      expect(token).toBe(null);
    });

    it('should get the token from the authorization header', () => {
      const upper = {
        headers: {
          authorization: 'Bearer token',
        },
      } as Request;

      const lower = {
        headers: {
          authorization: 'bearer token',
        },
      } as Request;

      expect(sut.extractJwtFromHeader(upper.headers)).toBe('token');
      expect(sut.extractJwtFromHeader(lower.headers)).toBe('token');
    });
  });

  describe('extracJwtFromCookie', () => {
    it('should handle no cookie', () => {
      const request = {} as Request;
      const token = sut.extractJwtFromCookie(request.cookies);
      expect(token).toBe(null);
    });

    it('should get the token from the immich cookie', () => {
      const request = {
        cookies: {
          immich_access_token: 'cookie',
        },
      } as Request;
      const token = sut.extractJwtFromCookie(request.cookies);
      expect(token).toBe('cookie');
    });
  });
});
