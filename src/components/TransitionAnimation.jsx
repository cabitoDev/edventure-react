import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import React from 'react'

export const TransitionAnimation = props => {
  return (
    <motion.div
      className='gap-md flex-column'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {props.children}
    </motion.div>
  )
}

TransitionAnimation.propTypes = {
  children: PropTypes.node
}
