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


/**
 * 
 * @export
 */
export const VideoCodec = {
    H264: 'h264',
    Hevc: 'hevc',
    Vp9: 'vp9'
} as const;
export type VideoCodec = typeof VideoCodec[keyof typeof VideoCodec];


export function VideoCodecFromJSON(json: any): VideoCodec {
    return VideoCodecFromJSONTyped(json, false);
}

export function VideoCodecFromJSONTyped(json: any, ignoreDiscriminator: boolean): VideoCodec {
    return json as VideoCodec;
}

export function VideoCodecToJSON(value?: VideoCodec | null): any {
    return value as any;
}

