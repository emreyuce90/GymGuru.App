import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';

type CustomButtonPropTypes = {
	onPress: () => void;
	text: string;
	type: 'primary' | 'secondary' | 'disabled';
	loading?: boolean;
};

const CustomButton = (props: CustomButtonPropTypes) => {
	const { onPress, text, type = 'primary', loading } = props;

	return (
		<Pressable
			onPress={onPress}
			className={`${type === 'primary' ? 'bg-[#3B71F3]' : ''} ${
				type === 'disabled' ? 'bg-gray-400' : ''
			} w-full p-3 mx-2 items-center rounded-lg m-1 flex flex-row justify-center space-x-4`}
		>
			{loading && <ActivityIndicator color={`${type === 'primary' ? 'white' : 'blue'}`} />}
			<Text
				className={`${
					type === 'primary' ? 'text-white font-bold' : 'text-slate-500 font-semibold'
				} `}
			>
				{text}
			</Text>
		</Pressable>
	);
};

export default CustomButton;
