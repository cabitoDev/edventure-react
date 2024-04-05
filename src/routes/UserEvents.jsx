import React from 'react'
import { useDispatch } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import '../index.css'

export const UserEvents = () => {
  const user = useLoaderData()
  const dispatch = useDispatch()

  return <>user events landing</>
}
