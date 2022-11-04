import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { SquarePayload, selectGrid, setSquare, setSelectedCell, selectSelectedCell } from '../board/boardSlice'
import { valdiateSquare } from '../Sudoku'
import styles from './Cell.module.css'

interface CellProps {
  x: number,
  y: number,
  value: number | '',
  noteMode: boolean
}

const forbiddenKeys = ['e', 'E', '-', '+', '.']


export default function Cell(props: CellProps) {
  const dispatch = useAppDispatch()
  const board = useAppSelector(selectGrid)
  const cellInput = React.useRef<HTMLInputElement>(null)

  // determine if cell is in same row, column, or box as selected cell
  let inSelectedGroup = false
  let sameRow = false
  let sameColumn = false
  let sameBox = false
  let sameCell = false
  const selectedCell = useAppSelector(selectSelectedCell)
  if (selectedCell) {
    sameRow = selectedCell[0] === props.x
    sameColumn = selectedCell[1] === props.y
    sameBox = Math.floor(selectedCell[0] / 3) === Math.floor(props.x / 3) && Math.floor(selectedCell[1] / 3) === Math.floor(props.y / 3)
    sameCell = selectedCell[0] === props.x && selectedCell[1] === props.y
    inSelectedGroup = sameRow || sameColumn || sameBox || sameCell
  }

  const statusColor = !valdiateSquare(board, props.x, props.y, props.value ?? 0) ? '#ff000055' : sameCell ? '#00ffff55' : 'transparent'

  const statusWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45px',
    height: '45px',
    borderRadius: '50px',
    backgroundColor: statusColor
  }

  function cellClicked(e: React.MouseEvent) {
    dispatch(setSelectedCell([props.x, props.y]))
    if (cellInput.current) {
      cellInput.current.focus()
    }
  }

  function inputChange(e: ChangeEvent<HTMLInputElement>) {
    // first validate, then set state
    const input = e.currentTarget.value.split('')
    let newValue: number | '' = ''

    input.forEach((char) => {
      const num = Number(char)
      const isNaN = Number.isNaN(num)
      const isNew = num !== board[props.x][props.y]
      newValue = !isNaN && isNew && num ? num : newValue
    })

    const payload: SquarePayload = {
      x: props.x,
      y: props.y,
      val: newValue
    }

    dispatch(setSquare(payload))
  }

  return (
    <>
      <div className={ styles.cell } onClick={ cellClicked } { ...(inSelectedGroup ? { style: { backgroundColor: "#00000053" } } : {}) }>
        <div style={ statusWrapperStyle }>
          <input
            ref={ cellInput }
            className={ styles.input }
            type="number"
            value={ props.value }
            onChange={ inputChange }
            onKeyDown={ (evt) => forbiddenKeys.includes(evt.key) && evt.preventDefault() }
            { ...{} }
          />
        </div>
      </div>
    </>
  )
}