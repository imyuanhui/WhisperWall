import React from "react";
import { Card } from "flowbite-react";

const DashCard = ({ post }) => {
  const stripHtmlTags = (html) => {
    const strippedString = html.replace(/<\/?[^>]+(>|$)/g, " ").trim();
    return strippedString;
  };
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const plainText = stripHtmlTags(post.content);
  const truncatedText = truncateText(plainText, 150);
  console.log(post.image);
  return (
    <Card
      className="shadow-md overflow-hidden bg-cover bg-center h-60 md:h-48 lg:h-48"
      style={{
        backgroundImage: `url(${post.image}})`,
      }}
      href={`/view-whisper/${post._id}`}
    >
      <span className="font-mono p-2 text-xl md:text-lg lg:text-sm bg-white bg-opacity-70 w-full h-full rounded-md overflow-hidden">
        {truncatedText}
      </span>
    </Card>
  );
};

export default DashCard;
