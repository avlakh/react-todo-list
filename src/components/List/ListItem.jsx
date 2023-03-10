import styles from './ListItem.module.css';

const ListItem = (props) => {
	return (
		<div className={styles.task}>
			<h3>{props.summary}</h3>
			<p>{props.descr}</p>
			<h4>{props.status}</h4>
			<div>
				<button onClick={props.onRemove}>Delete from the list</button>
			</div>
		</div>
	);
};

export default ListItem;
