import { HollowButton } from '@/components/styled/HollowButton';
import styled from 'styled-components';

export const Wrapper = styled.li``;

export const TopicButton = styled(HollowButton)`
  padding: 0.6rem 0.9rem;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.topic_bg_selected : theme.color.topic_bg};

  color: ${({ theme }) => theme.color.text_primary};

  // TODO: topic route
  cursor: default;
`;
