import React from 'react';
import { CenterContainer } from '../components/Styled';
import RegisterContents from '../components/Registration/RegisterContents';

export default function MemberRegistration() {
  return (
    <>
      <form style={{ padding: '0 10px' }}>
        <CenterContainer className="container text-left">
          <div style={{ marginTop: '40px' }}>
            <div className="row justify-content-center">
              <div className={'col-12 col-lg-10'}>
                <RegisterContents />
              </div>
            </div>
          </div>
        </CenterContainer>
      </form>
    </>
  );
}
