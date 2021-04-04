import React from 'react';
import { useHistory } from 'react-router';
import {
  PostTextArea,
  PostTitleInput,
  PostWriterDate,
  StyledButton,
  StyledHeaderDiv,
  TagBody,
} from '../components/Styled';

export default function PostAdd(props) {
  const history = useHistory();
  return (
    <div
      className="container text-left"
      style={{
        padding: '30px 0px 0px',
        textAlign: 'left',
      }}
    >
      <form>
        {/* 헤더*/}
        <StyledHeaderDiv fix>
          <div
            className={'container row justify-content-end'}
            style={{ paddingTop: '15px' }}
          >
            <div className={'col-md-8 col-6 p-0'} style={{ marginTop: '14px' }}>
              <PostTitleInput placeholder={'제목을 입력해주세요'} />
            </div>
            <div
              className={'col-md-4 col-6 text-right'}
              style={{ paddingRight: 0 }}
            >
              <StyledButton
                wide
                style={{ letterSpacing: '10px', paddingLeft: '20px' }}
                onClick={() => history.goBack()}
              >
                등록
              </StyledButton>
            </div>
          </div>
          <div className={'row'}></div>
        </StyledHeaderDiv>
        {/* 작성자*/}
        <div className={'container'}>
          <PostWriterDate>작성자 2020-01-01</PostWriterDate>
          {/* 태그*/}
          {/* 본문*/}
          <PostTextArea placeholder="내용을 입력하세요" rows={'20'} />
          <div style={{ marginTop: '40px' }}>
            <TagBody grey>백엔드</TagBody>
            <TagBody grey>백엔드</TagBody>
            <TagBody grey>백엔드</TagBody>
            <TagBody grey>백엔드</TagBody>
          </div>
        </div>
      </form>
    </div>
  );
}
