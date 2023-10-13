export default function parseMarkdown (input: string): Element {
  /* [WIP] */
  const parsed = document.createElement('div')
  parsed.innerHTML = input
  return parsed
}
