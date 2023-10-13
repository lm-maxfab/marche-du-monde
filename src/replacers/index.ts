import { Options } from '../'
import replaceGuillemets from './replace-guillemets'

export default function replacer (
  input: string,
  options: Options = {}
): string {
  let output = input
  if (options.guillemets !== false) output = replaceGuillemets(output)
  /* [WIP] */
  return output
}
