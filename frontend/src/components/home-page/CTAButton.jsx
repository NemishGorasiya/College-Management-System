import { NavLink } from "react-router-dom";

export default function CTAButton() {
  return (
    <button className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 transition-all ">
      <NavLink to="/">To the Dashboard</NavLink>
    </button>
  )
}