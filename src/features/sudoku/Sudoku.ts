import _ from "lodash"

export function valdiateSquare(
  board: Array<Array<number | undefined>>,
  x: number,
  y: number,
  value: number
) {
  // check row
  for (let i = 0; i < 9; i++) {
    if (i === y) continue
    if (board[x][i] === value) {
      return false
    }
  }
  // check column
  for (let i = 0; i < 9; i++) {
    if (i === x) continue
    if (board[i][y] === value) {
      return false
    }
  }
  // check box
  const boxX = Math.floor(x / 3)
  const boxY = Math.floor(y / 3)
  for (let i = boxX * 3; i < boxX * 3 + 3; i++) {
    for (let j = boxY * 3; j < boxY * 3 + 3; j++) {
      if (i === x && j === y) continue
      if (board[i][j] === value) {
        return false
      }
    }
  }
  return true
}

export function solveBoard(board: Array<Array<number | undefined>>) {
  const newBoard = [...board]
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (newBoard[i][j] !== undefined) continue
      for (let k = 1; k <= 9; k++) {
        if (valdiateSquare(newBoard, i, j, k)) {
          newBoard[i][j] = k
          if (solveBoard(newBoard)) {
            return newBoard
          } else {
            newBoard[i][j] = undefined
          }
        }
      }
      return false
    }
  }
  return newBoard
}

// generate a random solution
export function generateBoard() {
  let board: Array<Array<number | undefined>> = new Array(9).fill([])
  board = board.map(() => new Array(9).fill(undefined))

  const n = 20
  for (let i = 0; i < n; i++) {
    const x = Math.floor(Math.random() * 9)
    const y = Math.floor(Math.random() * 9)
    const value = Math.floor(Math.random() * 9) + 1
    if (valdiateSquare(board, x, y, value)) {
      board[x][y] = value
    }
  }
  const newBoard = solveBoard(board)
  if (!newBoard) {
    throw new Error("Could not generate board")
  }
  return board
}
