import { useAppSelector } from '../../app/hooks'
import Cell from '../cell/Cell'
import styles from './Board.module.css'
import { selectGrid, selectIsNoteMode } from './boardSlice'

export function Board() {
  const board = []
  const grid = useAppSelector(selectGrid)
  const noteMode = useAppSelector(selectIsNoteMode)



  for (let i = 0; i < 9; i++) {
    let row = []
    for (let j = 0; j < 9; j++) {
      row.push(<Cell key={ `cell-${i}-${j}` } x={ i } y={ j } value={ grid[i][j] } noteMode={ noteMode } />)
    }
    board.push(row)
  }
  return (
    <>
      <div className={ styles.board }>{ board }</div>
    </>
  )
}