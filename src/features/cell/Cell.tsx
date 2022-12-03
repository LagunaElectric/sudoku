import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { SetSquarePayload, selectGrid, setSquare, setSelectedCell, selectSelectedCell, addNote, removeNote, selectNotes } from '../board/boardSlice'
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
  const notes = useAppSelector(selectNotes)[props.x][props.y]
  const cellInput = React.useRef<HTMLInputElement>(null)

  let inSelectedGroup = false
  let sameRow = false
  let sameColumn = false
  let sameBox = false
  let sameCell = false
  const selectedCell = useAppSelector(selectSelectedCell)
  if (selectedCell) {
    const [x, y] = selectedCell
    sameRow = x === props.x
    sameColumn = y === props.y
    sameBox = Math.floor(x / 3) === Math.floor(props.x / 3) && Math.floor(y / 3) === Math.floor(props.y / 3)
    sameCell = sameRow && sameColumn
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

    if (!cellInput.current) return

    // if (selectedCell && selectedCell[0] !== props.x && selectedCell[1] !== props.y) {
      cellInput.current.focus()
    // } else {
    //   cellInput.current?.blur()
    // }
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

    if (props.noteMode && Number.isInteger(Number(newValue))) {
      console.log(notes)
      notes.includes(Number(newValue)) ? dispatch(removeNote(Number(newValue))) : dispatch(addNote(Number(newValue)))
      return
    }

    const payload: SetSquarePayload = {
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