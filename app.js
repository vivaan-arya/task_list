// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask)
  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks)
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
      // Create a new list item
      const li = document.createElement("li");
      // Add class to li
      li.className = "collection-item";
      // Add a text node to li
      li.textContent = taskInput.value;
      // Create text Node and Append to li
      li.appendChild(document.createTextNode(task));
      // Create new Link Element
      const link = document.createElement('a');
      // Add class to link
      link.className = "delete-item secondary-content";
      // Add icon
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // Append link to li
      li.appendChild(link);
   
      console.log(taskInput.value.typeOf);
   
      // Append li to ul
      taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {
    e.preventDefault();
   
    if (taskInput.value.trim() === "") {
      alert("Add a task");
    } else {
      // Create a new list item
      const li = document.createElement("li");
      // Add class to li
      li.className = "collection-item";
      // Add a text node to li
      li.textContent = taskInput.value;
      // li.innerHTML = taskInput.value;
      // li.appendChild(document.createTextNode(taskInput.value));
   
      // Create Remove link
      const link = document.createElement("a");
      // Add class to link
      link.className = "delete-item secondary-content";
      // Add icon
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // Append link to li
      li.appendChild(link);
   
      console.log(taskInput.value.typeOf);
   
      // Append li to ul
      taskList.appendChild(li);

      // Store in LS
      storeTaskInLocalStorage(taskInput.value);
   
      // Clear Input Value
      taskInput.value = "";
    }
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();
  
        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
    }
  }

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

// Clear Tasks
function clearTasks() {
    // taskList.innerHTML = '';

    // Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from Local Storage
    clearTasksFromLocalStorage();
}

// Clear Tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

