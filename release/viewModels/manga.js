(async function () {
  let params = new URLSearchParams(location.search);
  let response = await fetch(
    `${config.baseUrl}/api/v1/manga/${params.get("id")}`,
    {
      method: "get",
    }
  );
  let manga_details = (await response.json()).manga;
  __("title").innerText = manga_details.title;
  __("status").innerText = manga_details.status;
  __("author").innerText = manga_details.author;
  __("last-updated").innerText = manga_details.last_updated;
  __("genre").innerText = manga_details.genre;
  __("summary").innerText = manga_details.summary;
  __("thumbnail").src = manga_details.thumbnail;
})();
