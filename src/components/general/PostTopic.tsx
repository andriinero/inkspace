import { ReactNode } from "react";
import { Topic } from "./PostTopic.styled";

type PostTopicProps = {
  onTopicClick?: () => void;
  className?: string;
  children?: ReactNode;
};

const PostTopic = ({ onTopicClick, className, children }: PostTopicProps) => {
  return (
    <Topic className={className} onClick={onTopicClick}>
      {children}
    </Topic>
  );
};

export default PostTopic;
