import React from 'react'
import styles from './Chip.module.css'

export interface ChipProps {
  content: string | JSX.Element,
  onClick?: () => void
  active?: boolean
}
class Chip extends React.Component<ChipProps> {
  render() {
    const { content, onClick, active } = this.props
    const style = styles.chip + (active ? ' ' + styles.active : '')
    return (
      <>
        <div className={ style } onClick={ onClick }>
          <div className={ styles['chip-wrapper'] }>
            <div className={ styles['chip-text'] }>{ content }</div>
          </div>
        </div>
      </>
    );
  }
}

export default Chip
