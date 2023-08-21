/**
 * Блокировка прокрутки
 * @param {boolean} status
 */
export function scrollLock(status: boolean) {
  const htmlNode = document.querySelector('html') as HTMLElement;
  status
    ? (htmlNode.style.overflow = 'hidden')
    : (htmlNode.style.overflow = '');
}

/**
 * Преобразование camelCase в kebab-case
 * @param {string} string
 * @returns {string}
 */
export function camelToKebab(string: string) {
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * @param {string} name - класс блока
 * @param {array} mods - модификаторы
 */
export function bem(name: string, mods: { string: boolean } | {} = {}): string {
  const result = [name];

  for (let [mod, value] of Object.entries(mods)) {
    if (value === true) {
      result.push(`${name}_${camelToKebab(mod)}`);
    } else if (value) {
      result.push(`${name}_${camelToKebab(mod)}_${camelToKebab(value)}`);
    }
  }

  return result.join(' ');
}
