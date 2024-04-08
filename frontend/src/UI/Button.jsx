import "./Button.scss"

export default function Button({children ,className, textonly = false , style}) {
    let computedClassName = "btn";
    computedClassName += ` ${className}`;
    if (textonly) {
        computedClassName += " textOnly"; 
    }
  return (
    <button style={style} className={computedClassName}>{children}</button>
  )
}
