'use strict';

// Popup
const togglePopUp = () => {
  const popUp = document.querySelector('.popup'),
    popUpBtn = document.querySelectorAll('.button__registration, .button__consultation');

  popUpBtn.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      const target = event.target;

      if (!target.closest('footer')) {
        popUp.style.display = 'block';
      }
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

// Отправка формы
const sendForm = () => {
  const errorMessage = 'Что то пошло не так...',
    loadMessage = `
      <div class = "loadingio-spinner-spinner-g5rfu6n7i6f" style = "margin-top: 20px;">
        <div class = "ldio-vb5a1vboiid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div></div>
        <style type = "text/css">
        @keyframes ldio-vb5a1vboiid {
          0% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

        .ldio-vb5a1vboiid div {
          left: 45px;
          top: 29.5px;
          position: absolute;
          animation: ldio-vb5a1vboiid linear 1s infinite;
          background: #ffa17e;
          width: 10px;
          height: 1px;
          border-radius: 5px / 0.5px;
          transform-origin: 5px 20.5px;
        }

        .ldio-vb5a1vboiid div:nth-child(1) {
          transform: rotate(0deg);
          animation-delay: -0.8888888888888888s;
          background: #ffa17e;
        }

        .ldio-vb5a1vboiid div:nth-child(2) {
          transform: rotate(40deg);
          animation-delay: -0.7777777777777778s;
          background: #ffa17e;
        }

        .ldio-vb5a1vboiid div:nth-child(3) {
          transform: rotate(80deg);
          animation-delay: -0.6666666666666666s;
          background: #ffa17e;
        }

        .ldio-vb5a1vboiid div:nth-child(4) {
          transform: rotate(120deg);
          animation-delay: -0.5555555555555556s;
          background: #ffa17e;
        }

        .ldio-vb5a1vboiid div:nth-child(5) {
          transform: rotate(160deg);
          animation-delay: -0.4444444444444444s;
          background: #ffa17e;
        }

        .ldio-vb5a1vboiid div:nth-child(6) {
          transform: rotate(200deg);
          animation-delay: -0.3333333333333333s;
          background: #ffa17e;
        }

        .ldio-vb5a1vboiid div:nth-child(7) {
          transform: rotate(240deg);
          animation-delay: -0.2222222222222222s;
          background: #ffa17e;
        }

        .ldio-vb5a1vboiid div:nth-child(8) {
          transform: rotate(280deg);
          animation-delay: -0.1111111111111111s;
          background: #ffa17e;
        }

        .ldio-vb5a1vboiid div:nth-child(9) {
          transform: rotate(320deg);
          animation-delay: 0s;
          background: #ffa17e;
        }

        .loadingio-spinner-spinner-g5rfu6n7i6f {
          width: 50px;
          height: 50px;
          display: inline-block;
          overflow: hidden;
          background: #ffffff;
        }

        .ldio-vb5a1vboiid {
          width: 100%;
          height: 100%;
          position: relative;
          transform: translateZ(0) scale(0.5);
          backface-visibility: hidden;
          transform-origin: 0 0;
          /* see note above */
        }

        .ldio-vb5a1vboiid div {
          box-sizing: content-box;
        } 
        </style>`,
    successMessage = 'Спасибо! Я скоро с вами свяжусь';

  const form = document.querySelectorAll('form'),
    input = document.querySelectorAll('form input'),
    textarea = document.querySelectorAll('form textarea');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem;
  margin-top: 20px;`;

  form.forEach((item) => {
    item.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target;

      if (target.matches('form')) {
        target.appendChild(statusMessage);
        statusMessage.innerHTML = loadMessage;
        const formData = new FormData(target);
        const body = {};

        formData.forEach((val, key) => {
          body[key] = val;
        });

        const outputData = () => {
          input.forEach((item) => {
            item.value = '';
          });
          textarea.forEach((item) => {
            item.value = '';
          });
          statusMessage.textContent = successMessage;
          const statusMessageRemove = () => {
            target.removeChild(statusMessage);
          };

          setTimeout(statusMessageRemove, 5000);
        };

        postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('status network not 200');
            }
            outputData();
          })
          .catch((error) => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          });
      }
    });
  });

  const postData = (body) =>
    fetch('./send.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
};

// Слайдер
const slider = () => {
  const slide = document.querySelectorAll('.slider__item'),
    slider = document.querySelector('.slider'),
    dots = document.querySelector('.slider__dots');

  let currentSlide = 0,
    interval;

  const renderDots = () => {
    for (let i = 0; i < slide.length; i++) {
      const li = document.createElement('li');
      li.classList.add('dot');
      if (i === 0) {
        li.classList.add('dot-active');
      }
      dots.append(li);
    }
  };

  renderDots();

  const dot = dots.querySelectorAll('.dot');

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, 'slider__item--active');
    prevSlide(dot, currentSlide, 'dot-active');
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, 'slider__item--active');
    nextSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', (event) => {
    event.preventDefault();

    const target = event.target;

    if (!target.matches('.slider__btn, .dot')) {
      return;
    }

    prevSlide(slide, currentSlide, 'slider__item--active');
    prevSlide(dot, currentSlide, 'dot-active');

    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }
    nextSlide(slide, currentSlide, 'slider__item--active');
    nextSlide(dot, currentSlide, 'dot-active');
  });

  slider.addEventListener('mouseover', (event) => {
    if (event.target.matches('.slider__btn, .dot')) {
      stopSlide();
    }
  });

  slider.addEventListener('mouseout', (event) => {
    if (event.target.matches('.slider__btn, .dot')) {
      startSlide();
    }
  });

  startSlide();
};


togglePopUp();
smoothScrolling();
scrollingPage();
sendForm();
slider();