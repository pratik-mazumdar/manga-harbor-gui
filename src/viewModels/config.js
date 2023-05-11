let config = {
  baseUrl: "http://192.168.1.64:8000",
  apiUrl: "http://192.168.1.64:800/api/v1",
};

function __(id) {
  return document.getElementById(id);
}

function getPara() {
  let parts = window.location.href.split("/");
  return parts[parts.length - 1];
}
