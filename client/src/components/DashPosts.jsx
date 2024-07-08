import React from "react";
import DashCard from "./DashCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShouldRefresh } from "../redux/refreshSlice";
import { Pagination } from "flowbite-react";

const DashPosts = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { shouldRefresh } = useSelector((state) => state.refresh);
  const [errMessage, setErrMessage] = useState(null);
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
      if (currentUser.isAdmin) {
        console.log("current page:", currentPage);
        const res = await fetch(
          `/api/post/getposts?startIndex=${(currentPage - 1) * 12}&limit=12`
        );
        const data = await res.json();
        setPosts(data.posts);
        setTotalPosts(data.total);
      } else {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        setPosts(data.posts);
        setTotalPosts(posts.length);
      }
    } catch (err) {
      setErrMessage(err.message);
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
      {!posts || posts.length === 0 ? (
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
      ;
      <div className="flex overflow-x-auto sm:justify-center">
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
