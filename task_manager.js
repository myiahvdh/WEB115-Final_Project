let allTasks = []; // array for all tasks
let idCounter = 1; // starts the ID assingment for each taskS
let addTask = document.getElementById("task"); // locate form by id, assign variable

makeformRequirements(); // call to prevent empty form data

function makeformRequirements() { // sets form fields to required
    document.getElementById("taskName").required = true;
    document.getElementById("priorityLevel").required = true
    document.querySelector('input[name="importance"]').required = true;
}

// event listener for submission, call function to gather form values
addTask.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent default submission behavior
    if (!addTask.checkValidity()) {
        window.alert("All fields must be populated before submission.")
        return; // stops running if form is missing data
    }
    obtainFormValues(); 
}); 

function obtainFormValues() {
    // Retrieve form values
    // Task Name
    let taskName = document.getElementById("taskName");
    let taskNameValue = taskName.value;
    // Priority Level
    let priorityLevel = document.getElementById("priorityLevel");
    let priorityLevelValue = priorityLevel.value;
    // Importance
    let importance = document.getElementsByName("importance"); // radios are a collection with same name
    let importanceValue = "";
    for (let i = 0; i < importance.length; i++) {
        if (importance[i].checked) {
            importanceValue = importance[i].value; // asign value to importance base on which radio is clicked
            break; // break from loop early if targeted radio is selected
        }
}

    // put form values in array to...
    const valuesArray = [taskNameValue, priorityLevelValue, importanceValue]

    // ...send array to function that creates and outputs json format
    appendTaskToDiv(valuesArray); // call div population func 

    // clear form
    let form = document.getElementById("task");
    form.reset();
}

function appendTaskToDiv(valuesArray) {
    // preliminary variables for Date/time
    let dateTime = new Date(); // make date/time object
    let dateTimeString = dateTime.toString(); // convert object value to string

    // take array elements out of array, assign variables
    let [taskName, priorityLevel, importance] = valuesArray;

    let taskDiv = document.createElement("div"); // create a div for the task inside the taskManager div

    let checkboxID = `isCompleted-${idCounter}`; // make a template literal for the checkbox and id, makes a concatenated string unique id

    //Use innerHTML this time, prority-li shared for styling
    taskDiv.innerHTML = `
    <ul>
        <li class="priority-li">Task:   ${taskName} </li>
        <li class="priority-li">Priority:   ${priorityLevel}</li>
        <li>Important?:   ${importance}</li>
        <li>Date:    ${dateTimeString}</li>
    </ul>
    <label for="${checkboxID}">
        Completed <input type="checkbox" 
        id="${checkboxID}"
        value="completed">
    </label>
    <button class="deleteButton">Delete Task</button> 
    `;

    // Append new div to main div
    mainDiv = document.getElementById("taskManager");
    mainDiv.appendChild(taskDiv);

    // assign variables to DOM elements
    let completedCheckbox = taskDiv.querySelector(`#${checkboxID}`);
    let deleteButton = taskDiv.querySelector(".deleteButton");

    // Apply conditional styles
    const ul = taskDiv.querySelector("ul");
    const priorityLI = taskDiv.querySelectorAll(".priority-li")[1]; // 2nd <li> is priorityLevel

    priorityStyler(priorityLevel, priorityLI);

    // importance handler
    if (importance == "YES") {
        ul.classList.add("red-background-and-bold-text")
    }

    let isBoxChecked = completedCheckbox.checked; // grabs initial state of checkbox and stores it

    // create jsObject 
    let jsObject = {
        id: idCounter, 
        taskName: taskName,
        priorityLevel: priorityLevel, 
        important: importance, 
        completed: completedCheckbox.checked, // initial value
        date: dateTimeString
    };
    
    //push jsObject to allTasks array
    allTasks.push(jsObject);

    // event handler for delete button
    deleteButton.addEventListener('click', function() {
        taskDiv.remove(); // remove from display
        // remove entire object from allTasks array based on the ID #
        let removeIndexedTask = allTasks.findIndex(task => task.id === jsObject.id);
        if (removeIndexedTask !== -1) {
            allTasks.splice(removeIndexedTask, 1);
        }

        window.alert("You've successfully deleted a task");
        console.log(JSON.stringify(allTasks, null, 4)); // updates console

    })

    // event handler for checkbox, applies styling
    completedCheckbox.addEventListener('change', function() {
        if (this.checked) { 
            ul.classList.add("strikeThroughText")
            jsObject.completed = true; // dynamically updates
        }
        else {
            ul.classList.remove("strikeThroughText")
            jsObject.completed = false; // dynamically updates
        }
        console.log(JSON.stringify(allTasks, null, 4)); // updates console
    })

    // add to id counter
    idCounter++;

    console.log(JSON.stringify(allTasks, null, 4));// updates console

}

function priorityStyler(priority, priorityLI) {  // priority styler
    if (priority == "low") {
        priorityLI.classList.add("low-styler");
    }
    if (priority == "medium") {
        priorityLI.classList.add("medium-styler");
    }
    if (priority == "high") {
        priorityLI.classList.add("high-styler");
    }
}
 


