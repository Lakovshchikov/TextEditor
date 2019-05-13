let open_btn = document.querySelector("div[value=\"Open\"]");
let save_btn = document.querySelector("div[value=\"Save\"]");
let print_btn = document.querySelector("div[value=\"Print\"]");
let closePDF_btn = document.querySelector(".btn_closePDF");

open_btn.addEventListener("click",open_btn_click);
save_btn.addEventListener("click",save_btn_click);
print_btn.addEventListener("click", print_btn_click);
closePDF_btn.addEventListener("click",closePDF_btn_click);

let textarea = document.querySelector(".doc textarea");

function open_btn_click() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET","open",true);
    xhr.onload= function () {
        textarea.value = xhr.responseText;
    }
    xhr.send();
}

function save_btn_click() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST","save",true);
    let body = "text=" + encodeURIComponent(textarea.value);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload= function () {
        xhr.responseText == "true" ? alert("Сохранено") : alert("Ошибка")
    }
    xhr.send(body);
}

function print_btn_click() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST","print",true);
    let body = "text=" + encodeURIComponent(textarea.value);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload= function () {
        let pdf_container = document.querySelector(".pdf");
        let pdf = document.querySelector(".pdf embed");
        pdf.src = `prints/${xhr.responseText}`;
        pdf_container.classList.remove("disable_elem");
        pdf_container.classList.add("enable_elem");
    }
    xhr.send(body);
}

function closePDF_btn_click() {
    let pdf_container = document.querySelector(".pdf");
    let pdf = document.querySelector(".pdf embed");
    pdf.src = ``;
    pdf_container.classList.remove("enable_elem");
    pdf_container.classList.add("disable_elem");
}

