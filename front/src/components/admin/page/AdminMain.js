import React from 'react';
import InfoCard from '../component/InfoCard';
import UserChart from '../data/UserChart';
import { Content, Header } from '../component/adminStyled';

export default function AdminMain(props) {
  return (
    <>
      <div className={'row'} style={{ height: '100%' }}>
        <div className={'col-6'}>
          <InfoCard index={1}>
            <Header>통계</Header>
            <Content>
              사이트의 전체적인 동향을 알수있습니다
              <br />
              차트때문에 애니메이션효과가 많아서 동작이느려서..... 수정할 생각을
              해야될수도
            </Content>
          </InfoCard>
        </div>
        <div className={'col-6'}>
          <InfoCard
            index={2}
            height={'48%'}
            styleProps={{ marginBottom: '4%' }}
          >
            <UserChart></UserChart>
          </InfoCard>
          <InfoCard index={3} height={'48%'}>
            <UserChart></UserChart>
          </InfoCard>
        </div>
      </div>
    </>
  );
}
