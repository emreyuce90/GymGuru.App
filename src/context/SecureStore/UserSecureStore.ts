import * as SecureStore from "expo-secure-store";
import moment from "moment";
const { deleteItemAsync, setItemAsync, getItemAsync } = SecureStore;
const SESSION_KEY = "authUser";

export const userLogin = async (data: IUser) => {
  const { token, loginDate, email, id, refreshToken, firstName, lastName } =
    data;
  try {
    await setItemAsync(
      SESSION_KEY,
      JSON.stringify({
        token,
        loginDate,
        email,
        id,
        refreshToken,
        firstName,
        lastName,
      })
    );
    return await getUser();
  } catch {
    console.warn(
      "Kullanıcı verileri kaydetme esnasında bir sorun meydana geldi"
    );
  }
};

export const userLogout = async () => {
  try {
    await deleteItemAsync(SESSION_KEY);
  } catch (error) {
    console.warn("Kullanıcı verileri silme esnasında bir sorun meydana geldi");
  }
};

export const getUser = async () => {
  try {
    const userInfos = await getItemAsync(SESSION_KEY);
    return userInfos ? JSON.parse(userInfos) : {};
  } catch (error) {
    console.warn(
      "Kullanıcı verileri getirme esnasında bir sorun meydana geldi"
    );
  }
};

export const updateUser = async (jwtToken: string, refreshToken: string) => {
  try {
    //find data
    const userInfos = await getItemAsync(SESSION_KEY);
    const parsedData: IUser = userInfos ? JSON.parse(userInfos) : {};
    parsedData.loginDate = moment().format("DD-MM-YYYY HH:mm:ss");
    parsedData.token = jwtToken;
    parsedData.refreshToken = refreshToken;
    await setItemAsync(SESSION_KEY, JSON.stringify(parsedData));
  } catch (error) {
    console.warn("Kullanıcı güncelleme esnasında bir sorun meydana geldi");
  }
};
