let taskInput = document.querySelector("#new-task");
let addButton = document.querySelectorAll("button")[0];
let incompleteTaskHolder = document.querySelector("#incomplete-tasks");
let completedTaskHolder = document.querySelector("#completed-tasks");

addButton.addEventListener("click", addTask);
taskInput.onfocus = ()=>{taskInput.style.borderColor = "rgb(65, 65, 65)";};
taskInput.onblur = ()=>{taskInput.style.borderColor = "rgb(120, 120, 120)";};

function createNewTaskElem(taskString) {
    let listItem = document.createElement("li");
    let checkbox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
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
}

function addTask() {
    if(!taskInput.value){
        taskInput.style.borderColor = "rgb(202, 24, 24)";
        return;
    }
    let listItem = createNewTaskElem(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    taskInput.value = "";
}
