import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';

export function createReducer(initialState, fnMap) {
  return (state = initialState, {type, payload}) => {
    const handle = fnMap[type];
    return handle ? handle(state, payload) : state;
  };
}

function isString(obj) {
  return typeof obj === 'string';
}

export function mapToToastrMessage(type, array) {
  const obj = {};
  obj.type = type;

  obj.options = array.filter(item => item !== null && typeof item === 'object')[0] || {};
  if (isString(array[0]) && isString(array[1])) {
    obj.title = array[0];
    obj.message = array[1];
  } else if (isString(array[0]) && !isString(array[1])) {
    obj.title = array[0];
  }

  return obj;
}

export function guid() {
  function r() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return r() + r() + r() + '-' + r() + '_' + r() + '-' + r() + '_' + r() + r() + r();
}

export function onCSSTransitionEnd(node, callback) {
  const runOnce = (e) => {
    e.stopPropagation();
    callback && callback(e);
    ReactTransitionEvents.removeEndEventListener(node, runOnce);
  };
  ReactTransitionEvents.addEndEventListener(node, runOnce);
}
