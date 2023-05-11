(async function () {
  // Handle manga infromation
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

  // Handle manga chapters
  response = await fetch(
    `${config.baseUrl}/api/v1/chapter/${params.get("id")}`,
    {
      method: "get",
    }
  );
  const chapters = await response.json();
  let elements = "";
  for (id = 0; id < chapters.length; id = id + 2) {
    elements += `<a class="flex bg-gradient-to-r hover:bg-blue-900 from-grey-600 to-grey-900 text-white rounded-lg p-2 m-1" href="${config.baseUrl}/chapter/${chapters[id].id}"> ${chapters[id].title}</a>`;
    if (chapters[id + 1])
      elements += `<a class="flex bg-gradient-to-r hover:bg-blue-900 from-grey-500 to-black-700 text-white rounded-lg p-2 m-1" href="${
        config.baseUrl
      }/chapter/${chapters[id + 1].id}"> ${chapters[id + 1].title}</a>`;
  }
  __("chapters").innerHTML = elements;

  // For handing description being more than 200 characters
  const summary = document.getElementById("summary");
  const summaryText = summary.textContent.trim();
  const readMoreLink = document.getElementById("read-more-link");
  const readLessLink = document.getElementById("read-less-link");

  if (summaryText.length > 200) {
    const truncatedSummary = summaryText.slice(0, 200) + "...";
    summary.textContent = truncatedSummary;
    readMoreLink.classList.remove("hidden");

    readMoreLink.addEventListener("click", (event) => {
      event.preventDefault();
      summary.textContent = summaryText;
      readMoreLink.classList.add("hidden");
      readLessLink.classList.remove("hidden");
    });

    readLessLink.addEventListener("click", (event) => {
      event.preventDefault();
      summary.textContent = truncatedSummary;
      readLessLink.classList.add("hidden");
      readMoreLink.classList.remove("hidden");
    });
  }
})();
