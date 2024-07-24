import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashChannels from "../components/DashChannels";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar*/}
        <DashSidebar />
      </div>
      <div className="flex-1">
        {/* Profile */}
        {tab === "profile" && <DashProfile />}
        {/* Users */}
        {tab === "users" && <DashUsers />}
        {/* Posts */}
        {tab === "whispers" && <DashPosts />}
        {/* Channels */}
        {tab === "channels" && <DashChannels />}
      </div>
    </div>
  );
};

export default Dashboard;
