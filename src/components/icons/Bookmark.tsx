import AppIcon from "./AppIcon";

type BookmarkProps = {
  onBookmarked: () => void;
  className?: string;
  isBookmarked: boolean;
};

const Bookmark = ({ onBookmarked, className, isBookmarked }: BookmarkProps) => {
  const bookmarkSrc = isBookmarked ? '/bookmark.svg' : '/bookmark-outline.svg';

  return (
    <AppIcon
      onIconClick={onBookmarked}
      className={className}
      src={bookmarkSrc}
      alt="Bookmark Icon"
    />
  );
};

export default Bookmark;
