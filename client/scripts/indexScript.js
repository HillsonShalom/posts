document.body.innerHTML = '';

const appTitle = document.createElement('h1');
appTitle.textContent = "Welcome to my posts app!";
appTitle.classList.add('app-title');

document.body.append(appTitle);