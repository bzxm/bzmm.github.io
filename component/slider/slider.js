// JavaScript部分
const slides = document.querySelector('.slides');
let slideWidth = slides.clientWidth;
const totalSlides = document.querySelectorAll('.slide').length;
const dots = document.querySelectorAll('.slideDot');
let currentSlide = 0;
let timer;

// 初始化导航点
dots[currentSlide].classList.add('active');

function goToSlide(slideNumber) {
  slides.style.transform = `translateX(-${slideWidth * slideNumber}px)`;
  currentSlide = slideNumber;
  updateDots();
}

function updateDots() {
  dots.forEach((slideDot, index) => {
    if (index === currentSlide) {
      slideDot.classList.add('active');
    } else {
      slideDot.classList.remove('active');
    }
  });
}

dots.forEach((slideDot, index) => {
  slideDot.addEventListener('click', () => {
    clearInterval(timer); // 清除之前的定时器
    goToSlide(index);
    timer = setInterval(nextSlide, 2000); // 重新设置定时器
  });
});

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    goToSlide(currentSlide + 1);
  } else {
    goToSlide(0);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    goToSlide(currentSlide - 1);
  } else {
    goToSlide(totalSlides - 1);
  }

}

timer = setInterval(nextSlide, 2000); // 设置初始定时器

let touchStartX = 0;
let touchEndX = 0;

slides.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  clearInterval(timer); // 清除之前的定时器
  
});

slides.addEventListener('touchmove', (e) => {
  touchMoveX = e.touches[0].clientX;
  const offsetX =  touchStartX - touchMoveX;
  slides.style.transform = `translateX(-${slideWidth * currentSlide + offsetX}px)`;
  e.preventDefault(); // 阻止默认的触摸事件行为
});

slides.addEventListener('touchend', (e) => {
  const distance = touchMoveX - touchStartX;
  if (distance > 50 && currentSlide > 0) {
    prevSlide();
  } else if (distance < -50 && currentSlide < totalSlides - 1) {
    nextSlide();
  } else {
    goToSlide(currentSlide);
  }
  timer = setInterval(nextSlide, 3000); // 重新设置定时器
});




// 监听窗口大小变化并重新设置slideWidth
window.addEventListener('resize', () => {
  slideWidth = slides.clientWidth;
});
// 监听窗口大小变化并重新设置slideWidth
document.addEventListener('resize', () => {
  slideWidth = slides.clientWidth;
});

