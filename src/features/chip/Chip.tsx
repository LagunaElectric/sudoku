import React from 'react'
import styles from './Chip.module.css'
import { motion } from 'framer-motion'

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
        <motion.div
          className={ style }
          onClick={ onClick }
          whileHover={ { scale: 1.1 } }
          whileTap={ { scale: 0.9 } }
        >
          <div className={ styles['chip-wrapper'] }>
            <div className={ styles['chip-text'] }>{ content }</div>
          </div>
        </motion.div>
      </>
    );
  }
}

export default Chip
