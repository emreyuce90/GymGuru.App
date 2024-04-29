import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type ErrorScreenTypes = {
	error: string | unknown;
};
const ErrorScreen = ({ error }: ErrorScreenTypes) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Ionicons name="warning-outline" size={54} color="white" />
			</View>
			<Text style={styles.errorText}>Oops! Something went wrong.</Text>
			<Text style={styles.errorMessage}>Please try again later.</Text>
			<Text style={styles.errorDetail}>{`Error Detail :${JSON.stringify(error)}`}</Text>
			<TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
				<Text style={styles.buttonText}>Go Back</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#D32F2d',
	},
	iconContainer: {
		marginBottom: 20,
	},
	errorText: {
		color: '#fff',
		fontSize: 22,
		fontWeight: 'bold',
	},
	errorMessage: {
		color: '#fff',
		fontSize: 16,
		marginBottom: 30,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	errorDetail: {
		color: '#880E4F', // Metin rengi için daha koyu bir ton
		fontSize: 14, // Metin boyutu
		marginBottom: 20, // Altındaki bileşenle arasındaki boşluk
		paddingHorizontal: 20, // Metni yatay olarak kutunun kenarlarından uzak tutar
		backgroundColor: '#F8BBD0', // Arka plan rengi için hafif bir pembe
		borderRadius: 5, // Kenar yuvarlaklığı
		padding: 10, // İç padding
		textAlign: 'center', // Metni ortalar
		borderWidth: 1, // Çerçeve kalınlığı
		borderColor: '#C2185B', // Çerçeve rengi, metin rengiyle uyumlu
		width: '80%', // Genişlik, container'ın %80'i kadar
		alignSelf: 'center', // Kendi içinde merkeze alınır
	},

	button: {
		backgroundColor: '#C62828',
		padding: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
});

export default ErrorScreen;
