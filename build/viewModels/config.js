const dev = "production";
let baseUrl;
if (dev === "development") {
  baseUrl = "http://localhost:8000";
  apiUrl = "http://localhost:8000/api/v1/";
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

function getPara() {
  let parts = window.location.href.split("/");
  return parts[parts.length - 1];
}
