import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationProvider';

function useNotificationContext() {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error('NotificationContext was null, please check the context provider');
	}
	return context;
}

export default useNotificationContext;
