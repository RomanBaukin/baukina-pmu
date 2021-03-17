'use strict';

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

togglePopUp();