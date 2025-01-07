$(function () {
    var saveButtons = document.querySelectorAll(".saveBtn");
    saveButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var timeBlock = this.closest(".time-block");
            var timeBlockId = timeBlock.id;
            var userInput = timeBlock.querySelector(".description").value;
            localStorage.setItem(timeBlockId, userInput);
            alert("Appointment added to local storage!");
        });
    });

    var currentHour = dayjs().hour();
    var timeBlocks = document.querySelectorAll(".time-block");
    timeBlocks.forEach(function (timeBlock) {
        var timeBlockHour = parseInt(timeBlock.id.split("-")[1]);
        if (currentHour > timeBlockHour) {
            timeBlock.classList.add("past");
        } else if (currentHour === timeBlockHour) {
            timeBlock.classList.add("present");
        } else {
            timeBlock.classList.add("future");
        }
    });

    var timeBlocks = document.querySelectorAll(".time-block");
    timeBlocks.forEach(function (timeBlock) {
        var timeBlockId = timeBlock.id;
        var userInput = localStorage.getItem(timeBlockId);
        if (userInput !== null) {
            timeBlock.querySelector(".description").value = userInput;
        }
    });

    var currentDate = new Date();
    var currentDateElement = document.getElementById("currentDay");
    var format = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    var formattedDate = currentDate.toLocaleDateString('en-US', format);

    currentDateElement.textContent = "Today's Date: " + formattedDate;
});