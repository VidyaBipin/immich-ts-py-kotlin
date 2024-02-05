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
 * @interface MergePersonDto
 */
export interface MergePersonDto {
    /**
     * 
     * @type {Array<string>}
     * @memberof MergePersonDto
     */
    ids: Array<string>;
}

/**
 * Check if a given object implements the MergePersonDto interface.
 */
export function instanceOfMergePersonDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "ids" in value;

    return isInstance;
}

export function MergePersonDtoFromJSON(json: any): MergePersonDto {
    return MergePersonDtoFromJSONTyped(json, false);
}

export function MergePersonDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MergePersonDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ids': json['ids'],
    };
}

export function MergePersonDtoToJSON(value?: MergePersonDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ids': value.ids,
    };
}

