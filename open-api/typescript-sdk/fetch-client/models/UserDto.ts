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
import type { UserAvatarColor } from './UserAvatarColor';
import {
    UserAvatarColorFromJSON,
    UserAvatarColorFromJSONTyped,
    UserAvatarColorToJSON,
} from './UserAvatarColor';

/**
 * 
 * @export
 * @interface UserDto
 */
export interface UserDto {
    /**
     * 
     * @type {UserAvatarColor}
     * @memberof UserDto
     */
    avatarColor: UserAvatarColor;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    profileImagePath: string;
}

/**
 * Check if a given object implements the UserDto interface.
 */
export function instanceOfUserDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "avatarColor" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "profileImagePath" in value;

    return isInstance;
}

export function UserDtoFromJSON(json: any): UserDto {
    return UserDtoFromJSONTyped(json, false);
}

export function UserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'avatarColor': UserAvatarColorFromJSON(json['avatarColor']),
        'email': json['email'],
        'id': json['id'],
        'name': json['name'],
        'profileImagePath': json['profileImagePath'],
    };
}

export function UserDtoToJSON(value?: UserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'avatarColor': UserAvatarColorToJSON(value.avatarColor),
        'email': value.email,
        'id': value.id,
        'name': value.name,
        'profileImagePath': value.profileImagePath,
    };
}

