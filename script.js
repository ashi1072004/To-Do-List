let taskInput = document.querySelector("#new-task");
let addButton = document.querySelectorAll("button")[0];
let incompleteTaskHolder = document.querySelector("#incomplete-tasks");
let completedTaskHolder = document.querySelector("#completed-tasks");

addButton.addEventListener("click", addTask);
// addButton.addEventListener("click", ajaxRequest);
taskInput.onfocus = ()=>{taskInput.style.borderColor = "rgb(65, 65, 65)";};
taskInput.onblur = ()=>{taskInput.style.borderColor = "rgb(120, 120, 120)";};

for(let c=0; c<incompleteTaskHolder.children.length; c++){
    bindTaskEvents(incompleteTaskHolder.children[c], taskCompleted);
}

for(let s=0; s<completedTaskHolder.children.length; s++){
    bindTaskEvents(completedTaskHolder.children[s], taskIncomplete);
}

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
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

// function ajaxRequest(){
//     console.log("AJAX Request");
// }

function taskCompleted(){
    let listItem = this.parentNode;
    completedTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete(){
    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

function editTask(){
    let listItem = this.parentNode;
    let editInput = listItem.querySelectorAll("input[type=text]");
    let editButton = listItem.querySelectorAll("button.edit");
    let label = listItem.querySelectorAll("label");
    let containsClass = listItem.classList.contains("editMode");
    if(!containsClass){
        label.innerText = editInput.value;
        editButton.innerText = "Edit";
    }else{
        editInput.value = label.innerText;
        editButton.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
}

function deleteTask(){
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

function bindTaskEvents(taskListItem, checkboxHandler){
    let checkbox = taskListItem.querySelector("input[type=checkbox]");
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");
    editButton.addEventListener("click", editTask);  
    deleteButton.addEventListener("click", deleteTask);    
    checkbox.addEventListener("change", checkboxHandler);    
}