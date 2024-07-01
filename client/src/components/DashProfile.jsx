import { TextInput, Button, Alert } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const { username, email } = currentUser;
  const [imgFile, setImgFile] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadErr, setImgUploadErr] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({});
  const [updateErr, setUpdateErr] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const dispatch = useDispatch();

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
    }
  }, [imgFile]);

  const handleChange = (e) => {
    setFormData(Object.assign(formData, { [e.target.id]: e.target.value }));
    console.log(formData);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateErr(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateErr("No changes made");
      return;
    }
    if (imgUploading) {
      setUpdateErr("Please wait for image to upload");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/:${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateErr(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUpdateErr(err.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={handleUpdate}>
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
        <TextInput
          id="username"
          type="text"
          defaultValue={username}
          onChange={handleChange}
          required
        />
        <TextInput
          id="email"
          type="email"
          placeholder="name@flowbite.com"
          defaultValue={email}
          onChange={handleChange}
          required
        />
        <TextInput
          id="password"
          type="password"
          placeholder="********"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="pinkToOrange"
          outline
          disabled={loading || imgUploading}
        >
          {loading ? "Loading" : "Update"}
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5 text-sm">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateErr && (
        <Alert color="failure" className="mt-5">
          {updateErr}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default DashProfile;
