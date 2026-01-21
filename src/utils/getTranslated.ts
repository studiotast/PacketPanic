// In a utils file
import i18n from "i18next";

export type TranslatedString = {
  nl: string;
  en: string;
};

export function getTranslated(translatedString: TranslatedString): string {
  return translatedString[i18n.language as "nl" | "en"] || translatedString.nl;
}
