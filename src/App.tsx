import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Board } from './features/sudoku/board/Board';
import './App.css';
import { useAppSelector } from './app/hooks';
import { selectGrid } from './features/sudoku/board/boardSlice';



function App() {
  const grid = useAppSelector(selectGrid)
  return (
    <div className="App">
      <h1>Sudoku</h1>
      <Board />
      <button style={ { marginTop: '25px' } } onClick={ () => console.log(grid) }>Log Grid</button>
      <header className="App-header" style={ { display: 'none' } }>
        <img src={ logo } className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
