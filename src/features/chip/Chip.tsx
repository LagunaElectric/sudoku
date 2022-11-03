import React from 'react'
import styles from './Chip.module.css'

interface ChipProps {
  content: string | JSX.Element,
  onClick?: () => void
  active?: boolean
}
class Chip extends React.Component<ChipProps> {
  render() {
    return (
      <>
        <div className={ styles.chip } onClick={ this.props.onClick }>
          <div className={ styles['chip-wrapper'] }>
            <div className={ styles['chip-text'] }>{ this.props.content }</div>
          </div>
        </div>
      </>
    );
  }
}

export default Chip
