import React from 'react';
import { Board } from './features/board/Board';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectGrid, setGrid, solveGrid, toggleNoteMode, selectIsNoteMode, clearAll } from './features/board/boardSlice';
import { generateBoard } from './features/Sudoku';
import Chip, { ChipProps } from './features/chip/Chip';
import ChipGroup from './features/chip-group/ChipGroup';



function App() {
  const dispatch = useAppDispatch()
  const grid = useAppSelector(selectGrid)
  const noteMode = useAppSelector(selectIsNoteMode)

  const gameBar: Array<ChipProps> = [
    {
      content: 'Generate',
      onClick: () => { dispatch(setGrid(generateBoard())) }
    },
    {
      content: 'Solve',
      onClick: () => { dispatch(solveGrid()) }
    },
    {
      content: 'Clear',
      onClick: () => { dispatch(clearAll()) }
    },
    {
      content: "✏️",
      onClick: () => { dispatch(toggleNoteMode()) },
      active: noteMode
    }
  ]

  return (
    <div className="text-center">
      <h1 className='neon app-title'>Sudoku</h1>
      <Board />
      <ChipGroup chipConfig={ gameBar } />
      <ChipGroup>
        <Chip content={
          <code>
            <span className="text-gray-300  group-hover/log:text-black">.</span>
            <span className='text-green-400  group-hover/log:text-[#18883d]' >log</span>
            <span className='text-amber-400 group-hover/log:text-amber-700'>(</span>
            <span className='text-gray-300 group-hover/log:text-gray-700'>grid</span>
            <span className='text-amber-400 group-hover/log:text-amber-700'>)</span>
          </code>
        } onClick={ () => console.log("Grid:", grid) } />
      </ChipGroup>

    </div>
  );
}

export default App;
