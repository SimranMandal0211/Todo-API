console.log('Working');

let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `<li>
                        <input type="checkbox" id=${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
                        <label for="${task.id}"> ${task.title} </label>
                        <img src="binImg.png" alt="---" class="delete" data-id="${task.id}" /> 
                    </li>`;
    taskList.append(li);
}

function renderList(){
    taskList.innerHTML = '';
    for(let i = 0 ; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

// mark Task as complete
function toggleTask(taskId){
    const task = tasks.filter(function(task){
        return task.id === Number(taskId);
    });

    if(task.length > 0 ){
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
}

function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return (task.id !== taskId);
    })
    tasks = newTasks;
    renderList();
    showNotification('Task deleted succesfully');
}

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added Successfully');
        return;
    }

    showNotification("Task can not be added");
}

function showNotification(text){
    alert(text);
}

function handleInputKeypress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;
        console.log('text: ', text);

        if(!text){
            showNotification('Task text can not be empty');
            return;
        }

        // object
        const task = {
            title: text,
            id: Date.now(),
            completed: false
        }

        e.target.value = '';
        addTask(task);
    }
}

// event delegation use here...
function handleClickListener(e){
    const target = e.target;
    console.log(target);

    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}

addTaskInput.addEventListener('keyup', handleInputKeypress);
document.addEventListener('click', handleClickListener);