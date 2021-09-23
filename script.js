//You can edit ALL of the code here
// <---- These are variables that store HTML elements that needed ---->
const api = "https://api.tvmaze.com/shows/82/episodes";
const rootElem = document.getElementById("root");   // div that wraps all the epContainer divs
const epSearch = document.getElementById("epSearch");   // search input field
const totalDisplayingEpsP = document.getElementById("totalDisplayingEps"); 
const select = document.getElementById("epDropdown");

async function getEpsWithFetchAndBuildThePage () {  //builds the page with ep cards and returns json in array format
  const promise = await fetch(api);
  const json = await promise.json();
  makePageForEpisodes(json);
  createDropDownSelectEpMenu(json);
 
  function filterEpisodes(word) {  // only return episodes that include the searched input value in their summary or name (for search) 
    return json.filter((ep) => {
      return (
        ep.name.toLowerCase().includes(word) ||
        ep.summary.toLowerCase().includes(word)
      );
    });
  }
  totalDisplayingEpsP.textContent = `Displaying all ${json.length} episodes`;

  
  function render(word = "") { // render the page according the search input value
    rootElem.innerHTML = "";
    word = cleanUpWord(word);
    const filtered = filterEpisodes(word);
    totalDisplayingEpsP.innerText = `Displaying ${filtered.length}/${json.length} episodes.`;
    makePageForEpisodes(filtered);
  }

  epSearch.addEventListener("input", () => {
    render(epSearch.value);
  });
  return json;
}

function makePageForEpisodes(episodeList) {  // this function creates div for each ep and fill their content
  for(let i = 0; i < episodeList.length; i++) {    
    const ep = episodeList[i]; 
    const epContainerDiv = document.createElement("div");   // create container div for each episode
    epContainerDiv.setAttribute("class", "epContainer");
    epContainerDiv.setAttribute("id", `div${i+1}`);
    const a = document.createElement("a");    // turn div content into a link 
    rootElem.appendChild(a);
    a.setAttribute("href", ep.url)
    a.setAttribute("target", "_blank");
    a.setAttribute("class", "epLink");
    a.appendChild(epContainerDiv);
    const epHeader = document.createElement("h2");    // create header for each episode
    epHeader.setAttribute("class", "epHeader");
    epHeader.setAttribute("id", `epHeader${i+1}`);
    epHeader.innerText = `${ep.name} - S${formatEp(ep.season)}E${formatEp(ep.number)}`;
    epContainerDiv.appendChild(epHeader);
    const epImage = document.createElement("img");    // create img element for ep image
    epImage.setAttribute("class", "epImage");
    epImage.setAttribute("id", `epImage${i+1}`);
    epImage.src = ep.image.medium;
    epContainerDiv.appendChild(epImage);
    const epSummaryP = document.createElement("p");   // create p element for ep summary
    epSummaryP.setAttribute("class", "epSummaryP");
    epSummaryP.setAttribute("id", `epSummaryP${i+1}`);
    epSummaryP.innerHTML = `${ep.summary}`;
    epContainerDiv.appendChild(epSummaryP);
  }
}

function formatEp(num) {  // format the number suitable for Season - Episode format
  const str = num.toString();
  return str.padStart(2, "0");
}

function createDropDownSelectEpMenu (episodeList) {  // creates drop down select menu with each option a link to the episode
  episodeList.forEach((ep) => {
     const option = document.createElement("option"); // create option element for each ep and fill the select dropdown
     option.value = `${ep.url}`;
     select.add(option);
     option.innerHTML = `S${formatEp(ep.season)}E${formatEp(ep.number)} - ${ep.name}`;
  })
}

function cleanUpWord (word) {   // format the input value (for the search bar) (toLowerCase and trim)
  return word.trim().toLowerCase();
}

window.onload = getEpsWithFetchAndBuildThePage;