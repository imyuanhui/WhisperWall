import {
  Label,
  Select,
  TextInput,
  ToggleSwitch,
  Button,
  Card,
} from "flowbite-react";
import { useRef, useState, useEffect } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [pseudonym, setPseudonym] = useState(
    "Whisperer" + Math.floor(1000 + Math.random * 9000)
  );
  const [tag, setTag] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [content, setContent] = useState(null);
  const [formData, setFormData] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadErr, setImgUploadErr] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const filePickerRef = useRef();

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

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setImgURL(URL.createObjectURL(file));
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
        setImgURL(null);
        setImgUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImgUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (imgFile) {
      uploadImage();
      console.log(imgFile);
    }
  }, [imgFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pseudonym, tag, content, isPrivate);
    setFormData({
      pseudonym: pseudonym,
      tag: tag,
      content: content,
      isPrivate: isPrivate,
    });
    console.log(formData);
  };
  return (
    <div className="w-screen">
      <form
        className="flex flex-col p-10 w-full h-full"
        onSubmit={handleSubmit}
      >
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
              defaultValue={"Whisperer"}
              className="flex-1"
              required
              onChange={(e) => setPseudonym(e.target.value)}
            />
          </div>

          <div className="flex gap-3 items-center w-full">
            <Label htmlFor="tag" value="Tag" className="w-20 md:w-6" />
            <Select
              id="tag"
              className="flex-1"
              required
              onChange={(e) => setTag(e.target.value)}
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
                  src={imgURL}
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
              onChange={(e) => setContent(e)}
              required
            />
            <div className="flex gap-3 items-center mt-2">
              <Label htmlFor="private" value="Set as private?" />
              <ToggleSwitch
                id="private"
                checked={isPrivate}
                onChange={setIsPrivate}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:gap-10 justify-center mt-10">
          <Button gradientDuoTone="pinkToOrange" outline className="min-w-40">
            Save a draft
          </Button>
          <Button
            gradientDuoTone="pinkToOrange"
            className="min-w-40"
            type="submit"
          >
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
