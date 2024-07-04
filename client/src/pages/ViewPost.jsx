import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/formatTime.js";
import DOMPurify from "dompurify";
import { Badge, Button, Drawer, TextInput, Textarea, HR } from "flowbite-react";
import { HiClock, HiPencil } from "react-icons/hi";
import { useSelector } from "react-redux";

const ViewPost = () => {
  const { postId } = useParams();
  const [errMessage, setErrMessage] = useState(null);
  const [headerImage, setHeaderImage] = useState("");
  const [pseudonym, setPseudonym] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [authorId, setAuthorId] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const comments = [
    "hellow what a beautiful day",
    "Hi, I understand your anxiety",
    "Fightn!!!!",
  ];

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
      setAuthorId(posts[0].userId);
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  const handleEditPost = () => {
    console.log("edit");
  };

  return (
    <div className="flex w-screen justify-center pt-10 pb-10">
      <div className="flex flex-col gap-2 lg:w-2/5 max-w-full">
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
          {currentUser._id === authorId && (
            <HiPencil
              className="h-5 w-5 ml-2 hover:text-pink-500"
              onClick={handleEditPost}
            />
          )}
        </div>
        <div
          className="pl-5 pr-5 lg:p-0 prose mt-5 font-serif"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <HR.Text text="MESSAGE BOARD" />
        {comments.length !== 0 && (
          <div className="text-gray-600 flex flex-col gap-3">
            {comments.map((comment) => (
              <div>{comment}</div>
            ))}
          </div>
        )}
        <div className="flex max-w-full gap-3 items-center p-3">
          {/* Comment */}
          <TextInput
            className="flex-1"
            onClick={() => setIsOpen(true)}
            placeholder="Leave your message..."
          />
          <Drawer
            open={isOpen}
            onClose={() => setIsOpen(false)}
            position="bottom"
            className="p-5"
          >
            <Drawer.Header title="Message" titleIcon={() => <></>} />
            <Drawer.Items className="flex flex-col items-center">
              <Textarea rows={6} />
              <Button gradientDuoTone="pinkToOrange" pill className="mt-5">
                Send
              </Button>
            </Drawer.Items>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
