import { ScrollView, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { emailValidator, passwordValidator } from '.';

const Login = () => {
	const navigation = useNavigation<any>();
	const [email, setEmail] = useState<string>();
	const [emailError, setEMailError] = useState<string>();

	const [password, setPassword] = useState<string>();
	const [passwordError, setPasswordError] = useState<string>();

	const handleSignInPress = useCallback(() => {
		if (!emailError && email && !passwordError && password) {
			console.warn('objectToSend', { email, password });
		}
	}, []);

	const handleRegister = useCallback(() => {
		navigation.navigate('Register');
	}, []);

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

	const handlePasswordChange = useCallback(
		(value: string) => {
			setPassword(value);
			if (!passwordValidator(value)) {
				setPasswordError('Password must be at least 5 character');
			} else {
				setPasswordError('');
			}
		},
		[password]
	);

	useEffect(() => {
		if (email === '') {
			setEMailError('');
		}
		if (password === '') {
			setPasswordError('');
		}
	}, [email, password]);

	const isDisabled = emailError || passwordError || !email || !password;

	return (
		<ScrollView
			contentContainerStyle={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				padding: 20,
			}}
		>
			<Text className="text-2xl font-bold pb-8">Login</Text>
			<CustomInput
				success={!emailError && email ? true : false}
				value={email}
				setValue={handleEmail}
				placeholder="Email"
				errorMessage={emailError}
			/>
			<CustomInput
				errorMessage={passwordError}
				success={!passwordError && password ? true : false}
				value={password}
				setValue={handlePasswordChange}
				placeholder="Password"
				securityTextEntry={true}
			/>
			<CustomButton
				type={isDisabled ? 'disabled' : 'primary'}
				onPress={handleSignInPress}
				text="Login"
			/>
			<CustomButton
				type="secondary"
				onPress={() => navigation.navigate('ForgotPassword')}
				text="Forgot Password?"
			/>
			<CustomButton
				type="secondary"
				onPress={handleRegister}
				text="Don't have an account ? Create one"
			/>
		</ScrollView>
	);
};

export default Login;
