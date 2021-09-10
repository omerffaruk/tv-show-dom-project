//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();   // allEpisodes is storing an array of episode objects   
const rootElem = document.getElementById("root");   // div that wraps all the epContainer divs
const epSearch = document.getElementById("epSearch");   // search input field
const totalDisplayingEpsP = document.getElementById("totalDisplayingEps"); 
const select = document.getElementById("epDropdown");

function setup() {    // function that will be called when the page is loaded
  makePageForEpisodes(allEpisodes);   // making a call to makePageForEpisodes which creates episode pages
  totalDisplayingEpsP.textContent = `Displaying all ${allEpisodes.length} episodes`;
}

function makePageForEpisodes(episodeList) {   // main function: this will create div for each ep, fill the select dropdown with eps options
  function formatEp (num) {   // format the number suitable for Season - Episode format
    const str = num.toString();
    return str.padStart(2, "0");
  }
  for(let i = 0; i < episodeList.length; i++) {   // render all episodes 
    const ep = episodeList[i]; 
    const epContainerDiv = document.createElement("div");   // create container div for each episode
    epContainerDiv.setAttribute("class", "epContainer");
    epContainerDiv.setAttribute("id", `div${i+1}`);
    rootElem.appendChild(epContainerDiv);
    const a = document.createElement("a");    // turn div content into a link 
    a.setAttribute("href", ep.url)
    a.setAttribute("target", "_blank");
    a.setAttribute("class", "epLink");
    epContainerDiv.appendChild(a);
    const epHeader = document.createElement("h2");    // create header for each episode
    epHeader.setAttribute("class", "epHeader");
    epHeader.setAttribute("id", `epHeader${i+1}`);
    epHeader.innerText = `${ep.name} - S${formatEp(ep.season)}E${formatEp(ep.number)}`;
    a.appendChild(epHeader);
    const epImage = document.createElement("img");    // create img element for ep image
    epImage.setAttribute("class", "epImage");
    epImage.setAttribute("id", `epImage${i+1}`);
    epImage.src = ep.image.medium;
    a.appendChild(epImage);
    const epSummaryP = document.createElement("p");   // create p element for ep summary
    epSummaryP.setAttribute("class", "epSummaryP");
    epSummaryP.setAttribute("id", `epSummaryP${i+1}`);
    epSummaryP.innerHTML = `${ep.summary}`;
    a.appendChild(epSummaryP);
    const option = document.createElement("option");    // create option element for each ep and fill the select dropdown
    option.value = `S${formatEp(ep.season)}E${formatEp(ep.number)} - ${ep.name}`;
    select.add(option);
    option.innerHTML = `<a href = ${ep.url} target = _blank>S${formatEp(ep.season)}E${formatEp(ep.number)} - ${ep.name}</a>`;
  }
}

function cleanUpWord (word) {   // format the input value (toLowerCase and trim)
  return word.trim().toLowerCase();
}

function filterEpisodes (word) {    // only return episodes that include the searched input value in their summary or name
  return allEpisodes.filter((ep) => {
    return ep.name.toLowerCase().includes(word) || ep.summary.toLowerCase().includes(word);
  })
}

function render (word = "") {   // render the page according the search input value
  rootElem.innerHTML = "";
  word = cleanUpWord(word);
  const filtered = filterEpisodes(word);
  totalDisplayingEpsP.innerText = `Displaying ${filtered.length}/${allEpisodes.length} episodes.`;
  makePageForEpisodes(filtered);
}

epSearch.addEventListener("input", () => {
  render(epSearch.value);
})

// function renderFooter () {
//   const footer = document.createElement("footer");
//   footer.innerHTML = 'The data shown in this page is provided by <a href="https://www.tvmaze.com/"target="_blank">TVMaze.com</a>';
//   wrapper.appendChild(footer);
// }

window.onload = setup;
// when the onload event happens -> call the setup function 
// window is a global object in the browser      