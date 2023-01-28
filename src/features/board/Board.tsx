import { useAppSelector } from '../../app/hooks'
import Cell from '../cell/Cell'
import SubGrid from '../sub-grid/SubGrid'
import styles from './Board.module.css'
import { selectGrid, selectIsNoteMode } from './boardSlice'

export function Board() {
  const board = []
  const grid = useAppSelector(selectGrid)
  const noteMode = useAppSelector(selectIsNoteMode)

  const subGridsDumb = [
    [[[/* 9cells*/]], [], []],
    [[], [], []],
    [[], [], []],
  ];



  // for (let i = 0; i < 9; i++) {
  //   let row = []
  //   for (let j = 0; j < 9; j++) {
  //     row.push(<Cell key={ `cell-${i}-${j}` } x={ i } y={ j } value={ grid[i][j] } noteMode={ noteMode } />);
  //     // row.push(<SubGrid />);
  //   }
  //   board.push(row)
  // }


  console.log("Subgrid loop called", board.length);

  for (let i = 0; i < 3; i++) {
    let row = []
    for (let j = 0; j < 3; j++) {
      console.log("Subgrid loop", i, j);
      // row.push(<Cell key={ `cell-${i}-${j}` } x={ i } y={ j } value={ grid[i][j] } noteMode={ noteMode } />);
      row.push(<SubGrid key={ `sub-grid-${i}-${j}` } x={ i } y={ j } />);
    }
    board.push(row)
  }
  return (
    <>
      <div className={ styles.board }>{ board }</div>
    </>
  )
}