import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id   
    }).populate("user");
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas:", error); // Depuración del error
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");

    if (!task) {
      console.log("Tarea no encontrada:", req.params.id); // Depuración del error
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error al obtener la tarea:", error); // Depuración del error
    res.status(500).json({ message: "Error al obtener la tarea" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    console.log("Datos recibidos:", req.body); // Depuración de los datos recibidos
    console.log(req.user);

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error("Error al crear la tarea:", error); // Depuración del error
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      console.log("Tarea no encontrada para eliminar:", req.params.id); // Depuración del error
      return res.status(404).json({ message: "Task not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar la tarea:", error); // Depuración del error
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!task) {
      console.log("Tarea no encontrada para actualizar:", req.params.id); // Depuración del error
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error al actualizar la tarea:", error); // Depuración del error
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};
