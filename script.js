document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        taskList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.innerHTML = `
                <p>${todo.text}</p>
                <div>
                    <button class="edit-btn" onclick="editTask(${index})">편집</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">삭제</button>
                    <button class="complete-btn" onclick="completeTask(${index})">완료</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            todos.push({ text: taskText, completed: false });
            saveTodos();
            renderTodos();
            taskInput.value = '';
        }
    };

    window.editTask = (index) => {
        const newTask = prompt('해야 할 일 편집', todos[index].text);
        if (newTask !== null && newTask.trim() !== '') {
            todos[index].text = newTask.trim();
            saveTodos();
            renderTodos();
        }
    };

    window.deleteTask = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    window.completeTask = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTodos();
});