document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskItems = document.getElementById('task-items');

    // Event listener for form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        createTask();
    });

    // Create new task
    function createTask() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;

        // Validate input
        if (!title || !dueDate) {
            return;
        }

        const task = {
            title,
            description,
            dueDate,
            completed: false
        };

        saveTask(task);
        renderTasks();
        taskForm.reset();
    }

    // Save task to browser storage
    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render tasks
    function renderTasks() {
        taskItems.innerHTML = '';

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        if (tasks.length === 0) {
            taskItems.innerHTML = 'No tasks found.';
            return;
        }

        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            const title = document.createElement('div');
            title.classList.add('title');
            title.textContent = task.title;

            const description = document.createElement('div');
            description.classList.add('description');
            description.textContent = task.description;

            const dueDate = document.createElement('div');
            dueDate.classList.add('due-date');
            dueDate.textContent = `Due Date: ${formatDate(task.dueDate)}`;

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Completed' : 'Complete';
            completeButton.addEventListener('click', () => {
                toggleCompleteTask(index);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteTask(index);
            });

            taskItem.appendChild(title);
            taskItem.appendChild(description);
            taskItem.appendChild(dueDate);
            taskItem.appendChild(completeButton);
            taskItem.appendChild(deleteButton);

            taskItems.appendChild(taskItem);
        });
    }

    // Toggle complete task
    function toggleCompleteTask(index) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        if (index >= 0 && index < tasks.length) {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }

    // Delete task
    function deleteTask(index) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        if (index >= 0 && index < tasks.length) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }

    // Initial render
    renderTasks();
});
