import React from 'react';
import { CenterConatainer } from '../components/Styled';
import RegisterContents from '../components/Registration/RegisterContents';

export default function MemberRegistration(props) {
  return (
    <>
      <form style={{ padding: '0 10px' }}>
        <CenterConatainer className="container text-left">
          <div style={{ marginTop: '40px' }}>
            <div className="row justify-content-center">
              <div className={'col-12 col-lg-10'}>
                <RegisterContents />
              </div>
            </div>
          </div>
        </CenterConatainer>
      </form>
    </>
  );
}
