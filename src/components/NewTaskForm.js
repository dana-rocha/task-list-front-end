import { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';


const defaultTask = {
    title: '',
    description: '',
    isComplete: false
};

const NewTaskForm = (props) => {
    // State for new task form
    const [formData, setFormData] = useState(defaultTask);
    
    // Function to change state when form input changed
    const onFormChange = (event) => {
        const stateName = event.target.name;
        const inputValue = event.target.value;

        const newFormData = {...formData};
        newFormData[stateName] = inputValue;
        setFormData(newFormData);
    };
    
    // Function to add post
    const handleSubmit = (event) => {
        event.preventDefault();
        props.addTaskCallback(formData);
    };
    
    // Return form fields + event handlers
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title"value={formData.title} onChange={onFormChange}></input>
            <label htmlFor="description">Description: </label>
            <input type="text" name="description" value={formData.description} onChange={onFormChange}></input>
            <input type="submit" value="Add Task"></input>
        </form>
        
    );
};

NewTaskForm.propTypes = {
    addTaskCallback: PropTypes.func.isRequired
};

export default NewTaskForm;