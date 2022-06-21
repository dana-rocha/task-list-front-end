import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, toggleCompleteCallback, deleteTaskCallback }) => {
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const toggleTask = () => {
    // toggleCompleteCallback={task.toggleCompleteCallback}
    toggleCompleteCallback(id);
  };

  const deleteTask = () => {
    deleteTaskCallback(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`} onClick={toggleTask}>
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={deleteTask}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  toggleCompleteCallback: PropTypes.func.isRequired,
  deleteTaskCallback: PropTypes.func.isRequired
};

export default Task;
