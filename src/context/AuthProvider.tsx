import { createContext, useContext, useEffect, useState } from "react";
import {
  getUser,
  updateUser,
  userLogin,
  userLogout,
} from "./SecureStore/UserSecureStore";
import { jwtValid } from "./SecureStore";
import Api from "../../lib/@core/data/Api";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

//context in tipi ve başlangıç değerleri
const AuthContext = createContext<{
  user: IUser | null;
  login: (data: IUser) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  loading: boolean;
}>({
  user: null,
  login: async () => {},
  logout: async () => {},
  refreshToken: async () => {},
  loading: false,
});

//provider
export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    const storedUser: IUser = await getUser();
    if (!storedUser || !storedUser.token) {
      setUser(null);
      setLoading(false);
      return;
    }
    if (storedUser?.token && !jwtValid(storedUser.loginDate)) {
      try {
        const response = await Api.post("api/auth/CreateTokenByRefreshToken", {
          refreshToken: `${storedUser?.refreshToken}`,
        });
        console.log("API yanıtı", response);
        if (
          response.Success &&
          response.Resource.resource.token &&
          response.Resource.resource.refreshToken
        ) {
          //dataContext verilerini güncelle
          storedUser.token = response.Resource.resource.token;
          storedUser.loginDate = moment().format("DD-MM-YYYY HH:mm:ss");
          storedUser.refreshToken = response.Resource.resource.refreshToken;
          //secureStore verilerini güncelle
          await updateUser(storedUser.token, storedUser.refreshToken);
          setUser(storedUser);
          console.log("stored user set edildi");
        } else {
          console.log("API yanıtı", response);
          setUser(null);
          await logout();
        }
      } catch (error) {
        console.warn(
          "Refresh token ile JWT alma esnasında bir hata meydana geldi"
        );
        setUser(null);
        await logout();
      } finally {
        setLoading(false);
      }
    } else {
      setUser(storedUser);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshToken();
  }, [userLogout]);

  const login = async (data: IUser) => {
    const userData = await userLogin(data);
    setUser(userData);
  };

  const logout = async () => {
    userLogout();
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, login, logout, refreshToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
