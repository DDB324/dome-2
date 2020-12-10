window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      //创建div
      elements = [createElement2(selectorOrArrayOrTemplate)];
    } else {
      //查找div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }
  function createElement2(string) {
    // createElement2('<strong>你好</strong>')
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }
  //api可以操作elements
  const api = Object.create(jQuery.prototype); //创建一个对象,将这个对象的__proto__为括号里的东西
  //const api = {__proto__:jQuery.prototype}
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  });
  //api.elements = elements
  //api.selectorOrArrayOrTemplate = selectorOrArrayOrTemplate
  return api;
};
jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }
    array.oldApi = this;
    return jQuery(array);
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  print() {
    console.log(this.elements);
  },
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      element.classList.add(className);
    }
    return this;
  },
  end() {
    return this.oldApi;
  },
};
