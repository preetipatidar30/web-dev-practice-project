// Get references to DOM elements
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoTime = document.getElementById('todo-time');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load tasks from local storage on page load
window.onload = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach((task) => addTaskToDOM(task));
};

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach((listItem) => {
        tasks.push({
            task: listItem.querySelector('.task-text').textContent,
            date: listItem.querySelector('.task-date').textContent,
            time: listItem.querySelector('.task-time').textContent,
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task to the DOM
function addTaskToDOM(task) {
    const listItem = document.createElement('li');

    // Task description
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.task;
    listItem.appendChild(taskText);

    // Task date
    const taskDate = document.createElement('span');
    taskDate.className = 'task-date';
    taskDate.textContent = task.date ? `Date: ${task.date}` : 'No date provided';
    listItem.appendChild(taskDate);

    // Task time
    const taskTime = document.createElement('span');
    taskTime.className = 'task-time';
    taskTime.textContent = task.time ? `Time: ${task.time}` : 'No time provided';
    listItem.appendChild(taskTime);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        todoList.removeChild(listItem);
        saveTasksToLocalStorage();
    });
    listItem.appendChild(deleteBtn);

    todoList.appendChild(listItem);
}

// Function to add a new task
function addTask() {
    const task = todoInput.value.trim();
    const date = todoDate.value;
    const time = todoTime.value;

    if (!task) {
        alert('Please enter a task!');
        return;
    }

    const newTask = { task, date, time };
    addTaskToDOM(newTask);
    saveTasksToLocalStorage();

    // Clear the input fields
    todoInput.value = '';
    todoDate.value = '';
    todoTime.value = '';
}

// Add event listener to the Add button
addBtn.addEventListener('click', addTask);

// Allow adding tasks with the Enter key
todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
