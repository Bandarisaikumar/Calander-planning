let tasks = [];
function addTask(taskName, duration, frequency, category, preferredDays, preferredTime) {
  const task = {
    name: taskName,
    duration: parseInt(duration),
    frequency: frequency,
    category: category,
    preferredDays: preferredDays.split(',').map(day => day.trim()),
    preferredTime: preferredTime
  };
  tasks.push(task);
}
function calculateTotalHours() {
  let totalHours = 0;
  tasks.forEach(task => {
    totalHours += task.duration;
  });
  return totalHours;
}
function updateSummaryPanel() {
  const totalAllocatedHoursSpan = document.getElementById('total-allocated-hours');
  const remainingHoursSpan = document.getElementById('remaining-hours');

  const totalAllocatedHours = calculateTotalHours();
  const remainingHours = 672 - totalAllocatedHours;

  totalAllocatedHoursSpan.textContent = totalAllocatedHours;
  remainingHoursSpan.textContent = remainingHours;
}
function displayProfessionalTasks() {
  const professionalTasksList = document.getElementById('professional-tasks-list');
  professionalTasksList.innerHTML = '';

  tasks.filter(task => task.category === 'professional').forEach(task => {
    const listItem = document.createElement('li');
    listItem.textContent = `${task.name} (${task.duration} hours)`;
    professionalTasksList.appendChild(listItem);
  });
}
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const taskName = document.getElementById('task-name').value;
  const taskDuration = document.getElementById('task-duration').value;
  const taskFrequency = document.getElementById('task-frequency').value;
  const taskCategory = document.getElementById('task-category').value;
  const taskPreferredDays = document.getElementById('task-preferred-days').value;
  const taskPreferredTime = document.getElementById('task-preferred-time').value;

  addTask(taskName, taskDuration, taskFrequency, taskCategory, taskPreferredDays, taskPreferredTime);

  updateSummaryPanel();
  displayProfessionalTasks();
});
function generateCalendar() {
  const calendarContainer = document.querySelector('.calendar-container');
  calendarContainer.innerHTML = '';
  
  const daysInMonth = 28;
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  for (let i = 0; i < daysInMonth; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.textContent = i + 1;
    
    const dayOfWeek = weekdays[i % 7];
    if (dayOfWeek === 'Sat' || dayOfWeek === 'Sun') {
      dayDiv.classList.add('weekend');
    }
    const tasksForDay = tasks.filter(task => task.preferredDays.includes(dayOfWeek));
    if (tasksForDay.length > 0) {
      dayDiv.classList.add('has-tasks');
    }
    
    calendarContainer.appendChild(dayDiv);
  }
}
function displayAllTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.textContent = `${task.name} - ${task.duration} hours (${task.category})`;
    taskList.appendChild(listItem);
  });
}

displayAllTasks();
console.log(localStorage.getItem('tasks')); // Log tasks from local storage

console.log(tasks);
function displayTasksOnScreen() {
  const taskContainer = document.getElementById('task-container');
  taskContainer.innerHTML = '';

  tasks.forEach(task => {
    const taskElement = document.createElement('div');

    taskElement.innerHTML = `
      <h3>${task.name}</h3>
      <p>Duration: ${task.duration} hours</p>
      <p>Category: ${task.category}</p>
      <!-- Add more task details here as needed -->
    `;

    taskContainer.appendChild(taskElement);
  });
}

displayTasksOnScreen();

