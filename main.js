document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".entered-list");
  const addBtn = document.querySelector(".add-list");
  const tasks = document.querySelector(".tasks");

  class app {
    constructor(tasksContainer) {
      this.tasksContainer = tasksContainer;
      this.loadTasks();
    }

    addTask(taskText) {
      const newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.innerHTML = `
                <p>${taskText}</p>
                <div class="item-btn">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash delete-btn"></i>
                </div>
            `;
      this.tasksContainer.appendChild(newItem);
      this.saveTasks();
    }

    editTask(taskElement) {
      const newValue = prompt("Edit your task", taskElement.textContent);
      if (newValue.trim()) {
        taskElement.textContent = newValue;
        this.saveTasks();
      }
    }

    deleteTask(taskElement) {
      taskElement.remove();
      this.saveTasks();
    }

    saveTasks() {
      const tasksList = [
        ...this.tasksContainer.querySelectorAll(".item p"),
      ].map((p) => p.textContent);
      localStorage.setItem("tasks", JSON.stringify(tasksList));
    }

    loadTasks() {
      const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
      tasksList.forEach((task) => this.addTask(task));
    }
  }

  const taskManager = new app(tasks);

  addBtn.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText) {
      taskManager.addTask(taskText);
      input.value = "";
      addBtn.classList.remove("active");
    } else {
      alert("Please enter a task");
    }
  });

  input.addEventListener("keyup", () => {
    addBtn.classList.toggle("active", input.value.trim() !== "");
  });

  tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      taskManager.deleteTask(e.target.closest(".item"));
    } else if (e.target.classList.contains("edit-btn")) {
      taskManager.editTask(e.target.closest(".item").querySelector("p"));
    }
  });
});
