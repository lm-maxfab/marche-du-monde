export default function replaceInNode (node: Node, replacer: (input: string) => string): Node {
  if (node.nodeType === Node.TEXT_NODE) {
    const content = node.textContent ?? ''
    const replaced = replacer(content)
    const returned = document.createTextNode(replaced)
    node.parentNode?.replaceChild(returned, node)
    return returned
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element
    const children = [...element.childNodes]
    const replacedChildren = children.map(node => replaceInNode(node, replacer)/* recursion 😎 */)
    element.replaceChildren(...replacedChildren)
    return element
  }
  return node
}
