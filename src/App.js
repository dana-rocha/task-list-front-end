import React from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
  
  const [TASKS, setTasks] = useState([]);

  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';

/*
useEffect hook makes an API call to get the list of tasks 
from the database when the React app is loaded
*/
  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        console.log('get request');
        console.log(response);
        const newTasks = response.data.map((task) => {
          // left = state, right = response data (use same attribute name)
          return {
            id: task.id,
            title: task.title,
            description: task.description,
            isComplete: task.is_complete
          };
        });
        setTasks(newTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const toggleComplete = (id) => {

    // determines URL based on if task is complete
    let checkTaskComplete = false;
    let toggleCompleteURL = 'mark_complete';

    for (const task of TASKS) {
      const newTask = {...task};
      if (newTask.id === id) {
        checkTaskComplete = newTask.isComplete;
      }
    }
      if (checkTaskComplete === true) {
        toggleCompleteURL = 'mark_incomplete';
      }
    
    // PATCH request to toggle task complete
    axios
      .patch(`${URL}/${id}/${toggleCompleteURL}`)
      .then(() => {
        const newTasks = [];
        for (const task of TASKS) {
          const newTask = {...task};
          if (newTask.id === id) {
            newTask.isComplete = !newTask.isComplete;
          }
          newTasks.push(newTask);
        }
        setTasks(newTasks);
        console.log('toggleComplete was called');
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  // Delete request to delete task
  const deleteTask = (id) => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
      const newTasks = [];

      for (const task of TASKS) {
        if (task.id !== id) {
          newTasks.push(task);
        }
      }
      setTasks(newTasks);
      console.log('deleteTask was called');
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={TASKS} onTaskClickCallback={toggleComplete} onTaskDeleteCallback={deleteTask}/>}</div>
      </main>
    </div>
  );
};

export default App;
