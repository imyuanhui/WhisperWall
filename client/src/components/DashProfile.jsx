import { TextInput, Button, Alert } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { username, email } = currentUser;
  const [imgFile, setImgFile] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadErr, setImgUploadErr] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const filePickerRef = useRef();
  console.log(imgUploadProgress, imgUploadErr);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setImgURL(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImgUploadErr(null);
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    if (imgFile) {
      uploadImage();
    }
  }, [imgFile]);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-5">
        <input
          type="file"
          accept="image/*"
          onChange={handleImgChange}
          ref={filePickerRef}
          hidden
        />
        <div className="w-40 h-40 self-center">
          <CircularProgressbarWithChildren
            value={imgUploadProgress}
            styles={{
              path: {
                stroke: `rgba(237, 180, 28, ${imgUploadProgress / 100})`,
              },
            }}
          >
            <img
              src={imgFile ? imgURL : currentUser.profilePicture}
              alt="avatar"
              className="rounded-full w-32 h-32 object-cover"
              onClick={() => filePickerRef.current.click()}
            />
          </CircularProgressbarWithChildren>
        </div>

        {imgUploadErr && <Alert color="failure">{imgUploadErr}</Alert>}
        <TextInput id="username" type="text" defaultValue={username} />
        <TextInput
          id="email"
          type="email"
          placeholder="name@flowbite.com"
          value={email}
          required
        />
        <TextInput
          id="password"
          type="password"
          placeholder="********"
          required
        />
        <Button type="submit" gradientDuoTone="redToYellow" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5 text-sm">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
