import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/formatTime.js";
import DOMPurify from "dompurify";
import { Badge } from "flowbite-react";
import { HiClock } from "react-icons/hi";

const ViewPost = () => {
  const { postId } = useParams();
  const [errMessage, setErrMessage] = useState(null);
  const [headerImage, setHeaderImage] = useState("");
  const [pseudonym, setPseudonym] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const getPost = async () => {
    try {
      const res = await fetch(`/api/post/getposts?postId=${postId}`);
      const { posts } = await res.json();
      if (posts.length === 0) {
        setErrMessage("The whisper doesn't exist");
        return;
      }
      setHeaderImage(posts[0].image);
      setPseudonym(posts[0].pseudonym);
      const rawContent = posts[0].content;
      const cleanContent = DOMPurify.sanitize(rawContent);
      setContent(cleanContent);
      setTag(posts[0].tag);

      const rawTime = posts[0].updatedAt;
      setUpdatedTime(formatTime(rawTime));
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  useEffect(() => {
    getPost();
  }, [postId]);
  return (
    <div className="flex w-screen h-screen justify-center pt-10">
      <div className="flex flex-col gap-2 lg:w-4/5 max-w-full">
        {/* Post */}
        <div className="max-w-full max-h-72">
          <img
            src={headerImage}
            alt="header image"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="w-full flex justify-start items-center gap-3 pl-5 pr-5 lg:p-0">
          <Badge>{tag}</Badge>

          <Badge color="gray" icon={HiClock}>
            {updatedTime}
          </Badge>
          <div className="font-serif">
            from <span className="font-semibold">{pseudonym}</span>
          </div>
        </div>
        <div
          className="pl-5 pr-5 lg:p-0 prose mt-5"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <div>{/* Comment */}</div>
    </div>
  );
};

export default ViewPost;
