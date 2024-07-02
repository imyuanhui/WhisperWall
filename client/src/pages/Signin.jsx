import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Checkbox,
  Label,
  Spinner,
  TextInput,
  Clipboard,
} from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrMessage(null);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setErrMessage(data.message);
        return dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        setLoading(false);
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      setErrMessage(err.message);
      dispatch(signInFailure(err.message));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex p-3 mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1 max-w-md">
          <Link to="/" className="font-mono text-4xl font-bold">
            <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
              WhisperWall
            </span>
          </Link>
          <p className="text-sm mt-5 mb-2 font-mono">
            This is a demo project. You can either sign up with your own email
            or sign in directly using the demo account:
          </p>
          <div className="flex flex-col gap-1">
            <div className="relative flex items-center gap-1">
              <Label value="Username:" className="w-20 font-mono" />
              <div>
                <span className="font-mono text-sm bg-yellow-50 rounded-md p-1">
                  whisper_demo
                </span>
                <Clipboard.WithIcon valueToCopy="whisper_demo" />
              </div>
            </div>
            <div className="relative flex items-center gap-1">
              <Label value="Password:" className="w-20 font-mono" />
              <div>
                <span className="font-mono text-sm bg-yellow-50 rounded-md p-1">
                  whisper_demo@gmail.com
                </span>
                <Clipboard.WithIcon valueToCopy="whisper_demo@gmail.com" />
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex-1">
          <form
            className="flex max-w-md min-w-72 flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="mb-2 block">
                <Label value="Your username" />
              </div>
              <TextInput
                id="username"
                type="text"
                placeholder="username"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="********"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button
              type="submit"
              gradientDuoTone="pinkToOrange"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex text-sm mt-5 gap-2">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errMessage && (
            <Alert className="mt-5" color="failure">
              {errMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
