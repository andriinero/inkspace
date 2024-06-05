import { GeneralAuthorData } from "@/types/entityData/GeneralAuthorData";

import * as S from "./PostItemHead.styled";

type PostItemHeadProps = {
  author: GeneralAuthorData;
  postDate: string;
};

const PostItemHead = ({ author, postDate }: PostItemHeadProps) => {
  return (
    <S.Head>
      <S.StyledLink to={`/authors/${author._id}`}>
        <S.AuthorIcon
          imageId={author.profile_image}
          placeholderSrc="/portrait-placeholder.png"
          altText="Author Icon"
        />
      </S.StyledLink>
      <S.StyledLink to={`/authors/${author._id}`}>
        <S.StyledUsername>{author.username}</S.StyledUsername>
      </S.StyledLink>
      <S.Divider>·</S.Divider>
      <S.StyledPostDate date={postDate} />
    </S.Head>
  );
};

export default PostItemHead;
