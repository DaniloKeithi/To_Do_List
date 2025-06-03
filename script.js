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
  //Pega o valor do input
  const input = document.getElementById("taskInput"); //cria constante input dentro dessa função
  const taskText = input.value.trim(); //input.value retorna exatamente o que o usuário escreve. O "trim" foi
  //adicionado para remover espaços em branco do texto do inicio e final da string ex: "  fazer café  " retorna "fazer café"
  //sem espaços extras. Ele também é responsavel por fazer com que o campo de texto não venha vazio
  const category = document.getElementById("taskCategory").value;

  // 2. Verifica se não está vazio e manda um aviso ao usuário
  if (!taskText) {
    return;
  }

  //Adiciona ao array "tasks"
  tasks.push({
    id: Date.now(), // Cria um ID único (usando timestamp)
    text: taskText,
    completed: false, // Tarefa começa não concluída
    createdAT: new Date(), // Adiciona a data/hora atual
    category: document.getElementById("taskCategory").value,
  });

  //Limpa o input
  input.value = "";

  //Atualiza a tela
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
      <small>Criada em: ${new Date(task.createdAt).toLocaleString()}</small>
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
