import { Blockquote, Carousel, Card, Button, HR } from "flowbite-react";
import React from "react";
import imgExplore from "../assets/landingPage/explore.jpg";
import imgView from "../assets/landingPage/view-whisper.png";
import imgView2 from "../assets/landingPage/view-whisper-2.png";
import imgCreate from "../assets/landingPage/create-whisper.png";
import imgDashboard from "../assets/landingPage/dashboard-whispers.jpg";
import { HiCheck } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillMediumCircle,
  AiFillTwitterCircle,
} from "react-icons/ai";

const LandingPage = () => {
  return (
    <div className="w-full pt-20">
      {/* About Section */}
      <section id="about" className="w-full ">
        <div className="flex flex-col lg:flex-row gap-3 justify-center items-center px-40">
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
                can share and interact with posts without revealing their
                identities, fostering open and honest communication.
              </p>
            </div>
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/whisper-wall-294a0.appspot.com/o/1720426357307avatar_default.jpg?alt=media&token=71a188e4-136c-4772-89ce-6ffeceea0d94"
            className="object-cover max-h-full h-96 w-full lg:w-2/5 rounded-full"
          />
        </div>
        <HR />
        <div className="h-screen bg-gray-100 px-40">
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
        </div>
      </section>
      <HR />
      {/* Plan Comparison Section */}
      <section id="plans" className="h-screen text-center pb-10">
        <h2 className=" text-4xl font-bold">Flexible Plans</h2>
        <div className="h-full flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Basic Plan */}
          <Card className="w-80 h-4/5">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Basic Plan
            </h5>
            <p className="text-gray-700 dark:text-gray-400">
              <span className="text-gray-500 text-xs">
                Access to all whispers and personal dashboard.
              </span>
              <ul className="text-left mb-4">
                <li className="mb-2 flex items-center">
                  <HiCheck className="text-green-600" />{" "}
                  <p>Access to all basic features</p>
                </li>
                <li className="mb-2 flex items-center">
                  <HiCheck className="text-green-600" />{" "}
                  <p>Access to all basic features</p>
                </li>
                <li className="mb-2 flex items-center">
                  <HiCheck className="text-green-600" />{" "}
                  <p>Access to all basic features</p>
                </li>
              </ul>
            </p>
            <Button gradientDuoTone="pinkToOrange">Try for Free</Button>
          </Card>

          {/* Pro Plan */}
          <Card className="w-80 h-4/5">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Pro Plan
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <span className="text-gray-500 text-xs">
                Access to all whispers, personal dashboard and live chat
                channel. Receive notifications when whispers got a new message.
              </span>
              <ul className="text-left mb-4">
                <ul className="text-left mb-4">
                  <li className="mb-2 flex items-center">
                    <HiCheck className="text-green-600" />{" "}
                    <p>Access to all basic features</p>
                  </li>
                  <li className="mb-2 flex items-center">
                    <HiCheck className="text-green-600" />{" "}
                    <p>Access to all basic features</p>
                  </li>
                  <li className="mb-2 flex items-center">
                    <HiCheck className="text-green-600" />{" "}
                    <p>Access to all basic features</p>
                  </li>
                </ul>
              </ul>
            </p>
            <Button gradientDuoTone="pinkToOrange">
              Subscribe for $9.99 / month
            </Button>
            <Button gradientDuoTone="pinkToOrange" outline>
              3-day Free Trial
            </Button>
          </Card>
          {/* <Card className="w-80 h-4/5">
            <p className="text-normal font-semibold tracking-tight text-gray-900 dark:text-white">
              More plans are coming...
            </p>
          </Card> */}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="p-12 bg-gray-100 w-screen flex justify-center gap-10"
      >
        <div className="w-1/2">
          <h2 className="text-4xl font-bold mb-6">Contact</h2>
          <p className="font-mono">
            Hi, my name is Yuanhui Xu, the developer of WhisperWall. If you have
            any suggestions about it, please do not hesitate to contact me!
          </p>
          <p>Email: xuuuyuanhui@foxmail.com</p>
          <p>Phone: +86 15874741921</p>
        </div>
        <div className="flex-1 flex flex-col">
          <p>Find more projects on my portfolio</p>
          <div className="flex gap-4">
            <AiFillGithub className="w-8 h-8" />
            <AiFillTwitterCircle className="w-8 h-8" />
            <AiFillLinkedin className="w-8 h-8" />
            <AiFillMediumCircle className="w-8 h-8" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
