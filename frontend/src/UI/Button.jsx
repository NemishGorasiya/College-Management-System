import "./Button.scss"

export default function Button({children , textonly = false , style}) {
    let className = "btn";
    if (textonly) {
        className += " textOnly"; 
    }
  return (
    <button style={style} className={className}>{children}</button>
  )
}
