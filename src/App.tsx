import React from 'react';
import { Board } from './features/board/Board';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectGrid, setGrid, solveGrid, clearGrid } from './features/board/boardSlice';
import { generateBoard } from './features/Sudoku';
import Chip from './features/chip/Chip';



function App() {
  const dispatch = useAppDispatch()
  const grid = useAppSelector(selectGrid)
  return (
    <div className="App">
      <h1>Sudoku</h1>
      <Board />
      <Chip content="Generate Board" onClick={ () => dispatch(setGrid(generateBoard())) } />
      <Chip content="Solve" onClick={ () => dispatch(solveGrid()) } />
      <Chip content="Clear" onClick={ () => dispatch(clearGrid()) } />
      <Chip content={
        <code>
          <span style={ { color: 'gray' } }>.</span>
          <span style={ { color: 'lightgreen' } } >log</span>
          <span style={ { color: 'gold' } }>(</span>
          <span style={ { color: 'lightgray' } }>grid</span>
          <span style={ { color: 'gold' } }>)</span>
        </code>
      } onClick={ () => console.log("Grid:", grid) } />
      <Chip content="✏️" onClick={ () => console.log('clicked it!') } />
    </div>
  );
}

export default App;
