//Cria a variavel tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  updateUI();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Cria a função para ADICIONAR uma tarefa
function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  const category = document.getElementById('taskCategory').value;
  
  if (!taskText) return;
  
  tasks.push({
    id: Date.now(),
    text: taskText,
    completed: false,
    createdAt: new Date().toISOString(), // Alteração importante aqui!
    category: category
  });
  
  input.value = '';
  updateUI();
  saveTasks();
}
function updateUI() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}" data-category="${task.category}">
        [${task.category.toUpperCase()}] ${task.text}
      </span>
      <small>Criada em: ${formatDate(task.createdAt)}</small>
      <button onclick="toggleComplete(${task.id})">✓</button>
      <button onclick="deleteTask(${task.id})">✕</button>
    `;
    list.appendChild(li);
  });
}
function toggleComplete(taskId) {
  //Encontra a tarefa no array pelo ID
  const task = tasks.find((task) => task.id === taskId);

  // Inverte o status (true vira false e vice-versa)
  task.completed = !task.completed;

  //Atualiza a tela
  updateUI();
  saveTasks();
}
function deleteTask(taskId) {
  //Filtra o array, removendo a tarefa com o ID especificado
  tasks = tasks.filter((task) => task.id !== taskId);

  //Atualiza a tela
  updateUI();
  saveTasks();
}

function formatDate(dateString) {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}
