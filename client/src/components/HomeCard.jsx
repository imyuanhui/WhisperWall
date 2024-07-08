import { Card } from "flowbite-react";
import { stripHtmlTags, truncateText } from "../utils/formatText.js";
import { useSelector } from "react-redux";

const HomeCard = ({ post }) => {
  const plainText = stripHtmlTags(post.content);
  const truncatedText = truncateText(plainText, 85);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Card
      className="shadow-md overflow-hidden bg-cover bg-center h-60 md:h-48 lg:h-48"
      style={{
        backgroundImage: `url(${post.image})`,
      }}
      href={currentUser ? `/view-whisper/${post._id}` : `/sign-up`}
    >
      <span className="font-mono p-2 text-3xl md:text-2xl lg:text-xl bg-white bg-opacity-70 w-full h-full rounded-md overflow-hidden">
        {truncatedText}
      </span>
    </Card>
  );
};
export default HomeCard;
