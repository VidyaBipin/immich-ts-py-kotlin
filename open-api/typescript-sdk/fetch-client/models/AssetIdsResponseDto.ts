/* tslint:disable */
/* eslint-disable */
/**
 * Immich
 * Immich API
 *
 * The version of the OpenAPI document: 1.94.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AssetIdsResponseDto
 */
export interface AssetIdsResponseDto {
    /**
     * 
     * @type {string}
     * @memberof AssetIdsResponseDto
     */
    assetId: string;
    /**
     * 
     * @type {string}
     * @memberof AssetIdsResponseDto
     */
    error?: AssetIdsResponseDtoErrorEnum;
    /**
     * 
     * @type {boolean}
     * @memberof AssetIdsResponseDto
     */
    success: boolean;
}


/**
 * @export
 */
export const AssetIdsResponseDtoErrorEnum = {
    Duplicate: 'duplicate',
    NoPermission: 'no_permission',
    NotFound: 'not_found'
} as const;
export type AssetIdsResponseDtoErrorEnum = typeof AssetIdsResponseDtoErrorEnum[keyof typeof AssetIdsResponseDtoErrorEnum];


/**
 * Check if a given object implements the AssetIdsResponseDto interface.
 */
export function instanceOfAssetIdsResponseDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "assetId" in value;
    isInstance = isInstance && "success" in value;

    return isInstance;
}

export function AssetIdsResponseDtoFromJSON(json: any): AssetIdsResponseDto {
    return AssetIdsResponseDtoFromJSONTyped(json, false);
}

export function AssetIdsResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AssetIdsResponseDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'assetId': json['assetId'],
        'error': !exists(json, 'error') ? undefined : json['error'],
        'success': json['success'],
    };
}

export function AssetIdsResponseDtoToJSON(value?: AssetIdsResponseDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'assetId': value.assetId,
        'error': value.error,
        'success': value.success,
    };
}

