import React, { useState, useEffect } from 'react';
import './ToDoList.css';
const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [filterOption, setFilterOption] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    if (input.trim()) {
      const newTask = { id: Date.now(), text: input, completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setInput('');
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    if (filterOption === 'completed') {
      filteredTasks = tasks.filter(task => task.completed);
    } else if (filterOption === 'incomplete') {
      filteredTasks = tasks.filter(task => !task.completed);
    }

    if (sortOption === 'alphabetical') {
      filteredTasks = filteredTasks.sort((a, b) => a.text.localeCompare(b.text));
    } else if (sortOption === 'date') {
      filteredTasks = filteredTasks.sort((a, b) => a.id - b.id);
    }

    return filteredTasks;
  };

  return (
    <div className='container'>
      <h1 className='heading'>To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button className='btn' onClick={addTask}>Add Task</button>
      <div className='filters'>
        <div className='filter1'>
          <label>Sort by: </label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="date">Date</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
        <div className='filter2'>
          <label>Filter: </label>
          <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      <ul>
        {getFilteredTasks().map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button className='btn1'  onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ToDoList;