"use strict";

let taskInput = document.getElementById("new-task");
let addButton = document.getElementsByTagName("button")[0];
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
let completedTaskHolder = document.getElementById("completed-tasks");

taskInput.onfocus = ()=> taskInput.style.borderColor = "rgb(65, 65, 65)";
taskInput.onblur = ()=> taskInput.style.borderColor = "rgb(120, 120, 120)";

addButton.addEventListener("click", addTask);
// addButton.addEventListener("click", ajaxRequest);

for(let c=1; c<incompleteTaskHolder.children.length; c++){
    bindTaskEvents(incompleteTaskHolder.children[c], taskCompleted);
}
for(let s=1; s<completedTaskHolder.children.length; s++){
    bindTaskEvents(completedTaskHolder.children[s], taskIncomplete);
}

function createNewTaskElem(taskString) {
    let listItem = document.createElement("li");
    let checkbox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    label.textContent = taskString;
    checkbox.type = "checkbox";
    editInput.type = "text";
    editButton.className = "edit";
    editButton.innerHTML = "Edit";
    deleteButton.className = "delete";
    deleteButton.innerHTML = "Delete";
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    return listItem;
}

function addTask() {
    if(!taskInput.value){
        // taskInput.style.borderColor = "rgb(202, 24, 24)";
        let timer = setTimeout(() => taskInput.style.borderColor = "rgb(202, 24, 24)");
        setTimeout(() => clearTimeout(timer),1000);
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


function editTask(){
    let listItem = this.parentNode;
    let editInput = listItem.querySelector("input[type=text]");
    let editButton = listItem.querySelector("button.edit");
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");
    if(containsClass){
        label.textContent = editInput.value;
        editButton.innerHTML = "Edit";
    }else{
        editInput.value = label.textContent;
        editButton.innerHTML = "Save";
    }
    listItem.classList.toggle("editMode");
}

function deleteTask(){
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

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

function bindTaskEvents(taskListItem, checkboxHandler){
    if(incompleteTaskHolder.children.length == 1){
        incompleteTaskHolder.firstElementChild.style.display = "block";
    }else{
        incompleteTaskHolder.firstElementChild.style.display = "none";
    }
    if(completedTaskHolder.children.length == 1){
        completedTaskHolder.firstElementChild.style.display = "block";
    }else{
        completedTaskHolder.firstElementChild.style.display = "none";
    }
    let checkbox = taskListItem.querySelector("input[type=checkbox]");
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");
    editButton.addEventListener("click", editTask);  
    deleteButton.addEventListener("click", deleteTask);    
    checkbox.onchange = checkboxHandler;    
}