import React from "react";
import { Sidebar, Modal, Button } from "flowbite-react";
import {
  HiArrowSmRight,
  HiUser,
  HiViewGridAdd,
  HiOutlineExclamationCircle,
  HiSparkles,
  HiStatusOnline,
  HiUserGroup,
} from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <>
      <Sidebar className="w-full md:w-56 h-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="?tab=profile"
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
            {currentUser.isAdmin && (
              <Sidebar.Item
                href="?tab=users"
                active={tab === "users"}
                icon={HiUserGroup}
                labelColor="dark"
              >
                Users
              </Sidebar.Item>
            )}
            <Sidebar.Item
              href="?tab=whispers"
              active={tab === "whispers"}
              icon={HiSparkles}
            >
              Whispers
            </Sidebar.Item>
            <Sidebar.Item href="/create-whisper" icon={HiViewGridAdd}>
              Create
            </Sidebar.Item>
            <Sidebar.Item href="/explore" icon={HiStatusOnline}>
              Explore
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              className="cursor-pointer"
              icon={HiArrowSmRight}
              onClick={() => setOpenModal(true)}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to sign out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="warning"
                onClick={() => {
                  setOpenModal(false);
                  handleSignout();
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DashSidebar;
