(async function () {
  let chapter = getPara();
  let response = await fetch(`${config.apiUrl}/images/list/${chapter}`, {
    method: "GET",
  });
  let links = await response.json();
  image_tags = "";
  links.forEach(function (link) {
    image_tags += `<img src="${config.apiUrl}/image/${link}">`;
  });
  __("image-panel").innerHTML = image_tags;
})();
