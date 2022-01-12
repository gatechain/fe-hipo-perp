import KiwiIntl from 'kiwi-intl'
import enUSLangs from '../../.kiwi/en-US'
import zhCNLangs from '../../.kiwi/zh-CN'
import zhTWLangs from '../../.kiwi/zh-TW'
import isBrowser from './isBrowser'

export enum LangEnum {
  'zh-CN' = 'zh-CN',
  'en-US' = 'en-US',
  'zh-TW' = 'zh-TW',
}

export function getCurrentLang(): LangEnum {
  if (!isBrowser()) {
    return LangEnum['zh-CN']
  }

  const urlLang = new URL(window.location.href).searchParams.get('lang')
  const cookieLang = (document.cookie.match(/kiwi-locale=([^$]+)/) || [null, LangEnum['zh-CN']])[1]
  const lang = (cookieLang as string).split(' ')[0]
  if (Object.keys(LangEnum).includes(urlLang as string)) {
    return urlLang as LangEnum
  }
  return lang as LangEnum
}

const langs = {
  [LangEnum['en-US']]: enUSLangs,
  [LangEnum['zh-CN']]: zhCNLangs,
  [LangEnum['zh-TW']]: zhTWLangs,
}

const defaultLang = getCurrentLang()
let curLang

if (Object.keys(langs).indexOf(defaultLang) > -1) {
  curLang = defaultLang
} else {
  curLang = LangEnum['zh-CN']
}


const I18N = KiwiIntl.init(curLang, langs)

export default I18N