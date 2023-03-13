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
	const [isChangeStatusButtonClicked, setIsChangeStatusButtonClicked] =
		useState(false);

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

	const changeTaskStatus = (id) => {
		const mappedTasks = tasks.map((task) => {
			const isIdCorrect = task.id === id;
			if (isIdCorrect && task.status === 'To do') {
				return { ...task, status: 'In progress' };
			} else if (isIdCorrect && task.status === 'In progress') {
				return { ...task, status: 'Finished' };
			} else if (isIdCorrect && task.status === 'Finished') {
				return { ...task, status: 'To do' };
			} else {
				return task;
			}
		});
		setTasks(mappedTasks);
		localStorage.setItem('tasks', JSON.stringify(mappedTasks));
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				addTask,
				removeTask,
				changeTaskStatus,
				isChangeStatusButtonClicked,
			}}
		>
			{props.children}
		</TaskContext.Provider>
	);
};

export default TaskProvider;
