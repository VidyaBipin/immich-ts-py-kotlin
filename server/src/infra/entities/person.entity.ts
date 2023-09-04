import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssetFaceEntity } from './asset-face.entity';
import { UserEntity } from './user.entity';
import { AssetEntity } from './asset.entity';

@Entity('person')
export class PersonEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @Column()
  ownerId!: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false })
  owner!: UserEntity;

  @Column({ default: '' })
  name!: string;

  @Column({ type: 'date', nullable: true })
  birthDate!: Date | null;

  @Column({ default: '' })
  thumbnailPath!: string;

  @Column({ type: 'uuid', nullable: true })
  faceAssetId!: string | null;

  @OneToOne(() => AssetEntity, { onDelete: 'SET NULL', nullable: true })
  faceAsset!: AssetEntity | null;

  @OneToMany(() => AssetFaceEntity, (assetFace) => assetFace.person)
  faces!: AssetFaceEntity[];

  @Column({ default: false })
  isHidden!: boolean;
}
