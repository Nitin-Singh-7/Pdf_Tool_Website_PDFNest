// Main Page
function openTool(tool) {
    const toolUrls = {
        code2pdf: 'https://codetopdf.netlify.app',
        docxtopdf: '#',
        imagetopdf: '#',
        ppttopdf: '#',
        pdfmerger: '#',
        pdfextractor: '#'
    };
    if (toolUrls[tool]) {
        window.open(toolUrls[tool], '_blank');
    }
}


document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const arrow = question.querySelector(".arrow");

      // Close all other answers
      document.querySelectorAll(".faq-answer").forEach((el) => {
        if (el !== answer) el.style.display = "none";
      });

      // Reset other arrows
      document.querySelectorAll(".arrow").forEach((ar) => {
        if (ar !== arrow) ar.style.transform = "rotate(0deg)";
      });

      // Toggle current answer and arrow
      const isVisible = answer.style.display === "block";
      answer.style.display = isVisible ? "none" : "block";
      arrow.style.transform = isVisible ? "rotate(0deg)" : "rotate(90deg)";
    });
  });
});

  