function setLocalStorage(value, key) {
  localStorage.setItem(key, JSON.stringify(value));
}

if (localStorage.getItem("city")) {
  city.value = localStorage.getItem("city");
} else city.value = "Minsk";
