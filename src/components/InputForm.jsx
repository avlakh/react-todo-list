import { useState } from 'react';
import useInput from '../hooks/use-input';
import styles from './InputForm.module.css';
import { useTasks } from '../store/task-context';
import Container from './UI/Container';

const InputForm = () => {
	const [status, setStatus] = useState('To do');
	const { addTask } = useTasks();
	const valueValidity = (value) => {
		return value.trim() !== '';
	};

	// custom hook calls
	const {
		value: summary,
		isValid: summaryIsValid,
		hasError: summaryHasError,
		reset: resetSummary,
		valueChangeHandler: summaryChangeHandler,
		blurChangeHandler: summaryBlurHandler,
	} = useInput(valueValidity);

	const {
		value: description,
		isValid: descriptionIsValid,
		hasError: descriptionHasError,
		reset: resetDescription,
		valueChangeHandler: descriptionChangeHandler,
		blurChangeHandler: descriptionBlurHandler,
	} = useInput(valueValidity);

	const statusChangeHandler = (event) => {
		setStatus(event.target.value);
	};

	// form validity for button style
	let formIsValid = false;
	if (summaryIsValid && descriptionIsValid) {
		formIsValid = true;
	}

	// event upon submitting the form
	const formSubmitHandler = (event) => {
		event.preventDefault();
		addTask({ summary: summary, descr: description, status: status });
		resetSummary();
		resetDescription();
	};

	return (
		<Container>
			<form>
				<div className={styles['input-wrapper']}>
					<div className={styles['input-field']}>
						<label htmlFor="summary">Summary</label>
						<input
							type="text"
							id="summary"
							value={summary}
							onChange={summaryChangeHandler}
							onBlur={summaryBlurHandler}
							placeholder={
								summaryHasError
									? 'Please enter your summary'
									: ''
							}
						/>
					</div>
					<div className={styles['input-field']}>
						<label htmlFor="description">Description</label>
						<input
							type="text"
							id="description"
							value={description}
							onChange={descriptionChangeHandler}
							onBlur={descriptionBlurHandler}
							placeholder={
								descriptionHasError
									? 'Please enter your description'
									: ''
							}
						/>
					</div>
					<div className={styles['input-field']}>
						<label htmlFor="status">Status</label>
						<select
							id="status"
							value={status}
							onChange={statusChangeHandler}
						>
							<option>To do</option>
							<option>In progress</option>
							<option>Finished</option>
						</select>
					</div>
					<button
						type="submit"
						onClick={formSubmitHandler}
						disabled={!formIsValid}
					>
						Submit task
					</button>
				</div>
			</form>
		</Container>
	);
};

export default InputForm;
