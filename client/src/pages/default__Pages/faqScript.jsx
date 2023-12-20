console.log('Script loaded');
document.addEventListener("DOMContentLoaded", function () {
    const faqQuestions = document.querySelectorAll('.faq .faq-question');
  
    faqQuestions.forEach(function (question) {
      question.addEventListener('click', function () {
        const faqItem = this.closest('.faq-item');
        faqItem.classList.toggle('open');
      });
    });
  });
  