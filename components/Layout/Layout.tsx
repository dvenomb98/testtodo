import React from "react"

interface Layout {
  children: JSX.Element
  customStyles?: string
}

const Layout = ({ children, customStyles }: Layout) => {
  return (
    <div
      className={`container mx-auto px-5 ${
        customStyles ? customStyles : "py-16"
      }`}
    >
      {children}
    </div>
  )
}

export default Layout
