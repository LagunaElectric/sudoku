import { useAppSelector } from '../../app/hooks';
import { selectSubGrid } from '../board/boardSlice'
import styles from '../cell/Cell.module.css'


export interface SubGridProps {
  x: number
  y: number
}

export default function SubGrid(props: SubGridProps) {
  let cells = useAppSelector(selectSubGrid(props.x, props.y));
  console.log("Subgrid", props, cells);
  return (<>{ cells.reduce(
    (prev, row) =>
      prev.concat(row), []).map(
        (celldata) => <div className='p-2'>{ <input
          // ref={ cellInput }
          className={ styles.input }
          type="number"
          value={ celldata }
        // onChange={ inputChange }
        // onKeyDown={ (evt) => forbiddenKeys.includes(evt.key) && evt.preventDefault() }
        // { ...(props.noteMode ? { style: inputStyle } : {}) }
        /> }</div>)
  }</>)
}