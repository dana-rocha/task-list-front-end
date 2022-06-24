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
          // left = state, right = response data (use same attrib name)
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
    // const [complete, setComplete] = useState(isComplete);
    // const buttonClass = complete ? 'tasks__item__toggle--completed' : '';
    const newTasks = [];
    
    for (const task of TASKS) {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      newTasks.push(task);
    }
    setTasks(newTasks);
    console.log('toggleComplete was called');
  };

  const deleteTask = (id) => {
    const newTasks = [];

    for (const task of TASKS) {
      if (task.id !== id) {
        newTasks.push(task);
      }
    setTasks(newTasks);
    console.log('deleteTask was called');
    }
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
