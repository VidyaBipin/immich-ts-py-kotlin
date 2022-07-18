import { Socket, io } from 'socket.io-client';
import { writable } from 'svelte/store';
import { serverEndpoint } from '../constants';

let websocket: Socket;

export const openWebsocketConnection = (accessToken: string) => {
	const websocketEndpoint = serverEndpoint.replace('/api', '');

	try {
		websocket = io(websocketEndpoint, {
			path: '/api/socket.io',
			transports: ['polling'],
			reconnection: true,
			forceNew: true,
			autoConnect: true,
			extraHeaders: {
				Authorization: 'Bearer ' + accessToken,
			},
		});

		listenToEvent(websocket);
	} catch (e) {
		console.log('Cannot connect to websocket ', e);
	}
};

const listenToEvent = (socket: Socket) => {
	socket.on('on_upload_success', (data) => {});

	socket.on('error', (e) => {
		console.log('Websocket Error', e);
	});
};

export const closeWebsocketConnection = () => {
	websocket?.close();
};
