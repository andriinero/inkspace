import { authorData } from '@/data/authorData';

import { Wrapper } from './MiscContainer.styled';
import MiscFollow from './MiscFollow';
import MiscTopics from './MiscTopics';

const MiscContainer = () => {
  return (
    <Wrapper>
      <MiscFollow authors={authorData} />
      <MiscTopics />
    </Wrapper>
  );
};

export default MiscContainer;
