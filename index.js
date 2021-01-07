const submitButton = document.getElementById("submitButton");
const sourceTextarea = document.getElementById("sourceTextarea");
const extSummaryTextarea = document.getElementById("extSummaryTextarea");
const absSummaryTextarea = document.getElementById("absSummaryTextarea");
const searchResultsPanel = document.getElementById("searchResultsPanel");



const PORT = 3000;

function updateSearchResults(searchResults) {
	let resultBlocks = searchResultsPanel.children

	resultCount = Math.min(resultBlocks.length, searchResults.length)
	if(resultCount == 0){
		resultBlocks[0].children[2].innerHTML = "No results found."
	}
	else{
		for (i = 0; i < resultCount; i++) {
			resultBlock = resultBlocks[i].children
			resultBlock[0].children[0].innerHTML = searchResults[i].title;
			resultBlock[0].children[0].href = searchResults[i].link;
			resultBlock[1].innerHTML = searchResults[i].link;
			resultBlock[2].innerHTML = searchResults[i].snippet;
		}
	}
}

function clearSearchResults(){
	let resultBlocks = searchResultsPanel.children

	for (i = 0; i < resultBlocks.length; i++) {
		resultBlock = resultBlocks[i].children
		resultBlock[0].children[0].innerHTML = "";
		resultBlock[0].children[0].href = "#";
		resultBlock[1].innerHTML = "";
		resultBlock[2].innerHTML = "";
	}
}

sourceTextarea.onclick = (e) => {
	e.preventDefault();
	toReplace(sourceTextarea);
}

function toReplace(divElement){
	var inputElement = document.createElement("textArea");
	inputElement.setAttribute("rows", 21)
	inputElement.setAttribute("class", "border-2 border-primary rounded")
	inputElement.value = divElement.innerHTML;

	divElement.parentNode.replaceChild(inputElement, divElement);
	inputElement.focus();
	inputElement.onblur = function() {
		divElement.innerHTML = inputElement.value;
		inputElement.parentNode.replaceChild(divElement, inputElement);
	}
}

submitButton.onclick = async (e) => {
	e.preventDefault();
	e.stopPropagation();

	clearSearchResults()

	extSummaryTextarea.textContent = "Summarizing...";
	absSummaryTextarea.textContent = "Summarizing...";


	// update summaries
	try {
		data = {
			sourceText: sourceTextarea.innerHTML
		};
		baseURL = `http://140.118.127.72:${PORT}/`;

		console.log(`fetching ${baseURL}`);
		console.log(`with body ${JSON.stringify(data)}`);

		response = await fetch(`${baseURL}`, {
			method: 'POST',
			body: JSON.stringify(data),
		}).then((res) => res.json());

		console.log(response);
		let extSummary = response.ext;
		let absSummary = response.abs;
		let highlightedSourceText = response.highlighted;
		let searchResults = response.searchResults;

		sourceTextarea.innerHTML = highlightedSourceText;
		extSummaryTextarea.innerHTML = extSummary;
		absSummaryTextarea.innerHTML = absSummary;
		updateSearchResults(searchResults);
	}
	catch (e) {
		extSummaryTextarea.textContent = "Something wrong happened...";
		absSummaryTextarea.textContent = "Something wrong happened...";
		console.log(e);
	}

};
