export default class AboutUs {
  #counter = document.querySelectorAll('.counters__container');
  #countries = document.querySelector('#countries');
  #articles = document.querySelector('#articles');
  #followers = document.querySelector('#followers');
  #counterObserver;
  #data;

  constructor(data) {
    this.#data = data;

    this.#counterObserver = new IntersectionObserver(
      this.#initCounters.bind(this),
      {
        root: null,
        threshold: 1,
      }
    );
    this.#counter.forEach(counter => this.#counterObserver.observe(counter));
  }

  // creates an animation with a counter until number is reached
  #animateCounter(counter, number = 299, duration = 3) {
    // using IIFE for looping with setTimeout
    (function loop(i) {
      setTimeout(() => {
        counter.textContent = number - i + 1;

        // decreasing i until i=0 > exit condition
        if (--i) loop(i);
      }, (duration / number) * 1000);
    })(number);
  }

  #initCounters(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    // if device screen's width is over 900px than start every counter at the same time
    if (window.innerWidth > 900) {
      this.#animateCounter(this.#countries, ...this.#data.countries);
      this.#animateCounter(this.#articles, ...this.#data.articles);
      this.#animateCounter(this.#followers, ...this.#data.followers);

      observer.unobserve(entry.target);

      // if device screen's width is under 900px than start the counter that enters the screen area
    } else {
      const counter = entry.target;

      this.#animateCounter(
        document.querySelector(`#${counter.classList[1]}`),
        ...this.#data[counter.classList[1]]
      );

      observer.unobserve(entry.target);
    }
  }
}
