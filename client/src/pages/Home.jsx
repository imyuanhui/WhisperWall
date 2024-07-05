import React from "react";
import HomeCard from "../components/HomeCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShouldRefresh } from "../redux/refreshSlice";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { shouldRefresh } = useSelector((state) => state.refresh);

  const getPosts = async () => {
    // const res = await fetch("/api/post/getposts");
    const res = await fetch("/api/post/get-random-posts");
    const data = await res.json();
    setPosts(data.posts);
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {posts.slice(0, 13).map((post) => (
        <HomeCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
