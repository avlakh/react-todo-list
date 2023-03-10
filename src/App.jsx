import InputForm from './components/InputForm';
import List from './components/List/List';
import TaskProvider, { useTasks } from './store/task-context';
import './App.css';

const App = () => {
	return (
		<main>
			<TaskProvider>
				<InputForm />
				<List />
			</TaskProvider>
		</main>
	);
};

export default App;
