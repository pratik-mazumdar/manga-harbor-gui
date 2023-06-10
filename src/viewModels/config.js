let config = {
  baseUrl: "https://mangaharbor.net",
  apiUrl: `"https://mangaharbor.net"/api/v1`,
};

function __(id) {
  return document.getElementById(id);
}

function getPara() {
  let parts = window.location.href.split("/");
  return parts[parts.length - 1];
}
