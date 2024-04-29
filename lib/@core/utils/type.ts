const types = {
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object Object]': 'object',
  '[object String]': 'string',
};

const type = (object) => {
  if (object === null) {
    return 'null';
  }

  const typeOfObject = Object.prototype.toString.call(object);

  return typeof object === 'object' ? types[typeOfObject] || 'object' : typeof object;
};

const isBoolean = (object) => typeof object === 'boolean';

const isExponential = (value) => isNumeric(value) && value.toString().indexOf('e') !== -1;

const isDate = (object) => type(object) === 'date';

const isDefined = (object) => object !== null && object !== undefined;

const isFunction = (object) => typeof object === 'function';

const isString = (object) => typeof object === 'string';

const isNumeric = (object) =>
  (typeof object === 'number' && Number.isFinite(object)) ||
  !Number.isNaN(object - parseFloat(object));

const isObject = (object) => type(object) === 'object';

/**
 * Checks if a value is an empty object, collection, map, or set.
 * @param {Array | Set | Map | { [name: string]: any }} object The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 */
const isEmptyObject = (object) => {
  if (!object) return true;
  if (object instanceof Map || object instanceof Set) {
    return object.size === 0;
  }
  return Object.keys(object).length === 0;
};

/**
 * Checks if a value is a plain object. just for {} returns true
 * @param {*} object
 * @returns {boolean}
 */
const isPlainObject = (object) => {
  if (!object || type(object) !== 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(object);
  if (!proto) {
    return true;
  }
  const ctor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof ctor === 'function' && Object.toString.call(ctor) === Object.toString.call(Object);
};

/**
 * Checks if a value is a primitive. 'object', 'array' and 'function' returns false
 * @param {*} value  The value to check.
 * @returns {boolean} Returns `true` if `value` is a primitive, else `false`.
 */
const isPrimitive = (value) => ['object', 'array', 'function'].indexOf(type(value)) === -1;

const isWindow = (object) => object != null && object === object.window;

const isRenderer = (object) => !!object && !!(object.jquery || object.dxRenderer);

const isPromise = (object) => !!object && isFunction(object.then);

const isDeferred = (object) => !!object && isFunction(object.done) && isFunction(object.fail);

const isEvent = (object) => !!(object && object.preventDefault);

export {
  isBoolean,
  isDate,
  isDeferred,
  isDefined,
  isEmptyObject,
  isEvent,
  isExponential,
  isFunction,
  isNumeric,
  isObject,
  isPlainObject,
  isPrimitive,
  isPromise,
  isRenderer,
  isString,
  isWindow,
  type,
};
