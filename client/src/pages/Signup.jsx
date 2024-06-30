import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errMessage, setErrMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data.message);
      if (data.success === false) {
        return setErrMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (err) {
      setErrMessage(err.message);
      console.log(errMessage);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-mono text-4xl font-bold">
            <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
              WhisperWall
            </span>
          </Link>
          <p className="text-sm mt-5">
            This a demo project. You can sign up with your own email or go to
            sign in directly with a demo account and you can find the username
            and password on that page.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form
            className="flex max-w-md flex-col gap-4"
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
                <Label value="Your email" required />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="account@email.com"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="password"
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
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex text-sm mt-5 gap-2">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
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

export default Signup;
