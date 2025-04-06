// özellikle kapsam api lere istek atılınca bizzat kim olduğumuzu tespit etmek için bir options nesnesi oluşturduk ve bu nesneyi fetch fonksiyonuna parametre olarak verdik.

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "52332faeddmshab87cb1d72a1882p134329jsnb19b64908cb4",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

class API {
  //populer müzikleri api den alan fonk.
  async getPopular() {
    try {
      const res = await fetch(
        "https://shazam.p.rapidapi.com/search?term=ikilem",
        options
      );

      // api den gelen cevabı json formatına çeviriyoruz
      const data = await res.json();

      // api den gelen veriyi kullanabileceğimiz bir formata çeviriyoruz
      // burada gelen verinin içinden sadece track kısmını alıyoruz
      const formattedData = data.tracks.hits.map((item) => item.track);
      return formattedData;
    } catch (error) {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }
  // aratılan kelimeye göre api den şarkı alan fonk.
  async getSearchMusic(querry) {
    try {
      // api ye istek atıyoruz
      const res = await fetch(
        `https://shazam.p.rapidapi.com/search?term=${querry}`,
        options
      );

      // api den gelen cevabı json formatına çeviriyoruz
      const data = await res.json();

      // api den gelen veriyi kullanabileceğimiz bir formata çeviriyoruz
      // burada gelen verinin içinden sadece track kısmını alıyoruz
      const formattedData = data.tracks.hits.map((item) => item.track);
      return formattedData;
    } catch (error) {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }
}
export { API };
