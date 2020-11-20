import "./gallery-items.js";
import galleryItems from "./gallery-items.js"

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const ref = {
    galleryContainer: document.querySelector('.js-gallery'),
    galleryImage: document.querySelector('.gallery__image'),
    galleryLink: document.querySelector('.gallery__link'),
    jsLightbox: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightboxButton: document.querySelector('[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
}

const galleryMarkup = createGalery(galleryItems);
ref.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalery(gallery) {
    return gallery.map(({preview , original, description},index) => {
        return `
        <li class="gallery__item">
            <a
            class="gallery__link"
            href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
            />
            </a>
            </li> 
        `;
    })
    .join('');
}

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
ref.galleryContainer.addEventListener('click', openJsLightbox);

function openJsLightbox(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }

    const bigURL = e.target.dataset.source;
    const imgALT = e.target.alt;
    const index = e.target.dataset.index;

    ref.jsLightbox.classList.add("is-open");
    ref.lightboxImage.src = bigURL;
    ref.lightboxImage.alt = imgALT;
    ref.lightboxImage.dataset.index = index;
}

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].

ref.lightboxButton.addEventListener('click', closeJsLightbox);

function closeJsLightbox() {
    ref.jsLightbox.classList.remove("is-open");
    ref.lightboxImage.src = '';
    ref.lightboxImage.alt = '';
}

// Закрытие модального окна по клику на div.lightbox__overlay.
ref.lightboxOverlay.addEventListener('click', closeJsLightbox);

// Закрытие модального окна по нажатию клавиши ESC.

document.addEventListener('keydown', closeJsLightboxByKey);

function closeJsLightboxByKey(e) {
    if (e.code  === "Escape") {
        closeJsLightbox();
    }
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

document.addEventListener('keydown', (e) => scrollGallery(e, galleryItems));

function scrollGallery(e, gallery) {
    let index = parseInt(ref.lightboxImage.dataset.index);
    if (e.code === "ArrowLeft" && index > 0) {
        index -= 1;
        ref.lightboxImage.dataset.index = index;
        ref.lightboxImage.src = gallery[index].original;
    }
        if (e.code === "ArrowRight" && index < gallery.length - 1) { 
            index += 1;
            ref.lightboxImage.dataset.index = index;
            ref.lightboxImage.src = gallery[index].original;
    }
}