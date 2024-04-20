import { Outlet } from "react-router-dom";
import HPHeader from "../components/home-page/HPHeader";

export default function HomePageLayout() {
  return (
    <>
      <HPHeader />
      <Outlet />
    </>
  )
}