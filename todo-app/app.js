const STORAGE_KEY = "focus-tasks:v1";
const THEME_KEY = "focus-tasks:theme";
const state = { tasks: loadTasks(), filter: "all" };
const elements = {
  form: document.querySelector("#taskForm"), input: document.querySelector("#taskInput"), list: document.querySelector("#taskList"), empty: document.querySelector("#emptyState"), count: document.querySelector("#taskCount"), clearCompleted: document.querySelector("#clearCompletedButton"), theme: document.querySelector("#themeButton"), filters: [...document.querySelectorAll("[data-filter]")]
};
function loadTasks() { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); return Array.isArray(saved) ? saved.filter((task) => task && task.id && typeof task.title === "string") : []; } catch { return []; } }
function saveTasks() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks)); }
function visibleTasks() { return state.tasks.filter((task) => state.filter === "all" || (state.filter === "active" ? !task.completed : task.completed)); }
function render() {
  const tasks = visibleTasks(); elements.list.replaceChildren(); elements.empty.hidden = tasks.length > 0; elements.empty.textContent = state.tasks.length === 0 ? "No tasks here yet. Add one to get started." : "No tasks match this filter.";
  const remaining = state.tasks.filter((task) => !task.completed).length; elements.count.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} left`;
  tasks.forEach((task) => {
    const item = document.createElement("li"); item.className = `task-item${task.completed ? " completed" : ""}`;
    const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.checked = task.completed; checkbox.setAttribute("aria-label", `Mark ${task.title} as complete`); checkbox.addEventListener("change", () => toggleTask(task.id));
    const label = document.createElement("label"); label.textContent = task.title;
    const remove = document.createElement("button"); remove.className = "delete-button"; remove.type = "button"; remove.textContent = "×"; remove.title = `Delete ${task.title}`; remove.setAttribute("aria-label", `Delete ${task.title}`); remove.addEventListener("click", () => deleteTask(task.id));
    item.append(checkbox, label, remove); elements.list.append(item);
  });
  elements.filters.forEach((button) => button.classList.toggle("active", button.dataset.filter === state.filter)); elements.clearCompleted.disabled = !state.tasks.some((task) => task.completed);
}
function addTask(title) { state.tasks.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, title: title.trim(), completed: false, createdAt: new Date().toISOString() }); saveTasks(); render(); }
function toggleTask(id) { const task = state.tasks.find((item) => item.id === id); if (task) task.completed = !task.completed; saveTasks(); render(); }
function deleteTask(id) { state.tasks = state.tasks.filter((task) => task.id !== id); saveTasks(); render(); }
elements.form.addEventListener("submit", (event) => { event.preventDefault(); if (!elements.input.value.trim()) return; addTask(elements.input.value); elements.input.value = ""; elements.input.focus(); });
elements.filters.forEach((button) => button.addEventListener("click", () => { state.filter = button.dataset.filter; render(); }));
elements.clearCompleted.addEventListener("click", () => { state.tasks = state.tasks.filter((task) => !task.completed); saveTasks(); render(); });
elements.theme.addEventListener("click", () => { document.documentElement.classList.toggle("dark"); const dark = document.documentElement.classList.contains("dark"); localStorage.setItem(THEME_KEY, dark ? "dark" : "light"); elements.theme.textContent = dark ? "Light mode" : "Dark mode"; });
if (localStorage.getItem(THEME_KEY) === "dark") { document.documentElement.classList.add("dark"); elements.theme.textContent = "Light mode"; }
render();
