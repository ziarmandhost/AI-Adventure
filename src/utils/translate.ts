import {translate as freeTranslate} from "free-translate"
import {Locale} from "free-translate/dist/types/locales"
import {PromptParsedData} from "./prompt-parser"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const translateText = async (text: string, lang: keyof Locale) => await freeTranslate(text, {from: "en", to: lang})

const translate = async (parsedPrompt: PromptParsedData, lang: keyof Locale) => {
  return {
    situation: await translateText(parsedPrompt.situation, lang),
    environment: await translateText(parsedPrompt.environment, lang),
    goal: await translateText(parsedPrompt.goal, lang),
    variants: {
      A: await translateText(parsedPrompt.variants.A, lang),
      B: await translateText(parsedPrompt.variants.B, lang),
      C: await translateText(parsedPrompt.variants.C, lang)
    }
  }
}

export default translate
