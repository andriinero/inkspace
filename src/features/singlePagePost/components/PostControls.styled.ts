import AppIcon from '@/components/icons/AppIcon';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  padding: 0.8rem;
  border-top: 1px solid ${({ theme }) => theme.color.post_border_controls};
  border-bottom: 1px solid ${({ theme }) => theme.color.post_border_controls};
`;

export const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ControlsIcon = styled(AppIcon)`
  width: 20px;
  height: 20px;
`;

export const LikeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

export const LikeCount = styled.span`
  font-size: 0.8rem;
  font-weight: 300;
`;
