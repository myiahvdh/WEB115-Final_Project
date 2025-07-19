let allTasks = []; // array for all tasks
let idCounter = 1;
let addTask = document.getElementById("task"); // locate form by id, assign variable

makeformRequirements(); // call to prevent empty form data

function makeformRequirements() {
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
    appendTaskToDiv(valuesArray); // call div population func ********************** probably needs to send isComplete over to createJson

    // clear form
    let form = document.getElementById("task");
    form.reset();
}

function appendTaskToDiv(valuesArray) {
    // preliminary variables for Date/time
    let dateTime = new Date(); // make date/time object
    let dateTimeString = dateTime.toString(); // convert object value to string

    // Create a new div for each task with an unordered list of data
    let taskDiv = document.createElement("div"); // create a div for the task inside the taskManager div
    let mainUL = document.createElement("ul"); // make UL for div
    taskDiv.appendChild(mainUL); // make UL child of div

    let taskLI = document.createElement("li"); // task name
    let priorityLI = document.createElement("li"); // priority level
    let importanceLI = document.createElement("li"); // importance
    let dateLI = document.createElement("li"); // date added

    let taskLIText = document.createTextNode("Task:  " + valuesArray[0]); // text for task name
    let priorityLIText = document.createTextNode("Priority:  " + valuesArray[1]); // text for priority level
    let importanceLIText = document.createTextNode("Important?: " + valuesArray[2]); // text for importance
    let dateLIText = document.createTextNode("Date:  " + dateTimeString); // text for date object

    taskLI.appendChild(taskLIText); // append text to task element
    priorityLI.appendChild(priorityLIText); // append text to priority level element
    importanceLI.appendChild(importanceLIText); // append text to importance element
    dateLI.appendChild(dateLIText); // append text to date element

    // append LI elements to UL
    mainUL.appendChild(taskLI);
    mainUL.appendChild(priorityLI);
    mainUL.appendChild(importanceLI);
    mainUL.appendChild(dateLI);

    // Completed checkbox
    let completedCheckbox = document.createElement("input"); // create an input element 
    completedCheckbox.type = "checkbox"; // make it's type a checkbox
    completedCheckbox.id = "isCompleted"; // label an ID for the checkbox
    completedCheckbox.value = "completed"; // value assigned to when box is checked

    let label = document.createElement("label");
    label.htmlFor = "isCompleted";
    let checkboxText = document.createTextNode("Completed   ");
    label.appendChild(checkboxText);

    taskDiv.appendChild(completedCheckbox);
    taskDiv.appendChild(label);

    // Delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Task";

    taskDiv.appendChild(deleteButton);

    let taskManagerDiv = document.getElementById("taskManager");
    taskManagerDiv.appendChild(taskDiv);

    priorityStyler(valuesArray[1], priorityLI);

    // importance handler
    if (valuesArray[2] == "YES") {
        mainUL.classList.add("red-background-and-bold-text")
    }

    let isBoxChecked = completedCheckbox.checked; // grabs initial state of checkbox and stores it

    // create jsObject 
    let jsObject = {
        id: idCounter, 
        taskName: valuesArray[0],
        priorityLevel: valuesArray[1], 
        important: valuesArray[2], 
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

    // event handler for checkbox
    completedCheckbox.addEventListener('change', function() {
        if (this.checked) {
            mainUL.classList.add("strikeThroughText")
            jsObject.completed = true; // dynamically updates
        }
        else {
            mainUL.classList.remove("strikeThroughText")
            jsObject.completed = false; // dynamically updates
        }
        console.log(JSON.stringify(allTasks, null, 4)); // updates console
    })

    // add to id counter
    idCounter++;

    console.log(JSON.stringify(allTasks, null, 4));

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
 


