import { ScrollView, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { emailValidator, passwordValidator } from ".";
import Api from "../../../lib/@core/data/Api";
import { useAuth } from "../../context/AuthProvider";
import moment from "moment";
import { Alert } from "react-native";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import {
  deleteUserCredentials,
  getUserCredentials,
  saveUserCredentials,
} from "./RememberSecureStore";
import Checkbox from "expo-checkbox";

const Login = () => {
  const { login } = useAuth();
  const navigation = useNavigation<any>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [emailError, setEMailError] = useState<string | undefined>();

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>();

  const handleSignInPress = async () => {
    if (!emailError && email && !passwordError && password) {
      if (isChecked) {
        saveUserCredentials({ email, password });
      } else {
        deleteUserCredentials();
      }
      login({ email, password });
    }
  };

  const handleRegister = useCallback(() => {
    navigation.navigate("Register");
  }, []);

  const handleEmail = useCallback(
    (val) => {
      setEmail(val);
      if (!emailValidator(val)) {
        setEMailError("Wrong e-mail format");
      } else {
        setEMailError("");
      }
    },
    [email]
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      setPassword(value);
      if (!passwordValidator(value)) {
        setPasswordError("Password must be at least 5 character");
      } else {
        setPasswordError("");
      }
    },
    [password]
  );

  useEffect(() => {
    if (email === "") {
      setEMailError("");
    }
    if (password === "") {
      setPasswordError("");
    }
  }, [email, password]);

  const isDisabled =
    Boolean(emailError) || Boolean(passwordError) || !email || !password;

  useEffect(() => {
    const getInfos = async () => {
      const data = await getUserCredentials();
      if (data) {
        setEmail(data.email);
        setPassword(data.password);
        setIsChecked(true);
      }
    };
    getInfos();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        //alignItems: "center",
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
      <View className="flex flex-row items-center">
        <Checkbox
          style={{ margin: 8 }}
          value={isChecked}
          onValueChange={setIsChecked}
        />
        <Text className="text-base">{"Remember Me"}</Text>
      </View>
      <CustomButton type={"primary"} onPress={handleSignInPress} text="Login" />
      {error && <Text className="text-red-600">{error}</Text>}
      <CustomButton
        type="secondary"
        onPress={() => navigation.navigate("ForgotPassword")}
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
