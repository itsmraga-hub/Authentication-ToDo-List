const userName = document.querySelector('#username');
const password = document.querySelector('#password');
const submitBtn = document.querySelector('#submit');
const errorText = document.querySelector('#errorText');
const form = document.querySelector('#form');
let attempts = 3;

let users = [
  {
    username: 'raga',
    password: '0795600499'
  },
  {
    username: 'admin',
    password: '1234567890'
  },
  {
    username: 'user_0',
    password: 'qwertyuiop'
  },
  {
    username: 'user',
    password: 'zxcvbnm'
  },
]

let localUsers = [];

// User class to create a new user when logging in
class User {
  constructor(n, p) {
    this.username = n
    this.password = p
  }
}

// load user data from localStorage
const load = () => {
  const data = localStorage.getItem('users');
  const userData = JSON.parse(data);
  if (userData) {
    localUsers = userData;
    // users = localUsers
  }
}

// load data onLoading from local storage
window.addEventListener('DOMContentLoaded', load());

// Function to store data to localStorage
const storeToLocalStorage = () => {
  localStorage.setItem('users', JSON.stringify(users));
}

// Function to check if object
function isObject(object) {
  return object != null && typeof object === 'object';
}

// Function to check if two objects are equal
function isEqual(obj1, obj2) {
  var props1 = Object.getOwnPropertyNames(obj1);
  var props2 = Object.getOwnPropertyNames(obj2);
  if (props1.length != props2.length) {
      return false;
  }
  for (var i = 0; i < props1.length; i++) {
      let val1 = obj1[props1[i]];
      let val2 = obj2[props1[i]];
      let isObjects = isObject(val1) && isObject(val2);
      if (isObjects && !isEqual(val1, val2) || !isObjects && val1 !== val2) {
          return false;
      }
  }
  return true;
}

// Function that takes a user object as a parameter and checks if user exists returning true or false
const validateUser = (u) => {
  let isValidated = false;
  for (let i = 0; i < users.length; i++) {
    if (isEqual(u, users[i])) {
      isValidated = true;
    }
  }
  console.log(isValidated);
  return isValidated;
}

// Validator function for input values to check for empty strings and display error messages
const validator = () => {
  const userValue = userName.value;
  const passValue = password.value;
  const newUser = new User(userValue, passValue);
  const isUser = validateUser(newUser);
  if (userValue != '' && passValue != '') {
    if (isUser) {
      // location.replace('home.html')
      window.location.href = 'home.html'
    } else {
      attempts -= 1;
      if (attempts === 0) {
        userName.disabled = true;
        password.disabled = true;
        submitBtn.disabled = true;
        submitBtn.nextElementSibling.textContent = `You have exhausted your attempts`;
        return;
      }
      submitBtn.nextElementSibling.textContent = `Input values do not match! You have ${attempts} attempts remaining`;
      setTimeout(() => {
        submitBtn.nextElementSibling.textContent = "";
      }, 2000);
    }
  } else {
    if (userValue === '') {
      userName.nextElementSibling.textContent = "Username is empty";
      setTimeout(() => {
        userName.nextElementSibling.textContent = "";
      }, 1000);
    }
    if (passValue === '') {
      password.nextElementSibling.textContent = "Password cannot be empty";
      setTimeout(() => {
        password.nextElementSibling.textContent = "";
      }, 1000);
    }
  }
}

// Prevent form submission and redirect to another page
form.onsubmit = () => {return false};

// Event listener on submit button calling the validator function
submitBtn.addEventListener('click', validator)
