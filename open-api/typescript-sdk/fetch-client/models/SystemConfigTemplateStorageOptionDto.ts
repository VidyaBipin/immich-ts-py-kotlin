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
 * @interface SystemConfigTemplateStorageOptionDto
 */
export interface SystemConfigTemplateStorageOptionDto {
    /**
     * 
     * @type {Array<string>}
     * @memberof SystemConfigTemplateStorageOptionDto
     */
    dayOptions: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SystemConfigTemplateStorageOptionDto
     */
    hourOptions: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SystemConfigTemplateStorageOptionDto
     */
    minuteOptions: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SystemConfigTemplateStorageOptionDto
     */
    monthOptions: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SystemConfigTemplateStorageOptionDto
     */
    presetOptions: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SystemConfigTemplateStorageOptionDto
     */
    secondOptions: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SystemConfigTemplateStorageOptionDto
     */
    weekOptions: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SystemConfigTemplateStorageOptionDto
     */
    yearOptions: Array<string>;
}

/**
 * Check if a given object implements the SystemConfigTemplateStorageOptionDto interface.
 */
export function instanceOfSystemConfigTemplateStorageOptionDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "dayOptions" in value;
    isInstance = isInstance && "hourOptions" in value;
    isInstance = isInstance && "minuteOptions" in value;
    isInstance = isInstance && "monthOptions" in value;
    isInstance = isInstance && "presetOptions" in value;
    isInstance = isInstance && "secondOptions" in value;
    isInstance = isInstance && "weekOptions" in value;
    isInstance = isInstance && "yearOptions" in value;

    return isInstance;
}

export function SystemConfigTemplateStorageOptionDtoFromJSON(json: any): SystemConfigTemplateStorageOptionDto {
    return SystemConfigTemplateStorageOptionDtoFromJSONTyped(json, false);
}

export function SystemConfigTemplateStorageOptionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SystemConfigTemplateStorageOptionDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'dayOptions': json['dayOptions'],
        'hourOptions': json['hourOptions'],
        'minuteOptions': json['minuteOptions'],
        'monthOptions': json['monthOptions'],
        'presetOptions': json['presetOptions'],
        'secondOptions': json['secondOptions'],
        'weekOptions': json['weekOptions'],
        'yearOptions': json['yearOptions'],
    };
}

export function SystemConfigTemplateStorageOptionDtoToJSON(value?: SystemConfigTemplateStorageOptionDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'dayOptions': value.dayOptions,
        'hourOptions': value.hourOptions,
        'minuteOptions': value.minuteOptions,
        'monthOptions': value.monthOptions,
        'presetOptions': value.presetOptions,
        'secondOptions': value.secondOptions,
        'weekOptions': value.weekOptions,
        'yearOptions': value.yearOptions,
    };
}

