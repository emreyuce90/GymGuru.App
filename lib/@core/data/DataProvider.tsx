import { createContext, useEffect, useMemo, useState } from 'react';
import 'moment/locale/tr';
import moment from 'moment';
import { IArticle } from '../types';
import { IParticipant, ISession, ISessionLocation, ISessionType } from '../types/Sessions';
import useSessionType from 'src/screens/sessionType/hooks/useSessionType';
import useArticles from 'src/screens/dynamic/hooks/useArticles';
import useLocations from 'src/screens/session/hooks/useLocations';
import useSessions from 'src/screens/session/hooks/useSessions';
import useParticipants from 'src/screens/session/hooks/useParticipants';
import { getDeviceInfo } from '../utils/device';
import Api from './Api';
import LoadingScreen from '../components/LoadingScreen';

export type DataContextType = {
	Sessions?: ISession[];
	SessionTypes?: ISessionType[];
	Articles?: IArticle[];
	SessionLocation?: ISessionLocation[];
	SessionDates?: string[];
	Participants?: IParticipant[];
	loading?: boolean;
};

export const DataContext = createContext<DataContextType>({});

export const DataProvider = ({ children }) => {
	const [thisLoading, setLoading] = useState(true);
	const sessionTypesState = useSessionType();
	const articlesState = useArticles();
	const locationsState = useLocations();
	const sessionsState = useSessions();
	const participantsState = useParticipants();

	const loading = useMemo(() => {
		return (
			sessionTypesState.isLoading ||
			articlesState.loading ||
			locationsState.loading ||
			sessionsState.isLoading ||
			participantsState.loading ||
			thisLoading
		);
	}, [
		sessionTypesState.isLoading,
		articlesState.loading,
		locationsState.loading,
		sessionsState.isLoading,
		participantsState.loading,
		thisLoading,
	]);

	const sessionDates = useMemo(
		() =>
			Array.from(
				sessionsState.sessions
					? new Set(
							sessionsState.sessions.map((s: ISession) => moment(s.BeginTime).format('YYYY-MM-DD'))
					  )
					: []
			),
		[sessionsState.sessions]
	);

	// TODO: add deviceInfo to server
	useEffect(() => {
		const sendDeviceInfo = async () => {
			const deviceInfo = await getDeviceInfo();
			if (deviceInfo != null) {
				await Api.put('api/auroville/device-info', deviceInfo);
			}
			setLoading(false);
		};
		sendDeviceInfo();
	}, []);

	if (loading) {
		<LoadingScreen />;
	}

	return (
		<DataContext.Provider
			value={{
				SessionTypes: sessionTypesState.sessionTypes,
				Articles: articlesState.articles,
				SessionLocation: locationsState.locations,
				Sessions: sessionsState.sessions,
				SessionDates: sessionDates,
				Participants: participantsState.participants,
				loading,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export default DataProvider;
