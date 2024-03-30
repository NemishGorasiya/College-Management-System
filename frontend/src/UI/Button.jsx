import "./Button.scss"

export default function Button({children , textonly = false}) {
    let className = "btn";
    if (textonly) {
        className += " textOnly"; 
    }
  return (
    <button className={className}>{children}</button>
  )
}
