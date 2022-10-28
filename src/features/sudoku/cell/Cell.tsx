import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { BoardPayload, selectGrid, setSquare } from '../board/boardSlice'
import { valdiateSquare } from '../Sudoku'
import styles from './Cell.module.css'

interface CellProps {
  x: number,
  y: number
}


export function Cell(props: CellProps) {
  const dispatch = useAppDispatch()
  const board = useAppSelector(selectGrid)
  const value = useAppSelector(selectGrid)[props.x][props.y]
  const squareColor = valdiateSquare(board, props.x, props.y, value ?? 0) ? 'white' : 'red'



  function inputChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = Number(e.currentTarget.value.slice(-1))

    // Blank out the input if the value is not 1-9
    if (newValue === 0) e.currentTarget.value = ''

    // Remove 0s in case they type them in front of the number
    // Without this they will stay there.
    e.currentTarget.value = e.currentTarget.value.toString().replaceAll('0', '')

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
        <input className={ styles.input } type="number" value={ value } onChange={ inputChange } />
      </div>
    </>
  )
}