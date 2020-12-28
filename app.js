document.getElementById('formTask').addEventListener('submit', saveTask)

function saveTask(e){
    
    let title = document.getElementById('title').value ; //Obtenemos el valor del titulo
    let description = document.getElementById('description').value; // Obtenemos el valor de description 
    const task = {
        title, // title:title
        description, // description: description
    };

    if (localStorage.getItem('tasks') === null){
        let tasks = []; // Creamos el arreglo  si no existe alguna tarea guardada en local Storage
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardado lo datos del objeto task en el localSatorage 'tasks'   (Almacenado las tareas)

    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));   // Si la tarea existe , la tomamos del localStorage, pasandola de string a objeto
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }   
    
    getTasks();
    document.getElementById('formTasks').reset();
    e.preventDefault()  //la pagina no se refrescaevitando el submit

}
  //Hace una consulta al local storage
function getTasks() {
    let tasks=  JSON.parse(localStorage.getItem('tasks')); // tomamos las tareas desde el local Storage
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';  // Limpiamos antes de insertar los datos

    for(let i = 0; i < tasks.length; i++){    // Recorremos los datos para obtener almacenas o recorrer las tareas
        //console.log(tasks[i])
        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += `<div class = 'card '>
            <div class = 'card-body' >
            <p>${title} - ${description} </p>
            <a class = 'btn btn-danger' onclick='deleteTasks("${title}")'> Delete </a>
            </div>
        </div>` }


    
}

function deleteTasks(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(i = 0; i < tasks.length; i++){
        if(tasks[i].title == title){
            tasks.splice(i, 1);  // metodo splice sirve para agregar o quitar elementos de un array 0 para agregar 1para borrar
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Almacena de nuevo la tareas actualizadas sin el intem que se acaba de borrar
    getTasks();
}
getTasks();