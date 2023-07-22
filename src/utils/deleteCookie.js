export function deleteCookie(name) {
  document.cookie = (`${name}=""; max-age=-1`)
}

