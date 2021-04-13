import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  DataInputs,
  PostTitleInput,
  StyledButton,
  StyledHeaderDiv,
} from '../components/Styled';
import Tags from '../components/Tags';

import { RECRUIT_GET_REQUEST } from '../../reducers/recruitment';

export default function RecruitAdd() {
  const dispatch = useDispatch();
  const [tags] = useState([
    { name: 'Backend', id: 0, selected: false },
    { name: 'Frontend', id: 1, selected: false },
    { name: 'Fullstack', id: 2, selected: false },
  ]);
  const [recruitForm, setRecruitForm] = useState({
    title: '',
    content: '',
    detailInfo: '',
    companyName: '',
    releaseDate: '',
    dueDate: '',
    companyScale: '',
    contact: '',
    summaryInfo: '',
    requisite: '',
    employmentType: '',
    recruitTagList: '',
  });
  const post = useSelector((state) => state.recruitment);
  const onChangeHandler = useCallback((e) => {
    setRecruitForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const SubmitHandler = () => {
    dispatch({
      type: RECRUIT_GET_REQUEST,
      data: recruitForm,
    });
  };

  return (
    <div
      className="container text-left"
      style={{
        padding: '30px 0px 0px',
        textAlign: 'left',
      }}
    >
      <form onChange={console.log(recruitForm)}>
        {/* 헤더 */}
        <StyledHeaderDiv fix>
          <div
            className={'container row justify-content-end'}
            style={{ paddingTop: '15px' }}
          >
            <div className={'col-md-9 col-4 p-0'} style={{ marginTop: '14px' }}>
              <PostTitleInput
                name="title"
                value={recruitForm.title}
                placeholder={'제목을 입력해주세요'}
                onChange={(e) => {
                  onChangeHandler(e);
                  console.log(recruitForm);
                }}
              />
            </div>
            <div className={'col-md-3 col-3 text-right'}>
              <StyledButton
                wide
                style={{ letterSpacing: '10px', paddingLeft: '20px' }}
                onClick={(e) => SubmitHandler(e)}
              >
                등록
              </StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>
        {/* 내용 */}
        <div className={'container'}>
          <div
            style={{
              marginBottom: '30px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
              }}
            >
              <div
                style={{
                  marginBottom: '5px',
                }}
              >
                공고시작일자
              </div>
              <DataInputs
                type="text"
                name="releaseDate"
                value={recruitForm.releaseDate}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span
              style={{
                display: 'inline-block',
              }}
            >
              <div
                style={{
                  marginBottom: '5px',
                }}
              >
                공고마감일자
              </div>
              <DataInputs
                type="text"
                name="dueDate"
                value={recruitForm.dueDate}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </span>
          </div>
          {/* 회사 요약정보 */}
          {/* 공고정보 */}
          <div
            style={{
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                marginBottom: '10px',
              }}
            >
              회사 요약정보
            </div>
            <div
              style={{
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  marginRight: '40px',
                }}
              >
                <span
                  style={{
                    marginRight: '10px',
                  }}
                >
                  회사이름 :
                </span>
                <DataInputs
                  type="text"
                  name="companyName"
                  value={recruitForm.companyName}
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                />
              </span>
              <span
                style={{
                  display: 'inline-block',
                  marginRight: '40px',
                }}
              >
                <span
                  style={{
                    marginRight: '10px',
                  }}
                >
                  회사규모 :
                </span>
                <DataInputs
                  type="text"
                  name="companyScale"
                  value={recruitForm.companyScale}
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                />
              </span>
              <span>
                <span
                  style={{
                    marginRight: '10px',
                  }}
                >
                  연락처 :
                </span>
                <DataInputs
                  type="text"
                  name="contact"
                  value={recruitForm.contact}
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                />
              </span>
            </div>
            <textarea
              placeholder="내용을 입력하세요"
              style={{
                width: '100%',
                height: '200px',
                resize: 'none',
              }}
              name="summaryInfo"
              value={recruitForm.summaryInfo}
              onChange={(e) => {
                onChangeHandler(e);
              }}
            />
          </div>
          <div
            style={{
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                marginBottom: '10px',
              }}
            >
              공고 정보
            </div>
            <div
              style={{
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  marginRight: '40px',
                }}
              >
                <span
                  style={{
                    marginRight: '10px',
                  }}
                >
                  경력 요구사항 :
                </span>
                <DataInputs
                  type="text"
                  name="requisite"
                  value={recruitForm.requisite}
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                />
              </span>
              <span
                style={{
                  display: 'inline-block',
                  marginRight: '40px',
                }}
              >
                <span
                  style={{
                    marginRight: '10px',
                  }}
                >
                  고용형태 :
                </span>
                <DataInputs
                  type="text"
                  name="employmentType"
                  value={recruitForm.employmentType}
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                />
              </span>
            </div>
            <textarea
              style={{
                width: '100%',
                height: '200px',
                resize: 'none',
              }}
              name="detailInfo"
              value={recruitForm.detailInfo}
              onChange={(e) => {
                onChangeHandler(e);
                console.log(recruitForm);
              }}
            >
              글입력
            </textarea>
          </div>
          {/* 태그*/}
          <div
            style={{
              marginTop: '20px',
            }}
          >
            <Tags tagList={tags}>직무추가</Tags>
          </div>
        </div>
      </form>
    </div>
  );
}
