import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(64px, 128px);
  grid-template-rows: auto auto;
  grid-template-areas: 'head head' 'body preview';
  row-gap: 0.7rem;
  column-gap: 4rem;

  padding: 1rem;
  max-width: 75ch;
`;

// #region PostHead

export const Head = styled.div`
  grid-area: head;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  font-weight: 300;
  font-size: 0.9rem;
`;

export const AuthorPfp = styled.img`
  max-width: 24px;
  border-radius: 50%;
  object-fit: contain;
`;

export const AuthorName = styled.span`
  display: inline-block;

  font-weight: 500;
`;

export const Divider = styled.span``;

export const Date = styled.span``;

// #endregion

// #region PostBody

export const Body = styled.div`
  grid-area: body;
`;

export const Title = styled.h3`
  padding-bottom: 0.5rem;

  font-size: 1.25rem;
`;

export const BodyText = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  max-width: 100%;
  overflow: hidden;

  font-family: 'Times New Roman', Times, serif;
  line-height: 1.5rem;
  text-overflow: ellipsis;
`;

// #endregion

// #region PostPreview

export const Preview = styled.div`
  grid-area: preview;
`;

export const PreviewImage = styled.img`
  max-width: 128px;
  object-fit: contain;
`;

// #endregion
