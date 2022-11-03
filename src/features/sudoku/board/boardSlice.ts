import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"
import { RootState } from "../../../app/store"
import { solveBoard } from "../Sudoku"

export interface BoardState {
  grid: Array<Array<number | "">>
  status: "uninitialized" | "new" | "incomplete" | "solved"
}

export interface SquarePayload {
  x: number
  y: number
  val: number | ""
}

const initialState: BoardState = {
  grid: [
    [1, "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", 1, "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", 1]
  ],
  status: "uninitialized"
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setSquare: (state, action: PayloadAction<SquarePayload>) => {
      const { x, y, val } = action.payload
      state.grid[x][y] = val
    },
    setGrid: (state, action: PayloadAction<Array<Array<number | "">>>) => {
      state.grid = action.payload
    },
    clearGrid: (state) => {
      state.grid = new Array(9).fill([]).map(() => new Array(9).fill(""))
    },
    solveGrid: (state) => {
      const solved = solveBoard(state.grid)
      if (!solved) return
      state.grid = solved
    }
  }
})

export const { setSquare, setGrid, clearGrid, solveGrid } = boardSlice.actions

export const selectGrid = (state: RootState) => state.board.grid
export const selectSquare = (state: RootState, x: number, y: number) =>
  state.board.grid[x][y]

export default boardSlice.reducer
