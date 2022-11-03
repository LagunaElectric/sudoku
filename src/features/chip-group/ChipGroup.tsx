import styles from './ChipGroup.module.css'

interface ChipGroupProps {
  children?: JSX.Element[]
}

export default function ChipGroup(props: ChipGroupProps) {
  return (
    <div className={ styles['chip-group'] }>
      { props.children }
    </div>
  );
}