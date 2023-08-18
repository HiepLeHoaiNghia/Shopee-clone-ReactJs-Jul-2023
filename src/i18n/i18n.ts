import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'

//? tạo ra 1 object để lưu tên đầy đủ của ngôn ngữ dùng khi hiển thị
export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    //? namespace import từ file json trong thư mục locales
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    //? namespace import từ file json trong thư mục locales
    home: HOME_VI,
    product: PRODUCT_VI
  }
}

//? namespace mặc định
export const defaultNS = 'product'

//? Khai báo i18n init
// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  //? ngôn ngữ mặc định
  lng: 'vi',
  //? các namespace sử dụng
  ns: ['home', 'product'],
  //? namespace mặc định
  defaultNS,
  //? ngôn ngữ backup
  fallbackLng: 'vi',
  //? react already safes from xss
  interpolation: {
    escapeValue: false
  }
})
