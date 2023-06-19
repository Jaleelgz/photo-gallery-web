export function setUserToLocalStorage(data) {
  localStorage.setItem("user", JSON.stringify(data));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function signOutUser() {
  localStorage.clear();
}

export function isLoggedIn() {
  const user = getUser();
  return user !== null && user !== undefined;
}
