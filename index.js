let submitButton = document.getElementById("submitButton");
let sourceTextarea = document.getElementById("sourceTextarea");
let extSummaryTextarea = document.getElementById("extSummaryTextarea");
let absSummaryTextarea = document.getElementById("absSummaryTextarea");

let PORT = 3000;

submitButton.onclick = async (e) =>{
  e.preventDefault();
  e.stopPropagation();

  console.log(extSummaryTextarea)
  extSummaryTextarea.textContent = "Summarizing...";
  absSummaryTextarea.textContent = "Summarizing...";

  try{
    data = {
      sourceText: sourceTextarea.value
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
    extSummaryTextarea.textContent = extSummary;
	absSummaryTextarea.textContent = absSummary;
  }
  catch(e){
    extSummaryTextarea.textContent = "Something wrong happened..."
  }
};
