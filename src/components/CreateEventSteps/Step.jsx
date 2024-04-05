export const Step = props => {
  return (
    <>
      <p className='text-3xl text-align-center'>{props.text}</p>
      {props.children}
    </>
  )
}
