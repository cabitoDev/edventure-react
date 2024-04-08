import { Image, Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { imageUpated } from '../../redux/eventSlice';
import assets from '../../assets';
import { Constants } from '../../constants';

export const StepImage =()=> {
  const [image, setImage] = useState()
  const dispatch = useDispatch()
  const event = useSelector(state=>state.event)
  useEffect(() => {
    if(event.image) setImage(event.image)
  }, [event])
  
  function handleChange(e) {
      console.log(e.target.files);
      dispatch(imageUpated(URL.createObjectURL(e.target.files[0])));
  }

  return (
      <div className='flex flex-col items-center gap-4'>
         <Image
      width={100}
      height={150}
      radius="lg"
      alt="icon of event"
      src={image}
    />
    <Button isIconOnly radius='md' color="primary"onClick={()=>document.getElementById('file-input').click()}><img src={assets.upload}></img></Button>
          <input style={{ display: 'none' }} type="file" id="file-input" onChange={handleChange} />
      </div>
  );
}
