import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import React from 'react'

const TransitionAnimation = props => {
  return (
    <motion.div
      className={props.className}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {props.children}
    </motion.div>
  )
}

TransitionAnimation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
export default TransitionAnimation
