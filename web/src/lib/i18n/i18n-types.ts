// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'cn'
	| 'en'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * H​e​l​l​o​ ​W​o​r​l​d​!
	 */
	HI: string
	word: {
		/**
		 * P​h​o​t​o​s
		 */
		photos: string
		/**
		 * E​x​p​l​o​r​e
		 */
		explore: string
		/**
		 * M​a​p
		 */
		map: string
		/**
		 * S​h​a​r​i​n​g
		 */
		sharing: string
		/**
		 * L​i​b​r​a​r​y
		 */
		library: string
		/**
		 * F​a​v​o​r​i​t​e​s
		 */
		favorites: string
		/**
		 * A​l​b​u​m​s
		 */
		albums: string
		/**
		 * A​r​c​h​i​v​e
		 */
		archive: string
		/**
		 * S​t​o​r​a​g​e
		 */
		storage: string
		/**
		 * S​e​r​v​e​r
		 */
		server: string
		/**
		 * S​t​a​t​u​s
		 */
		status: string
		/**
		 * V​e​r​s​i​o​n
		 */
		version: string
		/**
		 * O​n​l​i​n​e
		 */
		online: string
		/**
		 * O​f​f​l​i​n​e
		 */
		offline: string
		/**
		 * U​p​l​o​a​d
		 */
		upload: string
		/**
		 * A​d​m​i​n​i​s​t​r​a​t​i​o​n
		 */
		administration: string
		/**
		 * S​e​t​t​i​n​g​s
		 */
		settings: string
	}
	account: {
		/**
		 * A​c​c​o​u​n​t​ ​S​e​t​t​i​n​g​s
		 */
		account_settings: string
		/**
		 * S​i​g​n​ ​I​n
		 */
		sign_in: string
		/**
		 * S​i​g​n​ ​O​u​t
		 */
		sign_out: string
	}
	user_settings: {
		/**
		 * A​c​c​o​u​n​t
		 */
		account: string
		/**
		 * M​a​n​a​g​e​ ​y​o​u​r​ ​a​c​c​o​u​n​t
		 */
		account_subtitle: string
		/**
		 * A​P​I​ ​K​e​y​s
		 */
		api_keys: string
		/**
		 * M​a​n​a​g​e​ ​y​o​u​r​ ​A​P​I​ ​k​e​y​s
		 */
		api_keys_subtitle: string
		/**
		 * A​u​t​h​o​r​i​z​e​d​ ​D​e​v​i​c​e​s
		 */
		authorized_devices: string
		/**
		 * M​a​n​a​g​e​ ​y​o​u​r​ ​l​o​g​g​e​d​-​i​n​ ​d​e​v​i​c​e​s
		 */
		authorized_devices_subtitle: string
		/**
		 * O​a​u​t​h
		 */
		oauth: string
		/**
		 * M​a​n​a​g​e​ ​y​o​u​r​ ​O​A​u​t​h​ ​c​o​n​n​e​c​t​i​o​n
		 */
		oauth_subtitle: string
		/**
		 * P​a​s​s​w​o​r​d
		 */
		password: string
		/**
		 * C​h​a​n​g​e​ ​y​o​u​r​ ​p​a​s​s​w​o​r​d
		 */
		password_subtitle: string
		/**
		 * M​a​n​a​g​e​ ​s​h​a​r​i​n​g​ ​w​i​t​h​ ​p​a​r​t​n​e​r​s
		 */
		sharing_subtitle: string
	}
	storage: {
		/**
		 * {​u​s​e​d​S​p​a​c​e​}​ ​o​f​ ​{​t​o​t​a​l​S​p​a​c​e​}​ ​U​s​e​d
		 * @param {unknown} totalSpace
		 * @param {unknown} usedSpace
		 */
		usage: RequiredParams<'totalSpace' | 'usedSpace'>
	}
}

export type TranslationFunctions = {
	/**
	 * Hello World!
	 */
	HI: () => LocalizedString
	word: {
		/**
		 * Photos
		 */
		photos: () => LocalizedString
		/**
		 * Explore
		 */
		explore: () => LocalizedString
		/**
		 * Map
		 */
		map: () => LocalizedString
		/**
		 * Sharing
		 */
		sharing: () => LocalizedString
		/**
		 * Library
		 */
		library: () => LocalizedString
		/**
		 * Favorites
		 */
		favorites: () => LocalizedString
		/**
		 * Albums
		 */
		albums: () => LocalizedString
		/**
		 * Archive
		 */
		archive: () => LocalizedString
		/**
		 * Storage
		 */
		storage: () => LocalizedString
		/**
		 * Server
		 */
		server: () => LocalizedString
		/**
		 * Status
		 */
		status: () => LocalizedString
		/**
		 * Version
		 */
		version: () => LocalizedString
		/**
		 * Online
		 */
		online: () => LocalizedString
		/**
		 * Offline
		 */
		offline: () => LocalizedString
		/**
		 * Upload
		 */
		upload: () => LocalizedString
		/**
		 * Administration
		 */
		administration: () => LocalizedString
		/**
		 * Settings
		 */
		settings: () => LocalizedString
	}
	account: {
		/**
		 * Account Settings
		 */
		account_settings: () => LocalizedString
		/**
		 * Sign In
		 */
		sign_in: () => LocalizedString
		/**
		 * Sign Out
		 */
		sign_out: () => LocalizedString
	}
	user_settings: {
		/**
		 * Account
		 */
		account: () => LocalizedString
		/**
		 * Manage your account
		 */
		account_subtitle: () => LocalizedString
		/**
		 * API Keys
		 */
		api_keys: () => LocalizedString
		/**
		 * Manage your API keys
		 */
		api_keys_subtitle: () => LocalizedString
		/**
		 * Authorized Devices
		 */
		authorized_devices: () => LocalizedString
		/**
		 * Manage your logged-in devices
		 */
		authorized_devices_subtitle: () => LocalizedString
		/**
		 * Oauth
		 */
		oauth: () => LocalizedString
		/**
		 * Manage your OAuth connection
		 */
		oauth_subtitle: () => LocalizedString
		/**
		 * Password
		 */
		password: () => LocalizedString
		/**
		 * Change your password
		 */
		password_subtitle: () => LocalizedString
		/**
		 * Manage sharing with partners
		 */
		sharing_subtitle: () => LocalizedString
	}
	storage: {
		/**
		 * {usedSpace} of {totalSpace} Used
		 */
		usage: (arg: { totalSpace: unknown, usedSpace: unknown }) => LocalizedString
	}
}

export type Formatters = {}
