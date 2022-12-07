import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { SquarePayload, selectGrid, setSquare, setSelectedCell, selectSelectedCell, addNote, removeNote, selectNotes, clearNotes } from '../board/boardSlice'
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
  const allNotes = useAppSelector(selectNotes)
  const cellNotes = useAppSelector(selectNotes)[props.x][props.y]
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

  const inputStyle = {
    caretColor: 'transparent',
  }

  function cellClicked(e: React.MouseEvent) {
    dispatch(setSelectedCell([props.x, props.y]))

    if (!cellInput.current) return

    if (!sameCell) {
      cellInput.current.focus()
    } else {
      cellInput.current?.blur()
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

    if (props.noteMode && Number.isInteger(Number([payload.val])) && Number(payload.val)) {
      console.log(cellNotes)
      cellNotes.includes(payload.val as number) ? dispatch(removeNote(payload)) : dispatch(addNote(payload))

      return
    }

    dispatch(setSquare(payload))
    dispatch(clearNotes(payload))


    // This next section is to remove notes from cells
    // in the same row, column, and box as the cell.
    // It should probably be moved to the reducer.

    let cleanupPayload: SquarePayload = {
      x: -1,
      y: -1,
      val: newValue
    }

    for (let i = 0; i < 9; i++) {
      if (allNotes[props.x][i].includes(Number(newValue))) {
        cleanupPayload.x = props.x
        cleanupPayload.y = i
        dispatch(removeNote(cleanupPayload))
      }

      if (allNotes[i][props.y].includes(Number(newValue))) {
        cleanupPayload.x = i
        cleanupPayload.y = props.y
        dispatch(removeNote(cleanupPayload))
      }
    }

    const boxX = Math.floor(props.x / 3)
    const boxY = Math.floor(props.y / 3)

    for (let i = boxX * 3; i < boxX * 3 + 3; i++) {
      for (let j = boxY * 3; j < boxY * 3 + 3; j++) {
        if (allNotes[i][j].includes(Number(newValue))) {
          cleanupPayload.x = i
          cleanupPayload.y = j
          dispatch(removeNote(cleanupPayload))
        }
      }
    }
  }

  return (
    <>
      <div className={ styles.cell } onClick={ cellClicked } { ...(inSelectedGroup ? { style: { backgroundColor: "#00000053" } } : {}) }>
        <div style={ statusWrapperStyle }>
          <div className={ styles.noteWrapper }>
            { !props.value && cellNotes.map((note) => <div key={ note } className={ styles.note }>{ note }</div>) }
          </div>
          <input
            ref={ cellInput }
            className={ styles.input }
            type="number"
            value={ props.value }
            onChange={ inputChange }
            onKeyDown={ (evt) => forbiddenKeys.includes(evt.key) && evt.preventDefault() }
            { ...(props.noteMode ? { style: inputStyle } : {}) }
          />
        </div>
      </div>
    </>
  )
}