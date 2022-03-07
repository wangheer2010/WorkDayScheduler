const currentDate = document.getElementById("currentDay");
// Create a function to get the current date
var output = moment().format('L'); 

currentDate.innerText = output;

