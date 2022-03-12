import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import Legend from './components/Legend/Legend';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Legend />
        <Board />
      </main>
    </div>
    
  );
}

export default App;
