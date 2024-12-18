let currentIndex = 0;
const images = document.querySelectorAll('.carousel-track a');
const totalSlides = images.length;

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function showSlide(index) {
    images.forEach((img, i) => {
        img.setAttribute('tabindex', i === index ? "0" : "-1");
        img.setAttribute('aria-hidden', i === index ? "false" : "true");
        img.style.display = i === index ? "block" : "none";
    });
}

function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

function showPrevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
}

prevButton.addEventListener('click', showPrevSlide);
nextButton.addEventListener('click', showNextSlide);

// 初期表示の設定
showSlide(currentIndex);
