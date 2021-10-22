//create blank array to hold tasks
tasks = [];
//get time and save it as variable
var currentTime = moment();
//display date in jumbotron
$("#currentDay").text(currentTime.format("MMMM Do, YYYY"));
//create a variable to hold the current hour
// var currentHour = currentTime.hour();

//temp currentHour var for building
var currentHour = 10;

// console.log(currentHour);
// //translate current time into a time state (past, present, future)
// function getCurrentTimeState(hour, currentHour) {
//   return hour < currentHour
//     ? "past"
//     : hour === currentHour
//     ? "present"
//     : "future";
// }
// getCurrentTimeState();
// console.log(getCurrentTimeState());

//color blocks based on relative time state
var colorTimeBlocks = function () {
  for (var i = 9; i < 12; i++) {
    var taskArea = $("#task-" + i);
    if (currentHour > i) {
      $(taskArea).addClass("past");
    } else if (currentHour === i) {
      $(taskArea).addClass("present");
    } else {
      $(taskArea).addClass("future");
    }
  }
};
colorTimeBlocks();

//add text area to time blocks
$(".taskBin").on("click", "p", function () {
  console.log("p element was clicked");
  var text = $(this).text().trim();
  var textInput = $("<textarea>").addClass("form-control").val(text);

  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

//update time block with entered text
$(".taskBin").on("blur", "textarea", function () {
  var text = $(this).val().trim();
  console.log(text);

  var taskP = $("<p>").addClass("taskItem").text(text);

  $(this).replaceWith(taskP);
});

//save text entry to localStorage
$(".saveBtn").on("click", function () {
  console.log($(".saveBtn").index(this) + "th save button clicked");
  var index = $(".saveBtn").index(this);
  tasks[index] = $(this).parent().find(".taskItem").text();
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

//load tasks from local storage
var loadTasks = function () {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks === null) {
    tasks = {};
  }
  console.log(tasks);
  printTasks();
};

//print tasks in local storage
var printTasks = function () {
  $.each(tasks, function (list, arr) {
    var taskP = $("<p>")
      .addClass("description task-item-" + list)
      .text(arr);

    console.log(list + " " + taskP);

    $("#task-item-" + list).replaceWith(taskP);
  });
};
loadTasks();
