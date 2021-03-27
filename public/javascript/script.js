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

function today() {
    let todaysDate = new Date();
    const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
        ];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = todaysDate.getDate();
    const weekday = dayNames[todaysDate.getDay()];
    const theMonth = month[todaysDate.getMonth()];
    let ending = '';
    if ([0, 4, 5, 6, 7, 8, 9].includes(day % 10) ) {
        ending = 'th';
    } else if (day % 10 == 1) {
        ending = 'st';
    } else if (day % 10 == 2) {
        ending = 'nd';
    } else if (day % 10 == rd) {
        ending = 'rd';
    }
    let date = document.querySelector('.date');
    date.textContent = `${weekday}, ${day}${ending} ${theMonth}`;
}
today();
function loadTasks() {
    let task = document.getElementById('text-box');
    fetch('/api/tasks').then((res) => res.json()).then((data) => {
            let tasks = data.length;
            if (tasks == 0) {
                taskCount.textContent = 'No active task';
            } else if (tasks == 1) {
                taskCount.textContent = '1 active task';
            } else if (tasks > 1) {
                taskCount.textContent = `${tasks} active tasks`;
            }
            data.forEach(element => {
            
            let li = document.createElement('li');
            let inp = document.createElement('input');
            inp.className = "check";
            inp.type = "checkbox";
            inp.name = 'box';
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
            a.href = `/api/delete/${element.id}`
            a.appendChild(img)
            li.appendChild(a);
            ul.appendChild(li);
            ul.appendChild(hr);
            if (element.complete == true) {
                inp.checked = true;
                span.style.textDecoration = "line-through 3px white";
            } else {
                inp.checked = false;
                span.style.textDecoration = "none";
            }
            task.value = "";
            
                
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
      
    }
}

       


function boxChecked(e) {
    if (e.target.className == "check") {
        
        let li = e.target.nextSibling;
        if (e.target.checked) {
            li.style.textDecoration = "line-through 3px white";
            fetch('/api/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({id: e.target.nextSibling.getAttribute('task-id'),
                    box: true    })
            });
        }
        if (!e.target.checked) {
            li.style.textDecoration = "none";
            fetch('/api/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({id: e.target.nextSibling.getAttribute('task-id'),
                    box: false    })
            })
            

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