import React from 'react'
import Layout from '../Layout/Layout'
import { bgLight, gradientBgUp, gradientText } from '../Styles/CustomStyles'

const OuterFooter = () => {
  return (
    <footer className={`${bgLight}`}>
      <Layout >
        <div className="flex flex-row items-center justify-between">
          <h1
            className={`${gradientText} font-headFamily text-h2 font-semibold`}
          >
            REAL LIFE MMORPG
          </h1>
          <p className="text-primary-gray">@ Daniel Bílek 2022</p>
        </div>
      </Layout>
    </footer>
  )
}

export default OuterFooter