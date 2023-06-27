const dev = "production";
let baseUrl;
if (dev === "development") {
  baseUrl = "http://localhost:8000";
  apiUrl = "https://mangaharbor.net/api/v1";
} else {
  baseUrl = "https://mangaharbor.net";
  apiUrl = "https://mangaharbor.net/api/v1";
}

let config = {
  baseUrl: baseUrl,
  apiUrl: apiUrl,
};

function __(id) {
  return document.getElementById(id);
}
function getPara(slice = 1) {
  let parts = window.location.href.split("/");
  return parts[parts.length - slice];
}
