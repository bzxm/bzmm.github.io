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
let touchMoveX = 0;

let touchStartY = 0;
let touchMoveY = 0;

slides.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  clearInterval(timer); // 清除之前的定时器
  
});

slides.addEventListener('touchmove', (e) => {
  touchMoveX = e.touches[0].clientX;
  touchMoveY = e.touches[0].clientY;
  const offsetX = touchStartX - touchMoveX;
  const offsetY = touchStartY - touchMoveY;
  // 判断是否水平滚动
  if (Math.abs(offsetX) > Math.abs(offsetY)) {
    e.preventDefault(); // 只阻止默认的触摸事件行为，当水平滚动时
  }
  slides.style.transform = `translateX(-${slideWidth * currentSlide + offsetX}px)`;
  // // 判断触摸移动过程中是否超出幻灯片范围，如果超出则立即阻止默认事件
  // const rect = slides.getBoundingClientRect();
  // if (touchMoveX < rect.left || touchMoveX > rect.right || touchMoveY < rect.top || touchMoveY > rect.bottom) {
  //   e.preventDefault();
  // }
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

