//axios import buraya gelecek
import axios from "axios";
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
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz!
	 Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
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
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. 
	Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek

function myIpCard(params) {
  const div = document.createElement("div");
  div.className = "card";

  const imgFlag = document.createElement("img");
  imgFlag.setAttribute("src", "https://flagsapi.com/TR/flat/64.png");

  div.prepend(imgFlag);

  //div infor starts

  const divInfo = document.createElement("div");
  divInfo.className = "card-info";

  const header3 = document.createElement("h3");
  header3.className = "ip";
  header3.textContent = params.sorgu;

  const p1 = document.createElement("p");
  p1.textContent = `Enlem: ${params.enlem} Boylam: ${params.boylam}`;

  const p2 = document.createElement("p");
  p2.textContent = `Şehir ${params.şehir}`;

  const p3 = document.createElement("p");
  p3.textContent = `Saat dilimi: ${params.saatdilimi}`;

  const p4 = document.createElement("p");
  p4.textContent = `Para dilimi: ${params.parabirimi}`;

  const p5 = document.createElement("p");
  p5.textContent = `ISP: ${params.isp}`;

  //ekleme kısmı
  divInfo.appendChild(header3);
  divInfo.appendChild(p1);
  divInfo.appendChild(p2);
  divInfo.appendChild(p3);
  divInfo.appendChild(p4);
  divInfo.appendChild(p5);

  //son ekleme

  div.append(divInfo);

  return div;
}

const cardsDiv = document.querySelector(".cards");

var url = "https://apis.ergineer.com/ipgeoapi/";

const axiosResp = async function () {
  try {
    await ipAdresimiAl();
    const responses = await axios.get(url + benimIP);
    const allData = responses.data;
    const createDom = myIpCard(allData);
    cardsDiv.appendChild(createDom);
  } catch (err) {
    console.log("axios isteğinde hata oluştu!!! ", err);
  }
};
axiosResp();
