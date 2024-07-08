import React from "react";
import HomeCard from "../components/HomeCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShouldRefresh } from "../redux/refreshSlice";
import { HiOutlineRefresh } from "react-icons/hi";
import { Button, Spinner, Tooltip } from "flowbite-react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { shouldRefresh } = useSelector((state) => state.refresh);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);

  const getPosts = async () => {
    setErrMessage(null);
    // const res = await fetch("/api/post/getposts");
    try {
      setLoading(true);
      const res = await fetch("/api/post/get-random-posts");
      const data = await res.json();
      if (!res.ok) {
        setErrMessage(data.message);
        setLoading(false);
        return;
      }
      setPosts(data.posts);
      setLoading(false);
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

  const refreshPage = () => {
    window.location.reload();
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {posts.slice(0, 13).map((post) => (
          <HomeCard key={post._id} post={post} />
        ))}
      </div>

      <div className="fixed bottom-10 end-10">
        <Tooltip
          content="Get new random whispers"
          style="dark"
          placement="left"
        >
          <Button
            className="rounded-full w-12 h-12"
            gradientMonochrome="pink"
            onClick={refreshPage}
            disabled={loading}
          >
            <HiOutlineRefresh className="w-6 h-6" />
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default Home;
