function inputWert(el) {
    return Number(document.getElementById(el).value);
}

function outputWert(el) {
    return Number(document.getElementById(el).innerText.replace(",", "."));
}

function put(targetId, op) {
    return document.getElementById(targetId).innerText = Number(Number(op).toPrecision(4)).toLocaleString("de");
}

let menus = document.getElementsByClassName("collapsible");

for (let i = 0; i < menus.length; i++) {
  menus[i].addEventListener("click", function() {
    this.classList.toggle("inactive");
    this.nextElementSibling.classList.toggle("none");
  });
}

function pfw1() {
    let pfw1 = Math.round((inputWert("s3") * 500 - inputWert("gfb")) / outputWert("dp1") * 2) / 2;
    put("pfw1", pfw1);
    return pfw1;
}

function pfw3() {
    let pfw3 = Math.round(((1000 * (inputWert("s1") - (inputWert("s3") / 2)) - inputWert("gfb")) / outputWert("dp1")) * 2) / 2
    put("pfw3", pfw3);
    return pfw3;
}

function pfs1() {
    let pfs1 = Math.round((inputWert("w3") * 500 - inputWert("gfb")) / outputWert("dp1") * 2) / 2;
    put("pfs1", pfs1);
    return pfs1;
}

function pfs3() {
    let pfs3 = Math.round(((1000 * (inputWert("w1") - (inputWert("w3") / 2)) - inputWert("gfb")) / outputWert("dp1")) * 2) / 2
    put("pfs3", pfs3);
    return pfs3;
}

function fw1() {
    let fw1 = (inputWert("s3") * 500) - (outputWert("pfw1") * outputWert("dp1"));
    put("fw1", fw1);
    return fw1;
}

function fw3() {
    let fw3 = (inputWert("s1") - inputWert("s3") / 2) * 1000 - outputWert("pfw3") * outputWert("dp1");
    put("fw3", fw3);
    return fw3;
}

function fs1() {
    let fs1 = (inputWert("w3") * 500) - (outputWert("pfs1") * outputWert("dp1"));
    put("fs1", fs1);
    return fs1;
}

function fs3() {
    let fs3 = (inputWert("w1") - inputWert("w3") / 2) * 1000 - outputWert("pfs3") * outputWert("dp1");
    put("fs3",fs3);
    return fs3;
}

function gpa() {
    let gpa = 2 * ((outputWert("pfs3") + outputWert("pfs1")) * (outputWert("pfw1") * 2) + (outputWert("pfw3") - outputWert("pfw1")) * (outputWert("pfs1") * 2));
    put("gpa",gpa);
    return gpa;
}

function rg() {
    let rg = inputWert("w1") * inputWert("s3") + inputWert("w3") * (inputWert("s1") - inputWert("s3"));
    put("rg",rg);
    return rg;
}

function pf() {
    let pf = (inputWert("pg") * inputWert("pg")) : 1000) * outputWert("gpa");
    put("pf",pf);
    return pf;
}

function ff() {
    let ff = outputWert("rg") - outputWert("pf");
    put("ff",ff);
    return ff;
}

function fv() {
    let fv = outputWert("ff") * 1.05;
    put("fv",fv);
    return fv;
}

function sn() {
  let sn = Math.round((inputWert("pg") / 500) * outputWert("gpa") * 1000);
  put("sn", sn);
  return sn;
}

function snf() {
    let snf = outputWert("dp1") / 1000 * (2 * (outputWert("pfw1") + outputWert("pfw3")) + 2 * (outputWert("pfs1") + outputWert("pfs3")));
    put("snf",snf);
    return snf;
}

function sng() {
  let sng = outputWert("sn") + outputWert("snf");
  put("sng", sng);
  return sng;
}

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

document.getElementById("outputBtn").addEventListener("click", () => {
    let dp1 = inputWert("pg") * 0.001414,
        output = document.querySelector("#output");
    
    put("dp1", Number(inputWert("pg") * 1.414));
    
    pfw1();
    pfw3();
    pfs1();
    pfs3();
    fw1();
    fw3();
    fs1();
    fs3();
    gpa();
    rg();
    pf();
    ff();
    fv();
    sn();
    snf();
    sng();
    klv();
    spm();
    sps();
    // Wir brauchen die Ausgangswerte apl und apb, um pa auszurechnen
    //pa(apl(dp1), apb(dp1));

    output.classList.remove("none");
})
