export default class LazyLoading {
  // selecting images
  #images = document.querySelectorAll('img[data-src]');
  #imgObserver;
  #entry;

  /**
   * low resolution images are replaced with high resolution ones when those are finished loading
   * @author Cristi Sebeni
   */
  constructor() {
    this.#imgObserver = new IntersectionObserver(this.#loadImage.bind(this), {
      root: null,
      threshold: 0,
      // rootMargin: '200px',
    });
    this.#images.forEach(img => this.#imgObserver.observe(img));
  }

  #loadImage(entries, observer) {
    [this.#entry] = entries;
    console.log(this.#entry);

    // if no entries observed return immediately
    if (!this.#entry.isIntersecting) return;

    // replace src with  data-src
    this.#entry.target.src = this.#entry.target.dataset.src;

    // remove lazy-img class only when original image finished loading
    this.#entry.target.addEventListener('load', e => {
      this.#entry.target.classList.remove('lazy-img');
    });

    // quit observing image
    observer.unobserve(this.#entry.target);
  }
}
