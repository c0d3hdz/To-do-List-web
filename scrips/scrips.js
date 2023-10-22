// Variables globales
const entradaTarea = document.getElementById('taskInput')
const botonAgregarTarea = document.getElementById('addTask')
const listaTareas = document.getElementById('taskList')
let tareas = []

// Función para guardar tareas en localStorage
function guardarTareasEnLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas))
}

// Función para cargar tareas desde localStorage
function cargarTareasDesdeLocalStorage() {
    const tareasJSON = localStorage.getItem('tareas')
    if (tareasJSON) {
        tareas = JSON.parse(tareasJSON)
    }
}

// Función para actualizar la lista de tareas en la interfaz de usuario
function actualizarListaTareas() {
    listaTareas.innerHTML = '' // Borrar la lista actual
    tareas.forEach((tarea, indice) => {
        const elementoTarea = document.createElement('div')
        elementoTarea.innerHTML = `
            <div class="tarea">${tarea.texto}</div>  <div class="fechata">${tarea.fechaTarea}</div><div class="buttonborrar"><button class="borrarTarea" data-indice="${indice}">✔</button></div>
        `
        elementoTarea.classList.add('mi-list')
        listaTareas.appendChild(elementoTarea)
    })

    // Agregar controladores de eventos para los botones de eliminación
    const botonesBorrar = document.querySelectorAll('.borrarTarea')
    botonesBorrar.forEach(botonBorrar => {
        botonBorrar.addEventListener('click', evento => {
            const indice = evento.target.getAttribute('data-indice')
            tareas.splice(indice, 1) //funcion para Borrar la tarea del arreglo
            guardarTareasEnLocalStorage() // Actualizar localStorage después de eliminar
            actualizarListaTareas()
        })
    })
}

// Función para agregar una nueva tarea al objeto JSON y actualizar la lista
function agregarTarea() {
    const textoTarea = entradaTarea.value.trim()
    const fechaActual = new Date()
    const año = fechaActual.getFullYear()
    const mes = fechaActual.getMonth() + 1 
    const dia = fechaActual.getDate()
    if (textoTarea !== '') {
        tareas.push({
            texto: textoTarea,
            fechaTarea: `${dia}/${mes}/${año}`,
        })
        guardarTareasEnLocalStorage() // Actualizar localStorage después de agregar
        actualizarListaTareas()
        entradaTarea.value = '' // Limpiar el campo de entrada
    }
}

// Agregar un controlador de eventos al botón de añadir tarea
botonAgregarTarea.addEventListener('click', agregarTarea)

// Permitir añadir tareas al presionar Enter
entradaTarea.addEventListener('keyup', evento => {
    if (evento.key === 'Enter') {
        agregarTarea()
    }
})

// Cargar tareas desde localStorage al inicio
cargarTareasDesdeLocalStorage()
// Inicializar la lista de tareas en la interfaz de usuario
actualizarListaTareas()

// *TODO: by c0d3......