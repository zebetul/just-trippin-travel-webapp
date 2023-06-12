export default class NavBar {
  #navLinks = document.querySelector('.nav__links');
  #navIcon = document.querySelector('.nav__icon');
  #closeIcon = document.querySelector('.nav__close-icon');
  #targetLink;
  #siblings;

  /**
   * Smooths scrolling until clicked section
   * When mouse over a navigation link, sets opacity to 50% to every other link
   * Add click event liestener to menu-icon and to close-icon when screen width is smaller then 900px, to open and close the menu
   * @author Cristi Sebeni
   */
  constructor() {
    this.#navLinks.addEventListener('mouseover', e => this.#setOpacity(e, 0.5));
    this.#navLinks.addEventListener('mouseout', e => this.#setOpacity(e, 1));
    this.#navLinks.addEventListener('click', this.#handleNavigation.bind(this));
    this.#navIcon.addEventListener('click', this.#openMenu.bind(this));
    this.#closeIcon.addEventListener('click', this.#closeMenu.bind(this));
  }

  #setOpacity(e, opacity) {
    // checking if target element(from eventListener) has 'nav__link' class
    if (window.outerWidth > 900 && e.target.classList.contains('nav__link')) {
      // then assigning variables(target elem., siblings(the other nav__link's))
      this.#targetLink = e.target;
      this.#siblings = e.target.closest('nav').querySelectorAll('.nav__link');

      // set opacity to every link other than targetLink
      this.#siblings.forEach(sib => {
        if (sib !== this.#targetLink) {
          // this keyword indicates to 0.5 and 1 from .bind, see eventListeners
          sib.style.opacity = opacity;
        }
      });
    }
  }
  /**
   * smooth scroll into view animation
   * @param {Event} e click event on nav__links
   */
  #handleNavigation(e) {
    e.preventDefault();

    // check if target element has the requiered class list
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      if (id === '#') return;

      // brings section into view
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  }
  #openMenu() {
    this.#navLinks.classList.toggle('show-menu');

    this.#navIcon.style.display = 'none';
    this.#closeIcon.style.display = 'block';
  }
  #closeMenu() {
    this.#navLinks.classList.toggle('show-menu');

    this.#navIcon.style.display = 'block';
    this.#closeIcon.style.display = 'none';
  }
}
