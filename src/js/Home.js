// ----------> DOWN ARROW ANIMATION
export default class Home {
  #arrowElement = document.querySelector('.home__arrow');
  #titleElements = document.querySelectorAll('.home__title');
  #lineElement = document.querySelector('.home__line');
  #descriptionElement = document.querySelector('.home__description');
  #arrowObserver;
  #title;
  #description;

  /**
   * Create title init animations
   * @param {Object} title a title object with a description that will be animated
   * @author Cristi Sebeni
   */
  constructor(title) {
    this.#title = title.title;
    this.#description = title.description;

    this.#animateTitle();
    this.#animateLine(2, 2);
    this.#animateText(this.#description, 50, 3.5);
    this.#animateArrow(1, 8);
    this.#arrowObserver = new IntersectionObserver(this.#hideArrow, {
      root: null,
      threshold: 0,
    });
    this.#arrowObserver.observe(this.#arrowElement);
  }

  // applies a delayed animation to every word from title
  #animateTitle() {
    this.#titleElements.forEach((word, i) => {
      word.style.animation = `title-animation 2s ease ${i}s 1 normal forwards`;
    });
  }

  // applies a delayed animation to the line under the title
  #animateLine(duration, delay) {
    this.#lineElement.style.animation = `draw-line-animation ${duration}s ease ${delay}s 1 normal forwards`;
  }

  // applies a delayed animation to the description's text content
  #animateText(text, freq, delay) {
    setTimeout(e => {
      [...this.#description].forEach((letter, i) => {
        setTimeout(
          e => (this.#descriptionElement.textContent += letter),
          (i * 1000) / freq
        );
      });
    }, delay * 1000);
  }

  // applies a delayed animation to the arrow
  #animateArrow(duration, delay) {
    this.#arrowElement.style.animation = `arrow-animation ${duration}s ease ${delay}s infinite`;
  }

  // hide arrow when scrolled out of view
  #hideArrow(entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting) return;

    entry.target.style.animation = '';

    observer.unobserve(entry.target);
  }
}
