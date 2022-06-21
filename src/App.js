import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

const App = () => {
  const [TASKS, setTasks] = useState([
    {
      id: 1,
      title: 'Mow the lawn',
      isComplete: false,
    },
    {
      id: 2,
      title: 'Cook Pasta',
      isComplete: true,
    },
  ]);

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
        <div>{<TaskList tasks={TASKS} toggleCompleteCallback={toggleComplete} deleteTaskCallback={deleteTask}/>}</div>
      </main>
    </div>
  );
};

export default App;
