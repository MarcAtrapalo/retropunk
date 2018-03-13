export const has = (name, val) => (obj) => obj[name] === val;
export const not = fn => (...attr) => !fn(...attr);
export const or = (f, g) => (attr) => f(attr) || g(attr);