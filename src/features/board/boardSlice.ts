import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { RootState } from "../../app/store"
import { solveBoard } from "../Sudoku"
import { sliceGrid } from "../../utils/grid"

export interface BoardState {
  grid: Array<Array<number | "">>
  notes: Array<Array<Array<number>>>
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
    ["", 2, "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", 1, "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", 1]
  ],
  notes: [
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []]
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
    clearGrid: state => {
      state.grid = new Array(9).fill([]).map(() => new Array(9).fill(""))
      state.status = "uninitialized"
    },
    solveGrid: state => {
      const solved = solveBoard(state.grid)
      if (!solved) return
      state.grid = solved
      state.status = "solved"
    },
    setSelectedCell: (state, action: PayloadAction<[number, number]>) => {
      const isSameCell = _.isEqual(state.selectedCell, action.payload)
      state.selectedCell = isSameCell ? [-1, -1] : action.payload
    },
    toggleNoteMode: state => {
      state.isNoteMode = !state.isNoteMode
    },
    addNote: (state, action: PayloadAction<SquarePayload>) => {
      if (!state.selectedCell) return
      const [x, y] = state.selectedCell
      state.notes[x][y].push(action.payload.val as number)
    },
    removeNote: (state, action: PayloadAction<SquarePayload>) => {
      const { x, y, val } = action.payload
      state.notes[x][y] = state.notes[x][y].filter(n => n !== (val as number))
    },
    clearNotes: (state, action: PayloadAction<SquarePayload>) => {
      const { x, y } = action.payload
      state.notes[x][y] = []
    },
    clearAllNotes: state => {
      state.notes = new Array(9).fill([]).map(() => new Array(9).fill([]))
    },
    clearAll: state => {
      state.grid = new Array(9).fill([]).map(() => new Array(9).fill(""))
      state.notes = new Array(9).fill([]).map(() => new Array(9).fill([]))
      state.status = "uninitialized"
      state.isNoteMode = false
      state.selectedCell = null
    }
  }
})

export const {
  setSquare,
  setGrid,
  clearGrid,
  solveGrid,
  toggleNoteMode,
  setSelectedCell,
  addNote,
  removeNote,
  clearNotes,
  clearAllNotes,
  clearAll
} = boardSlice.actions

export const selectGrid = (state: RootState) => state.board.grid
export const selectSquare = (x: number, y: number) => (state: RootState) =>
  state.board.grid[x][y]
export const selectStatus = (state: RootState) => state.board.status
export const selectIsNoteMode = (state: RootState) => state.board.isNoteMode
export const selectSelectedCell = (state: RootState) => state.board.selectedCell
export const selectNotes = (state: RootState) => state.board.notes

export const selectSubGrid = (x: number, y: number) =>
  createSelector(selectGrid, grid => {
    const maxX = (x + 1) * 3 - 1
    const maxY = (y + 1) * 3 - 1

    const minX = maxX - 2
    const minY = maxY - 2

    return sliceGrid(grid, minX, minY, maxX, maxY)
  })

export default boardSlice.reducer
