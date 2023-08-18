import 'i18next'
import { defaultNS, resources } from 'src/i18n/i18n'

declare module 'i18next' {
  //? Kế thừa (thêm vào type của i18next)
  //? Gán type cho options của i18next mà ta đã khai báo ở i18n.use(initReactI18next).init
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)['vi']
  }
}
