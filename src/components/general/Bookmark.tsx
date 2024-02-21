import { BookmarkIcon } from './Bookmark.styled';

type BookmarkProps = {
  onBookmarked: () => void;
  className?: string;
  isBookmarked: boolean;
  altText: string;
};

const Bookmark = ({ onBookmarked, className, isBookmarked, altText }: BookmarkProps) => {
  const bookmarkSrc = isBookmarked ? '/bookmark.svg' : '/bookmark-outline.svg';

  return (
    <BookmarkIcon
      onClick={onBookmarked}
      className={className}
      src={bookmarkSrc}
      alt={altText}
    />
  );
};

export default Bookmark;
