"use strict";
let add = document.getElementById('addForm');
add.addEventListener('submit', addToList);
let content = document.getElementById('content');
content.addEventListener('click', removeFromList);
let taskCount = document.querySelector('.task-count');
content.addEventListener('change', completed);


function addToList(e) {   
    e.preventDefault();
    let item = document.createElement('div');
    item.className = 'item';
    let ul = document.createElement('ul');
    ul.className = "task-list";
    
    let li = document.createElement('li');
    let inp = document.createElement('input');
    inp.className = "check";
    inp.type = "checkbox";
    li.appendChild(inp);
    let span = document.createElement('span');
    span.className = "t";
    let task = document.getElementById('text-box');
    span.textContent = task.value;
    li.appendChild(span);
    let img = document.createElement('img');
    img.className = "garbage";
    img.src = `..\\garbage.svg`;
    li.appendChild(img);
    ul.appendChild(li)
    item.appendChild(ul)
    let hr = document.createElement('hr');
    item.append(hr);
    content.appendChild(item);
    task.value = "";
    changeTaskCount("add");
}
function removeFromList(e) {
    if (e.target.className == "garbage"){

        let div = e.target.parentElement.parentElement.parentElement;
        content.removeChild(div);
        changeTaskCount('delete');
    }
}
function changeTaskCount(change) {
    
    let pattern = taskCount.textContent.match(/\d+/);
    if (change == "delete") {
        pattern = Number(pattern[0]);
        if (pattern == 1) {
            taskCount.textContent = `No active task`;
        } else if (pattern == 2) {
            taskCount.textContent = `${pattern - 1} active task`;
        } else if (pattern > 2) {
            taskCount.textContent = `${pattern - 1} active tasks`;
        }
        
    }
    if (change == "add") {
        if (pattern === null) {
            taskCount.textContent = `1 active task`;
        } else {
            pattern = Number(pattern[0]);
            taskCount.textContent = `${pattern + 1} active tasks`;
        }
    }
       

}
function completed(e) {
    if (e.target.className == "check") {
        let li = e.target.parentElement;
        li.style.textDecoration = "line-through 3px white";
        if (!e.target.checked) {
            li.style.textDecoration = "none";

        }


    }
}