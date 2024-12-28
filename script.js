//This assignment is developed with the help of google searches, gpt, knowledge gained
//during previous classes {HTML, CSS, JS} from utility classes, code developed earlier
//At the moment there is not much error checking/ validations for data inputs
//There are 2 class objects Person, Task and array of objects with in the program

//there are few known bugs esp with data inputs {tasks, Persons}
//subsequently delete, assign functionalities get flaky at times
//positive flows look good
//would take up as an enhancment future project



//Person Class for managing persons
class Person {
    constructor(name, age, cell, address) {
      this.name = name;
      this.age = age;
      this.cell = cell;
      this.address = address;
      this.assignedTasks = [];
    }
  }
  
  //Task Class for managing tasks
  class Task {
    constructor(taskName, taskDetails, estimatedDuration, assignedTo) {
      this.taskName = taskName;
      this.taskDetails = taskDetails;
      this.estimatedDuration = estimatedDuration;
      this.assignedTo = assignedTo;
    }
  }
  
  //Initializing array of objects {tasks, persons}
  //first create a person and then assign a task to him
  const tasks = [];
  const persons = [];
  
  // Add a Task to assigned person
  document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskName = document.getElementById('taskNameInput').value;
    const taskDetails = document.getElementById('taskDetailsInput').value;
    const estimatedDuration = document.getElementById('estimatedDurationInput').value;
    const assignedTo = document.getElementById('assignedToInput').value;
    
    console.log("list of existing Tasks" + tasks);

    console.log(`adding new Task ${taskName} ${taskDetails} ${estimatedDuration} ${assignedTo}`);


    const person = persons.find(p => p.name === assignedTo);
    if (!person) {
      alert('Assigned person not found.');
      return;
    }
  
    const task = new Task(taskName, taskDetails, estimatedDuration, assignedTo);
    tasks.push(task);
    person.assignedTasks.push(task);
  
    addRowToTaskTable(task);
    clearTaskInputs();
    renderPersonTable();
  });
  

  //function adds newly added task to Tasks table (in blue color)
  function addRowToTaskTable(task) {
    const tableBody = document.getElementById('taskTableBody');
    const newRow = document.createElement('tr');
  
    console.log(`adding new Task ${task.taskName} ${task.taskDetails} ${task.estimatedDuration} ${task.assignedTo}`);

    newRow.innerHTML = `
      <td>${task.taskName}</td>
      <td>${task.taskDetails}</td>
      <td>${task.estimatedDuration}</td>
      <td>${task.assignedTo}</td>
      <td><button onclick="deleteTask('${task.taskName}', '${task.taskDetails}', '${task.estimatedDuration}', '${task.assignedTo}')">Delete</button></td>
    `;
  
    tableBody.appendChild(newRow);
  }
  
  //Clear input boxes for Task entry
  function clearTaskInputs() {
    document.getElementById('taskNameInput').value = '';
    document.getElementById('taskDetailsInput').value = '';
    document.getElementById('estimatedDurationInput').value = '';
    document.getElementById('assignedToInput').value = '';
  }
  
  //delete selected task rearrange Tasks array
  //Recreate Tasks table in blue color
  //Recreate Persons table in blue color
  function deleteTask(taskName, taskDetails, estimatedDuration, assignedTo) {
    const taskIndex = tasks.findIndex(t => t.taskName === taskName && t.taskDetails === taskDetails 
                                    && t.estimatedDuration === estimatedDuration && t.assignedTo === assignedTo);
    if (taskIndex > -1) {
      const task = tasks[taskIndex];
      const person = persons.find(p => p.name === task.assignedTo);
      if (person) {
        person.assignedTasks = person.assignedTasks.filter(t => t.taskName !== taskName);
      }
      tasks.splice(taskIndex, 1);
      renderTaskTable();
      renderPersonTable();
    }
  }
  

  function renderTaskTable() {
    const tableBody = document.getElementById('taskTableBody');
    tableBody.innerHTML = '';
    tasks.forEach(addRowToTaskTable);
  }
  
  // Add Person
  document.getElementById('addPersonButton').addEventListener('click', function() {
    const name = document.getElementById('personNameInput').value;
    const age = document.getElementById('personAgeInput').value;
    const cell = document.getElementById('personCellInput').value;
    const address = document.getElementById('personAddressInput').value;
  
    const person = new Person(name, age, cell, address);
    persons.push(person);
  
    addRowToPersonTable(person);
    clearPersonInputs();
    populateAssignedToOptions();
  });
  
  function addRowToPersonTable(person) {
    const tableBody = document.getElementById('personTableBody');
    const newRow = document.createElement('tr');
  
    newRow.innerHTML = `
      <td>${person.name}</td>
      <td>${person.age}</td>
      <td>${person.cell}</td>
      <td>${person.address}</td>
      <td>${person.assignedTasks.map(task => task.taskName).join(', ')}</td>
      <td><button onclick="deletePerson('${person.name}', '${person.age}', '${person.cell}', '${person.address}')">Delete</button></td>
    `;
  
    tableBody.appendChild(newRow);
  }
  
  function clearPersonInputs() {
    document.getElementById('personNameInput').value = '';
    document.getElementById('personAgeInput').value = '';
    document.getElementById('personCellInput').value = '';
    document.getElementById('personAddressInput').value = '';
  }
  
  function deletePerson(personName, age, cell, address) {
    const personIndex = persons.findIndex(p => p.name === personName && p.age === age &&
                                          p.cell === cell && p.address === address);
    if (personIndex > -1) {
      const person = persons[personIndex];
      person.assignedTasks.forEach(task => deleteTask(task.taskName, task.taskDetails, task.estimatedDuration, task.assignedTo));
      persons.splice(personIndex, 1);
      renderPersonTable();
      populateAssignedToOptions();
    }
  }
  
  function renderPersonTable() {
    const tableBody = document.getElementById('personTableBody');
    tableBody.innerHTML = '';
    persons.forEach(addRowToPersonTable);
  }
  

  //iterate over persons, and for each person in that array, 
  // it creates a new <option> element to add to a dropdown <select> element
  function populateAssignedToOptions() {
    const select = document.getElementById('assignedToInput');
    select.innerHTML = '';
    persons.forEach(person => {
      const option = document.createElement('option');
      option.value = person.name;
      option.textContent = person.name;
      select.appendChild(option);
    });
  }
  
  //Sorting based on name of Tasks
    function sortTasks(property) {
    tasks.sort((a, b) => a[property].localeCompare(b[property]));
    renderTaskTable();
  }
  
  // Initial population of the assigned-to dropdown
  populateAssignedToOptions();
  