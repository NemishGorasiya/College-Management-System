import React from 'react'
import "./Button.css"

export default function Button({children , textonly = false}) {
    let className = "btn";
    if (textonly) {
        className += " textOnly"; 
    }
  return (
    <button className={className}>{children}</button>
  )
}
