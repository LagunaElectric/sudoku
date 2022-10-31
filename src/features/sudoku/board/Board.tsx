import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Cell } from '../cell/Cell'
import { generateBoard } from '../Sudoku'
import styles from './Board.module.css'
import { selectGrid, setGrid } from './boardSlice'

export function Board() {
  const board = []
  const grid = useAppSelector(selectGrid)
  const dispatch = useAppDispatch()



  for (let i = 0; i < 9; i++) {
    let row = []
    for (let j = 0; j < 9; j++) {
      row.push(<Cell key={ `${i}${j}` } x={ i } y={ j } value={ grid[i][j] } />)
    }
    board.push(row)
  }
  return (
    <>
      <div className={ styles.board }>{ board }</div>
      <button onClick={ () => dispatch(setGrid(generateBoard())) }>Generate Board</button>
    </>
  )
}