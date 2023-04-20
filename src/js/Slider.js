export default class Slider {
  // selecting DOM elements
  #slides = document.querySelectorAll('.slider__slide');
  #dotContainer = document.querySelector('.slider__dots');
  #btnSliderLeft = document.querySelector('.slider__btn--left');
  #btnSliderRight = document.querySelector('.slider__btn--right');
  #slide;
  #currSlide;
  #maxSlides;

  /**
   * Creates a dot for each image. Listens to the click events on the dots and on the arrows and displays the images accordingly
   * @param {Number} slide the initial slide number
   * @author Cristi Sebeni
   */
  constructor(slide) {
    this.#slide = slide;
    this.#currSlide = slide;
    this.#maxSlides = this.#slides.length;

    this.#goToSlide(this.#slide);
    this.#createDots();
    this.#activateDot(this.#slide);

    // ----------> EVENT HANDLERS
    this.#btnSliderRight.addEventListener('click', this.#nextSlide.bind(this));
    this.#btnSliderLeft.addEventListener(
      'click',
      this.#previousSlide.bind(this)
    );
    document.addEventListener('keydown', e => {
      e.key === 'ArrowRight' && this.#nextSlide();
      e.key === 'ArrowLeft' && this.#previousSlide();
    });
    this.#dotContainer.addEventListener('click', e => {
      // if clicked on dot
      if (e.target.classList.contains('slider__dots__dot')) {
        // extracting clicked dot data-slide value
        const { slide } = e.target.dataset; // data-slide="" was created when dots

        // displaying the slide that coresponds to clicked dot
        this.#goToSlide(slide);

        // ---------->  activating clicked dot
        this.#activateDot(slide);
      }
    });
  }

  // ----------> FUNCTIONS
  #goToSlide(sl) {
    this.#slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - sl)}%)`;
    });
  }

  #nextSlide() {
    if (this.#currSlide === this.#maxSlides - 1) this.#currSlide = 0;
    else this.#currSlide++;
    this.#goToSlide(this.#currSlide);
    this.#activateDot(this.#currSlide);
  }

  #previousSlide() {
    if (this.#currSlide === 0) this.#currSlide = this.#maxSlides - 1;
    else this.#currSlide--;
    this.#goToSlide(this.#currSlide);
    this.#activateDot(this.#currSlide);
  }

  #createDots() {
    this.#slides.forEach((_, i) =>
      this.#dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="slider__dots__dot" data-slide="${i}"></button>`
      )
    );
  }

  #activateDot(slide) {
    // selectig the dots
    const dots = document.querySelectorAll('.slider__dots__dot');

    // removing existing active class
    dots.forEach(dot => dot.classList.remove('slider__dots__dot--active'));

    // adding active class to the dot that coresponds with the indicated slide
    document
      .querySelector(`.slider__dots__dot[data-slide="${slide}"]`)
      .classList.add('slider__dots__dot--active');
  }
}
