export default class Blog {
  #articleElements = document.querySelectorAll('.article');
  #articleObserver;

  /**
   * Slides up article elements when they are intersecting the screen
   * @author Cristi Sebeni
   */
  constructor() {
    this.#articleObserver = new IntersectionObserver(this.#revealArticle, {
      root: null,
    });

    // // observing article elements
    this.#articleElements.forEach(article => {
      this.#articleObserver.observe(article);

      // adding lowered class to article elements
      article.classList.add('article__lowered');
    });
  }

  // removes lowered class from article when article intersect observer
  #revealArticle(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('article__lowered');

    observer.unobserve(entry.target);
  }
}
