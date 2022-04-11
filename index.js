"use strict"

window.type = null;
window.to_do_list = new LinkedList("to_do_list");
window.completed_items = new LinkedList("completed_items");
var dark_mode = false;
const onClickElement = document.getElementById("onClickElement");

function displayTextBox(type) {
    switch (type) {
        case "addItem":
            if (window.type != "addItem") {
                displayAddItem();
                window.type = type;
            }
            break;
        case "displayToDoItems":
            if (window.type != "displayItem") {
                displayToDoItems();
                window.type = type;
            }
            break;
        case "displayCompletedItems":
            if (window.type != "diplayCompletedItems") {
                displayCompletedItems();
                window.type = type;
            }
            break;
    }
}

function displayCompletedItems() {
    clearOnClickElement();
    let completed_items = window.completed_items.head;
    const task_ul = document.createElement("ul");
    task_ul.className = "task-ul"
    let count = 1;
    while (completed_items !== null) {
        const inner_task_li = document.createElement("li");
        inner_task_li.className = "inner-task-li"
        const done_button = document.createElement("span");
        done_button.className = "material-icons";
        done_button.innerText = "done";
        const task = completed_items.element;
        const task_element = document.createElement("p");
        task_element.innerText = task;
        task_element.className = "completed-task";
        const delete_button = document.createElement("span");
        delete_button.id = "cd " + `${count}`;
        delete_button.className = "material-icons delete-button";
        delete_button.innerText = "backspace";
        delete_button.onclick = deleteFromList;
        inner_task_li.appendChild(done_button);
        inner_task_li.appendChild(task_element);
        inner_task_li.appendChild(delete_button);
        task_ul.appendChild(inner_task_li);
        completed_items = completed_items.next;
        count++;
    }
    onClickElement.appendChild(task_ul);
}

function clearOnClickElement() {
    onClickElement.innerHTML = "";
}

function moveToCompleted() {
    let id = this.id;
    id = parseInt(id.split(" ")[1]);
    const listItem = this.parentElement;
    // console.log(listItem);
    listItem.classList.add("swipe-right-animation");
    // console.log(listItem.className);
    setTimeout(() => {
        const completed_item = window.to_do_list.remove(id - 1);
        window.completed_items.add(completed_item.element);
        displayToDoItems();
    }, 2000)
    // ();

}

function deleteFromList() {
    let id = this.id
    id = parseInt(id.split(" ")[1]);
    const listItem = this.parentElement;
    listItem.classList.add("swipe-left-animation");

    setTimeout(() => {
        if (window.type === "displayToDoItems") {
            window.to_do_list.remove(id - 1);
            displayToDoItems();
        }
        else {
            window.completed_items.remove(id - 1);
            displayCompletedItems();
        }
    }, 2000)


}

function displayToDoItems() {
    clearOnClickElement();
    let to_do_list_copy = window.to_do_list.head;
    const task_ul = document.createElement("ul");
    task_ul.className = "task-ul"
    let count = 1;
    while (to_do_list_copy !== null) {
        const inner_task_li = document.createElement("li");
        inner_task_li.className = "inner-task-li"
        const task = to_do_list_copy.element;
        const task_element = document.createElement("p");
        task_element.innerText = task;
        task_element.className = "to-do-task";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "c " + `${count}`;
        checkbox.className = "checkbox";
        checkbox.onclick = moveToCompleted;
        const delete_button = document.createElement("span");
        delete_button.id = "d " + `${count}`;
        delete_button.className = "material-icons delete-button";
        delete_button.innerText = "backspace";
        delete_button.onclick = deleteFromList;
        inner_task_li.appendChild(checkbox);
        inner_task_li.appendChild(task_element);
        inner_task_li.appendChild(delete_button);
        task_ul.appendChild(inner_task_li);
        to_do_list_copy = to_do_list_copy.next;
        count++;
    }
    onClickElement.appendChild(task_ul);
}

function addToDoList() {
    const task = document.getElementById("task").value;
    window.to_do_list.add(task);
    document.getElementById("task").value = "";
}


function displayAddItem() {
    clearOnClickElement();
    const form = document.createElement("form");
    form.id = "to-do-form";
    const inputText = document.createElement("input"); // <input> </input>
    inputText.className = "input-box";
    inputText.type = "text";
    inputText.id = "task";
    inputText.required = true;
    inputText.placeholder = "Type your task here";
    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.innerText = "+";
    addButton.type = "button";
    addButton.onclick = addToDoList;
    form.appendChild(inputText);
    form.appendChild(addButton);
    onClickElement.appendChild(form);
}

function darkMode() {
    let theme_button = document.getElementById("theme_button");
    if (!window.dark_mode) {
        window.dark_mode = true;
        theme_button.innerText = "Light mode";
    }
    else {
        window.dark_mode = false;
        theme_button.innerText = "Dark mode";
    }

    let element = document.body;
    element.classList.toggle("dark-mode")
}
