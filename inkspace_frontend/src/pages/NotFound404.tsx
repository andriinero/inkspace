import {
  Wrapper,
  ErrorHeader,
  MessageWrapper,
  ErrorMessage,
} from './NotFound404.styled';

const NotFound404 = () => {
  return (
    <Wrapper>
      <MessageWrapper>
        <ErrorHeader>404: Page Not Found</ErrorHeader>
        <ErrorMessage>
          Sorry, but the page you are looking for doesn't exist.
        </ErrorMessage>
      </MessageWrapper>
    </Wrapper>
  );
};

export default NotFound404;
