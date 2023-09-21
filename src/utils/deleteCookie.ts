export function deleteCookie(name: string) {
  document.cookie = (`${name}=""; max-age=-1`)
}

