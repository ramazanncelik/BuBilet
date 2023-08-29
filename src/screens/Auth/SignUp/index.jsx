import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { signUpValidations } from '../../../utils/validations';
import { useAppContext } from '../../../navigation/AppProvider';
import { TouchableOpacity } from 'react-native';
import { getToastMessage } from '../../../utils/Toast'
import { useNavigation } from '@react-navigation/native';
import store from '../../../store';
import { signup } from '../../../store/users';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioGroup from 'react-native-radio-buttons-group';

const SignUp = () => {

  const { users, firstUse, setFirstUse } = useAppContext();
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateOfBirthday, setDateOfBirthday] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      surname: "",
      tcIdNo: "",
    },
    onSubmit: async (values) => {
      if (selectedGender && dateOfBirthday) {
        if (firstUse) {
          await AsyncStorage.setItem("firstUse", "false")
        }
        await store.dispatch(signup({
          id: users.length + 1,
          ...values,
          dateOfBirthday,
          gender: selectedGender
        }));
        await getToastMessage({
          type: "success",
          text1: "Kayıt Başarılı",
          text2: "Uygulamaya Başarılı Bir Şekilde Kayıt Oldunuz.",
        });
        navigation.navigate("Login");
      }
    },
    validationSchema: signUpValidations
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {

    const inputDate = new Date(date);

    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1; // JavaScript'te aylar 0'dan başlar, 1 eklememiz gerekiyor
      const year = date.getFullYear();

      return `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}/${year}`;
    };

    const formattedDateStr = formatDate(inputDate);
    setDateOfBirthday(formattedDateStr)

    hideDatePicker();
  };

  const radioButtons = [
    {
      id: 'Erkek',
      label: 'Erkek',
    },
    {
      id: 'Kadın',
      label: 'Kadın',
    }
  ]

  return (
    <SafeAreaView style={styles.screenStyle}>
      <ScrollView style={styles.form}>
        <Text style={styles.welcomeText}>
          Kayıt Ol
        </Text>

        <View style={styles.textInputView}>
          <TextInput
            keyboardType="email-address"
            style={styles.textInput}
            placeholder={'Adınız'}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {errors.name && touched.name && (
            <Text style={styles.errorText}>
              {errors.name}
            </Text>
          )}
        </View>

        <View style={styles.textInputView}>
          <TextInput
            keyboardType="email-address"
            style={styles.textInput}
            placeholder={'Soyadınız'}
            onChangeText={handleChange('surname')}
            onBlur={handleBlur('surname')}
            value={values.surname}
          />
          {errors.surname && touched.surname && (
            <Text style={styles.errorText}>
              {errors.surname}
            </Text>
          )}
        </View>

        <View style={styles.textInputView}>
          <TextInput
            keyboardType="number-pad"
            style={styles.textInput}
            placeholder={'TC Kimlik Numarası'}
            onChangeText={handleChange('tcIdNo')}
            onBlur={handleBlur('tcIdNo')}
            value={values.tcIdNo}
          />
          {errors.tcIdNo && touched.tcIdNo && (
            <Text style={styles.errorText}>
              {errors.tcIdNo}
            </Text>
          )}
        </View>

        <View style={styles.textInputView}>
          <TouchableOpacity style={styles.textInput} onPress={showDatePicker}>
            <Text style={{ color: "#6b7280" }}>
              {dateOfBirthday &&
                dateOfBirthday || "Doğum Tarihi"}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
          />
          {!dateOfBirthday && errors.name && (
            <Text style={styles.errorText}>
              Doğum Tarihi Boş Bırakılamaz.
            </Text>
          )}
        </View>

        <View style={styles.textInputView}>
          <View style={{ width: '100%', flexDirection: 'row', gap: 5, alignItems: 'center' }}>

            <Text style={{ fontSize: 16 }}>
              Cinsiyetiniz
            </Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedGender}
              selectedId={selectedGender}
              layout='row'
            />
          </View>

          {!selectedGender && errors.name && (
            <Text style={styles.errorText}>
              Doğum Tarihi Boş Bırakılamaz.
            </Text>
          )}
        </View>

        <View style={styles.textInputView}>
          <TextInput
            keyboardType="email-address"
            style={styles.textInput}
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
            style={styles.textInput}
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

        <View style={styles.textInputView}>
          <TextInput
            keyboardType="email-address"
            style={styles.textInput}
            placeholder={'Şifre Tekrarı'}
            onChangeText={handleChange('passwordConfirm')}
            onBlur={handleBlur('passwordConfirm')}
            value={values.passwordConfirm}
          />
          {errors.passwordConfirm && touched.passwordConfirm && (
            <Text style={styles.errorText}>
              {errors.passwordConfirm}
            </Text>
          )}
        </View>

        <View style={styles.buttonsView}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ ...styles.buttons, backgroundColor: "#e2e8f0" }}>
            <Text style={{ color: 'black' }}>
              Giriş Yap
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit} style={{ ...styles.buttons, backgroundColor: "#3b82f6" }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Kayıt Ol
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'white'
  }, form: {
    width: '100%',
    flexDirection: "column",
    marginTop: '25%',
    paddingLeft: '12.5%',
    paddingRight: '12.5%'
  }, welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  }, textInputView: {
    width: "100%",
    flexDirection: 'column',
    marginVertical: 1,
    marginBottom: 5
  }, textInput: {
    width: '100%',
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
  }
});