import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { BoardPayload, selectGrid, setSquare } from '../board/boardSlice'
import styles from './Cell.module.css'

interface CellProps {
  x: number,
  y: number
}


export function Cell(props: CellProps) {
  const dispatch = useAppDispatch()
  const board = useAppSelector(selectGrid)
  const value = useAppSelector(selectGrid)[props.x][props.y]
  const squareColor = valdiateSquare(props.x, props.y, value ?? 0) ? 'white' : 'red'


  function valdiateSquare(x: number, y: number, value: number) {
    // check row
    for (let i = 0; i < 9; i++) {
      if (i === props.y) continue
      if (board[x][i] === value) {
        return false
      }
    }
    // check column
    for (let i = 0; i < 9; i++) {
      if (i === props.x) continue
      if (board[i][y] === value) {
        return false
      }
    }
    // check box
    const boxX = Math.floor(x / 3)
    const boxY = Math.floor(y / 3)
    for (let i = boxX * 3; i < boxX * 3 + 3; i++) {
      for (let j = boxY * 3; j < boxY * 3 + 3; j++) {
        if (i === props.x && j === props.y) continue
        if (board[i][j] === value) {
          return false
        }
      }
    }
    return true
  }


  function inputChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = Number(e.currentTarget.value.slice(-1))

    console.log('e.currentTarget.value', e.currentTarget.value)
    console.log('newValue', newValue)

    const payload: BoardPayload = {
      x: props.x,
      y: props.y,
      val: newValue
    }
    dispatch(setSquare(payload))
  }

  return (
    <>
      <div className={ styles.cell } style={ { backgroundColor: squareColor } }>
        { <input className={ styles.input } type="number" value={ value } onChange={ inputChange } /> }
      </div>
    </>
  )
}