import React from 'react'
import { motion } from 'framer-motion'

export interface ChipProps {
  content: string | JSX.Element,
  onClick?: () => void
  active?: boolean
}
class Chip extends React.Component<ChipProps> {
  render() {
    const { content, onClick, active } = this.props
    const chipStyle = (active ? ' text-gray-700 bg-gray-200' : '')
    return (
      <>
        <motion.div
          className={ "inline-block m-2 rounded-full font-bold text-center cursor-pointer caret-transparent hover:bg-gray-200 hover:text-gray-700" + chipStyle }
          onClick={ onClick }
          whileHover={ { scale: 1.1 } }
          whileTap={ { scale: 0.9 } }
        >
          <div className={ "group/log flex flex-wrap justify-center mx-2" }>
            <div className='m-1'>{ content }</div>
          </div>
        </motion.div>
      </>
    );
  }
}

export default Chip
