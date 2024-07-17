import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import CustomInput from './components/CustomInput';
import { emailValidator } from '.';
import CustomButton from './components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
	const navigation = useNavigation<any>();

	const [email, setEmail] = useState<string>();
	const [emailError, setEMailError] = useState<string>();

	const handleEmail = useCallback(
		(val) => {
			setEmail(val);
			if (!emailValidator(val)) {
				setEMailError('Wrong e-mail format');
			} else {
				setEMailError('');
			}
		},
		[email]
	);

	const handleForgotPassword = useCallback(() => {
		if (email && !emailError) {
			navigation.navigate('ResetPassword');
		}
	}, [email, emailError]);

	return (
		<ScrollView
			contentContainerStyle={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				padding: 8,
			}}
		>
			<Text className="text-2xl font-bold pb-8">Reset Your Password</Text>
			<CustomInput
				success={!emailError && email ? true : false}
				value={email}
				setValue={handleEmail}
				placeholder="Your registered email"
				errorMessage={emailError}
			/>
			<CustomButton text="Send" type="primary" onPress={handleForgotPassword} />
			<CustomButton
				text="Back To Login"
				type="secondary"
				onPress={() => navigation.navigate('Login')}
			/>
		</ScrollView>
	);
};

export default ForgotPassword;
