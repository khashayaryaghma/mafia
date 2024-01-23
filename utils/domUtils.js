const createElement = (name, content, classes) => {
  const element = document.createElement(name);
  element.classList.add(...classes);
  element.append(content);
  return element;
};

const selectedElement = (query) => {
  const element = document.querySelector(query);
  return element;
};

export { createElement, selectedElement };
