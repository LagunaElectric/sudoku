import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { SquarePayload, selectGrid, setSquare } from '../board/boardSlice'
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
  const squareColor = valdiateSquare(board, props.x, props.y, props.value ?? 0) ? 'transparent' : '#ff000055'

  const statusWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45px',
    height: '45px',
    borderRadius: '50px',
    backgroundColor: squareColor
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
      <div className={ styles.cell } onClick={ () => cellInput.current?.focus() }>
        <div style={ statusWrapperStyle }>
          <input
            ref={ cellInput }
            className={ styles.input }
            type="number"
            value={ props.value }
            onChange={ inputChange }
            onKeyDown={ (evt) => forbiddenKeys.includes(evt.key) && evt.preventDefault() } />
        </div>
      </div>
    </>
  )
}