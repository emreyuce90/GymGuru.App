import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
const { deleteItemAsync, setItemAsync, getItemAsync } = SecureStore;

export const saveUserCredentials = async (data) => {
  try {
    await setItemAsync(
      "userCredentials",
      JSON.stringify({ email: data.email, password: data.password })
    );
  } catch (error) {
    Toast.show({
      type: "error",
      text1: `Kullanıcı verilerini kaydetme işlemi esnasında bir hata meydana geldi`,
      text2: `${error}`,
    });
  }
};

export const deleteUserCredentials = async () => {
  try {
    await deleteItemAsync("userCredentials");
  } catch (error) {
    Toast.show({
      type: "error",
      text1: `Kullanıcı verilerini silme işlemi esnasında bir hata meydana geldi`,
      text2: `${error}`,
    });
  }
};

export const getUserCredentials = async () => {
  try {
    const userInfos = await getItemAsync("userCredentials");
    if (userInfos) {
      const parsedData = JSON.parse(userInfos);
      return parsedData;
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: `Kullanıcı verilerini getirme işlemi esnasında bir hata meydana geldi`,
      text2: `${error}`,
    });
  }
};
