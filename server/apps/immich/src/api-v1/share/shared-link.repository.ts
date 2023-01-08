import { SharedLinkEntity } from '@app/database/entities/shared-link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Logger } from '@nestjs/common';

export interface ISharedLinkRepository {
  get(userId: string): Promise<SharedLinkEntity[]>;
  getbyId(id: string): Promise<SharedLinkEntity | null>;
  getByIdAndUserId(id: string, userId: string): Promise<SharedLinkEntity | null>;
  getByKey(key: string): Promise<SharedLinkEntity | null>;
  create(payload: SharedLinkEntity): Promise<SharedLinkEntity>;
  remove(entity: SharedLinkEntity): Promise<SharedLinkEntity>;
  save(entity: SharedLinkEntity): Promise<SharedLinkEntity>;
}

export const ISharedLinkRepository = 'ISharedLinkRepository';

export class SharedLinkRepository implements ISharedLinkRepository {
  readonly logger = new Logger(SharedLinkRepository.name);
  constructor(
    @InjectRepository(SharedLinkEntity)
    private readonly sharedLinkRepository: Repository<SharedLinkEntity>,
  ) {}
  async getByIdAndUserId(id: string, userId: string): Promise<SharedLinkEntity | null> {
    return await this.sharedLinkRepository.findOne({
      where: {
        userId: userId,
        id: id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async get(userId: string): Promise<SharedLinkEntity[]> {
    return await this.sharedLinkRepository.find({
      where: {
        userId: userId,
      },
      relations: ['assets', 'album'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(payload: SharedLinkEntity): Promise<SharedLinkEntity> {
    return await this.sharedLinkRepository.save(payload);
  }

  async getbyId(id: string): Promise<SharedLinkEntity | null> {
    return await this.sharedLinkRepository.findOne({
      where: {
        id: id,
      },
      relations: ['assets', 'album'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getByKey(key: string): Promise<SharedLinkEntity | null> {
    return await this.sharedLinkRepository.findOne({
      where: {
        key: Buffer.from(key, 'hex'),
      },
      relations: ['assets', 'album'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async remove(entity: SharedLinkEntity): Promise<SharedLinkEntity> {
    return await this.sharedLinkRepository.remove(entity);
  }

  async save(entity: SharedLinkEntity): Promise<SharedLinkEntity> {
    return await this.sharedLinkRepository.save(entity);
  }
}
