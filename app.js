// Diese Funktion ermittelt den numerischen Wert des Eingangs-HTML-Elements anhand der ID
function inputWert(el) {
  // Wir nehmen den Eingangswert und wandeln diesen in eine Zahl um,
  // mit welcher wir Berechnungen durchführen können
  return Number(document.getElementById(el).value);
}
// Diese Funktion ermittelt den numerischen Wert des Ausgangs-HTML-Elements anhand der ID
function outputWert(el) {
  // Wir nehmen den Text, ersetzen Kommas durch Punkte und wandeln den String in eine Zahl um,
  // mit welcher wir Berechnungen durchführen können
  return Number(document.getElementById(el).innerText.replace(",","."));
}
// Diese Funktion detektiert das Ausgang-HTML und setzt den entsprechenden Wert ein
function put(targetId, op) {
  // Wir nehmen die Operation (2.Argument) als Zahl,
  // bestimmen eine Präzision von 4 Dezimalen,
  // wandeln alles in eine Zahl,
  // die dann in einen deutschen String umgewandelt wird,
  // und setzen diesen ein als den Text vom ersten Argument
  return document.getElementById(targetId).innerText = Number(Number(op).toPrecision(4)).toLocaleString("de");
}

// Zum Ein- oder Ausblenden der Menüs
let menus = document.getElementsByClassName("collapsible");

for (let i = 0; i < menus.length; i++) {
  menus[i].addEventListener("click", function() {
    this.classList.toggle("inactive");
    this.nextElementSibling.classList.toggle("none");
  });
}

/*---------Eingangswerte----------*/
function hrl() {
  var hrl = inputWert("rl") / 2;
  put("hrl", hrl);
  // Gib das Ergebnis zurück, sodass bei Aufruf hrl() der Wert gleich hrl ist
  return hrl;
}
function hrb() {
  var hrb = inputWert("rb") / 2;
  put("hrb", hrb);
  return hrb;
}
function gfbm() {
  var gfbm = inputWert("gfb") / 1000;
  put("gfbm", gfbm);
  return gfbm;
}
/*---------END OF: Eingangswerte----------*/

// m1 und m2 sind Berechnungsparameter, kann man beliebig benennen
// outputId ist die ID des HTML-Elements, wo wir das Berechnungsergebnis setzen wollen

function y1(m1, m2, outputId) {put(outputId, m1 - m2);}

/*---------Ausgangswerte----------*/
// Der Wert von dp wissen wir erst nach Klicken des Buttons und Berechnung mit Faktor,
// daher als Parameter einsetzen (weil es variabel ist)
function apl(dp) {
   var apl = Math.round((outputWert("y1") / dp) * 2000) / 2;
   put("apl", apl);
   return apl;
}
function apb(dp) {
   var apb = Math.round((outputWert("y2") / dp) * 2000) / 2;
   put("apb", apb);
   return apb;
}
function fbl(hrl, dp) {
  var fbl = Math.round((hrl * 1000) - (outputWert("apl") * dp));
  put("fbl", fbl);
}
function fbb(hrb, dp) {
  var fbb = Math.round((hrb * 1000) - (outputWert("apb") * dp));
  put("fbb", fbb);
}

function pa(apl, apb) {
  let pa = ((apl*2)*(apb*2))*2;
  put("pa", pa);
  return pa;
}

function pf() {
  let pf = ((Math.pow(inputWert("pg"),2) / 1000) * outputWert("pa")) / 1000;
  put("pf", pf);
  return pf;
}

function ff() {
  let ff = outputWert("rg") - outputWert("pf");
  put("ff", ff);
}

function sn() {
  let sn = (inputWert("pg") / 500) * outputWert("pa");
  put("sn", sn);
}

function snf() {
  let snf = (inputWert("rl") * 2) + (inputWert("rb") * 2);
  put("snf", snf);
}

function sng() {
  let sng = outputWert("sn") + outputWert("snf");
  put("sng", sng);
}

// klv spm sps
function klv() {
  let klv = 0.27 * outputWert("rg");
  put("klv", klv);
}

function spm() {
  let spm = 4.5 * outputWert("rg");
  put("spm", spm);
}

function sps() {
  let sps = Math.ceil(outputWert("spm") / 25);
  put("sps", sps);
}
/*---------END OF: Ausgangswerte----------*/

document.getElementById("outputBtn").addEventListener("click", () => {
  let dp1 = inputWert("pg") * 1.414,
    hrl1 = hrl(),
    hrb1 = hrb(),
    gfbm1 = gfbm(),
    output = document.querySelector("#output");

  put("rg", (inputWert("rl") * inputWert("rb")));
  put("dp", Number(inputWert("pg") * 1.414));
  hrl();
  hrb();
  gfbm();
  // Wir setzen die return-Werte von den Funktionen als Argumente von y1 ein
  y1(hrl1, gfbm1, "y1");
  y1(hrb1, gfbm1, "y2");
  apl(dp1);
  apb(dp1);
  fbl(hrl1, dp1);
  fbb(hrb1, dp1);
  // Wir brauchen die Ausgangswerte apl und apb, um pa auszurechnen
  pa(apl(dp1), apb(dp1));
  // Wir brauchen den Ausgangswerte pa, um pf auszurechnen
  pf();
  ff();
  sn();
  snf();
  sng();
  klv();
  spm();
  sps();

  output.classList.remove("none");
})



/*
  ----Legende----
  rg = Raumgrösse in m2
  rl = Raumlänge
  rb = Raumbreite
  gfb = gewünschte Friesbreite
  pg = Plattengrösse
  pa = Plattenanzahl
  dp = Plattendiagonale
  fbl = Friesbreite in der Raumlänge
  fbb = Friesbreite in der Raumbreite
  hrl = halbe Raumlänge
  hrb = halbe Raumbreite
  gfbm =gewünschte Friesbreite in Meter
  y1 = halbe Raumlänge minus gewünchte Friesbreite
  y2 = halbe Raumbreite minus gewünchte Friesbreite
  m1 = Parameter 1
  m2 = Parameter 2
  op = Berechnung
  apl = Anzahl der Platten in der Raumlänge
  apb = Anzahl der Platten in der Raumbreite
  targetId = inputWert des Zieltextes
*/