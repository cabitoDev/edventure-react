import { motion } from 'framer-motion'

export const Step = props => {
  return (
    <motion.div
      className='gap-md flex-column center'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p className='text-3xl text-align-center'>{props.text}</p>
      {props.children}
    </motion.div>
  )
}
