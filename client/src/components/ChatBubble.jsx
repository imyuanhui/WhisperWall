const ChatBubble = ({ message: { author, text, time }, pseudonym }) => {
  if (author === pseudonym) {
    return (
      <div className="flex w-full justify-end">
        <div className="max-w-2/3 flex flex-col items-end gap-1">
          <p className="text-sm text-gray-700">{author}</p>
          <p className="bg-rose-400 text-gray-100 p-2 rounded-xl">{text}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full justify-start">
        <div className="max-w-2/3 flex flex-col items-start gap-1">
          <p className="text-sm text-gray-700">{author}</p>
          <p className="bg-yellow-400 text-gray-50 p-2 rounded-xl">{text}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
    );
  }
};

export default ChatBubble;
