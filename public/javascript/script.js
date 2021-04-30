"use strict";


let globalCount = 0;


let textBox = document.querySelector('#text-box');
let add = document.getElementById('add');
add.addEventListener('click', addToList);
let taskCount = document.querySelector('.task-count');
let ul = document.getElementById('task-list');
let com = document.querySelector('.com');
let incom = document.querySelector('.incom');


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
    } else if (day % 10 == 3) {
        ending = 'rd';
    }
    let date = document.querySelector('.date');
    date.textContent = `${weekday}, ${day}${ending} ${theMonth}`;
}
today();



class tasks {
    constructor(value, stat = undefined) {
        this.createInitItem(value, stat);
    }
    createInitItem(value, stat) {
            let li = document.createElement('li');
            li.className = "list";
            let inp = document.createElement('input');
            inp.className = "check";
            inp.type = "checkbox";
            li.append(inp);
            let span = document.createElement('span');
            span.className = "t comFalse";
            span.textContent = value;
            li.append(span);
            let img = document.createElement('img');
            img.className = "garbage";
            img.src = `/img/garbage.svg`;
            li.append(img);
            ul.append(li);
            if (globalCount == 0) {
                globalCount++;
                taskCount.textContent = `${globalCount} active task`;
            } else {
                globalCount++;
                taskCount.textContent = `${globalCount} active tasks`;
            }
            
            if (stat) {
                inp.checked = true;
                span.className = span.className.slice(0,2) + 'comTruee';
            } else {
                inp.checked = false;
                span.className = span.className.slice(0, 2) + 'comFalse';
            }
            
            img.addEventListener('click', async () => {
                ul.removeChild(li)
                globalCount--;
                if (globalCount == 0) {
                    taskCount.textContent = 'No active task'
                } else if (globalCount == 1) {
                    taskCount.textContent = `${globalCount} active task`;

                } else {
                    taskCount.textContent = `${globalCount} active tasks`;
                }
                await fetch('api/delete', {
                    method: 'POST',
                    body: JSON.stringify({val:value}),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                });
            });
            inp.addEventListener('change' ,async () => {
                if (inp.checked) {
                    span.className = span.className.slice(0,2) + 'comTruee';
                    
                    
                } else {
                    span.className = span.className.slice(0,2) + 'comFalse';
                
                }
                
                await fetch('/api/complete', {
                    method: "POST",
                    body: JSON.stringify({box : inp.checked, val:value}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                
            });
            span.addEventListener('mouseover', ()=> {
                
                span.style.fontSize = "20px";
               if (inp.checked) {
                   com.style.color = "white";
                   incom.style.color = "#808080";
               } else {
                   com.style.color = "#808080";
                   incom.style.color = "white";
               }
            });
            span.addEventListener('mouseout', () => {
                span.style.fontSize = "14px";
                com.style.color = "#808080";
                incom.style.color = "#808080";
            });
  
       
        
    }
        
            

    }
        
        
        


    
   async function addToList() {
       if (textBox.value != "") {
           new tasks(textBox.value);
           await fetch('/api/add', {
               method: "POST",
               body:  JSON.stringify({taskName :textBox.value}),
               headers: {
                   "Content-Type": "application/json"
                }
            }).then(textBox.value = "").catch(err => console.log(err));
            
       }

   }
   async function boot() {
       let allTasks = await fetch('/api/tasks').then(res => res.json()); 
       allTasks.forEach(element => {
           
           new tasks(element.task, element.complete);
           
       });
   }
   boot();
   window.addEventListener('keydown', (e) => {
       if (e.key == "Enter") {
           addToList();
       }
   })

