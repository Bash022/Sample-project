//  Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listener
loadEventListeners();

// Load all event listener
function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getVoices);
    // Add task event
    form.addEventListener('submit', addTask);
    // add remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTask);
    // filter
    filter.addEventListener('keyup', filterTask);
}

//Get Task from LS
function getVoices(){    
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //create a text node and append li
        li.appendChild(document.createTextNode(task));
        //create link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);       
    });
}

  

// Add Task
function addTask(e){
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // Create Element 'li'
    const li = document.createElement('li');

    li.className = 'collection-item'; // Add Class
    li.appendChild(document.createTextNode(taskInput.value)); //create text node and append to li

    const link = document.createElement('a'); //create element for 'a'

    link.className = 'delete-item secondary-content'; //add class
    link.innerHTML = '<i class="far fa-trash-alt"></i>'; //add icon html
    
    li.appendChild(link); //append link to li
    document.querySelector('ul.collection').appendChild(li); //append li to ul

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

    e.preventDefault();
}


    function storeTaskInLocalStorage(task){
     let tasks;
     if(localStorage.getItem('tasks') === null){
         tasks = [];
     } else{
         tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.push(task);
     localStorage.setItem('tasks', JSON.stringify(tasks));


    }


    // Remove Task
    function removeTask(e){
        if(e.target.parentElement.classList.contains('delete-item')){
            //check sa mga classlist ng parent element kung meron ba sa kanila yung may 'delete-item'
            if(confirm('Are you sure?')){
                e.target.parentElement.parentElement.remove();
                //Remove from LS 
                removeTaskFromLocalStorage(e.target.parentElement.parentElement);//this li
            }
        }
    }
    // Remove individual task from storage
    function removeTaskFromLocalStorage(taskItem){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task, index){
            if(taskItem.textContent === task){
                //(taskItem.textContent === task) check kung parehas ba yung nakalagay sa text node saka yung nasa values ng specific li
                //console.log(task);
                tasks.splice(index, 1);//yung index ng task tapos kung ilan yung tatanggalin
            }
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    // Clear Task
    function clearTask(e){
        if(confirm('Are you sure?')){
            // taskList.innerHTML = '';
            while (taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }
        }
        clearTasksFromLocalStorage();
    }

    function clearTasksFromLocalStorage(){
        localStorage.clear();
    }

    // filter task
    function filterTask(e){
        const text = e.target.value.toLowerCase();
        document.querySelectorAll('.collection-item').forEach(function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    }