//axios import buraya gelecek

const { default: axios } = require("axios");

var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek

ipAdresimiAl().then(() => {
  const apiUrl = "https://apis.ergineer.com/ipgeoapi/" + benimIP;

  axios
    .get(apiUrl)
    .then((response) => {
      cardCreator(response.data);
    })
    .catch((error) => {
      console.error("Hata oluştu: " + error);
    });
});

function cardCreator(veri) {
  const konum = document.createElement("div");
  konum.className = "card";

  const img = document.createElement("img");
  img.src =
    "https://cdn.pixabay.com/photo/2012/04/10/23/02/turkey-26820_1280.png";

  const infoDiv = document.createElement("div");
  infoDiv.className = "card-info";

  const ipBox = document.createElement("h3");
  ipBox.className = "ip";
  ipBox.textContent = veri["sorgu"];

  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const p5 = document.createElement("p");
  const p6 = document.createElement("p");

  p1.className = "ulke";
  p1.textContent = `${veri.ülke} (TR)`;

  p2.textContent = `Enlem: ${veri.enlem} Boylam: ${veri.boylam}`;

  p3.textContent = `Şehir: ${veri.bölgeAdı}`;

  p4.textContent = `Saat Dilimi: ${veri.saatdilimi}`;

  p5.textContent = `Para birimi: ${veri.parabirimi}`;

  p6.textContent = `ISP: ${veri.isp}`;

  infoDiv.append(ipBox);
  infoDiv.append(p1);
  infoDiv.append(p2);
  infoDiv.append(p3);
  infoDiv.append(p4);
  infoDiv.append(p5);
  infoDiv.append(p6);

  konum.append(img);
  konum.append(infoDiv);

  const body = document.querySelector(".cards");
  body.append(konum);

  return konum;
}
