export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.assign(node, props);
  for (const ch of children) node.appendChild(typeof ch === 'string' ? document.createTextNode(ch) : ch);
  return node;
}

export function clearChildren(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function choiceButton(label) {
  const btn = el('button', { className: 'choice', type: 'button' });
  btn.textContent = label;
  return btn;
}
