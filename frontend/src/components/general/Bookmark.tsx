import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import AppIcon from './AppIcon';

type BookmarkProps = {
  onBookmarked: () => void;
  className?: string;
  isBookmarked: boolean;
};

const Bookmark = ({ onBookmarked, className, isBookmarked }: BookmarkProps) => {
  return (
    <AppIcon onClick={onBookmarked} className={className}>
      {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
    </AppIcon>
  );
};

export default Bookmark;
