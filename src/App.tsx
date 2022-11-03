import React from 'react';
import { Board } from './features/sudoku/board/Board';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectGrid, setGrid } from './features/sudoku/board/boardSlice';
import { generateBoard } from './features/sudoku/Sudoku';
import { Chip } from './features/sudoku/chip/Chip';



function App() {
  const dispatch = useAppDispatch()
  const grid = useAppSelector(selectGrid)
  return (
    <div className="App">
      <h1>Sudoku</h1>
      <Board />
      <Chip content="Generate Board" onClick={ () => dispatch(setGrid(generateBoard())) } />
      <button style={ { marginTop: '25px' } } onClick={ () => console.log(grid) }>Log Grid</button>
      <Chip content="✏️" onClick={ () => console.log('clicked it!') } />
    </div>
  );
}

export default App;
