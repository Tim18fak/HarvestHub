console.log('Script loaded');

document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");
  
    faqItems.forEach(function (item) {
      const questionButton = item.querySelector(".faq-question");
  
      questionButton.addEventListener("click", function () {
        item.classList.toggle("open");
      });
    });
  });
  