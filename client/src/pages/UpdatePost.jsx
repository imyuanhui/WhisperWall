import {
  Label,
  Select,
  TextInput,
  ToggleSwitch,
  Button,
  Alert,
  Spinner,
} from "flowbite-react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useRef, useState, useEffect } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const { postId } = useParams();
  const [formData, setFormData] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadErr, setImgUploadErr] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const filePickerRef = useRef();
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
  ];

  const getPost = async () => {
    setErrMessage(null);
    try {
      const res = await fetch(`/api/post/getposts?postId=${postId}`);
      const { posts } = await res.json();
      if (posts.length === 0) {
        setErrMessage("The whisper doesn't exist");
        return;
      }
      setFormData(posts[0]);
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  useEffect(() => {
    getPost();
    if (imgFile) {
      uploadImage();
    }
  }, [postId, imgFile]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const uploadImage = async () => {
    setImgUploadErr(null);
    setImgUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imgFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgress(progress.toFixed(0));
      },
      (err) => {
        setImgUploadErr("Could not upload image (File must be less than 2MB)");
        setImgUploadProgress(null);
        setImgFile(null);
        setImgUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, image: downloadURL });
          setImgUploading(false);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imgUploading) {
      setErrMessage("Please wait from image to upload");
      return;
    }

    try {
      setLoading(true);
      setErrMessage(null);
      console.log(formData);
      const res = await fetch(`/api/post/updatepost/:${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrMessage(data.message);
      } else {
        navigate(-1);
      }
      setLoading(false);
    } catch (err) {
      setErrMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form className="flex flex-col p-10 w-full" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={filePickerRef}
          accept="image/*"
          onChange={handleImgChange}
          hidden
        />
        <div className="flex flex-col justify-start gap-2 md:flex-row md:justify-between mb-5 w-full max-w-screen-lg lg:gap-10">
          <div className="flex gap-3 items-center w-full">
            <Label htmlFor="pseudonym" value="Pseudonym" className="md:w-20" />
            <TextInput
              id="pseudonym"
              type="text"
              value={formData.pseudonym}
              className="flex-1"
              required
              onChange={(e) => {
                setFormData({ ...formData, pseudonym: e.target.value });
              }}
            />
          </div>

          <div className="flex gap-3 items-center w-full">
            <Label htmlFor="tag" value="Tag" className="w-20 md:w-6" />
            <Select
              id="tag"
              className="flex-1"
              required
              value={formData.tag}
              onChange={(e) => {
                setFormData({ ...formData, tag: e.target.value });
              }}
            >
              <option value="">--Choose a tag--</option>
              <option value="emotion">Emotion</option>
              <option value="life">Life</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="relationship">Relationship</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-between gap-3">
          <div>
            <div
              className="md:w-72 lg:w-96 md:h-72 lg:h-96 self-center mb-3 min-h-32 max-h-100 border-2 border-orange-400 rounded-md border-dashed"
              onClick={() => filePickerRef.current.click()}
            >
              {imgFile ? (
                <img
                  src={formData.image}
                  alt="header image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full md:h-full h-32 flex flex-col justify-center items-center font-mono bg-orange-50 text-neutral-500">
                  <HiOutlineUpload className="text-3xl" />
                  <span>Upload a header image</span>
                </div>
              )}
            </div>
            {imgUploadErr && <Alert color="failure">{imgUploadErr}</Alert>}
          </div>
          <div className="flex-1 flex flex-col">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              className="min-h-48 md:min-h-72 lg:min-h-96 max-h-100 mb-3"
              placeholder="Write something down..."
              value={formData.content}
              onChange={(val) => setFormData({ ...formData, content: val })}
              required
            />
            <div className="flex gap-3 items-center mt-2">
              <Label htmlFor="private" value="Set it private?" />
              <ToggleSwitch
                id="private"
                checked={formData.isPrivate}
                onChange={(e) =>
                  setFormData({ ...formData, isPrivate: e.targe.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          {/* <Button
            gradientDuoTone="pinkToOrange"
            outline
            className="min-w-40"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Save as draft"
            )}
          </Button> */}
          <Button
            gradientDuoTone="pinkToOrange"
            className="min-w-40"
            type="submit"
            disabled={loading}
          >
            {loading ? (
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
      {errMessage && (
        <Alert className="mt-5" color="failure">
          {errMessage}
        </Alert>
      )}
    </div>
  );
};

export default UpdatePost;
