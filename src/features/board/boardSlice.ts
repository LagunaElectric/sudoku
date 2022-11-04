import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import _ from "lodash"
import { RootState } from "../../app/store"
import { solveBoard } from "../Sudoku"

export interface BoardState {
  grid: Array<Array<number | "">>
  status: "uninitialized" | "new" | "incomplete" | "solved"
  isNoteMode: boolean
  selectedCell: [number, number] | null
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
  status: "uninitialized",
  isNoteMode: false,
  selectedCell: null
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
      state.status = "uninitialized"
    },
    solveGrid: (state) => {
      const solved = solveBoard(state.grid)
      if (!solved) return
      state.grid = solved
      state.status = "solved"
    },
    toggleNoteMode: (state) => {
      state.isNoteMode = !state.isNoteMode
    },
    setSelectedCell: (state, action: PayloadAction<[number, number]>) => {
      state.selectedCell = action.payload
    }
  }
})

export const {
  setSquare,
  setGrid,
  clearGrid,
  solveGrid,
  toggleNoteMode,
  setSelectedCell
} = boardSlice.actions

export const selectGrid = (state: RootState) => state.board.grid
export const selectSquare = (state: RootState, x: number, y: number) =>
  state.board.grid[x][y]
export const selectStatus = (state: RootState) => state.board.status
export const selectIsNoteMode = (state: RootState) => state.board.isNoteMode
export const selectSelectedCell = (state: RootState) => state.board.selectedCell

export default boardSlice.reducer
