import { IsNotEmpty } from 'class-validator';

export class AddAssetToSharedLinkDto {
  @IsNotEmpty()
  ids!: string[];
}
