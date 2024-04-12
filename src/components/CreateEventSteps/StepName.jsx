import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { useFormContext } from "react-hook-form";
 
export const StepName = props => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
 
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue("name", newValue);
  }
 
  return (
<>
<Input
      {...register("name", { required: true })}
      value={watch("name") || ''}
      onChange={handleInputChange}
      autoFocus
      placeholder='Type a name (5 char min)'
      className='max-w-xs'
    />
    {errors.name && <span>This field is required</span>}
</>
    );
}