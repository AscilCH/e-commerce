import React from "react"

export const Heading = ({ title, desc }) => {
  return (
    <>
      <div className='heading'>
        <h2>{title}</h2>
        <br/>
        <p>{desc}</p>
      </div>
    </>
  )
}
