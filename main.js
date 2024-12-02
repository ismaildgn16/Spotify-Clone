import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

const api = new API();

elements.form.addEventListener("submit", (e) => {
  //* Form gönderildiği anda sayfanın yenilenmesini engeller
  e.preventDefault();
  //* Input'un içerisindeki değere event üzerinden erişip değişkene aktardık.
  const query = e.target[0].value;

  if (!query) {
    alert("Lütfen bir müzik ismi giriniz");
    return;
  }

  //* Inputa girilen parametreyi updateTitle fonksiyonuna gönderir ve günceller.
  updateTitle(`${query} İçin Sonuçlar`);

  api.searchMusic(query);
});

//* sayfa yüklendiği anda popüler müzikleri ekrana aktarır.
document.addEventListener("DOMContentLoaded", async () => {
  await api.topPopular();
});

const playMusic = (url) => {
  //* müziğin url'ini html'e aktardık
  elements.audioSource.src = url;
  //* audio elementinin müziği yüklemesini sağlar
  elements.audio.load();
  //* audio elementinin müziği oynatmasını sağlar
  elements.audio.play();
};

const handleClick = (e) => {
  //* Tıklanılan etiketin id'si play-btn ise bu blok çalışır.
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card"); //* parentElement yerine kullanılır.
    renderPlayingInfo(parent.dataset);
    //* müziği çalar
    playMusic(parent.dataset.url);
  }
};

//* fotoğrafa animate class'ını ekler.
const animatePhoto = () => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};

//* fotoğraftan animate class'ını çıkarır.
const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};

//* sayfada tıklanma olaylarını izler
document.addEventListener("click", handleClick);

//* müziği çalma ve durdurma olaylarını izler.
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);
