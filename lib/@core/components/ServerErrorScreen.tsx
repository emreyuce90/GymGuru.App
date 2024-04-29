import React, { useState, useEffect } from 'react';
import { TouchableHighlight, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Text, View } from 'react-native';

const ServerErrorScreen = () => {
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		setModalVisible(true);
	}, []);

	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<MaterialIcons name="error-outline" size={48} color="white" />
						<Text style={styles.modalText}>Server Connection Error or Limited Authorization</Text>

						<TouchableHighlight
							style={styles.hideModalButton}
							onPress={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<Text style={{ color: 'white', fontWeight: 'bold' }}>Try Again</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
		</View>
	);
};
/*burada sunucuya bağlanamadı ya da yetkisi sınırlandırıldı. ekranda bilgi verilmeli.*/
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		padding: 4,
	},
	modalView: {
		margin: 20,
		backgroundColor: '#D32F2F',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		// Modal boyutunu burada ayarlayabilirsiniz
		width: 300, // Genişlik
		height: 300, // Yükseklik
	},
	hideModalButton: {
		backgroundColor: '#2196F3',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	modalText: {
		marginBottom: 16,
		textAlign: 'center',
		fontSize: 24,
		color: 'white',
	},
});

export default ServerErrorScreen;
