import React from "react";
import HomeCard from "../components/HomeCard";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const getPosts = async () => {
      console.log("get posts");
      // const res = await fetch("/api/post/getposts");
      const res = await fetch("/api/post/get-random-posts");
      const data = await res.json();
      setPosts(data.posts);
      setTotal(data.total);
      console.log(total);
    };
    getPosts();
  }, []);
  const handleRefresh = async () => {};
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {posts.slice(0, 13).map((post) => (
        <HomeCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
