import { object, string, ref } from 'yup';
import { language } from './utils';


export const signUpValidations = object({
    email: string()
        .required('E-mail Adresi Boş Geçilemez')
        .email('Geçerli bir e-mail adresi giriniz!'),
    name: string()
        .trim()
        .required('Ad Boş Geçilemez!'),
    surname: string()
        .trim()
        .required('Soyad Boş Geçilemez!'),
    tcIdNo: string()
        .trim()
        .required('TC Kimlik Numarası Boş Geçilemez!')
        .min(11, ({ min }) => 'TC kimlik numarası ' + min + ' karakterden oluşmalıdır!')
        .max(11, ({ max }) => 'TC kimlik numarası ' + max + ' karakterden oluşmalıdır!'),
    password: string()
        .required('Şifre Boş Geçilemez!')
        .min(6, ({ min }) => 'Şifre en az ' + min + ' karakterden oluşmalıdır!'),
    passwordConfirm: string()
        .oneOf([ref("password")], "Şifreler aynı olmalıdır!")
        .required('Boş Geçilemez!'),
});

export const loginValidations = object({
    email: string()
        .required('E-mail Adresi Boş Geçilemez')
        .email('Geçerli bir e-mail adresi giriniz!'),
    password: string()
        .required('Şifre Boş Geçilemez!')
        .min(1, ({ min }) => 'Şifre en az ' + min + ' karakterden oluşmalıdır!')
});

export const ticketFormValidations = object({
    fromWhere: string()
        .required('Lütfen nereden gideceğinizi seçiniz!'),
    whereTo: string()
        .required('Lütfen nereye gideceğinizi seçiniz!'),
});

export const paymentValidations = object({
    cardNumber: string()
        .required('Lütfen Kart Numaranızı Giriniz!')
        .min(16, ({ min }) => 'Kart Numarası ' + min + ' karakterden oluşmalıdır!')
        .max(16, ({ max }) => 'Kart Numarası ' + max + ' karakterden oluşmalıdır!'),
    cardOwnerName: string()
        .required('Lütfen Kartınızın Üzerinde Yazan İsmi Giriniz!'),
    cvv: string()
        .required('Lütfen Kartınızın Cvv Bilgisini Giriniz!')
        .min(3, ({ min }) => 'Cvv ' + min + ' karakterden oluşmalıdır!')
        .max(3, ({ max }) => 'Cvv ' + max + ' karakterden oluşmalıdır!'),
});