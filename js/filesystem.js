let docs = new Map();

var pdfjsLib = window["pdfjs-dist/build/pdf"];
var pdfDoc = null,
  pageNum = 1,
  pageRendering = false,
  pageNumPending = null,
  scale = 1.5, // zoom
  canvas = null;
ctx = null;

/* ---------- pdf ---------- */

function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function (page) {
    var viewport = page.getViewport({ scale: scale });
    canvas.height = 200;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function () {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });
}

function previewDoc(doc) {
  var docUrl = window.URL.createObjectURL(doc);
  console.log("doc url: ", docUrl);

  var loadingTask = pdfjsLib.getDocument(docUrl);

  // get progress data
  // loadingTask.onProgress = function (data) {
  //   document.getElementById("pdf-progress").textContent =
  //     "Downloaded " + data.loaded;
  // };

  loadingTask.promise.then(function (_pdfDoc) {
    pdfDoc = _pdfDoc;

    renderPage(pageNum);
  });
}

function onDelete(id) {
  docs.delete(id);
  document.getElementById(id).remove();
}

function displayUploadedDocs(id, docName) {
  var parentDiv = document.getElementById("docs_container");

  // doc-container tag
  var docContainer = document.createElement("div");
  docContainer.id = id;
  docContainer.className = "doc_container";

  // canvas-container tag
  canvasContainer = document.createElement("div");
  canvasContainer.id = id;
  canvasContainer.onclick = function () {
    alert("id :" + this.id);
  };

  // canvas tag
  canvas = document.createElement("canvas");
  canvas.id = "pdf-canvas";
  // set context
  ctx = canvas.getContext("2d");

  // delete canvas tag
  var deletebtn = document.createElement("button");
  deletebtn.id = id;
  deletebtn.innerHTML = "Delete";
  deletebtn.onclick = function () {
    onDelete(this.id);
  };

  canvasContainer.appendChild(canvas);
  docContainer.appendChild(canvasContainer);
  docContainer.appendChild(deletebtn);
  parentDiv.appendChild(docContainer);
}

function uploadDoc(event) {
  event.preventDefault();
  var file = document.getElementById("file_upload").files[0];
  //   docs.push(file);
  let id = uuidv4();
  docs.set(id, file);

  // temporarly display a file without storing
  previewDoc(file);
  displayUploadedDocs(id, docs.get(id).name);
  // send to database
}
