import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { of } from 'rxjs';
import { AssetMediaResponseDto, AssetMediaStatus } from 'src/dtos/asset-media-response.dto';
import { ImmichHeader } from 'src/dtos/auth.dto';
import { AuthenticatedRequest } from 'src/middleware/auth.guard';
import { AssetMediaService } from 'src/services/asset-media.service';
import { fromMaybeArray } from 'src/utils/request';

@Injectable()
export class AssetUploadInterceptor implements NestInterceptor {
  constructor(private service: AssetMediaService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const res = context.switchToHttp().getResponse<Response<AssetMediaResponseDto>>();

    const checksum = fromMaybeArray(req.headers[ImmichHeader.CHECKSUM]);
    const response = await this.service.getUploadAssetIdByChecksum(req.user, checksum);
    if (response) {
      res.status(200);
      // Returning the response body wrapped in an Observable will cause nestjs
      // to use it, and skip all downstream request processing.
      return of({ status: AssetMediaStatus.DUPLICATE, id: response.id });
    }

    return next.handle();
  }
}
