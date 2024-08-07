import React, { useState, useEffect } from 'react';
import { FcPlus } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { createTaskRequest, getTasksRequest, getTaskRequest, updateTaskRequest, deleteTaskRequest } from '../api/tasks';
import TaskModal from '../components/TaskModal';
import CreateTaskModal from '../components/CreateTaskModal';

const TasksPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
      toast.success('Tasks fetched successfully!');
    } catch (error) {
      //console.error("Error al obtener las tareas:", error);
      toast.error('Failed to fetch tasks.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("Enviando datos:", data);
      const res = await createTaskRequest(data);
      console.log("Respuesta del servidor:", res);
      setMessage("Task created successfully!");
      reset();
      fetchTasks(); // Obtener las tareas nuevamente después de crear una nueva tarea
      setShowCreateModal(false); // Cerrar el modal después de crear una tarea
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      setMessage("Failed to create task.");
    }
  };

  const handleTaskClick = async (taskId) => {
    try {
      const res = await getTaskRequest(taskId);
      setSelectedTask(res.data);
    } catch (error) {
      console.error("Error al obtener la tarea:", error);
    }
  };

  const handleTaskClose = () => {
    setSelectedTask(null);
  };

  const handleTaskUpdate = async (updatedTask) => {
    try {
      await updateTaskRequest(updatedTask._id, updatedTask);
      setMessage("Task updated successfully!");
      fetchTasks(); // Actualizar la lista de tareas
      setSelectedTask(null); // Cerrar el modal
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      setMessage("Failed to update task.");
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTaskRequest(taskId);
      setMessage("Task deleted successfully!");
      fetchTasks(); // Actualizar la lista de tareas
      setSelectedTask(null); // Cerrar el modal
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      setMessage("Failed to delete task.");
    }
  };

  return (
    <div>
      <div className="bg-green-50 text-green-900 p-6 sm:mx-0 mx-[5%] rounded-lg shadow-md">
        <div className='flex flex-row items-center justify-between w-full pb-5'>
          <h1 className="text-3xl font-bold mt-4 mb-5">Welcome here are your tasks! 📝</h1>
          <div className="cursor-pointer mr-56" onClick={() => setShowCreateModal(true)}>
            <FcPlus className="text-6xl" />
          </div>
        </div>
        <p className="text-lg mb-5">
          Here you can see all your tasks and if you follow the Canfeynman 🐕 instructions you will be able to: add new tasks, edit them or delete them. 🔥
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center lg:px-14 py-12 w-full gap-20">
        <div className="lg:pl-10 lg:pt-10 lg:w-[48%] w-[70%] flex flex-col items-center justify-center relative">
          <div className="bg-green-50 px-2 pt-6 pb-6 rounded-lg shadow-md text-green-900 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Follow the instructions of Canfeynman 📚🐶</h2>
            <p className="text-lg mb-4">
              Hello human! I'm an investigator of the mysteries of the canine universe 🎓🧠. My name is Canfeynman 🐕 and I'll be here to assist you with the 'Tasks' tool. You can relax and trust me, it's quite simple:
            </p>
            <ol className="mb-4 space-y-4">
              <li className='flex items-center'>1. To add new tasks, simply click on the <FcPlus className="mx-1" /> icon (the task date is optional).</li>
              <li>2. Once you add a new task, it will automatically appear in the Tasks List 📝.</li>
              <li>3. To view details about a specific task, simply select by clicking on the task 🖱️.</li>
              <li>4. Within a task, you can edit it ✏️ or delete it 🗑️ as needed.</li>
            </ol>
            <p className="text-lg mb-4">
              Now you're ready to start organizing your tasks! 🐾 📖.
            </p>

          </div>
          <div className="mt-6 w-full flex sm:flex-row flex-col sm:items-end items-center gap-3">
            <img
              className="lg:ml-3 lg:mt-1 sm:w-[30%] w-[60%] sm:mt-[3%] mt-[15%] ml-8 rounded-full shadow-lg"
              src="https://res.cloudinary.com/dqh2illb5/image/upload/v1721619175/login/pexels-samson-katt-5257587_ljhitp.jpg"
              alt="image of a dog looking at how you are logging in"
            />
            <div className="bg-yellow-200 text-yellow-800 p-2 lg:mx-1 sm:mr-1 md:mx-2 rounded-lg sm:max-w-[60%] w-auto mt-4 sm:mt-0">
              <p className="text-lg">
                Hey, it's Canfeynman again! 🐕✨ Keeping a task list helps you stay organized and stress-free. It's like having a personal assistant to keep your day running smoothly. 📅💪
              </p>
            </div>
          </div>
        </div>

        <div className="lg:ml-10 lg:pt-10 lg:w-[30%] md:w-[50%] w-[70%] m-3 flex flex-col items-center justify-center relative">
          <div className="w-full border-2 border-solid border-fuchsia-600 bg-green-50 rounded-lg shadow-md text-green-900">
            <h2 className="pt-6 pb-6 mb-6  text-2xl font-bold text-center">Tasks List 📝</h2>
            <div className="max-h-[800px] lg:max-h-[620px] ml-5 mr-2 overflow-y-auto">
              {tasks.length > 0 ? (
                <ul>
                  {tasks.map(task => (
                    <li key={task._id} className="mb-4 p-4 border rounded-lg shadow-sm bg-white transition hover:bg-slate-100" onClick={() => handleTaskClick(task._id)}>
                      <h3 className="text-xl font-semibold">{task.title}</h3>
                      <p>{new Date(task.date).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No tasks found.</p>
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
