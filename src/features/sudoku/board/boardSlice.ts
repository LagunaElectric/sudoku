import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"

export interface BoardState {
  grid: Array<Array<number | undefined>>
  status: "uninitialized" | "new" | "incomplete" | "solved"
}

export interface BoardPayload {
  x: number
  y: number
  val: number
}

const initialState: BoardState = {
  grid: [
    [
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      1,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      1
    ]
  ],
  status: "uninitialized"
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setSquare: (state, action: PayloadAction<BoardPayload>) => {
      const { x, y, val } = action.payload
      state.grid[x][y] = val > 9 ? 9 : val <= 0 ? undefined : val
    },
    setGrid: (
      state,
      action: PayloadAction<Array<Array<number | undefined>>>
    ) => {
      state.grid = action.payload
    }
  }
})

export const { setSquare, setGrid } = boardSlice.actions

export const selectGrid = (state: RootState) => state.board.grid
export const selectSquare = (state: RootState, x: number, y: number) =>
  state.board.grid[x][y]

export default boardSlice.reducer
