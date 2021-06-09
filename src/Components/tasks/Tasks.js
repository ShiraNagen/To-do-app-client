import React, { useState, useEffect } from 'react'
import TaskCard from './TaskCard'
import Button from "@material-ui/core/Button";
import CreateTaskDialog from './CreateTaskDialog'
import axios from 'axios'
import AttachDialog from './AttachDialog';
import EditTaskDialog from './EditTaskDialog';

function Tasks() {

  const [isOpenCreateTaskDialog, setIsOpenCreateTaskDialog] = useState(false)
  const [IsOpenAttachDialog, setIsOpenAttachDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [taskIdToAttach, setTaskIdToAttach] = useState();
  const [taskToEdit, setTaskToEdit] = useState();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
  }, []);

  const getTasks = async () => {
    try {
      const tasks = await axios.get('http://localhost:3001/tasks')
      setTasks(tasks.data)
    }
    catch (error) {
      console.log(error);
    }
  }

  const createTask = async (description, deadline) => {
    try {
      await axios.post(`http://localhost:3001/tasks`,
        `description=${description}&deadline=${deadline}`)
      getTasks()
    }
    catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (taskId, description, deadline) => {
    try {
      await axios.put(`http://localhost:3001/tasks/${taskId}`,
        `description=${description}&deadline=${deadline}`)
      getTasks()
    }
    catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${taskId}`);
      getTasks();
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div style={{ margin: '80px 25%' }}>

      <AttachDialog
        taskId={taskIdToAttach}
        usersAttached={taskIdToAttach ? tasks.find(task => task.id === taskIdToAttach).users : []}
        handleClose={() => { 
          setTaskIdToAttach(); 
          getTasks(); 
          setIsOpenAttachDialog(false); }}
        isOpen={IsOpenAttachDialog}
      />

      <EditTaskDialog
        task={taskToEdit}
        handleClose={() => {
          setIsOpenEditDialog(false); 
          setTaskToEdit();}}
        updateTask={updateTask}
        isOpen={isOpenEditDialog}
      />

      <CreateTaskDialog
        handleClose={() => 
          setIsOpenCreateTaskDialog(false)}
        createTask={createTask}
        isOpen={isOpenCreateTaskDialog}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpenCreateTaskDialog(true)}
      >
        ADD TASK
      </Button>

      {tasks.map((task, id) =>
        <TaskCard
          key={id}
          task={task}
          deleteTask={deleteTask}
          setTaskToEdit={task => { 
            setTaskToEdit(task); 
            setIsOpenEditDialog(true) }}
          setTaskIdToAttach={(taskId) => { 
            setTaskIdToAttach(taskId); 
            setIsOpenAttachDialog(true) }} />)}
    </div>
  );
}

export default Tasks;