import { Options } from '../'
import replaceGuillemets from './replace-guillemets'
import jsReplacerTest from './js-test-replacer.js'

export default function replacer (
  input: string,
  options: Options = {}
): string {
  let output = input
  if (options.guillemets !== false) output = replaceGuillemets(output)
  if (options.guillemets !== false) output = jsReplacerTest(output) /* [DELETE THIS] */
  /* [WIP] */
  return output
}
