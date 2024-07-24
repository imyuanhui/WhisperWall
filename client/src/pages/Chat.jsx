import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBubble from "../components/ChatBubble";
import { io } from "socket.io-client";
import { Button, TextInput } from "flowbite-react";

const Chat = () => {
  const { channel } = useParams();
  const [pseudonym, setPseudonym] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const newSocket = io("http://localhost:3000");
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [setSocket]);

  const [socket, setSocket] = useState(null);

  // let socket;

  // const joinChannel = () => {
  //   console.log(socket);
  //   if (socket && channel) {
  //     setPseudonym("whisper" + Math.floor(Math.random() * 1000 + 1000));
  //     socket.emit("joinChannel", {
  //       pseudonym: pseudonym,
  //       channel: channel,
  //     });
  //   }
  // };

  const sendMessage = () => {
    console.log(socket);
    if (message) {
      socket.emit("message", { author: pseudonym, text: message });
      setMessage("");
    }
  };

  useEffect(() => {
    // socket = io("http://localhost:3000");
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    setPseudonym("whisper" + Math.floor(Math.random() * 1000 + 1000));

    console.log(socket);

    newSocket.emit("joinChannel", {
      pseudonym: pseudonym,
      channel: channel,
    });

    newSocket.on("message", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    newSocket.on("channelData", ({ users }) => setUsers(users));
  }, [channel]);

  return (
    <div className="w-screen flex flex-col justify-start items-center">
      <h1>
        chat at {channel}, real-time online whispers: {users.length}
      </h1>
      <div className="flex flex-col w-4/5 md:w-1/2">
        <div className="flex flex-col w-full h-2/3 gap-2 mb-10">
          {messages.map((message, index) => (
            <div key={index}>
              <ChatBubble pseudonym={pseudonym} message={message} />
            </div>
          ))}
        </div>
        <div className="w-screen fixed left-0 bottom-2">
          <div className="flex justify-center gap-2 w-full">
            <TextInput
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-1/3"
            />
            <Button
              onClick={sendMessage}
              gradientDuoTone="pinkToOrange"
              outline
            >
              send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
