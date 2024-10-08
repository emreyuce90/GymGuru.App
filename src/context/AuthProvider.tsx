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

//context in tipi ve başlangıç değerleri
const AuthContext = createContext<{
  user: IUser | null;
  login: (data: IUser) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

//provider
export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user: IUser = await getUser();
      if (user?.token) {
        if (!jwtValid(user.loginDate)) {
          //jwt süresi dolmuş, refresh token almak için apiye istek yap
          console.log("jwt Süresi dolmuş, yeni token için istek yapılıyor");
          try {
            const response = await Api.post(
              "/api/auth/CreateTokenByRefreshToken",
              null
            );
            if (response.Success && response.Resource.token) {
              //dataContext verilerini güncelle
              user.token = response.Resource.token;
              user.loginDate = moment().format("DD-MM-YYYY HH:mm:ss");
              //secureStore verilerini güncelle
              await updateUser(user.token);
            }
          } catch (error) {
            console.warn(
              "Refresh token ile JWT alma esnasında bir hata meydana geldi"
            );
          }
        }
      }
      setUser(user);
    };
    fetchUser();
  }, []);

  const login = async (data: IUser) => {
    const userData = await userLogin(data);
    setUser(userData);
  };

  const logout = async () => {
    userLogout();
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
