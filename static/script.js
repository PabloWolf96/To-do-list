let add = document.getElementById('addForm');
add.addEventListener('submit', addToList);
let content = document.getElementById('content');
content.addEventListener('click', removeFromList);

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
    let task = document.getElementById('text-box').value;
    span.textContent = task;
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
    
}
function removeFromList(e) {
    if (e.target.className == "garbage"){

        let div = e.target.parentElement.parentElement.parentElement;
        content.removeChild(div);
    }
}