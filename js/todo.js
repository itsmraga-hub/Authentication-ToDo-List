// Array to store the data
let taskList = [];

// Display form to add task as a modal container
const addTask = document.querySelector('#add-task');

// Display modal function
const displayModal = () => {
  // Display modal
  document.querySelector('.modal-container').style.display = 'block';
  // Blur background
  document.querySelector('.todoApp').style.filter= 'blur(10px)';
  document.querySelector('.header-container').style.filter= 'blur(5px)';
}

// 
const hideModal = () => {
  document.querySelector('.modal-container').style.display = 'none';
  document.querySelector('.todoApp').style.filter= 'blur(0)';
  document.querySelector('.header-container').style.filter= 'blur(0)';
}

addTask.addEventListener('click', () => {
  displayModal();
});

// class to create Task object
class Task {
  constructor(title, date, description) {
    this.title = title;
    this.date = date;
    this.description = description;
  }
}

// Select tasks container to append HTMLcode to
let tasksContainer = document.querySelector('.tasks-container');

// Function to create and append all tasks to the tasksContainer
const createTasks = () => {
  tasksContainer.innerHTML = '';
  taskList.map((task, i) => {
    return (tasksContainer.innerHTML += `
    <div class='task' id=${i}>
      <div class="task-header">
        <h3 class="title">${task.title}</h3>
        <input type="checkbox" class="check-box" name="status" id="#status" value="false">
      </div>
      <p class="date">${task.date}</p>
      <p class="description">${task.description}</p>
      <div class="edit-delete">
        <i onClick="editTask(this)" class="fa-solid fa-pen-to-square"></i>
        <i onClick="deleteTask(this);createTasks()" class="fa-solid fa-trash-can"></i>
      </div>
      </div>`);
  })
  resetForm(form);
}

// Select form
form = document.querySelector('.form');

// Reset form to empty string
const resetForm = (form) => {
  form[0].value = '';
  form[1].value = '';
  form[2].value = '';
}

// Function to edit form
const resetEditForm = (form, str1, str2, str3) => {
  form[0].value = str1;
  form[1].value = str2;
  form[2].value = str3;
}

// delete task functionality
const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  taskList.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem('tasksList', JSON.stringify(taskList));
}

// Edit Task functionality
const editTask = (e) => {
  const taskToEdit = e.parentElement.parentElement;
  const form = document.querySelector('.form');
  const str1 = taskToEdit.children[0].children[0].innerText;
  const str2 = taskToEdit.children[1].innerText;
  const str3 = taskToEdit.children[2].innerText;
  resetEditForm(form, str1, str2, str3);
  displayModal()
  deleteTask(e);
}

// Check if checked
const checkIfChecked = () => {
  
}

// Form validation
const formValidation = (form) => {
  if (form[0].value === '' && form[1].value === '' && form[2].value === '') {
    document.querySelector('.btns').nextElementSibling.innerHTML = 'No Task Added';
    setTimeout(() => {
      document.querySelector('.btns').nextElementSibling.innerHTML = '';
    }, 2000);
  }
  else if (form[0].value === '' || form[1].value === '' || form[2].value === '') {
    if (form[0].value === '') {
      form[0].nextElementSibling.innerHTML = 'Task can not have empty title';
      setTimeout(() => {
        form[0].nextElementSibling.innerHTML = ''
      }, 2000);
    }
    if (form[1].value === '') {
      form[1].nextElementSibling.innerHTML = 'Task must have a date'
      setTimeout(() => {
        form[1].nextElementSibling.innerHTML = ''
      }, 2000);
    }
    if (form[2].value === '') {
      form[2].nextElementSibling.innerHTML = 'Task must have a description';
      setTimeout(() => {
        form[2].nextElementSibling.innerHTML = ''
      }, 2000);
    }
    return false;
  } else if (form[0].value && form[1].value && form[2].value) {
    return true;
  }
}

// Get task data and 
const getTaskData = (form) => {
  const task = new Task(form[0].value, form[1].value, form[2].value);
  taskList.push(task);
  // console.log(task);
  // console.log(taskList);
  localStorage.setItem('tasksList', JSON.stringify(taskList));
  return task;
}

// Select addBtn to add Task
const addBtn = document.querySelector('#addBtn');
const closeBtn = document.querySelector('#closeBtn');
addBtn.addEventListener('click', () => {
  if (formValidation(form)) {
    const task = getTaskData(form);
    createTasks();
    hideModal();
  }
})

// Event listener to close modal form
closeBtn.addEventListener('click', () => {
  resetForm(form);
  hideModal();
});

(() => {
  taskList = JSON.parse(localStorage.getItem('tasksList')) || [];
  if (taskList) {
    createTasks();
  }
})();