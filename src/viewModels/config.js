let config = {
  baseUrl: `http://localhost:8000`,
  apiUrl: `http://localhost:8000/api/v1`,
};

function __(id) {
  return document.getElementById(id);
}

function getPara() {
  let parts = window.location.href.split("/");
  return parts[parts.length - 1];
}
