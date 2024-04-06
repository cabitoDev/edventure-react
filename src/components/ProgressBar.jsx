export const ProgressBar = props => {
  return (
    <div className='h-1 w-full bg-neutral-200 dark:bg-neutral-600'>
      <div
        className='h-1 bg-primary'
        style={{ width: `${props.progress * 100}%` }}
      ></div>
    </div>
  )
}
