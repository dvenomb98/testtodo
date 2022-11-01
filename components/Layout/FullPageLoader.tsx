import React from 'react'
import Loader from '../Atoms/Loader'
import { bgDark } from '../Styles/CustomStyles'

const FullPageLoader = () => {
  return (
    <div className={`${bgDark} h-screen w-full flex items-center justify-center `}>
        <Loader loading={true} customStyles={"w-12 h-12"} />
    </div>
  )
}

export default FullPageLoader