import { API } from "./api.js";
import { UI } from "./ui.js";

// class yapısını kullanabilmek için bunun örneğini al

const api = new API();
// popüler müzikleri al
api.getPopular();

const ui = new UI();

// ! sayfa yüklendiğinde api isteği at
document.addEventListener("DOMContentLoaded", async () => {
  // loader render et
  ui.renderLoader();

  // api'den gelen veriyi kullanarak arayüzü renderla
  const data = await api.getPopular();

  // api den gelen veriyi arayüze aktar
  ui.renderCards(data);
});

// ! form gönderildiğinde input değerini al ve api isteği at

ui.form.addEventListener("submit", async (e) => {
  // formun default davranışını engelle
  e.preventDefault();

  // input değerini al
  const querry = e.target[0].value;

  // eğer input değeri yoksa api isteği atma

  if (!querry.trim()) {
    // eğer input değeri fonksiyonu çalıştırma
    return;
  }

  // loader render et
  ui.renderLoader();

  // title ı dinamik olarak güncelle
  ui.title.innerText = `${querry} için sonuçlar`;

  //form içerisinden elde edilen değeri istek atmak

  const songs = await api.getSearchMusic(querry);

  ui.renderCards(songs);
});

// * play ikonuna tıklandığında şarkıyı çal
ui.list.addEventListener("click", (e) => {
  // eğer tıklanan eleman play ikonu ise fonksiyonu çalıştır
if (e.target.className == "play") {
  // play ikonunun kapsayıcısı olan card a eriş
  const card =  e.target.parentElement.parentElement;
  
  // card a atanan data değerlerini al
  const songData = card.dataset; // şarkı adı
 
  // player alanını dinamik olarak render et
  ui.renderPlayer(songData);
}
 
});
