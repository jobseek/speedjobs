import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useHistory, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { StyledButton, StyledHeaderDiv } from '../components/Styled';
import ChatIcon from '../components/Chatting/ChatIcon';
import ChatBox from '../components/Chatting/ChatBox';
import {
  RECRUIT_DELETE_DONE,
  RECRUIT_DELETE_REQUEST,
  RECRUIT_GET_DONE,
  RECRUIT_GET_REQUEST,
} from '../reducers/recruit';
import {
  ADD_LIKE_DONE,
  ADD_LIKE_REQUEST,
  UN_LIKE_REQUEST,
} from '../reducers/like';
import KakaoMap from '../data/KakaoMap';
import {
  RESUME_APPLY_DONE,
  RESUME_APPLY_REQUEST,
  RESUME_LIST_DONE,
  RESUME_LIST_REQUEST,
} from '../reducers/resume';

const Chatting = styled.div`
  width: 100%;
  height: 650px;
  @media (max-width: 992px) {
    height: 0;
  }
`;

// const MapWrapper = styled.div`
//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

const Choice = styled.div`
  border-radius: 5px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  background-color: white;
  width: 35%;
  height: inherit;
  z-index: 20;
  padding: 18px 25px;
  text-align: left;
  border: 1px solid #eee;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const ResumeInfo = styled.div`
  font-size: 12px;
  font-weight: lighter;
  color: #747474;
`;
const Resume = styled.div`
  //padding: 5px;
  margin-bottom: 5px;
  ${(props) =>
    props.id === props.apply &&
    css`
      background-color: #eee;
    `}
  &:hover {
    background-color: #eee;
  }
`;

export default function RecruitmentDetail(props) {
  const media = matchMedia('screen and (max-width: 768px)');
  const { id } = useParams();
  const history = useHistory();
  const [pop, setPop] = useState('none');
  const [content, setContent] = useState({
    openDate: [0, 0, 0],
    closeDate: [0, 0, 0],
  });
  const [tags, setTags] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [choice, setChoice] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const [apply, setApply] = useState({ recruitId: id, resumeId: '' });
  const dispatch = useDispatch();
  const { user, like, recruit, resume } = useSelector((state) => state);
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);
  const ButtonEvent = () => {
    if (pop === 'none') {
      setPop('inline-block');
    } else {
      setPop('none');
    }
  };
  useEffect(() => {
    if (refresh['REFRESH_TOKEN'] === undefined || user.me !== null) {
      dispatch({
        type: RECRUIT_GET_REQUEST,
        data: id,
      });
    }
  }, [dispatch, id, user.me, refresh]);
  useEffect(() => {
    if (recruit.recruitGetDone) {
      setContent(recruit.recruit);
      setTags(recruit.recruit.tags.POSITION);
      setIsFav(recruit.recruit.favorite);
      dispatch({
        type: RECRUIT_GET_DONE,
      });
    }
  }, [recruit.recruitGetDone, recruit.recruit, dispatch]);

  //  for KakaoMap
  const [, setLocation] = useState([]);

  // ????????????, ???????????? ?????? ??????
  const [experience, setExperience] = useState('');
  useEffect(() => {
    if (content.experience === 0) setExperience('??????');
    else if (content.experience < 0) setExperience('?????? ??????');
    else setExperience(content.experience + '??? ??????');
  }, [content.experience]);
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (content.status === 'REGULAR') setStatus('????????????');
    else if (content.status === 'PROCESS') setStatus('?????????');
    else if (content.status === 'END') setStatus('????????????');
    else setStatus('?????????');
  }, [content.status]);

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
    if (like.data === null) {
      return;
    }
    if (!like.addLikeDone && !like.unLikeDone) {
      return;
    }
    if (like.data.id !== id) {
      return;
    }
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

  // ????????? ????????????
  const deleteHandler = () => {
    dispatch({
      type: RECRUIT_DELETE_REQUEST,
      data: id,
    });
  };
  useEffect(() => {
    if (recruit.recruitDeleteDone) {
      dispatch({
        type: RECRUIT_DELETE_DONE,
      });
      history.goBack();
    }
  }, [recruit.recruitDeleteDone, dispatch, history]);

  // ????????? ????????????
  const submitHandler = () => {
    if (choice) {
      dispatch({
        type: RESUME_APPLY_REQUEST,
        data: apply,
      });
    }
  };
  useEffect(() => {
    if (resume.resumeListDone) {
      setResumeList([...resume.resumeList.content]);
      dispatch({
        type: RESUME_LIST_DONE,
      });
    } else if (resume.resumeApplyDone) {
      setChoice(false);
      alert('????????? ?????????????????????.');
      dispatch({
        type: RESUME_APPLY_DONE,
      });
    }
  }, [
    dispatch,
    resume.resumeApplyDone,
    resume.resumeListDone,
    resume.resumeList?.content,
  ]);
  const resumeArr = resumeList.map((item) => (
    <Resume
      id={item.id}
      apply={apply.resumeId}
      onClick={() => setApply((p) => ({ ...p, resumeId: item.id }))}
    >
      <div>{item.title}</div>
      <ResumeInfo>
        <div>{item.name}</div>
        <div>{item.contact}</div>
      </ResumeInfo>
    </Resume>
  ));
  const showRef = useRef();
  const ClickHandler = (e) => {
    if (showRef.current) {
      if (choice && !showRef.current.contains(e.target)) {
        setChoice(false);
      }
    }
  };
  useEffect(() => {
    addEventListener('click', ClickHandler, true);
    return () => {
      removeEventListener('click', ClickHandler, true);
    };
  });

  return (
    <>
      <div
        className={'container'}
        style={{
          padding: '30px 0px 0px',
          textAlign: 'left',
        }}
      >
        {/* ?????? ?????? ????????? */}
        <StyledHeaderDiv
          mobile={media.matches}
          title={`[${status}]` + content.title ?? '.....'}
        >
          {choice && (
            <Choice ref={showRef}>
              <div>????????? ??????</div>
              <div style={{ marginTop: '10px' }}>{resumeArr}</div>
              <div style={{ textAlign: 'right' }}>
                <StyledButton onClick={() => submitHandler()}>
                  ????????????
                </StyledButton>
                <StyledButton grey onClick={() => setChoice(false)}>
                  ??????
                </StyledButton>
              </div>
            </Choice>
          )}
          {user.me?.role === 'ROLE_MEMBER' &&
            (content.status === 'PROCESS' || content.status === 'REGULAR') && (
              <>
                <div style={{ flex: '0 0' }}>
                  <StyledButton
                    wide
                    onClick={() => {
                      setChoice(true);
                      dispatch({
                        type: RESUME_LIST_REQUEST,
                        data: { size: 99, page: 0 },
                      });
                    }}
                  >
                    ????????????
                  </StyledButton>
                </div>
                <div style={{ flex: '0 0' }}>
                  <StyledButton
                    white={!isFav}
                    grey={isFav}
                    onClick={(e) => {
                      if (isFav) {
                        unFavClick(e);
                      } else {
                        favClick(e);
                      }
                    }}
                  >
                    ?????????
                  </StyledButton>
                </div>
              </>
            )}
        </StyledHeaderDiv>

        {/* ?????? end*/}
        {/* ??????*/}
        <div className={'row container m-0 p-0'}>
          <div className={'col-12 col-lg-7'}>
            {/* ????????????*/}
            <div
              className={'container'}
              style={{
                display: 'block',
                borderBottom: '1px solid #eee',
                fontWeight: 'lighter',
                fontSize: '14px',
              }}
            >
              <p style={{ fontSize: '1.5em' }}>??????</p>
              <p>
                <strong>?????? :</strong>{' '}
                {tags !== {} && tags?.map((i) => i.name).join(', ')}
              </p>
              <p>
                <strong>?????? ?????? :</strong>{' '}
                {content.position === 'PERMANENT' ? '?????????' : '?????????'}
              </p>
              <p>
                <strong>?????? :</strong> {experience}
              </p>
              <p>
                <strong>?????? ?????? :</strong> {content.avgSalary}??? ???
              </p>
              <p>
                <strong>?????? ?????? :</strong> {content.scale}???
              </p>
              <p>
                <strong>?????? ????????? :</strong> {content.description}
              </p>
              {content.status !== 'REGULAR' ? (
                <p>
                  <strong>?????? ?????? :</strong> {content.openDate[0]}-
                  {content.openDate[1]}-{content.openDate[2]} ~{' '}
                  {content.closeDate[0]}-{content.closeDate[1]}-
                  {content.closeDate[2]}
                </p>
              ) : (
                ''
              )}
            </div>
            {/* ????????????*/}
            <div
              style={{
                whiteSpace: 'pre-line',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 'lighter',
              }}
              className={'container'}
            >
              {content.content ?? '....'}
            </div>
          </div>
          {/* ?????? end*/}
          {/* ??????????????????*/}
          <ChatIcon />
          <div
            className={'col-lg-5 col-12'}
            style={{ padding: '15px 5px 0px' }}
          >
            <Chatting>
              <ChatBox
                recruitId={id}
                pop={pop}
                chatName={content.title}
                button={ButtonEvent}
              />
              <ChatIcon onclick={ButtonEvent} />
            </Chatting>
            {/* <MapWrapper>*/}
            <KakaoMap address={content.address} location={setLocation} />
            <span style={{ marginTop: '5px', color: 'gray', fontSize: '14px' }}>
              {content.address}
            </span>
            {/* </MapWrapper>*/}

            {user.me?.id === content.companyId && (
              <div style={{ textAlign: 'right' }}>
                <StyledButton
                  white
                  onClick={() => history.push(`/recruitment/modify/${id}`)}
                >
                  ??????
                </StyledButton>
                <StyledButton white onClick={() => deleteHandler()}>
                  ??????
                </StyledButton>
              </div>
            )}
            {user.me?.role === 'ROLE_ADMIN' && (
              <div style={{ textAlign: 'right' }}>
                <StyledButton white onClick={() => deleteHandler()}>
                  ??????
                </StyledButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
