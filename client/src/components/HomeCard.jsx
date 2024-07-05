import { Card } from "flowbite-react";
import { stripHtmlTags, truncateText } from "../utils/formatText.js";
import { useSelector } from "react-redux";

const HomeCard = ({ post }) => {
  const plainText = stripHtmlTags(post.content);
  const truncatedText = truncateText(plainText, 150);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Card
      className="shadow-md overflow-hidden bg-cover bg-center h-60 md:h-48 lg:h-48"
      style={{
        backgroundImage: `url(${post.image})`,
      }}
      href={currentUser ? `/view-whisper/${post._id}` : `/sign-up`}
    >
      <span className="font-mono p-4 text-3xl md:text-2xl lg:text-xl">
        {truncatedText}
      </span>
    </Card>
  );
};
export default HomeCard;
