import styles from './ListItem.module.css';

const ListItem = (props) => {
	const finishedTaskClasses =
		props.status === 'Finished' ? styles['finished-task'] : '';
	return (
		<div
			className={`${styles.task} ${
				props.status === 'Finished' ? styles.tasked : ''
			}`}
		>
			<h3 className={finishedTaskClasses}>{props.summary}</h3>
			<p className={finishedTaskClasses}>{props.descr}</p>
			<h4 className={finishedTaskClasses}>{props.status}</h4>
			<div className={styles['action-buttons']}>
				<button onClick={props.onStatusChange}>Change status</button>
				<button onClick={props.onRemove}>Delete from the list</button>
			</div>
		</div>
	);
};

export default ListItem;
