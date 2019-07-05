import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

// Function source: https://github.com/udacity/reactnd-chirper-app
export function generateUID () {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function createNotification() {
	return {
		title: 'Study is important!',
		body: "Hey! Don't forget to study today!",
		ios: {
			sound: true
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	}
}

export function clearLocalNotification() {
	console.log('clearing local notification... (completed quiz)')
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then(data => {
			if(data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({status}) => {
						if(status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync()
							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate() + 1)
							tomorrow.setHours(18)
							tomorrow.setMinutes(15)
							Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day'
								}
							)

							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
			}
		})
}