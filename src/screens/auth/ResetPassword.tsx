import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text } from 'react-native';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import { emailCodeChecker, emailValidator, passwordValidator } from '.';

const ResetPassword = () => {
	const navigation = useNavigation<any>();
	const [email, setEmail] = useState<string>('');
	const [emailError, setEmailError] = useState<string>();

	const [password, setPassword] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>();

	const [passwordRepeat, setPasswordRepeat] = useState<string>('');
	const [matchError, setMatchError] = useState<string>();

	const handleRegisterPress = useCallback(() => {
		console.log('register pressed');
		if (email && !emailError && password && !passwordError && passwordRepeat && !matchError) {
			console.warn('register pressed', { email, password });
		}
	}, [email, emailError, password, passwordError, passwordRepeat, matchError]);

	const handleEmailChanged = useCallback(
		(value: string) => {
			setEmail(value);
			if (!emailCodeChecker(value)) {
				setEmailError('Wrong e-mail code format');
			} else {
				setEmailError('');
			}
		},
		[email]
	);

	const handlePasswordChanged = useCallback(
		(value: string) => {
			setPassword(value);
			if (!passwordValidator(value)) {
				setPasswordError('Password must be 5 characters at least');
			} else {
				setPasswordError('');
			}
		},
		[password]
	);

	const handlePasswordRepeat = useCallback(
		(value: string) => {
			setPasswordRepeat(value);
			if (value !== password) {
				setMatchError("Password and Password Repeat inputs couldn't match");
			} else {
				setMatchError('');
			}
		},
		[passwordRepeat]
	);

	useEffect(() => {
		if (email === '') {
			setEmailError('');
		}
		if (password === '') {
			setPasswordError('');
		}
		if (passwordRepeat === '') {
			setMatchError('');
		}
	}, [password, passwordRepeat, email]);

	const isDisabled =
		emailError || passwordError || matchError || !email || !password || !passwordRepeat;

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
				placeholder={'Email Confirmation Code'}
				value={email}
				setValue={handleEmailChanged}
				errorMessage={emailError}
				success={!emailError && email ? true : false}
			/>
			<CustomInput
				errorMessage={passwordError}
				placeholder={'Password'}
				value={password}
				setValue={handlePasswordChanged}
				securityTextEntry={true}
				success={password && !passwordError ? true : false}
			/>
			<CustomInput
				success={passwordRepeat && !matchError ? true : false}
				errorMessage={matchError}
				placeholder={'Password Repeat'}
				value={passwordRepeat}
				setValue={handlePasswordRepeat}
				securityTextEntry={true}
			/>
			<CustomButton
				onPress={handleRegisterPress}
				text="Change My Password"
				type={isDisabled ? 'disabled' : 'primary'}
			/>

			<CustomButton
				type="secondary"
				onPress={() => navigation.navigate('Login')}
				text="Back to Login"
			/>
		</ScrollView>
	);
};

export default ResetPassword;
