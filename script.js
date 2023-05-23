const myResultsReadyCallback = function (name, q, promos, results, resultsDiv) {
  // sorter ito. Need daw to
  results.sort((a, b) => {
    return (b.richSnippet?.videoobject?.interactioncount || 0) -
    (a.richSnippet?.videoobject?.interactioncount || 0);
  });

  // eto na yung taga kuha ng info. hehe
  const makeResultParts = (result) => {
    console.log(result);

    //taga kuha nung pictyur
    const img = document.createElement("img");
    img.src = result.richSnippet.videoobject.thumbnailurl;
    img.alt = result.richSnippet.videoobject.name;
    img.classList.add("thumbnail-image");

    const openVideoPage = () => {
      const videoContainer = document.getElementById("video-container");
      videoContainer.innerHTML = "";

      const videoFrame = document.createElement("iframe");
      videoFrame.setAttribute("src", result.richSnippet.videoobject.embedurl);
      videoFrame.setAttribute("width", "640");
      videoFrame.setAttribute("height", "360");
      videoFrame.style.display = "block";
      videoFrame.style.margin = "auto";

      videoContainer.appendChild(videoFrame);
    };

    img.addEventListener("click", openVideoPage);

    const anchor = document.createElement("a");
    anchor.href = result["url"];
    anchor.target = "_blank";
    anchor.classList.add("gs_title");
    anchor.appendChild(document.createTextNode(result["visibleUrl"]));

    const titleText = document.createElement("span");
    titleText.innerHTML = result["title"];
    titleText.classList.add("title-container");

    const ytPerson = document.createElement("span");
    ytPerson.innerHTML = result.richSnippet.person.name;
    
    const ytUrl = document.createElement("span");
    ytUrl.innerHTML = result.visibleUrl;

    const intCountValue = result.richSnippet.videoobject.interactioncount;

    const interactioncount = document.createElement("section");
    interactioncount.innerHTML = formatInteractionCount(intCountValue) + "views";
    interactioncount.classList.add("count-container");

    return [img, titleText, ytUrl, ytPerson, interactioncount];
  };

  if (results) {
    const table = document.createElement("table");
    for (const result of results) {
      const row = table.insertRow(-1);
      const cell = row.insertCell(-1);

      const resultContainer = document.createElement("div");
      resultContainer.classList.add("result-container");

      const [img, titleText, ytUrl, ytPerson, interactioncount] = makeResultParts(result);
      resultContainer.appendChild(img);
      const tableInfo = document.createElement("div");
      tableInfo.classList.add("table-container");
      tableInfo.classList.add("info-container");
      
      const titleContainer = document.createElement("div");
      titleContainer.appendChild(titleText);
      
      const personContainer = document.createElement("div");
      personContainer.appendChild(ytPerson);
      
      const interactionCountContainer = document.createElement("div");
      interactionCountContainer.appendChild(ytUrl);
      interactionCountContainer.appendChild(interactioncount);
      interactionCountContainer.classList.add("count-container");
      
      tableInfo.appendChild(titleContainer);
      tableInfo.appendChild(personContainer);
      tableInfo.appendChild(interactionCountContainer);
      
      const tableFooter = document.createElement("div");
      tableFooter.classList.add('table-footer');
      
      resultContainer.appendChild(tableInfo);
      resultContainer.appendChild(tableFooter);
      

      cell.appendChild(resultContainer);

      // resultContainer.style.border = '1px solid black';
    }
    resultsDiv.appendChild(table);
  }
  return true;
};

//views converter para mas mabilis mabasa
function formatInteractionCount(value) {
  if (Math.abs(Number(value)) >= 1.0e9) {
    return (Math.abs(Number(value)) / 1.0e9).toFixed(1) + "b";
  } else if (Math.abs(Number(value)) >= 1.0e6) {
    return (Math.abs(Number(value)) / 1.0e6).toFixed(0) + "m";
  } else if (Math.abs(Number(value)) >= 1.0e3) {
    return (Math.abs(Number(value)) / 1.0e3).toFixed(0) + "k";
  } else {
    return value;
  }
}

// Taga lagay nung Callback
window.__gcse || (window.__gcse = {});
window.__gcse.searchCallbacks = {
  web: {
    ready: myResultsReadyCallback,
  },
};
