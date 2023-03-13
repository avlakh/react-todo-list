import styles from './List.module.css';
import { useTasks } from '../../store/task-context';
import ListItem from './ListItem';
import Container from '../UI/Container';

const List = () => {
	const { tasks, removeTask, changeTaskStatus, isChangeStatusButtonClicked } =
		useTasks();

	const taskListWithItems = (
		<>
			<header className={styles['task-header']}>
				<h3>Summary</h3>
				<h3>Description</h3>
				<h3>Status</h3>
				<h3>Action button</h3>
			</header>
			{tasks.map((task) => (
				<ListItem
					key={task.id}
					summary={task.summary}
					descr={task.descr}
					status={task.status}
					onRemove={() => removeTask(task.id)}
					onStatusChange={() => changeTaskStatus(task.id)}
				/>
			))}
		</>
	);

	const emptyTaskList = <h1>Enter some tasks</h1>;

	return (
		<Container>
			{tasks.length !== 0 ? taskListWithItems : emptyTaskList}
		</Container>
	);
};

export default List;
