import React from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
  
  const [TASKS, setTasks] = useState([]);

  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';
/*
    class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    completed_at = db.Column(db.DateTime)
    goal_id = db.Column(db.Integer, db.ForeignKey('goal.goal_id'))
*/
    
// Object.keys(data).map(item => {...});
// Object.keys(data).forEach(item => {...});

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

          // key={task.id}
          // id={task.id}
          // title={task.title}
          // isComplete={task.isComplete}
          // // should this be task.toggle or tasks.toggle?
          // onClickCallback={props.onTaskClickCallback}
          // onDeleteCallback={props.onTaskDeleteCallback}

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
