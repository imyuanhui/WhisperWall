import React from "react";
import HomeCard from "../components/HomeCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setShouldRefresh } from "../redux/refreshSlice";
import {
  HiChevronDoubleDown,
  HiOutlineRefresh,
  HiViewGridAdd,
} from "react-icons/hi";
import { Button, Spinner, Tooltip } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  // const { shouldRefresh } = useSelector((state) => state.refresh);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(true);

  const getPosts = async () => {
    setErrMessage(null);
    try {
      setLoading(true);
      const startIndex = posts.length;
      const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
      // const res = await fetch("/api/post/get-random-posts");
      const data = await res.json();
      if (!res.ok) {
        setErrMessage(data.message);
        setLoading(false);
        return;
      }
      setPosts((prev) => [...prev, ...data.posts]);
      if (data.posts.length < 12) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
      setLoading(false);
    } catch (err) {
      setErrMessage(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // useEffect(() => {
  //   if (shouldRefresh) {
  //     window.location.reload();
  //     dispatch(setShouldRefresh(false));
  //   }
  // }, [shouldRefresh]);

  // const refreshPage = () => {
  //   window.location.reload();
  // };

  const handleShowMore = async () => {
    if (showMore) {
      const res = await getPosts();
      return res.ok;
    }
    return;
  };

  return (
    <>
      {loading && (
        <Spinner
          className="fixed bottom-1/2 start-1/2"
          size="xl"
          color="pink"
        />
      )}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {posts.map((post) => (
            <HomeCard key={post._id} post={post} />
          ))}
        </div>
        {showMore && !loading && (
          <HiChevronDoubleDown
            className="text-rose-600 hover:text-rose-400 cursor-pointer w-10 h-10"
            onClick={handleShowMore}
          ></HiChevronDoubleDown>
        )}
      </div>

      <div className="fixed bottom-10 end-10">
        {/* <Tooltip content="Show more" style="dark" placement="left">
          <Button
            className="rounded-full w-12 h-12"
            gradientMonochrome="failure"
            onClick={() => handleShowMore()}
            disabled={loading}
          >
            <HiOutlineRefresh className="w-6 h-6" />
          </Button>
        </Tooltip> */}
        <Tooltip
          content="Create a new whisper"
          style="dark"
          placement="left"
          className="z-10"
        >
          <Button
            className="rounded-full w-12 h-12 mt-2"
            gradientMonochrome="pink"
            onClick={() => navigate("/create-whisper")}
          >
            <HiViewGridAdd className="w-6 h-6" />
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default Home;
