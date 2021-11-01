export function isNumber(str: string) {
  if (typeof str !== "string") {
    return false;
  }
  if (str.trim() === "") {
    return false;
  }
  return !isNaN(+str);
}
