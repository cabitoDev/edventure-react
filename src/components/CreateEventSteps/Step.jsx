export const Step = props => {
  return (
    <>
      <p className='text-3xl'>{props.text}</p>
      {props.children}
    </>
  )
}
