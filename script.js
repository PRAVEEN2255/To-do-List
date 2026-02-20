let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") return;

    tasks.push({
        text: taskText,
        completed: false,
        completedDate: null
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function completeTask(index) {
    tasks[index].completed = true;
    tasks[index].completedDate = new Date().toLocaleString();
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const activeList = document.getElementById("activeList");
    const completedList = document.getElementById("completedList");

    activeList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (!task.completed) {
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="completeTask(${index})">✔</button>
                    <button onclick="deleteTask(${index})">X</button>
                </div>
            `;
            activeList.appendChild(li);
        } else {
            li.innerHTML = `
                <div>
                    <span class="completed">${task.text}</span>
                    <small style="display:block;font-size:11px;">
                        Completed: ${task.completedDate}
                    </small>
                </div>
                <button onclick="deleteTask(${index})">X</button>
            `;
            completedList.appendChild(li);
        }
    });
}

renderTasks();