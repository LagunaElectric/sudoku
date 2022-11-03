import React from 'react'
import styles from './Chip.module.css'

interface ChipProps {
  content: string,
  onClick?: () => void
  active?: boolean
}

export class Chip extends React.Component<ChipProps> {
  render() {
    const inlineStyle = {
      backgroundColor: this.props.active ? '#00000055' : 'transparent',
      "&:hover": {
        backgroundColor: '#0ff5'
      }
    }
    return (
      <>
        <div className={ styles.chip } style={ inlineStyle } onClick={ this.props.onClick }>
          <div className={ styles['chip-wrapper'] }>
            <div className={ styles['chip-text'] }>{ this.props.content }</div>
          </div>
        </div>
      </>
    );
  }
}
