import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { StyledButton, StyledHeaderDiv } from '../components/Styled';
import ChatIcon from '../components/Chatting/ChatIcon';
import ChatBox from '../components/Chatting/ChatBox';
import { RECRUIT_GET_REQUEST } from '../../reducers/recruit';
import {
  ADD_LIKE_DONE,
  ADD_LIKE_REQUEST,
  UN_LIKE_REQUEST,
} from '../../reducers/like';

const Chatting = styled.div`
  width: 100%;
  height: 650px;
  @media (max-width: 992px) {
    height: 0;
  }
`;

export default function RecruitmentDetail(props) {
  const [pop, setPop] = useState('none');
  const [content, setContent] = useState({});
  const [isFav, setIsFav] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const recruit = useSelector((state) => state.recruit);
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);
  const { user, like } = useSelector((state) => state);
  const ButtonEvent = () => {
    if (pop === 'none') {
      setPop('inline-block');
    } else {
      setPop('none');
    }
  };
  useEffect(() => {
    if (refresh['REFRESH_TOKEN'] === undefined || user.meDone) {
      dispatch({
        type: RECRUIT_GET_REQUEST,
        data: id,
      });
    }
  }, [dispatch, id, user.meDone, refresh]);
  useEffect(() => {
    if (recruit.recruitGetDone) {
      setContent(recruit.recruit);
      setIsFav(recruit.recruit.favorite);
    }
  }, [recruit.recruitGetDone, recruit.recruit]);
  useEffect(() => {
    if (pop === 'none') {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [pop]);

  useEffect(() => {
    if (like.data === null) return;
    if (!like.addLikeDone && !like.unLikeDone) return;
    if (like.data.id !== id) return;
    if (like.addLikeDone) {
      setIsFav(true);
    } else if (like.unLikeDone) {
      setIsFav(false);
    }
    dispatch({
      type: ADD_LIKE_DONE,
    });
  }, [like.addLikeDone, like.unLikeDone, like.data, dispatch, id]);

  const favClick = useCallback(
    (e) => {
      dispatch({
        type: ADD_LIKE_REQUEST,
        data: { id },
      });
    },
    [id, dispatch]
  );

  const unFavClick = useCallback(
    (e) => {
      dispatch({
        type: UN_LIKE_REQUEST,
        data: { id },
      });
    },
    [id, dispatch]
  );

  return (
    <>
      <div
        className={'container'}
        style={{
          padding: '30px 0px 0px',
          textAlign: 'left',
        }}
      >
        {/* 제목 지원 찜하기 */}
        <StyledHeaderDiv>
          <div className={'container row justify-content-end'}>
            <div className={'col-md-8 col-4 p-0'} style={{ marginTop: '14px' }}>
              <h5>{content.title ?? '.....'}</h5>
            </div>
            <div className={'col-md-3 col-4 text-right'}>
              <StyledButton wide>지원하기</StyledButton>
            </div>
            <div className={'col-md-1 col-3 text-right'}>
              <StyledButton
                white={!isFav}
                grey={isFav}
                onClick={(e) => {
                  if (isFav) unFavClick(e);
                  else favClick(e);
                }}
              >
                찜하기
              </StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>

        {/* 제목 end*/}
        {/* 본문*/}
        <div className={'row container m-0 p-0'}>
          <div className={'col-12 col-lg-7'}>
            {/* 요약정보*/}
            <div
              className={'container'}
              style={{
                display: 'block',
                borderBottom: '1px solid #eee',
              }}
            >
              <p>요약</p>
              <p>직무 : 백엔드 프론트엔드</p>
              <p>고용형태 : 정규직</p>
              <p>경력 : 경력무관</p>
              <p>회사규모 : {content.scale}명</p>
              <p>주요서비스 : 앱개발</p>
              <p>채용기간 : 상시채용</p>
            </div>
            {/* 업무소개*/}
            <div
              style={{ whiteSpace: 'pre-line', padding: '14px' }}
              className={'container'}
            >
              {content.content ?? '....'}
            </div>
          </div>
          {/* 요약 end*/}
          {/* 채팅컴포넌트*/}
          <ChatIcon />
          <div
            className={'col-lg-5 col-12'}
            style={{ padding: '15px 5px 0px' }}
          >
            <Chatting>
              <ChatBox pop={pop} button={ButtonEvent} />
              <ChatIcon onclick={ButtonEvent} />
            </Chatting>
          </div>
        </div>
        {/* <StyledButton hcenter wide>*/}
        {/*  지원*/}
        {/* </StyledButton>*/}
        {/* 본문end*/}
      </div>
    </>
  );
}
