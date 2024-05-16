import { PlainObject } from "../types";
import { IScreenSubModel } from "../types/Screens";
import { FilterDescriptor, LoadOptions } from "../types/data";
import { To } from "../types/navhistory";
import {
  isDefined,
  isEmptyObject,
  isPlainObject,
  isPrimitive,
  isString,
} from "./type";

export { getErrorMessage } from "./errors";

export * from "./type";

/**
 * Bir metni baş harflerini büyük yapar
 * @param {*} s 'hello world'
 * @returns {string} 'hello world' --> 'Hello World'
 */
export const capitalize = (s) => {
  return s
    ? s
        .split(" ")
        .map((_) => _.charAt(0).toUpperCase() + _.slice(1))
        .join(" ")
    : s;
};

/**
 * Bir metni baş harflerini küçük yapar
 * @param {*} s 'HELLO WORLD'
 * @returns {string} 'HELLO WORLD' --> 'hello world'
 */
export const splitCamelCase = (s) => {
  if (!s) return s;
  if (!isString(s)) return s;
  const sentense = s.replace(/([a-z0-9])([A-Z0-9])/g, "$1 $2");
  // return s.split(/([A-Z][a-z]+)/).join(' ');
  return capitalize(sentense);
};

export const isEmpty = (value) => {
  return !isNotEmpty(value);
};

export const isNotEmpty = (value) => {
  return value !== undefined && value !== null && value !== "";
};

/**
 *
 * @param {any} value
 * @returns
 */
export const isNullOrUndefined = (value) => {
  return value === undefined || value === null;
};

/**
 * Bir metin içerisinde süslü parantezler {} içerisindeki ifadeleri belirli bir veri seti kullanarak değiştirmek için kullanılır.
 * @param {string} text 'Hello {name} {surname}'
 * @param {any|undefined} data {name: 'John', surname: 'Doe'}
 * @param {any|undefined} alternate when data[name] is undefined, use alternate[name]
 * @param {any} defaultValue when data[name] is undefined and alternate[name] is undefined, use defaultValue
 * @returns {string} 'Hello John Doe'
 */
export const interpolate = (
  text,
  data,
  alternate = undefined,
  defaultValue = undefined
) => {
  if (!text) return text;
  if (!data) return text;
  if (typeof text != "string") return text;
  const result = text.replace(/{([^{}]*)}/g, (a, b) => {
    let val = data[b];
    val = val === undefined ? alternate && alternate[b] : val;
    val = val === undefined ? defaultValue : val;
    return val === undefined ? "" : val;
  });
  return result.toString();
};

export const toQueryStringWithField = (field, value, url) => {
  const o = {};
  o[field] = value;
  return toQueryString(o, url);
};

/**
 * Bir JavaScript nesnesini URL sorgu dizesine dönüştürür
 * @param {Object} obj {name: 'John', surname: 'Doe'}
 * @param {string|undefined} url 'http://localhost/api/users'
 * @returns {string} 'http://localhost/api/users?name=John&surname=Doe'
 */
export const toQueryString = (
  obj: PlainObject | LoadOptions<any>,
  url: string = undefined
): string => {
  if (!isPlainObject(obj)) {
    return url;
  }
  let params = url ? (url.indexOf("?") > -1 ? "&" : "?") : "";
  if (obj) {
    Object.keys(obj).forEach((key) => {
      const element = obj[key];
      const val = isDefined(element)
        ? isPrimitive(element)
          ? element
          : JSON.stringify(element)
        : null;

      if (val != null) {
        params += `${key}=${val}&`;
      }
    });
  }
  if (params.endsWith("&")) {
    params = params.slice(0, -1);
  }
  return url ? url + params : params;

  /**
   * return Object.keys(obj)
        .filter(key => obj[key] !== undefined) // Değeri belirsiz olan alanları filtrele
        .map(key => {
            let value = obj[key];
            if (typeof value === 'object') { // Değer bir nesne veya dizi ise
                value = JSON.stringify(value); // Değeri bir dizeye dönüştür
            }
            return encodeURIComponent(key) + '=' + encodeURIComponent(value);
        })
        .join('&');
   */
};

// export const filterToUri = (url, data) => {
//   let params = url.includes('?') ? '&' : '?';
//   Object.keys(data).forEach((key) => {
//     params += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`;
//   });
//   return url + params.slice(0, -1);
// };

/**
 * Converts URL object to URI object with interpolated filter
 * @param {Object} url - The URL object. // TODO: define URL interface/type
 * @param {Object} data - The data object used for filtering.
 * @returns {import('history').To} - The filtered URI object to be used in history.push
 */
export const filterToUri = (url, data: PlainObject) => {
  const filter = isEmptyObject(url?.query?.filter)
    ? null
    : `${interpolate(JSON.stringify(url.query?.filter), data)}`;
  return {
    pathname: url.path,
    search: filter ? `?filter=${filter}` : null,
  };
};

/**
 * Converts subModel relation to URI object with interpolated filter for master-detail screens
 * @param {IScreenSubModel} subModel
 * @param {string} path
 * @param {object} data
 * @returns {import('history').To} - The filtered URI object to be used in history.push
 */
export const subModelRelationToUri = (
  subModel: IScreenSubModel,
  path: string,
  data: PlainObject
): To => {
  const filter = isEmptyObject(subModel?.relationFieldNames)
    ? null
    : interpolate(
        JSON.stringify([
          subModel.relationFieldNames[1],
          "=",
          `{${subModel.relationFieldNames[0]}}`,
        ]),
        data
      );

  if (!isDefined(path))
    return {
      search: filter ? `?filter=${filter}` : null,
    };

  return {
    pathname: path,
    search: filter ? `?filter=${filter}` : null,
  };
};

const isCriteria = (val: FilterDescriptor) =>
  val && Array.isArray(val) && val.length == 3 && typeof val[0] == "string"; // ['Code','=',1]

// []  length = 0
// ['Code','=',1]  --> isCriteria
// [['Code','=',1]]
// [['Code','=',1], "and", ['Code','=',1]]
// [['Code','=',1], "and", ['Code','=',1], "and", ['Code','=',1]]
// [['Code','=',1], "and", [['Code','=',1], "and", ['Code','=',1]] ]
export const addQueryFilter = (
  filter: FilterDescriptor,
  newVal: FilterDescriptor
) => {
  if (!newVal) return filter || [];
  if (!filter) return newVal || [];

  if (filter.length == 0 && newVal.length == 0) return [];

  let result = [];
  if (isCriteria(filter)) {
    if (isCriteria(newVal)) {
      result = [filter, "and", newVal];
    } else if (newVal.length == 0) {
      result = filter;
    } else {
      result = [filter, "and", newVal];
    }
  } else if (filter.length == 0) {
    if (isCriteria(newVal)) {
      result = [...newVal];
    } else {
      result = newVal;
    }
  } else if (isCriteria(newVal)) {
    result = [filter, "and", newVal];
  } else if (newVal.length == 0) {
    result = [...filter];
  } else {
    result = [filter, "and", newVal];
  }
  return result;
};

export const rolesAllowed = (
  userRoles: string | string[],
  itemRoles: string[]
) => {
  if (userRoles && itemRoles) {
    const intersection = itemRoles.filter((x) =>
      typeof userRoles == "string"
        ? userRoles.toLowerCase() == x.toLowerCase()
        : isDefined(userRoles.find((r) => r.toLowerCase() == x.toLowerCase()))
    );
    if (!intersection) return false;
    if (intersection.length == 0) return false;
  }
  return true;
};

export const copy = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const slugify = (text: string) => FuseUtils.handleize(text);

export function getCurrentDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
  const milliseconds = now.getMilliseconds().toString().padStart(7, "0");

  return `${date} ${time}.${milliseconds}`;
}

export function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const milliseconds = now.getMilliseconds().toString().padStart(7, "0");

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
