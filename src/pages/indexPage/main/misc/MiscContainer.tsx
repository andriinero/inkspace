import { Wrapper } from './MiscContainer.styled';
import MiscFollow from './MiscFollow';
import MiscTopics from './MiscTopics';

const MiscContainer = () => {
  return (
    <Wrapper>
      <MiscFollow />
      <MiscTopics />
    </Wrapper>
  );
};

export default MiscContainer;
