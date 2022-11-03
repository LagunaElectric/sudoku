import _ from "lodash"

export function valdiateSquare(
  board: Array<Array<number | "">>,
  x: number,
  y: number,
  value: number | ""
) {
  if (String(value) === "") return true
  for (let i = 0; i < 9; i++) {
    if (i === y || value === "") continue
    if (board[x][i] === value) {
      return false
    }
  }
  // check column
  for (let i = 0; i < 9; i++) {
    if (i === x || !board[i][y]) continue
    if (board[i][y] === value) {
      return false
    }
  }
  // check box
  const boxX = Math.floor(x / 3)
  const boxY = Math.floor(y / 3)
  for (let i = boxX * 3; i < boxX * 3 + 3; i++) {
    for (let j = boxY * 3; j < boxY * 3 + 3; j++) {
      if ((i === x && j === y) || !board[i][j]) continue
      if (board[i][j] === value) {
        return false
      }
    }
  }
  return true
}

export function solveBoard(board: Array<Array<number | "">>) {
  const newBoard = [...board]
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (newBoard[i][j] !== "") continue
      for (let k = 1; k <= 9; k++) {
        if (valdiateSquare(newBoard, i, j, k)) {
          newBoard[i][j] = k
          if (solveBoard(newBoard)) {
            return newBoard
          } else {
            newBoard[i][j] = ""
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
  let board: Array<Array<number | "">> = new Array(9).fill([])
  board = board.map(() => new Array(9).fill(""))

  const n = 20
  for (let i = 0; i < n; i++) {
    const x = Math.floor(Math.random() * 9)
    const y = Math.floor(Math.random() * 9)
    const value = Math.floor(Math.random() * 9) + 1
    if (valdiateSquare(board, x, y, value)) {
      board[x][y] = value
    }
  }
  const solvedBoard = solveBoard(board)
  if (!solvedBoard) {
    throw new Error("Could not generate board")
  }
  const newBoard = removeSquares(solvedBoard, 10)
  console.log(_.cloneDeep(newBoard))
  return newBoard
}

// remove n squares and verify that there is only one solution using a backtracking algorithm
export function removeSquares(board: Array<Array<number | "">>, n: number) {
  console.groupCollapsed("removeSquares")
  const newBoard = [...board]
  console.log("newBoard", _.cloneDeep(newBoard))
  for (let i = 0; i < n; i++) {
    console.log("------------------------------------")
    const x = Math.floor(Math.random() * 9)
    const y = Math.floor(Math.random() * 9)
    console.log(`removing square ${x}, ${y}`)
    if (newBoard[x][y] === undefined) {
      console.log("square already empty")
      i--
      continue
    }
    console.log("emptying square")
    newBoard[x][y] = ""
    console.log("newBoard", _.cloneDeep(newBoard))
    if (solveBoard(_.cloneDeep(newBoard)) === false) {
      console.log("board is not solvable")
      newBoard[x][y] = board[x][y]
      i--
    }
  }
  console.log(_.cloneDeep(newBoard))
  console.groupEnd()
  return newBoard
}
