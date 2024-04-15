import {
  ArgumentMetadata,
  BadRequestException,
  FileValidator,
  Injectable,
  ParseUUIDPipe,
  applyDecorators,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
  ValidationOptions,
  isDateString,
} from 'class-validator';
import { CronJob } from 'cron';
import sanitize from 'sanitize-filename';
import { ID_SIZE } from 'src/entities/asset.entity';

@Injectable()
export class ParseMeUUIDPipe extends ParseUUIDPipe {
  async transform(value: string, metadata: ArgumentMetadata) {
    if (value == 'me') {
      return value;
    }
    return super.transform(value, metadata);
  }
}

@Injectable()
export class FileNotEmptyValidator extends FileValidator {
  constructor(private requiredFields: string[]) {
    super({});
    this.requiredFields = requiredFields;
  }

  isValid(files?: any): boolean {
    if (!files) {
      return false;
    }

    return this.requiredFields.every((field) => files[field]);
  }

  buildErrorMessage(): string {
    return `Field(s) ${this.requiredFields.join(', ')} should not be empty`;
  }
}

export class UUIDParamDto {
  @MinLength(ID_SIZE)
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  id!: string;
}

export interface OptionalOptions extends ValidationOptions {
  nullable?: boolean;
}

/**
 * Checks if value is missing and if so, ignores all validators.
 *
 * @param validationOptions {@link OptionalOptions}
 *
 * @see IsOptional exported from `class-validator.
 */
// https://stackoverflow.com/a/71353929
export function Optional({ nullable, ...validationOptions }: OptionalOptions = {}) {
  if (nullable === true) {
    return IsOptional(validationOptions);
  }

  return ValidateIf((object: any, v: any) => v !== undefined, validationOptions);
}

type UUIDOptions = { optional?: boolean; each?: boolean };
export const ValidateUUID = (options?: UUIDOptions) => {
  const { optional, each } = { optional: false, each: false, ...options };
  return applyDecorators(
    IsUUID('4', { each }),
    ApiProperty({ format: 'uuid' }),
    optional ? Optional() : IsNotEmpty(),
    each ? IsArray() : IsString(),
  );
};

type IdOptions = { optional?: boolean; each?: boolean };
export const ValidateAssetId = (options?: IdOptions) => {
  const { optional, each } = { optional: false, each: false, ...options };
  return applyDecorators(
    MinLength(ID_SIZE),
    ApiProperty({ format: 'uuid' }),
    optional ? Optional() : IsNotEmpty(),
    each ? IsArray() : IsString(),
  );
};

type DateOptions = { optional?: boolean; nullable?: boolean; format?: 'date' | 'date-time' };
export const ValidateDate = (options?: DateOptions) => {
  const { optional, nullable, format } = { optional: false, nullable: false, format: 'date-time', ...options };

  const decorators = [
    ApiProperty({ format }),
    IsDate(),
    optional ? Optional({ nullable: true }) : IsNotEmpty(),
    Transform(({ key, value }) => {
      if (value === null || value === undefined) {
        return value;
      }

      if (!isDateString(value)) {
        throw new BadRequestException(`${key} must be a date string`);
      }

      return new Date(value as string);
    }),
  ];

  if (optional) {
    decorators.push(Optional({ nullable }));
  }

  return applyDecorators(...decorators);
};

type BooleanOptions = { optional?: boolean };
export const ValidateBoolean = (options?: BooleanOptions) => {
  const { optional } = { optional: false, ...options };
  const decorators = [
    // ApiProperty(),
    IsBoolean(),
    Transform(({ value }) => {
      if (value == 'true') {
        return true;
      } else if (value == 'false') {
        return false;
      }
      return value;
    }),
  ];

  if (optional) {
    decorators.push(Optional());
  }

  return applyDecorators(...decorators);
};

export function validateCronExpression(expression: string) {
  try {
    new CronJob(expression, () => {});
  } catch {
    return false;
  }

  return true;
}

type IValue = { value: string };

export const toEmail = ({ value }: IValue) => value?.toLowerCase();

export const toSanitized = ({ value }: IValue) => sanitize((value || '').replaceAll('.', ''));

export const isValidInteger = (value: number, options: { min?: number; max?: number }): value is number => {
  const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = options;
  return Number.isInteger(value) && value >= min && value <= max;
};
