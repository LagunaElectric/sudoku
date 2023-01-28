export const sliceGrid = <T>(
  array: Array<Array<T>>,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): Array<Array<T>> => array.slice(x1, x2 + 1).map(i => i.slice(y1, y2 + 1))
