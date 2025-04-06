class UI {
  constructor() {
    // html'deki elemanlara erişiyoruz
    this.list = document.querySelector("#list");
    this.form = document.querySelector("form");
    this.title = document.querySelector("#title");
    this.player = document.querySelector(".player");
  }

  // api'den gelen veriye göre arayüzü renderlayan fonk.
  renderCards(songs) {
    // html deki şarkı listesini temizle ki loader tek oynasın
    this.list.innerHTML = "";

    // dışarıdan verilen şarkı verisini kullanarak herbir şarkı için bir html oluştur.
    songs.forEach((song) => {
      //card elemanı oluştur
      const card = document.createElement("div");
      card.className = "card"; //card.classList.add("card") ile de yapabilirdik

      // card a şarkıya ait resim, müzik, şarkı adı ve şarkıcı veya şarkı grubu adı bilgilerini ata
      card.dataset.title = song.title; // şarkı adı
      card.dataset.artist = song.subtitle; // şarkıcı adı
      card.dataset.image = song.images.coverarthq; // şarkı resmi
      card.dataset.audio = song.hub.actions[1].uri; // şarkı müziği

      // card html'ini oluştur ve card içeriğini dinamik hale getiir..
      card.innerHTML = `
              <figure>
                <img src="${song.images.coverarthq}" alt="">
                <div class="play">
                  <i class="bi bi-play-fill"></i>
                </div>
              </figure>
              <div class="card-info">
                <h4>${song.title}</h4>
                <h4>${song.subtitle}</h4>
              </div>
            `;
      // card ları html içindeki listeye aktar
      this.list.appendChild(card);
    });
  }

  // loader render eden fonksiyon
  renderLoader() {
    this.list.innerHTML = ` 
      <div class="loader">
      <div class="loader-square"></div>
      <div class="loader-square"></div>
      <div class="loader-square"></div>
      <div class="loader-square"></div>
      <div class="loader-square"></div>
      <div class="loader-square"></div>
      <div class="loader-square"></div>
      </div>`;
  }

  // animasyon ekleyen fonksiyon
  toggleAnimation() {
    const image = document.querySelector(".info img");

    // image elementine tıklandığında animasyon classı ekle veya kaldır
    image.classList.toggle("animate"); // animasyonu başlat
  
  }


  // player kısmını dinamik hale getiren fonksiyon

  renderPlayer(song) {
    // player kısmının içeriğini dışarıdan parametre olarak verilen değer ile dinamik render et
    this.player.innerHTML = `
    <div class="info">
        <img src="${song.image}" alt="" />

        <div class="image-info">
          <h5>${song.title}</h5>
          <p>${song.artist}</p>
        </div>
      </div>

      <audio controls src="${song.audio}"></audio>

      <div class="controls">
        <i class="bi bi-collection"></i>
        <i class="bi bi-music-note-list"></i>
        <i class="bi bi-heart"></i>
      </div>`;

    // şarkı resminin oynatılma durumuna bağlı olarak resime bir animasyon ekleyebilmek için audio etiketine play ve pause addeventlistener eklemek
    const audio = document.querySelector("audio");

    audio.addEventListener("play", this.toggleAnimation);
    audio.addEventListener("pause", this.toggleAnimation);
  }
}

export { UI };
