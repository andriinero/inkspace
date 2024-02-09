import { Author } from '@/types/Author';

import * as S from './MiscFollow.styled';
import MiscAuthor from './MiscAuthor';

type MiscFollowProps = {
  authors: Author[];
};

const MiscFollow = ({ authors }: MiscFollowProps) => {
  return (
    <S.Wrapper>
      <S.Header>Who to follow</S.Header>
      <S.AuthorList>
        {authors.map((author) => (
          <MiscAuthor key={author._id} {...author} />
        ))}
      </S.AuthorList>
    </S.Wrapper>
  );
};

export default MiscFollow;
