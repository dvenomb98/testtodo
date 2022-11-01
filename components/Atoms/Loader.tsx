import { ArrowPathIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface LoaderProps {
    loading: boolean
    customStyles?: string
}

const Loader: React.FC<LoaderProps> = ({loading, customStyles}) => {
    if (!loading) return null

  return loading && (
    <ArrowPathIcon className={`spinner-border animate-spin inline-block ${customStyles ? customStyles : "w-6 h-6"} rounded-full text-white`} role="status" />
  )
}

export default Loader