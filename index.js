let submitButton = document.getElementById("submitButton");
let sourceTextarea = document.getElementById("sourceTextarea");
let summaryTextarea = document.getElementById("summaryTextarea");
let modeSelect = document.getElementById("modeSelect");

let PORT = 3000;

submitButton.onclick = async (e) =>{
  e.preventDefault();
  e.stopPropagation();


  data = {
    sourceText: sourceTextarea.value
  };
  baseURL = `http://140.118.127.72:${PORT}/`;
  mode = modeSelect.value;

  console.log(`fetching ${baseURL}${mode}`);
  console.log(`with body ${JSON.stringify(data)}`);

  response = await fetch(`${baseURL}${mode}`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((res) => res.json());

  console.log(response);
  summary = response.summary;
  summaryTextarea.textContent = summary;
};
