import './App.css';
import Board from './components/Board/Board';
import Header from './components/Header/Header';
import Legend from './components/Legend/Legend';
import BoardProvider from './utils/VisualizeContext';

function App() {
  return (
    <div>
      <BoardProvider>
        <Header />
        <main>
          <Legend />
          <Board />
      </main>
      </BoardProvider>
    </div>
    
  );
}

export default App;
