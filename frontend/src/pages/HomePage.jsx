import "./HomePage.scss";
import TopBar from '../components/TopBar'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="homePage">
      <TopBar />
      <div className="contentWrapper">
        <SideBar />
        <div className="mainContent">
          <Outlet />
        </div>
      </div>
    </div >
  )
}
