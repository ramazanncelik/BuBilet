import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { loginValidations } from '../../../utils/validations';
import { useAppContext } from '../../../navigation/AppProvider';
import { TouchableOpacity } from 'react-native';
import { getToastMessage } from '../../../utils/Toast'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

  const { firstUse, users, setUserData } = useAppContext();
  const [firstUseError, setFirstUseError] = useState(false)
  const navigation = useNavigation();

  const { handleChange, handleSubmit, handleBlur, handleReset, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (firstUse) {
        await setFirstUseError(true);
      } else {
        const wantedUser = users.find(user => user.email === values.email);
        if (wantedUser) {
          if (wantedUser.password === values.password) {
            await AsyncStorage.setItem("user", JSON.stringify(wantedUser))
            await setUserData(wantedUser);
            await getToastMessage({
              type: "success",
              text1: "Giriş Başarılı",
            });
          } else {
            await getToastMessage({
              type: "error",
              text1: "Giriş Hatası",
              text2: "Girmiş olduğunuz şifre hatalı.",
            });
          }
        } else {
          await getToastMessage({
            type: "error",
            text1: "Giriş Hatası",
            text2: "Girmiş olduğunuz bilgilere ait bir kullanıcı bulunamadı.",
          });
        }
      }
    },
    validationSchema: loginValidations
  });

  const goSignUpPage = async () => {
    navigation.navigate("SignUp");
    handleReset();
    setFirstUseError(false);
  }

  return (
    <SafeAreaView style={styles.screenStyle}>
      <View style={styles.form}>
        <Text style={styles.welcomeText}>
          Giriş Yap
        </Text>

        <View style={styles.textInputView}>
          <TextInput
            keyboardType="email-address"
            style={{ ...styles.textInput, borderColor: firstUseError && "#ef4444"||"black" }}
            placeholder={'E-mail adresi'}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>
              {errors.email}
            </Text>
          )}
        </View>

        <View style={styles.textInputView}>
          <TextInput
            keyboardType="email-address"
            style={{ ...styles.textInput, borderColor: firstUseError && "#ef4444"||"black" }}
            placeholder={'Şifre'}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && touched.password && (
            <Text style={styles.errorText}>
              {errors.password}
            </Text>
          )}
        </View>

        {firstUseError &&
          <Text style={styles.firstUseErrorText}>
            Lütfen önce uygulamaya kayıt olunuz!
          </Text>}

        <View style={styles.buttonsView}>
          {(firstUseError || !firstUse) &&
            <TouchableOpacity onPress={() => goSignUpPage()} style={{ ...styles.buttons, backgroundColor: "#e2e8f0" }}>
              <Text style={{ color: "black" }}>
                Kayıt Ol
              </Text>
            </TouchableOpacity>}

          <TouchableOpacity disabled={firstUseError} onPress={handleSubmit} style={{ ...styles.buttons, backgroundColor: firstUseError ? "#ef4444" : "#3b82f6" }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Giriş Yap
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }, form: {
    width: '75%',
    height: 'auto',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  }, welcomeText: {
    fontSize: 24,
  }, textInputView: {
    width: "100%",
    flexDirection: 'column',
    marginVertical: 1
  }, textInput: {
    backgroundColor: 'white',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
    fontSize: 14,
    borderRadius: 8,
    padding: 10,
  }, errorText: {
    width: '100%',
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    color: 'white',
    marginBottom: 12
  }, buttonsView: {
    width: '100%',
    flexDirection: 'row',
    gap: 10
  }, buttons: {
    width: '48%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  }, firstUseErrorText: {
    width: '100%',
    backgroundColor: "#ef4444",
    color: 'white',
    padding: 10,
    borderRadius: 5
  }
});