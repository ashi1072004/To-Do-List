var taskInput = document.querySelector("#new-task");
var addButton = document.querySelector("button")[0];
var incompleteTaskHolder = document.querySelector("#incomplete-tasks");
var completedTaskHolder = document.querySelector("#completed-tasks");
addButton.onclick = addTask;

var createNewTaskElem = function (taskString) {
    var listItem = document.createElement("li");
    var checkbox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    label.innerText = taskString;
    checkbox.type = "checkbox";
    editInput.type = "text";
    editButton.className = "edit";
    editButton.innerText = "Edit";
    deleteButton.className = "delete";
    deleteButton.innerText = "Delete";
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

var addTask = function () {
    var listItem = createNewTaskElem(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    taskInput.value = "";
};
