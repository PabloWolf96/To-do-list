"use strict";
let add = document.getElementById('addForm');
add.addEventListener('submit', addToList);
let content = document.getElementById('content');
content.addEventListener('click', removeFromList);
let taskCount = document.querySelector('.task-count');
let ul = document.getElementById('task-list');
content.addEventListener('change', boxChecked);
content.addEventListener('mouseover', complete)
content.addEventListener('mouseout', incomplete)
window.onload = loadTasks;

function loadTasks() {
    let task = document.getElementById('text-box');
    fetch('/api/tasks').then((res) => res.json()).then((data) => {
            data.forEach(element => {
            
            let li = document.createElement('li');
            let inp = document.createElement('input');
            inp.className = "check";
            inp.type = "checkbox";
            li.appendChild(inp);
            let span = document.createElement('span');
            span.className = "t";
            span.setAttribute('task-id', element.id);
            span.textContent = element.task;
            li.appendChild(span);
            let img = document.createElement('img');
            let hr = document.createElement('hr');
            img.className = "garbage";
            img.src = `/img/garbage.svg`;
            let a = document.createElement('a');
            a.href = `/api/delete/id=${element.id}`
            a.appendChild(img)
            li.appendChild(a);
            ul.appendChild(li);
            ul.appendChild(hr);
            task.value = "";
            changeTaskCount("add");
                
            });
        
    });

}
function addToList(e) {   
    
    loadTasks();
    }

function removeFromList(e) {
    if (e.target.className == "garbage"){
        
        let list = e.target.parentElement;
        let hLine = list.nextSibling;
        ul.removeChild(list);
        ul.removeChild(hLine);
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
function boxChecked(e) {
    if (e.target.className == "check") {
        let li = e.target.parentElement;
        li.style.textDecoration = "line-through 3px white";
        if (!e.target.checked) {
            li.style.textDecoration = "none";

        }


    }
}
function complete(e) {
    if (e.target.className == "t") {
        e.target.style.fontSize = "20px";
        let com = document.querySelector('.com');
        let incom = document.querySelector('.incom');
        if (e.target.previousSibling.checked) {
            com.style.color = "white";
        } else {
            incom.style.color = "white";
        }
    }
}
function incomplete(e) {
    if (e.target.className == "t") {
        e.target.style.fontSize = "14px";
        let com = document.querySelector('.com');
        let incom = document.querySelector('.incom');
        com.style.color = "#808080";
        incom.style.color = "#808080";
    }

}