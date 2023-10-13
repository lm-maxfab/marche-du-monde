import { escape, unescape, EscapeResult } from './escape'
import replaceInNode from './replace-in-node'
import parseMarkdown from './parse-markdown'
import replacer from './replacers'

export type Options = {
  returnNodes?: boolean
  guillemets?: boolean
  insecGuillemets?: boolean
  apostrophes?: boolean
}

export default function nouvelleMarcheDuMonde (
  input: string,
  options: Options = {}
): NodeListOf<Node> | string {
  const { tokenized, escaped } = escape(input)
  const parsed = parseMarkdown(tokenized)
  const replaced = replaceInNode(parsed, input => {
    const replaced = replacer(input, options)
    const unescaped = unescape({ tokenized: replaced, escaped })
    return unescaped
  })
  return options.returnNodes === true
    ? replaced.childNodes
    : replaced.textContent ?? ''
}

/* Export every helper of this lib from here just in case */

import replaceGuillemets from './replacers/replace-guillemets'

export {
  nouvelleMarcheDuMonde,
  escape,
  unescape,
  EscapeResult,
  parseMarkdown,
  replaceInNode,
  replacer,
  replaceGuillemets
}
