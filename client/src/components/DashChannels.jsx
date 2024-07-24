import { Card, Modal, Button, TextInput, Label } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DashChannels = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [channel, setChannel] = useState("");
  const [pseudonym, setPseudonym] = useState("");
  const navigate = useNavigate();

  const handleClick = (channel) => {
    setChannel(channel);
    // setIsOpen(true);
    handleJoin();
  };

  const handleJoin = () => {
    navigate(`/chat/${channel}`);
  };

  // const handleBack = () => {
  //   setChannel("");
  //   setPseudonym("");
  //   setIsOpen(false);
  // };

  return (
    <div className="flex flex-col p-5">
      <Card className="max-w-sm bg-yellow-100">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Wooooork!
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Spill your office tea, secret rants, and the occasional "oops" moments
          from the 9-to-5 grind. Share your dark workplace
          confessions—anonymously, of course!
        </p>
        {/* <Button onClick={() => handleClick("work")}>Join this channel</Button> */}
        <Button onClick={() => navigate("/chat/work")} color="yellow">
          Join this channel
        </Button>
      </Card>
      {/* <Modal show={isOpen}>
        <Modal.Body>
          <p>Make up a name you would like to use in the channel.</p>
          <Label value="Pseudonym" />
          <TextInput onChange={(e) => setPseudonym(e.target.value)} />
          <Button onClick={handleJoin}>Join Channel</Button>
          <Button onClick={handleBack}>Back</Button>
        </Modal.Body>
      </Modal> */}
    </div>
  );
};

export default DashChannels;
