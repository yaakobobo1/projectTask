var addBtn = document.querySelector("#submit");
var clrBtn = document.querySelector("#clear");
var notes = [];
var note = {};
var id = checkIfEmpty();
var panel = document.querySelector("#panelNote");
var storageItem;
var delID;
var storageItemD;

document.onload = showNotes(), attach();

addBtn.addEventListener("click", addNote);
clrBtn.addEventListener("click", clearForm);



function clearForm() {
    var textC = document.querySelector("#text");
    var dateC = document.querySelector("#inputDate");
    var timeC = document.querySelector("#inputTime");
    textC.value = "";
    dateC.value = "";
    timeC.value = "";
    textC.focus();
}


function checkIfEmpty() {
    var x = localStorage.getItem("notes");

    if (x == null) {
        return -1;
    } else {
        var y = JSON.parse(x);
        return y.length - 1;
    }
}

function addNote() {
    var text = document.querySelector("#text").value;
    var date = document.querySelector("#inputDate").value;
    var time = document.querySelector("#inputTime").value;
    
    var new_date = date.split('-').reverse().join('/');
    if (text == "" || date == "") {
        alert("Date and task content are requiered!");
        return;
    }

    note = { "text": text, "date": new_date, "time": time};
    notes.push(note);
    storageItem = JSON.stringify(notes);
    localStorage.setItem("notes", storageItem);
    showNewNote(text, new_date, time);
    attach();
    clearForm();
}

function delNote() {
    notes = JSON.parse(localStorage.getItem("notes"));
    delID = Number(this.id);
    notes.splice(delID, 1);
    storageItemD = JSON.stringify(notes);
    localStorage.setItem("notes", storageItemD);
    id--;
    parent = document.querySelector("#panelNote");
    child = document.querySelector(`#note${delID}`);
    parent.removeChild(child);

}


function showNewNote(text, date, time) {
    id++;
    div = document.createElement("div");
    div.setAttribute("class", "panelNote trans");
    div.setAttribute("id", `note${id}`);
    ix = document.createElement("i");
    ix.setAttribute("class", "fas fa-times");
    ix.setAttribute("id", `${id}`);
    divText = document.createElement("div");
    divText.setAttribute("class", "textnote");
    textNode = document.createTextNode(text);
    divText.appendChild(textNode);
    divDate = document.createElement("div");
    divDate.setAttribute("class", "datenote");
    textNode = document.createTextNode(date+ " "+ time);
    divDate.appendChild(textNode);
    div.appendChild(ix);
    div.appendChild(divText);
    div.appendChild(divDate);
    panelNote.appendChild(div);

}


function showNotes() {

    storageItem = localStorage.getItem("notes");
    if (storageItem == null) return;
    notes = JSON.parse(storageItem);
    var panelNote = document.querySelector("#panelNote");
    var div;
    var ix;
    var divText;
    var divDate;
    var textNode;

    for (var i = 0; i < notes.length; i++) {
        div = document.createElement("div");
        div.setAttribute("class", "panelNote");
        div.setAttribute("id", `note${i}`);
        ix = document.createElement("i");
        ix.setAttribute("class", "fas fa-times");
        ix.setAttribute("id", `${i}`);
        divText = document.createElement("div");
        divText.setAttribute("class", "textnote");
        textNode = document.createTextNode(notes[i].text);
        divText.appendChild(textNode);
        divDate = document.createElement("div");
        divDate.setAttribute("class", "datenote");
        textNode = document.createTextNode(`${notes[i].date} ${notes[i].time}`);
        divDate.appendChild(textNode);
        div.appendChild(ix);
        div.appendChild(divText);
        div.appendChild(divDate);
        panelNote.appendChild(div);
    }
}



function attach() {
    var delBtn = document.querySelectorAll(".fas");
    for (var i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener('click', delNote);
    }
   
   



}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// background-color: red;
//-webkit-animation-name: example; /* Safari 4.0 - 8.0 */
/////-webkit-animation-duration: 4s; /* Safari 4.0 - 8.0 */
//animation-name: example;
//animation-duration: 4s;
// background-color:#FFFACD;color: #404040;border:2px solid #404040;