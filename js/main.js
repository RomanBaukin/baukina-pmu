'use strict';

// Popup
const togglePopUp = () => {
  const popUp = document.querySelector('.popup'),
    popUpBtn = document.querySelectorAll('.button__registration, .button__consultation'),
    popUpContent = popUp.querySelector('.popup__content');

  let count = 0;

  function popUpAnimate() {
    if (document.documentElement.clientWidth > 768) {
      count++;
      popUpContent.style.transform = `translateY(${count}%)`;
      if (count < 30) {
        setTimeout(popUpAnimate, 10);
      } else {
        count = 0;
        clearTimeout(popUpAnimate);
      }
    } else {
      popUpContent.style.transform = `translateY(0)`;
    }
  }

  popUpBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      popUp.style.display = 'block';
      // popUpAnimate();
    });
  });

  popUp.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains('popup__close')) {
      popUp.style.display = 'none';
    } else {
      target = target.closest('.popup__content');

      if (!target) {
        popUp.style.display = 'none';
      }
    }
  });
};

// Плавный скролл
const smoothScrolling = () => {
  const links = document.querySelectorAll('.smooth-scroll');

  links.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;
      if (!target.getAttribute('href')) {
        target = target.closest('.smooth-scroll');
      }
      const blockID = target.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
};

// Эффекты при скроллинге
const scrollingPage = () => {
  // функция для эффектов при прокрутке страницы
  const btnArrowUp = document.getElementById('arrow-up'); //кнопка скроллинга страницы вверх

  btnArrowUp.style.display = 'none'; //скрывает кнопку скроллинга вверх при обновлении страницы

  window.addEventListener('scroll', () => {
    if (window.scrollY > 781) {
      //кнопка прокрутки страницы вверх появляется только после прокручивания первого блока
      btnArrowUp.style.display = 'block';
    } else {
      btnArrowUp.style.display = 'none';
    }
  });
};

togglePopUp();
smoothScrolling();
scrollingPage();