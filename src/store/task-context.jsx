import { createContext, useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

const initialState = () => {
	const tasks = localStorage.getItem('tasks');
	return tasks ? JSON.parse(tasks) : [];
};

// creating the context and exporting the hook to use it
const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

const TaskProvider = (props) => {
	const [tasks, setTasks] = useState(initialState);

	useEffect(() => {
		localStorage.getItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const addTask = (enteredTask) => {
		const newTask = { id: v4(), ...enteredTask };
		setTasks([...tasks, newTask]);
		localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
	};

	const removeTask = (id) => {
		const newTaskList = tasks.filter((el) => el.id !== id);
		setTasks(newTaskList);
		localStorage.setItem('tasks', JSON.stringify(newTaskList));
	};

	return (
		<TaskContext.Provider value={{ tasks, addTask, removeTask }}>
			{props.children}
		</TaskContext.Provider>
	);
};

export default TaskProvider;
