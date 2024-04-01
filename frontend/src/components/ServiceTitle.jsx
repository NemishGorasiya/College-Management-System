import "./ServiceTitle.scss";
export default function ServiceTitle({serviceTitle}) {
  return (
    <div className="serviceTitleContainer">
      <span className="serviceTitle">{serviceTitle}</span>
      <hr />
    </div>
  )
}
