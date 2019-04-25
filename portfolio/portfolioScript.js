//alert('file linked');

//number

//string

//array
//var colors = ['red', 'blue', 'green'];
//var colors = new Array('red', 'yellow', 'orange');
//colors.push('purple');

//alert(colors.sort());
//object

//get popup window
var popup = document.getElementsByClassName('popup')[0];
//get trigger
var trigger = document.getElementsByClassName('trigger')[0];
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