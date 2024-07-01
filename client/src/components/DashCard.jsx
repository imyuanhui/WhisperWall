import React from "react";
import { Card } from "flowbite-react";

const DashCard = ({ post }) => {
  return (
    <Card
      className="shadow-md overflow-hidden bg-cover bg-center h-60 md:h-48 lg:h-48"
      style={{
        backgroundImage: `url(${post.image})`,
      }}
      href={`/view-post?id=${post._id}`}
    >
      <span className="font-mono p-4 text-3xl md:text-2xl lg:text-xl">
        {post.content}
      </span>
    </Card>
  );
};

export default DashCard;
