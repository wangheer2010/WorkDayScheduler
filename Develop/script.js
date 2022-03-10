const currentDate = document.getElementById("currentDay");
// Create a function to get the current date
var output = moment().format('L'); 
// Display it 
currentDate.innerText = output;


// Create an array to contain all the information needed for the work day
var workDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        event: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        event: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        event: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        event: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        event: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        event: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        event: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        event: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        event: ""
    },
    
]

// Create a function to data to localStorage
function saveEvent() {
    localStorage.setItem("workDay", JSON.stringify(workDay));
}

// Create a function to display data in localStorage in the view
function displayEvent() {
    workDay.forEach(function (currentHour) {
        $(`#${currentHour.id}`).val(currentHour.event);
    })
}

// Create a function to get and display localStorage data if it exists
function init() {
    var storedDay = JSON.parse(localStorage.getItem("workDay"));

    if (storedDay) {
        workDay = storedDay;
    }
    saveReminders();
    displayReminders();
}


// Create the view according to the given css file
workDay.forEach(function(currentHour) {
    // Create timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // Create time field
    var hourField = $("<div>")
        .text(`${currentHour.hour}${currentHour.meridiem}`)
        .attr({
            "class": "col-md-1 hour" // Use bootstrap to make it looks how it should look like
    });

    // Create description field
    var hourDescription = $("<div>")
        .attr({
            "class": "col-md-10 p-0 description"  // Use bootstrap to make it looks how it should look like
        });


    var planData = $("<textarea>");
    hourDescription.append(planData);
    planData.attr("id", currentHour.id);
    // Create a class to determine if the time is past or future
    if (currentHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (currentHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (currentHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // Create the save button
    var saveButton = $("<i class='far fa-save'></i>")
    var saveDescription = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    saveDescription.append(saveButton);
    hourRow.append(hourField, hourDescription, saveDescription);
})

// Call the function
init();


// Save the description of the plan in local storage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    workDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveEvent();
    displayEvent();
})