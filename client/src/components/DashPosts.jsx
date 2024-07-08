import React from "react";
import DashCard from "./DashCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShouldRefresh } from "../redux/refreshSlice";
import { Alert, Pagination, Spinner } from "flowbite-react";

const DashPosts = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { shouldRefresh } = useSelector((state) => state.refresh);
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const onPageChange = (page) => {
    console.log("page is changed to", page);
    setCurrentPage(page);
  };

  useEffect(() => {
    getPosts();
  }, [currentPage, setCurrentPage]);

  const getPosts = async () => {
    setErrMessage(null);
    try {
      setLoading(true);
      if (currentUser.isAdmin) {
        const res = await fetch(
          `/api/post/getposts?startIndex=${(currentPage - 1) * 12}&limit=12`
        );
        const data = await res.json();
        if (!res.ok) {
          setErrMessage(data.message);
          setLoading(false);
        } else {
          setPosts(data.posts);
          setTotalPosts(data.total);
          setLoading(false);
        }
      } else {
        const res = await fetch(
          `/api/post/getposts?userId=${currentUser._id}&startIndex=${
            (currentPage - 1) * 12
          }`
        );
        const data = await res.json();
        if (!res.ok) {
          setErrMessage(data.message);
          setLoading(false);
        } else {
          setPosts(data.posts);
          setTotalPosts(posts.length);
          setLoading(false);
        }
      }
    } catch (err) {
      setErrMessage(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
      dispatch(setShouldRefresh(false));
    }
  }, [shouldRefresh]);

  return (
    <>
      {errMessage && <Alert color="failure">{errMessage}</Alert>}
      {loading ? (
        <Spinner
          className="fixed bottom-1/2 start-1/2"
          size="xl"
          color="pink"
        />
      ) : !posts || posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center mb-4">You don't have any whispers yet.</p>
          <a href="/create-whisper" className="text-blue-500 hover:underline">
            Create your first whisper now!
          </a>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {posts.map((post) => (
            <DashCard key={post._id} post={post} />
          ))}
        </div>
      )}
      {/* {!posts || posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center mb-4">You don't have any whispers yet.</p>
          <a href="/create-whisper" className="text-blue-500 hover:underline">
            Create your first whisper now!
          </a>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {posts.map((post) => (
            <DashCard key={post._id} post={post} />
          ))}
        </div>
      )} */}
      <div className="fixed bottom-4 start-1/2 flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalPosts / 12)}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default DashPosts;
