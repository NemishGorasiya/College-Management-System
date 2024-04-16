import "./Button.scss";

export default function Button({
	children,
	className,
	textonly = false,
	style,
	onClick,
}) {
	let computedClassName = "btn";
	computedClassName += ` ${className}`;
	if (textonly) {
		computedClassName += " textOnly";
	}
	return (
		<button style={style} onClick={onClick} className={computedClassName}>
			{children}
		</button>
	);
}
