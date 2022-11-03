import Chip, { ChipProps } from '../chip/Chip';
import styles from './ChipGroup.module.css'

interface ChipGroupProps {
  children?: React.ReactNode
  chipConfig?: Array<ChipProps>
}

export default function ChipGroup(props: ChipGroupProps) {

  return (
    <div className={ styles['chip-group'] }>
      { props.children ?? props.chipConfig?.map((chip, index) => { return <Chip { ...chip } /> }) }
    </div>
  );
}