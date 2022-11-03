import styles from './Chip.module.css'

interface ChipProps {
  content: string,
  onClick?: () => void
  active?: boolean
}

export function Chip(props: ChipProps) {
  const inlineStyle = {
    backgroundColor: props.active ? '#00000055' : 'transparent',
    "&:hover": {
      backgroundColor: '#0ff5'
    }
  }
  return (
    <>
      <div className={ styles.chip } style={ inlineStyle } onClick={ props.onClick }>
        <div className={ styles['chip-wrapper'] }>
          <div className={ styles['chip-text'] }>{ props.content }</div>
        </div>
      </div>
    </>
  );
}