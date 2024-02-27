import { RefObject, useEffect } from 'react';

const useCloseDropdown = (
  ref: RefObject<HTMLElement | null>,
  onWindowClick: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onWindowClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onWindowClick]);
};

export default useCloseDropdown;
