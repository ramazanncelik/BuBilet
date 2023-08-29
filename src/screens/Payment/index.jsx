import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { paymentValidations } from '../../utils/validations';
import { useFormik } from 'formik';
import store from '../../store';
import { buySeat, updateVoyage } from '../../store/voyages';
import { useNavigation } from '@react-navigation/native';
import { getToastMessage } from '../../utils/Toast'

const PaymentPage = ({ route }) => {

  const { totalPrice, voyageData, selectedSeats } = route.params;
  const navigation = useNavigation();
  const [expiryDate, setExpiryDate] = useState("");
  const [isClicked, setIsClicked] = useState(false)

  const { handleChange, handleSubmit, handleBlur, handleReset, values, errors, touched } = useFormik({
    initialValues: {
      cardNumber: "",
      cardOwnerName: "",
      cvv: ""
    },
    onSubmit: async (values) => {
      await setIsClicked(true);
      if (expiryDate.length === 5) {
        for (let i = 0; i < selectedSeats.length; i++) {
          await store.dispatch(buySeat({
            id: voyageData.id,
            newSeat: selectedSeats[i]
          }));
          if (i + 1 === selectedSeats.length) {
            await store.dispatch(updateVoyage({
              id: voyageData.id,
              newData: {
                emptySeat: voyageData.emptySeat - selectedSeats.length
              }
            }));

            await getToastMessage({
              type: 'success',
              text1: "Bilet Alımı Başarılı",
              text2: `Tebrik Ederiz Seçtiğiniz Biletleri Başarılı Bir Şekilde Satın Aldınız(${totalPrice} TL). Şimdiden İyi Yolculuklar`
            })

            await navigation.navigate("SearchForTickets");
          }
        }
      }
    },
    validationSchema: paymentValidations
  });

  const handleExpiryDateChange = (text) => {
    if (expiryDate.length === 2) {
      const formattedText = text.replace(/(\d{2})/g, '$1/');
      setExpiryDate(formattedText.trim());
    } else {
      setExpiryDate(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', ...styles.textInputView }}>
        <TextInput
          name="cardNumber"
          maxLength={16}
          style={styles.input}
          placeholder="Kart Numarası"
          value={values.cardNumber}
          onChangeText={handleChange("cardNumber")}
          textContentType='creditCardNumber'
          keyboardType='numeric'
        />

        {errors.cardNumber && touched.cardNumber && (
          <Text style={styles.errorText}>
            {errors.cardNumber}
          </Text>
        )}
      </View>

      <View style={{ width: '100%', ...styles.textInputView }}>
        <TextInput
          name="cardOwnerName"
          style={styles.input}
          placeholder="Kart Üzerindeki İsim"
          value={values.cardOwnerName}
          onChangeText={handleChange("cardOwnerName")}
          keyboardType='email-address'
        />

        {errors.cardOwnerName && touched.cardOwnerName && (
          <Text style={styles.errorText}>
            {errors.cardOwnerName}
          </Text>
        )}
      </View>

      <View style={styles.row}>
        <View style={{ ...styles.textInputView, flex: 1 }}>
          <TextInput
            maxLength={5}
            style={styles.input}
            placeholder="Son Kullanma Tarihi"
            value={expiryDate}
            onChangeText={handleExpiryDateChange}
            keyboardType='numeric'
          />

          {(isClicked && expiryDate.length !== 5) && (
            <Text style={styles.errorText}>
              Lütfen Son Kullanma Tarihi Bilgisini Doğru Bir Şekilde Giriniz!
            </Text>
          )}
        </View>

        <View style={{ ...styles.textInputView, flex: 1 }}>
          <TextInput
            maxLength={3}
            name="cvv"
            style={styles.input}
            placeholder="Cvv"
            value={values.cvv}
            onChangeText={handleChange("cvv")}
            keyboardType="numeric"
          />

          {errors.cvv && touched.cvv && (
            <Text style={styles.errorText}>
              {errors.cvv}
            </Text>
          )}
        </View>

      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ödeme Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    backgroundColor: "white"
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
    fontSize: 14,
    borderRadius: 8,
    padding: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }, textInputView: {
    flexDirection: 'column',
    gap: 5
  }, errorText: {
    width: '100%',
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    color: 'white',
  }
});

export default PaymentPage;
