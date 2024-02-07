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
import type { LogLevel } from './LogLevel';
import {
    LogLevelFromJSON,
    LogLevelFromJSONTyped,
    LogLevelToJSON,
} from './LogLevel';

/**
 * 
 * @export
 * @interface SystemConfigLoggingDto
 */
export interface SystemConfigLoggingDto {
    /**
     * 
     * @type {boolean}
     * @memberof SystemConfigLoggingDto
     */
    enabled: boolean;
    /**
     * 
     * @type {LogLevel}
     * @memberof SystemConfigLoggingDto
     */
    level: LogLevel;
}

/**
 * Check if a given object implements the SystemConfigLoggingDto interface.
 */
export function instanceOfSystemConfigLoggingDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "enabled" in value;
    isInstance = isInstance && "level" in value;

    return isInstance;
}

export function SystemConfigLoggingDtoFromJSON(json: any): SystemConfigLoggingDto {
    return SystemConfigLoggingDtoFromJSONTyped(json, false);
}

export function SystemConfigLoggingDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SystemConfigLoggingDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'enabled': json['enabled'],
        'level': LogLevelFromJSON(json['level']),
    };
}

export function SystemConfigLoggingDtoToJSON(value?: SystemConfigLoggingDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'enabled': value.enabled,
        'level': LogLevelToJSON(value.level),
    };
}

