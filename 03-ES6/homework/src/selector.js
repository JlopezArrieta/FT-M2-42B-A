var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) resultSet.push(startEl);

for(let child of startEl.children){
  let childrenResults = traverseDomAndCollectElements(matchFunc, child);
  resultSet = [...resultSet, ...childrenResults];
}
return resultSet;

};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {//'#hola', '.class', ´span', 'span.hola'
  // tu código aquí
  if(selector[0] === '#') return 'id';
  if(selector[0] === '.') return 'class';
  if(selector.split('.').length > 1) return 'tag.class';//['span', 'hola]
  return 'tag';
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (Element) => {
      if(`#${Element.id}` === selector) return true;
      return false;
    };
  } 
  else if (selectorType === "class") {
    matchFunction = (Element) => {
     for(const nomClass of Element.classList){
      if(`.${nomClass}` === selector) return true;
     }
     return false;
    };
  } 
  else if (selectorType === "tag.class") {
    matchFunction = (Element) => {
      // $('div.container')
      const [tag, className] = selector.split('.');
      //   'div' 'className'
      return matchFunctionMaker(tag)(Element) && matchFunctionMaker(`.${className}`)(Element);
    }
  } 
  else if (selectorType === "tag") {
    matchFunction = (Element) => {
      if(Element.tagName.toLowerCase() === selector) return true;
      return false;
    };
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
