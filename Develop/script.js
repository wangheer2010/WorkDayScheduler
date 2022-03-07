const currentDate = document.getElementById("currentDay");
// Create a function to get the current date
var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output = d.getFullYear() + '/' +
    (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day;

currentDate.innerText = output;

