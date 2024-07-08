import {
  Alert,
  Pagination,
  Table,
  Modal,
  Button,
  Spinner,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [userToDel, setUserToDel] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const getUsers = async () => {
    setErrMessage(null);
    setSuccessMessage(null);
    if (!currentUser.isAdmin) {
      navigate("/dashboard?tab=profile");
    }

    try {
      setLoading(true);
      const res = await fetch(
        `/api/user/get-users?startIndex=${(currentPage - 1) * 9}`
      );
      const data = await res.json();
      setUsers(
        data.users.map((user) => {
          const formattedDate = format(parseISO(user.createdAt), "yyyy-MM-dd");
          return {
            ...user,
            createdDate: formattedDate,
          };
        })
      );

      setTotalUsers(data.totalUsers);
      setLoading(false);
    } catch (err) {
      setErrMessage(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage, setCurrentPage]);

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (user) => {
    if (user.isAdmin) {
      window.alert("You are not allowed to delete admin");
      return;
    }

    if (user.username === "whisper_demo") {
      window.alert("You are not allowed to delete demo user");
      return;
    }
    try {
      const res = await fetch(`/api/user/delete/:${user._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        setErrMessage(data.message);
      } else {
        setSuccessMessage("User deleted successfully");
        window.location.reload();
      }
    } catch (err) {
      setErrMessage(err.message);
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-10">
      {errMessage && <Alert color="failure">{errMessage}</Alert>}
      {successMessage && <Alert color="success">{successMessage}</Alert>}
      {loading && <Spinner className="fixed bottom-1/2 start-1/2" size="xl" color="pink"/>}
      <div className="overflow-auto h-11/12 w-11/12">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Avatar</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Created Date</Table.HeadCell>
            <Table.HeadCell>Account Type</Table.HeadCell>
            <Table.HeadCell>Operation</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>
                  <img
                    src={user.profilePicture}
                    className="w-8 h-8 rounded-full"
                  />
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.createdDate}</Table.Cell>
                <Table.Cell>{user.isAdmin ? "Admin" : "User"}</Table.Cell>
                <Table.Cell>
                  <span
                    className="font-medium text-rose-600 hover:underline dark:text-rose-500 cursor-pointer"
                    onClick={() => {
                      setUserToDel(user);
                      setOpenModal(true);
                    }}
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div>
        <Pagination
          className="fixed bottom-6 start-24 sm:start-52 md:start-1/2"
          currentPage={currentPage}
          totalPages={Math.ceil(totalUsers / 9)}
          onPageChange={onPageChange}
        />
      </div>
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
              Are you sure you want to delete{" "}
              <span className="font-semibold">{userToDel.username}</span>?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenModal(false);
                  deleteUser(userToDel);
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
    </div>
  );
};

export default DashUsers;
