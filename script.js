document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value;

    if (title && description && deadline) {
        const task = {
            title: title,
            description: description,
            deadline: deadline,
            completed: false
        };

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('deadline').value = '';

        loadTasks();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            <span>${task.title} - ${task.description} (Prazo: ${task.deadline})</span>
            <div>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Reabrir' : 'Concluir'}</button>
                <button onclick="deleteTask(${index})">Deletar</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}
