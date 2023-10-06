import type { AssetResponseDto, ServerVersionResponseDto } from '@api';
import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

interface PersonFace {
  assetId: string;
  personId: string;
}

export const websocketStore = {
  onUploadSuccess: writable<AssetResponseDto>(),
  onAssetDelete: writable<string>(),
  onPersonThumbnail: writable<PersonFace>(),
  serverVersion: writable<ServerVersionResponseDto>(),
  connected: writable<boolean>(false),
};

export const openWebsocketConnection = () => {
  try {
    const websocket = io('', {
      path: '/api/socket.io',
      transports: ['polling'],
      reconnection: true,
      forceNew: true,
      autoConnect: true,
    });

    websocket
      .on('connect', () => websocketStore.connected.set(true))
      .on('disconnect', () => websocketStore.connected.set(false))
      // .on('on_upload_success', (data) => websocketStore.onUploadSuccess.set(JSON.parse(data) as AssetResponseDto))
      .on('on_asset_delete', (data) => websocketStore.onAssetDelete.set(JSON.parse(data) as string))
      .on('on_person_thumbnail', (data) => {
        console.log(data);
        websocketStore.onPersonThumbnail.set(JSON.parse(data) as PersonFace);
      })
      .on('on_server_version', (data) => websocketStore.serverVersion.set(JSON.parse(data) as ServerVersionResponseDto))
      .on('error', (e) => console.log('Websocket Error', e));

    return () => websocket?.close();
  } catch (e) {
    console.log('Cannot connect to websocket ', e);
  }
};
