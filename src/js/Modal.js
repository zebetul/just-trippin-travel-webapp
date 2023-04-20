export default class Modal {
  #modal = document.querySelector('.modal');
  #overlay = document.querySelector('.overlay');
  #btnCloseModal = document.querySelector('.modal__btn--close');
  #btnOpenModal = document.querySelector('.btn--show-modal');

  constructor() {
    this.#btnOpenModal.addEventListener('click', this.#openModal.bind(this));
    this.#btnCloseModal.addEventListener('click', this.#closeModal.bind(this));
    this.#overlay.addEventListener('click', this.#closeModal.bind(this));
    document.addEventListener('keydown', this.#closeModal.bind(this));
  }

  #openModal(e) {
    e.preventDefault();

    this.#modal.classList.remove('hidden');
    this.#overlay.classList.remove('hidden');
  }

  #closeModal(e) {
    e.preventDefault();

    if (!e.key === 'Escape' || this.#modal.classList.contains('hidden')) return;

    this.#modal.classList.add('hidden');
    this.#overlay.classList.add('hidden');
  }
}
