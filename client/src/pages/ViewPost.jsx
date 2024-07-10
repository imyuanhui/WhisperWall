import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/formatTime.js";
import DOMPurify from "dompurify";
import {
  Badge,
  Button,
  Drawer,
  TextInput,
  Textarea,
  HR,
  Alert,
  Spinner,
  Modal,
  FloatingLabel,
  Tooltip,
  Dropdown,
} from "flowbite-react";
import {
  HiClock,
  HiPencil,
  HiInformationCircle,
  HiTrash,
  HiOutlineTrash,
  HiOutlineExclamationCircle,
  HiViewGrid,
  HiSparkles,
  HiOutlinePencilAlt,
  HiViewGridAdd,
  HiDotsCircleHorizontal,
  HiDotsHorizontal,
} from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { setShouldRefresh } from "../redux/refreshSlice.js";

const ViewPost = () => {
  const { postId } = useParams();
  const [errMessage, setErrMessage] = useState(null);
  const [addCommentErr, setAddCommentErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const [headerImage, setHeaderImage] = useState("");
  const [pseudonym, setPseudonym] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [authorId, setAuthorId] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [comment, setComment] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [itemToDel, setItemToDel] = useState(null);
  const [tempCommentId, setTempCommentId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getPost = async () => {
    setErrMessage(null);
    setSuccessMessage(null);
    try {
      setLoading(true);
      const res = await fetch(`/api/post/getposts?postId=${postId}`);
      const { posts } = await res.json();
      if (posts.length === 0) {
        setErrMessage("The whisper doesn't exist");
        setLoading(false);
        return;
      }
      setHeaderImage(posts[0].image);
      setPseudonym(posts[0].pseudonym);
      const rawContent = posts[0].content;
      const cleanContent = DOMPurify.sanitize(rawContent);
      setContent(cleanContent);
      setTag(posts[0].tag);
      const rawTime = posts[0].createdAt;
      setUpdatedTime(formatTime(rawTime));
      setAuthorId(posts[0].userId);
      setComment({ ...comment, postId: posts[0]._id });
      setLoading(false);
    } catch (err) {
      setErrMessage(err.message);
      setLoading(false);
    }
  };

  const getComment = async () => {
    setAddCommentErr(null);
    setTempCommentId("");
    try {
      setLoading(true);
      const res = await fetch(`/api/comment/get-comments?postId=${postId}`);
      const { comments } = await res.json();
      setPostComments(comments);
      setLoading(false);
    } catch (err) {
      setErrMessage(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
    getComment();
  }, [postId]);

  const handleEditPost = () => {
    navigate(`/update-whisper/${postId}`);
  };

  const handleDeletePost = async () => {
    try {
      const res = await fetch(`/api/post/deletepost/:${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        setErrMessage(data.message);
      } else {
        setSuccessMessage("Whisper deleted successfully");
        // dispatch(setShouldRefresh(true));
        navigate("/dashboard?tab=whispers");
      }
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    setAddCommentLoading(false);
    setAddCommentErr(null);
    if (!comment?.pseudonym || comment.pseudonym === "") {
      setComment({
        ...comment,
        pseudonym: "Whisper" + Math.floor(Math.random() * 1000 + 1000),
      });
    }
    try {
      setAddCommentLoading(true);
      const res = await fetch("/api/comment/add-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });
      setLoading(false);
      const data = await res.json();
      if (!res.ok) {
        setAddCommentErr(data.message);
      } else {
        setIsOpen(false);
        getComment();
      }
      setAddCommentLoading(false);
    } catch (err) {
      setAddCommentErr(err.message);
      setAddCommentLoading(false);
    }
  };

  const handleDeleteComment = async (e) => {
    try {
      const res = await fetch(`/api/comment/delete-comment/:${tempCommentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        setErrMessage(data.message);
      } else {
        setSuccessMessage("Message deleted successfully");
        getComment();
      }
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  if (loading) {
    return (
      <Spinner className="fixed bottom-1/2 start-1/2" size="xl" color="pink" />
    );
  } else {
    return (
      <div>
        <div className="fixed bottom-10 end-10 z-10">
          <Tooltip content="Create a new whisper" style="dark" placement="left">
            <Button
              className="rounded-full w-12 h-12"
              gradientMonochrome="pink"
              onClick={() => navigate("/create-whisper")}
            >
              <HiViewGridAdd className="w-6 h-6" />
            </Button>
          </Tooltip>
        </div>

        <div className="flex w-full justify-center pt-10 pb-10">
          <div className="flex flex-col gap-2 lg:w-2/5 max-w-full">
            {errMessage && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Oops!!</span>
                {errMessage}
              </Alert>
            )}
            {successMessage && (
              <Alert color="success" icon={HiInformationCircle}>
                {successMessage}
              </Alert>
            )}
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
              {(currentUser._id === authorId || currentUser.isAdmin) && (
                <>
                  <HiPencil
                    className="h-5 w-5 ml-2 hover:text-pink-500"
                    onClick={handleEditPost}
                  />
                  <HiTrash
                    className="h-5 w-5 ml-2 hover:text-pink-500"
                    onClick={() => {
                      setItemToDel("post");
                      setOpenModal(true);
                    }}
                  />
                </>
              )}
            </div>
            <div
              className="pl-5 pr-5 lg:p-0 prose mt-5 mb-5 font-serif"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <HR.Text text="MESSAGE BOARD" />
            {postComments.length !== 0 && (
              <div className="text-gray-500 flex flex-col gap-3 p-2 font-thin">
                {postComments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex flex-col border-2 border-dotted rounded-md p-2"
                  >
                    <span className="font-3xl">{comment.content}</span>
                    <div className="flex flex-col items-end">
                      <span>--{comment.pseudonym}</span>
                      <span>{formatTime(comment.createdAt)}</span>
                      {currentUser.isAdmin && (
                        <HiOutlineTrash
                          className="h-6 w-6 mt-3 hover:text-pink-500"
                          onClick={() => {
                            setItemToDel("comment");
                            setTempCommentId(comment._id);
                            setOpenModal(true);
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex max-w-full gap-3 items-center p-2">
              {/* Comment */}
              <form
                className="w-full flex flex-col items-end"
                onSubmit={handleAddComment}
              >
                <Textarea
                  rows={6}
                  onChange={(e) =>
                    setComment({ ...comment, content: e.target.value })
                  }
                  required
                />
                <div className="flex gap-3 items-center mt-5">
                  <FloatingLabel
                    variant="outlined"
                    label="Pseudonym"
                    onChange={(e) =>
                      setComment({ ...comment, pseudonym: e.target.value })
                    }
                  />
                  {/* <TextInput
                  placeholder="Your pseudonym"
                  onChange={(e) =>
                    setComment({ ...comment, pseudonym: e.target.value })
                  }
                /> */}
                  <Button
                    gradientDuoTone="pinkToOrange"
                    pill
                    type="submit"
                    disabled={addCommentLoading}
                    className="-mt-2"
                  >
                    {addCommentLoading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3">Loading...</span>
                      </>
                    ) : (
                      "Send"
                    )}
                  </Button>
                </div>
              </form>
              {addCommentErr && <Alert color="failure">{errMessage}</Alert>}
              {/* <TextInput
              className="flex-1"
              onClick={() => setIsOpen(true)}
              placeholder="Leave your message..."
            /> */}
              {/* <Drawer
              open={isOpen}
              onClose={() => setIsOpen(false)}
              position="bottom"
              className="p-5"
            >
              <Drawer.Header title="Message" titleIcon={() => <></>} />
              <Drawer.Items>
                <form
                  className="w-full flex flex-col items-end"
                  onSubmit={handleAddComment}
                >
                  <Textarea
                    rows={6}
                    onChange={(e) =>
                      setComment({ ...comment, content: e.target.value })
                    }
                    required
                  />
                  <div className="flex gap-3 items-center mt-5">
                    <TextInput
                      placeholder="Your pseudonym"
                      onChange={(e) =>
                        setComment({ ...comment, pseudonym: e.target.value })
                      }
                    />
                    <Button
                      gradientDuoTone="pinkToOrange"
                      pill
                      type="submit"
                      disabled={addCommentLoading}
                    >
                      {addCommentLoading ? (
                        <>
                          <Spinner size="sm" />
                          <span className="pl-3">Loading...</span>
                        </>
                      ) : (
                        "Send"
                      )}
                    </Button>
                  </div>
                </form>
                {addCommentErr && <Alert color="failure">{errMessage}</Alert>}
              </Drawer.Items>
            </Drawer> */}
            </div>
          </div>
          <Modal
            show={openModal}
            size="md"
            onClose={() => setOpenModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Deleted content cannot be restored. Are you sure to delete it?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button
                    color="failure"
                    onClick={() => {
                      setOpenModal(false);
                      itemToDel === "post" && handleDeletePost();
                      itemToDel === "comment" && handleDeleteComment();
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
      </div>
    );
  }
};

export default ViewPost;
