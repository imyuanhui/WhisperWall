import { Blockquote, Carousel, Card, Button, HR } from "flowbite-react";
import React, { useEffect, useState } from "react";
import imgExplore from "../assets/landingPage/explore.jpg";
import imgView from "../assets/landingPage/view-whisper.png";
import imgView2 from "../assets/landingPage/view-whisper-2.png";
import imgCreate from "../assets/landingPage/create-whisper.png";
import imgDashboard from "../assets/landingPage/dashboard-whispers.jpg";
import { HiArrowNarrowRight, HiCheck, HiEmojiHappy } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillMediumCircle,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const useScrollToSection = () => {
    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [location]);
  };
  useScrollToSection();
  const handleSubscribe = () => {
    return currentUser ? navigate("/purchase") : navigate("/sign-in");
  };

  const handleFreeTrial = () => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    return navigate("/purchase");
  };

  return (
    <div className="w-full pt-20 bg-gray-50">
      {/* About Section */}
      <section id="about" className="w-full">
        <div className="flex flex-col min-h-screen lg:flex-row gap-3 justify-center items-center px-40">
          <div className="flex flex-col gap-5 w-full lg:w-1/2">
            <h1 className="text-6xl font-bold flex flex-col gap-y-1.5">
              <span>Reveal your stories</span>
              <span>anonymously</span>
              <span>
                on <span className="text-pink-600">WhisperWall</span>
              </span>
            </h1>
            <div className="text-gray-500">
              <Blockquote>"Whisper Loud, Stay Hidden"</Blockquote>
              <p className="text-lg leading-7">
                WhisperWall is an anonymous social blogging platform where users
                can share and interact with whispers without revealing their
                identities, fostering open and honest communication.
              </p>
            </div>
          </div>

          <img
            src="https://firebasestorage.googleapis.com/v0/b/whisper-wall-294a0.appspot.com/o/1720426357307avatar_default.jpg?alt=media&token=71a188e4-136c-4772-89ce-6ffeceea0d94"
            className="object-cover max-h-full h-96 w-full lg:w-2/5 rounded-full"
          />
        </div>
        <div className="flex flex-col lg:flex-row h-screen bg-gray-100 lg:items-center justify-center gap-5 p-10 mt-5">
          <Carousel lideInterval={5000}>
            <img
              src={imgExplore}
              alt="explore whispers"
              className="object-cover"
            />
            <img src={imgView} alt="view whisper" className="object-cover" />
            <img
              src={imgView2}
              alt="view whisper with message board"
              className="object-cover"
            />
            <img
              src={imgCreate}
              alt="create whisper"
              className="object-cover"
            />
            <img src={imgDashboard} alt="dashboard" className="object-cover" />
          </Carousel>
          <div className="w-full lg:w-2/5 flex flex-col gap-5">
            <h5 className="text-2xl font-semibold">
              Curious about the secrets of strangers? Want to share your own
              freely?
            </h5>
            <p className="text-gray-600">
              Click to explore WhisperWall. Share your feelings, experience,
              advice, and more with complete anonymity.
            </p>

            <Link to="/explore">
              <Button
                gradientDuoTone="pinkToOrange"
                pill
                outline
                className="w-full"
              >
                Explore right now!
                <HiArrowNarrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Plan Comparison Section */}
      <section id="plans" className="h-screen text-center py-10">
        <h2 className=" text-4xl font-bold">Flexible Plans</h2>
        <div className="h-full flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Basic Plan */}
          <Card className="w-96 h-4/5 p-4">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Basic Plan
            </h5>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              <span className="text-gray-500 text-xs block mb-2">
                Unlock essential features and enjoy the full experience of
                WhisperWall
              </span>
              <ul className="text-left mb-4 space-y-2">
                <li className="flex items-center">
                  <HiCheck className="text-green-600 mr-2" />
                  <p>Access all whispers</p>
                </li>
                <li className="flex items-center">
                  <HiCheck className="text-green-600 mr-2" />
                  <p>Create whispers up to 24</p>
                </li>
                <li className="flex items-center">
                  <HiCheck className="text-green-600 mr-2" />
                  <p>Manage own whispers freely</p>
                </li>
                <li className="flex items-center">
                  <HiCheck className="text-green-600 mr-2" />
                  <p>Personalize your profile</p>
                </li>
              </ul>
            </p>
            <Link to="/explore">
              <Button gradientDuoTone="tealToLime" className="w-full">
                Try for Free
              </Button>
            </Link>
          </Card>

          {/* Pro Plan */}
          <Card className="w-96 h-4/5 p-4 border-2 border-yellow-300">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Pro Plan
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">
              <span className="text-gray-500 text-xs block mb-2">
                Enjoy enhanced features, including live chat support and
                notifications for new messages.
              </span>
              <ul className="text-left mb-4 space-y-2">
                <li className="flex items-center">
                  <HiCheck className="text-green-600 mr-2" />
                  <p>All Basic Plan features</p>
                </li>
                <li className="flex items-center">
                  <HiCheck className="text-green-600 mr-2" />
                  <p>Create unlimitted whispers</p>
                </li>
                <li className="flex items-center">
                  <HiCheck className="text-green-600 mr-2" />
                  <p>Live chat support</p>
                </li>
                <li className="flex items-center">
                  <HiCheck className="text-green-600 mr-2" />
                  <p>Real-time notifications</p>
                </li>
              </ul>
            </p>
            <Button
              gradientDuoTone="redToYellow"
              className="mb-2"
              onClick={handleSubscribe}
            >
              Subscribe for $9.99 / month
            </Button>

            <Button
              gradientDuoTone="redToYellow"
              outline
              onClick={handleFreeTrial}
            >
              3-day Free Trial
            </Button>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-20 py-12 bg-gray-100 w-screen">
        <h2 className="text-4xl font-bold mb-6">Contact</h2>
        <div className="flex justify-between gap-10">
          <div className="w-1/3">
            <p className="font-mono">
              Hi, I am Yuanhui, the developer of WhisperWall. If you have any
              suggestions about it, please do not hesitate to contact me! 😄
            </p>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex gap-3">
              <Link to="https://github.com/imyuanhui" target="_blank">
                <Button
                  color="light"
                  className="w-60 flex items-center justify-center"
                >
                  <span className="text-xl">Check my repos.</span>
                  <AiFillGithub className="w-8 h-8 ml-3" />
                </Button>
              </Link>
              <Link
                to="https://www.linkedin.com/in/yuanhui-xu-6679b528b/"
                target="_blank"
              >
                <Button
                  color="light"
                  className="w-60 flex items-center justify-center"
                >
                  <span className="text-xl">Let's connect.</span>
                  <AiFillLinkedin className="w-8 h-8 ml-3" />
                </Button>
              </Link>
              <Link to="https://medium.com/@xuyuanhui37" target="_blank">
                <Button
                  color="light"
                  className="w-60 flex items-center justify-center"
                >
                  <span className="text-xl">Read my stories.</span>
                  <AiFillMediumCircle className="w-8 h-8 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
