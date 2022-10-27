import { Cell } from '../cell/Cell'
import styles from './Board.module.css'

export function Board() {
  const board = []

  for (let i = 0; i < 9; i++) {
    let row = []
    for (let j = 0; j < 9; j++) {
      row.push(<Cell key={ `${i}${j}` } x={ i } y={ j } />)
    }
    board.push(row)
  }
  return (
    <>
      <div className={ styles.board }>{ board }</div>
    </>
  )
}