export type EscapeResult = {
  tokenized: string
  escaped: string[]
}

export function escape (input: string): EscapeResult {
  /* [WIP] */
  return { tokenized: input, escaped: [] }
}

export function unescape (input: EscapeResult): string {
  /* [WIP] */
  const output = input.tokenized
  return output
}
