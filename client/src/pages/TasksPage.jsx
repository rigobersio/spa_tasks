import React, { useState, useEffect } from 'react';
import { FcPlus } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { createTaskRequest, getTasksRequest, getTaskRequest, updateTaskRequest, deleteTaskRequest } from '../api/tasks';
import TaskModal from '../components/TaskModal';
import { useLanguage } from '../context/LanguageContext';
import CreateTaskModal from '../components/CreateTaskModal';

const TasksPage = () => {
  const { castelian } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchTasks = async () => {
    let messageError = castelian ? 'Error al cargar las tareas' : 'Failed to fetch tasks';
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      toast.error(messageError);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onSubmit = async (data) => {
    let messageSuccess = castelian ? 'Tarea creada correctamente' : 'Task created successfully';
    let messageError = castelian ? 'Error al crear la tarea' : 'Failed to create task';
    try {
      const res = await createTaskRequest(data);
      setTasks(prevTasks => [...prevTasks, res.data]);
      toast.success(messageSuccess, { autoClose: 2000 });
      reset();
      setShowCreateModal(false); // Cerrar el modal después de crear una tarea
    } catch (error) {
      toast.error(messageError);
    }
  };

  const handleTaskClick = async (taskId) => {
    try {
      const res = await getTaskRequest(taskId);
      setSelectedTask(res.data);
    } catch (error) {
      let messageErrorCatch = castelian ? 'Error al cargar los detalles de la tarea' : 'Failed to fetch task details';
      toast.error(messageErrorCatch);
    }
  };

  const handleTaskClose = () => {
    setSelectedTask(null);
  };

  const handleTaskUpdate = async (updatedTask) => {
    let messageSuccess = castelian ? 'Tarea actualizada correctamente' : 'Task updated successfully';
    let messageError = castelian ? 'Error al actualizar la tarea' : 'Failed to update task';
    try {
      await updateTaskRequest(updatedTask._id, updatedTask);
      setTasks(prevTasks => prevTasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
      toast.success(messageSuccess);
      setSelectedTask(null); // Cerrar el modal
    } catch (error) {
      toast.error(messageError);
    }
  };

  const handleTaskDelete = async (taskId) => {
    let messageSuccess = castelian ? 'Tarea eliminada correctamente' : 'Task deleted successfully';
    let messageError = castelian ? 'Error al eliminar la tarea' : 'Failed to delete task';
    try {
      await deleteTaskRequest(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      toast.success(messageSuccess);
      setSelectedTask(null); // Cerrar el modal
    } catch (error) {
      toast.error(messageError);
    }
  };

  return (
    <div className='text-justify'>
      <div className="bg-green-50 text-green-900 p-6 sm:mx-0 mx-[5%] rounded-lg shadow-md">
        <div className='flex flex-row items-center justify-between w-full pb-5'>
          <h1 className="text-3xl font-bold mt-4 mb-5">{castelian ? "¡Bienvenidos, aquí están sus tareas! 📝" : "Welcome here are your tasks! 📝"}</h1>
          <div className="cursor-pointer mr-56" onClick={() => setShowCreateModal(true)}>
            <FcPlus className="text-6xl" />
          </div>
        </div>
        <p className="text-lg mb-5">
          {
            castelian ?
            "Aquí podrás ver todas tus tareas y si sigues las instrucciones de Canfeynman 🐕 podrás: agregar nuevas tareas, editarlas o eliminarlas. 🔥"
            :
            "Here you can see all your tasks and if you follow the Canfeynman 🐕 instructions you will be able to: add new tasks, edit them or delete them. 🔥"
          }
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center lg:px-14 py-12 w-full gap-20">
        <div className="lg:pl-10 lg:pt-10 lg:w-[48%] w-[70%] flex flex-col items-center justify-center relative">
          <div className="bg-green-50 px-2 pt-6 pb-6 rounded-lg shadow-md text-green-900 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">{castelian ? "Sigue las instrucciones de Canfeynman 📚🐶" : "Follow the instructions of Canfeynman 📚🐶"}</h2>
            <p className="text-lg mb-4">
              {
                castelian ?
                "¡Hola humano! Soy un investigador de los misterios del universo canino 🎓🧠. Mi nombre es Canfeynman 🐕 y estaré aquí para ayudarte con la herramienta 'Tareas'. Puedes relajarte y confiar en mí, es muy sencillo:"
                :
                "Hello human! I'm an investigator of the mysteries of the canine universe 🎓🧠. My name is Canfeynman 🐕 and I'll be here to assist you with the 'Tasks' tool. You can relax and trust me, it's quite simple:"
              }
            </p>
            <ol className="mb-4 space-y-4">
              <li className='flex flex-wrap'>
                {castelian ? "1. Para agregar nuevas tareas, simplemente pulsa o haz clic en el icono" : "1. To add new tasks, simply tapping or clicking on the icon"}
                <span>
                  <FcPlus className="ml-1 text-4xl" />
                </span>
              </li>
              <li>{castelian ? "2. Una vez que agregues una nueva tarea, aparecerá automáticamente en la Lista de tareas 📝" : "2. Once you add a new task, it will automatically appear in the Tasks List 📝"}</li>
              <li>{castelian ? "3. Para ver los detalles de una tarea específica, simplemente selecciónela pulsando o haciendo clic en la tarea 🖱️" : "3. To view details about a specific task, simply select by tapping or clicking on the task 🖱️"}</li>
              <li>{castelian ? "4. Una vez que estés dentro de una tarea, podrás editarla ✏️ o eliminarla 🗑️ según sea necesario" : "4. Within a task, you can edit it ✏️ or delete it 🗑️ as needed"}</li>
            </ol>
            <p className="text-lg mb-4">
              {
                castelian ?
                "¡Ya estás listo para comenzar a organizar tus tareas! 🐾 📖."
                :
                "Now you're ready to start organizing your tasks! 🐾 📖."
              }
            </p>
          </div>
          <div className="mt-6 w-full flex sm:flex-row flex-col sm:items-end items-center gap-3">
            <img
              className="lg:ml-3 lg:mt-1 sm:w-[30%] w-[60%] sm:mt-[3%] mt-[15%] ml-8 rounded-full shadow-lg"
              src="https://res.cloudinary.com/dqh2illb5/image/upload/v1721619175/login/pexels-samson-katt-5257587_ljhitp.jpg"
              alt={castelian ? "imagen de un perro mirando como gestionas tus tareas" : "Image of a dog watching you manage your tasks"}
            />
            <div className="bg-yellow-200 text-yellow-800 p-2 lg:mx-1 sm:mr-1 md:mx-2 rounded-lg sm:max-w-[60%] w-auto mt-4 sm:mt-0">
              <p className="text-lg">
                {
                  castelian ?
                  "¡Hola, soy Canfeynman de nuevo! 🐕✨ Llevar una lista de tareas te ayuda a mantenerte organizado y libre de estrés. Es como tener un asistente personal para que tu día transcurra sin problemas. 📅💪"
                  :
                  "Hey, it's Canfeynman again! 🐕✨ Keeping a task list helps you stay organized and stress-free. It's like having a personal assistant to keep your day running smoothly. 📅💪"
                }
              </p>
            </div>
          </div>
        </div>

        <div className="lg:ml-10 lg:pt-10 lg:w-[30%] md:w-[50%] w-[70%] m-3 flex flex-col items-center justify-center relative">
          <div className="w-full border-2 border-solid border-fuchsia-600 bg-green-50 rounded-lg shadow-md text-green-900">
            <h2 className="pt-6 pb-6 mb-6  text-2xl font-bold text-center">{castelian ? "Lista de tareas 📝" : "Tasks List 📝"}</h2>
            <div className="max-h-[800px] lg:max-h-[620px] ml-5 mr-2 overflow-y-auto">
              {tasks.length > 0 ? (
                <ul>
                  {tasks.map(task => (
                    <li key={task._id} className="mb-4 p-4 border rounded-lg shadow-sm bg-white transition hover:bg-slate-100" onClick={() => handleTaskClick(task._id)}>
                      <h3 className="text-xl font-semibold">{task.title}</h3>
                      <p>{task.date}</p>
                      <p>data más tolocaledata: {task.date.toLocaleDateString()}</p>
                      <p>instanacia de new Data con tolocale {new Date(task.date).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">{castelian ? "No se encontraron tareas" : "No tasks found."}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={handleTaskClose}
          onUpdate={handleTaskUpdate}
          onDelete={handleTaskDelete}
        />
      )}

      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default TasksPage;
