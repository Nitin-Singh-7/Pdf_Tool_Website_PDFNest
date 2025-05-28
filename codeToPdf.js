let uploadedFiles = []; // Store uploaded files

// /*Handle file upload (via input or drag & drop)
function handleFiles(files) {
  uploadedFiles = Array.from(files); // Store files

  // Show the file icon container
  const fileIconContainer = document.getElementById("fileIconContainer");
  const fileCountBadge = document.getElementById("fileCountBadge");

  fileIconContainer.style.display = "inline-block"; // Show the icon
  fileCountBadge.textContent = uploadedFiles.length; // Update number badge

  // Optionally show a toast also
  showToast(uploadedFiles.length+" File(s) uploaded Successfully!");
}


// Drag & drop handlers
const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");

dropArea.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragging");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragging");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragging");
  handleFiles(e.dataTransfer.files);
});

// Preview files in new tab
function previewFiles() {
  if (uploadedFiles.length === 0) {
    alert("No files uploaded to preview.");
    return;
  }

  let content = "";
  let loadedCount = 0;

  uploadedFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileContent = e.target.result;
      content += `<h3>${file.name}</h3><pre>${escapeHTML(fileContent)}</pre><hr>`;
      loadedCount++;

      if (loadedCount === uploadedFiles.length) {
        const newWindow = window.open();
        newWindow.document.write(`
          <html><head><title>Preview</title>
          <style>body { font-family: 'Courier New'; padding: 20px; } pre { white-space: pre-wrap; background: #f0f0f0; padding: 15px; }</style>
          </head><body>${content}</body></html>
        `);
        newWindow.document.close();
      }
    };
    reader.readAsText(file);
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag]));
}

// Generate PDF
function generatePDF() {
  if (uploadedFiles.length === 0) {
    alert("Please upload some files first!");
    return;
  }

  const pdfContent = document.createElement("div");
  pdfContent.style.fontFamily = "'Times New Roman', Times, serif";
  pdfContent.style.fontSize = "14px";
  pdfContent.style.whiteSpace = "pre-wrap";
  pdfContent.style.lineHeight = "1.6";
  pdfContent.style.color = "#000";
  pdfContent.style.backgroundColor = "#fff";
  pdfContent.style.padding = "20px";
  pdfContent.style.width = "100%";
  pdfContent.style.boxSizing = "border-box";

  let loadedCount = 0;

  uploadedFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const page = document.createElement("div");
      page.style.pageBreakBefore = index !== 0 ? "always" : "auto";
      page.style.marginBottom = "20px";
      page.style.padding = "0";
      page.textContent = `${file.name}\n\n${e.target.result.trim()}`;
      pdfContent.appendChild(page);

      loadedCount++;

      if (loadedCount === uploadedFiles.length) {
        document.body.appendChild(pdfContent);

        html2pdf()
          .set({
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: "Code2PDF.pdf",
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'], before: 'div[style*="page-break-before"]' }
          })
          .from(pdfContent)
          .save()
          .then(() => {
            document.body.removeChild(pdfContent);
          });
      }
    };
    reader.readAsText(file);
  });
}


// TOAST NOTIFICATION
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.visibility = "visible";
  toast.style.opacity = "1";
  toast.style.bottom = "50px";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.bottom = "30px";
    setTimeout(() => {
      toast.style.visibility = "hidden";
    }, 500);
  }, 3000); // Show for 3 seconds
}


/*FILE UPLOAD
function handleFiles(files) {
  const container = document.getElementById("codeContainer");
  container.innerHTML = ""; // Clear previous

  if (files.length > 0) {
    // Show file icon and badge
    const fileIconContainer = document.getElementById("fileIconContainer");
    const fileCountBadge = document.getElementById("fileCountBadge");
    
    fileIconContainer.style.display = "inline-block";
    fileCountBadge.textContent = files.length;
  }

  Array.from(files).forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // you already know this part
      const label = document.createElement("label");
      label.textContent = file.name;
      const pre = document.createElement("pre");
      pre.textContent = e.target.result;
      pre.style.background = "#f0f0f0";
      pre.style.padding = "10px";
      pre.style.borderRadius = "5px";
      pre.style.marginBottom = "15px";
      container.appendChild(label);
      container.appendChild(pre);
    };
    reader.readAsText(file);
  });
}
*/