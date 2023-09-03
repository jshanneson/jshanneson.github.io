//alert('file linked');

//number

//string

//array
//var colors = ['red', 'blue', 'green'];
//var colors = new Array('red', 'yellow', 'orange');
//colors.push('purple');

//alert(colors.sort());
//object

//ANIMATION POPUP
//get popup window
var popup = document.getElementsByClassName('popup')[0];
//get trigger
var trigger = document.getElementsByClassName('trigger1')[0];
//get close button
var CloseBtn = document.getElementsByClassName('X')[0];

//open window
trigger.addEventListener('click', OpenPopup);
function OpenPopup() {
    popup.style.display = 'block';
    CloseBtn.style.display = 'block';
}

//close window
CloseBtn.addEventListener('click', ClosePopup);
popup.addEventListener('click', ClosePopup);
function ClosePopup() {
    popup.style.display = 'none';
    CloseBtn.style.display = 'none';
}


//CAD POPUP
//get popup window
var popup2 = document.getElementsByClassName('popup2')[0];
//get trigger
var trigger = document.getElementsByClassName('trigger2')[0];
//get close button
var CloseBtn = document.getElementsByClassName('X')[0];

//open window
trigger.addEventListener('click', OpenPopup2);
function OpenPopup2() {
    popup2.style.display = 'block';
    CloseBtn.style.display = 'block';
}

//close window
CloseBtn.addEventListener('click', ClosePopup2);
popup2.addEventListener('click', ClosePopup2);
function ClosePopup2() {
    popup2.style.display = 'none';
    CloseBtn.style.display = 'none';
}


//LEATHER TOOLING POPUP
//get popup window
var popup3 = document.getElementsByClassName('popup3')[0];
//get trigger
var trigger = document.getElementsByClassName('trigger3')[0];
//get close button
var CloseBtn = document.getElementsByClassName('X')[0];

//open window
trigger.addEventListener('click', OpenPopup3);
function OpenPopup3() {
    popup3.style.display = 'block';
    CloseBtn.style.display = 'block';
}

//close window
CloseBtn.addEventListener('click', ClosePopup3);
popup3.addEventListener('click', ClosePopup3);
function ClosePopup3() {
    popup3.style.display = 'none';
    CloseBtn.style.display = 'none';
}


//VIDEO GAME POPUP
//get popup window
var popup4 = document.getElementsByClassName('popup4')[0];
//get trigger
var trigger = document.getElementsByClassName('trigger4')[0];
//get close button
var CloseBtn = document.getElementsByClassName('X')[0];

//open window
trigger.addEventListener('click', OpenPopup4);
function OpenPopup4() {
    popup4.style.display = 'block';
    CloseBtn.style.display = 'block';
}

//close window
CloseBtn.addEventListener('click', ClosePopup4);
popup4.addEventListener('click', ClosePopup4);
function ClosePopup4() {
    popup4.style.display = 'none';
    CloseBtn.style.display = 'none';
}