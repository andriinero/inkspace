import styled from 'styled-components';

export const AuthorItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

export const Name = styled.span`
  display: inline-block;

  font-weight: 500;
`;

export const Icon = styled.img`
  width: 32px;
  height: auto;
  border-radius: 50%;
`;

export const FollowButton = styled.input`
  padding: 0.5rem 0.8rem;
  background-color: ${({ theme }) => theme.color.topic_bg};
  border: 1px solid ${({ theme }) => theme.color.topic_border};
  border-radius: 16px;

  color: ${({ theme }) => theme.color.text_clr_primary};
  font-size: 0.9rem;

  cursor: pointer;
`;
