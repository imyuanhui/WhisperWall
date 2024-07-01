import React from "react";
import DashCard from "./DashCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashPosts = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser._id);
  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
      const data = await res.json();
      setPosts(data.posts);
    };
    getPosts();
  }, []);
  return !posts || posts.length === 0 ? (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-center mb-4">You don't have any whispers yet.</p>
      <a href="/create-post" className="text-blue-500 hover:underline">
        Create your first whisper now!
      </a>
    </div>
  ) : (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {posts.map((post) => (
        <DashCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default DashPosts;
