export const splitStrings = (str, delim = ' ') => {
  return typeof str === 'string' ? str.split(delim) : []
}