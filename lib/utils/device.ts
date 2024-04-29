import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import * as Application from 'expo-application';
import * as Crypto from 'expo-crypto';
import { IDeviceInfo } from '../types';

export const getDeviceId = async () => {
	let deviceId = ""
	try {
		if (Platform.OS === 'android') {
			return Application.getAndroidId() ?? Crypto.randomUUID();
		} else {
			 deviceId = await SecureStore.getItemAsync('deviceId');
			if (!deviceId) {
				deviceId = Constants.deviceId ?? Crypto.randomUUID();
				await SecureStore.setItemAsync('deviceId', deviceId);
			}
			return deviceId;
		}
	} catch (error) {
		deviceId = SecureStore.getItem('deviceId') ?? Crypto.randomUUID()
		await SecureStore.setItemAsync('deviceId', deviceId);
		return deviceId 
	}	
};

export const setDeviceInfo = async (deviceInfo: IDeviceInfo) => {
	await SecureStore.setItemAsync('deviceInfo', JSON.stringify(deviceInfo));
	console.log(`\u001b[92m${'setDeviceInfo OK'}\u001b[0m`, deviceInfo);
};

export const getDeviceInfo = async () => {
	const json = await SecureStore.getItemAsync('deviceInfo');
	console.log(`\u001b[92m${'setDeviceInfo OK'}\u001b[0m`, json);
	return JSON.parse(json) as IDeviceInfo;
};
