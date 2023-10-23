import { AssetEntity, AssetFaceEntity, PersonEntity } from '@app/infra/entities';
export const IPersonRepository = 'IPersonRepository';

export interface PersonSearchOptions {
  minimumFaceCount: number;
  withHidden: boolean;
}

export interface AssetFaceId {
  assetId: string;
  personId: string;
}

export interface UpdateFacesData {
  oldPersonId: string;
  newPersonId: string;
}

export interface IPersonRepository {
  getAll(): Promise<PersonEntity[]>;
  getAllWithoutThumbnail(): Promise<PersonEntity[]>;
  getAllForUser(userId: string, options: PersonSearchOptions): Promise<PersonEntity[]>;
  getAllWithoutFaces(): Promise<PersonEntity[]>;
  getById(personId: string): Promise<PersonEntity | null>;
  getByName(userId: string, personName: string, withHidden: boolean | undefined): Promise<PersonEntity[]>;

  getAssets(personId: string): Promise<AssetEntity[]>;
  prepareReassignFaces(data: UpdateFacesData): Promise<string[]>;
  reassignFaces(data: UpdateFacesData): Promise<number>;

  create(entity: Partial<PersonEntity>): Promise<PersonEntity>;
  update(entity: Partial<PersonEntity>): Promise<PersonEntity>;
  delete(entity: PersonEntity): Promise<PersonEntity | null>;
  deleteAll(): Promise<number>;

  getStatistics(personId: string): Promise<number>;

  getAllFaces(): Promise<AssetFaceEntity[]>;
  getFacesByIds(ids: AssetFaceId[]): Promise<AssetFaceEntity[]>;
  getRandomFace(personId: string): Promise<AssetFaceEntity | null>;
  createFace(entity: Partial<AssetFaceEntity>): Promise<AssetFaceEntity>;
}
