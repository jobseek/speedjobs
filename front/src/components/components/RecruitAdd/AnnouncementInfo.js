import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import { DataInputs } from '../Styled';
import Tags from '../Tags';

const RecruitInfo = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 35px;
`;

const RecruitDetails = styled.div`
  margin-bottom: 10px;
`;

const Recruits = styled.div`
  display: inline-block;
  width: 22%;
  margin-bottom: 10px;

  @media (max-width: 992px) {
    width: 50%;
  }
`;

const RecruitsPeriod = styled.div`
  display: inline-block;
  width: 22%;
  margin-bottom: 10px;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const RecruitLabels = styled.div`
  margin-right: 5px;
`;

const RecruitInputs = styled(DataInputs)`
  width: 90%;
`;

const RecruitDatePicker = styled(DatePicker)`
  height: 32px;
  border-radius: 10px;
  padding: 2px 0 2px 10px;
  &:focus {
    outline: none;
  }
`;

const PickerWidth = styled.div`
  div.react-datepicker-wrapper {
    width: 100%;
  }
  div.react-datepicker__input-container,
  div.react-datepicker__input-container > input {
    width: 100%;
  }
`;

export default function AnnouncementInfo({ onChange }) {
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const StartDateHandler = useCallback(
    (e) => {
      const event = { target: { name: 'startRecruit', value: e } };
      onChange(event);
    },
    [onChange]
  );
  const FinishDateHandler = useCallback(
    (e) => {
      const event = { target: { name: 'finishRecruit', value: e } };
      onChange(event);
    },
    [onChange]
  );

  const [tags] = useState([
    { name: 'backEnd', id: 0, selected: false },
    { name: 'frontEnd', id: 1, selected: false },
    { name: 'machineLearning', id: 2, selected: false },
    { name: 'infra', id: 3, selected: false },
  ]);

  return (
    <>
      <RecruitInfo>공고 정보</RecruitInfo>
      <RecruitDetails>
        <Recruits>
          <RecruitLabels>고용 형태</RecruitLabels>
          <RecruitInputs
            type="text"
            name="position"
            onChange={(e) => onChange(e)}
          />
        </Recruits>
        <Recruits>
          <RecruitLabels>경력</RecruitLabels>
          <RecruitInputs
            type="text"
            name="experience"
            onChange={(e) => onChange(e)}
          />
        </Recruits>
        <RecruitsPeriod>
          <div style={{ display: 'inline-block', width: '45%' }}>
            <RecruitLabels>기간</RecruitLabels>
            <PickerWidth>
              <RecruitDatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd"
                peekMonthDropdown
                showYearDropdown
                selected={startDate}
                onSelect={(e) => setStartDate(e)}
                onChange={(e) => StartDateHandler(e)}
              />
            </PickerWidth>
          </div>{' '}
          -{' '}
          <div style={{ display: 'inline-block', width: '45%' }}>
            <PickerWidth>
              <RecruitDatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd"
                peekMonthDropdown
                showYearDropdown
                selected={finishDate}
                onSelect={(e) => setFinishDate(e)}
                onChange={(e) => FinishDateHandler(e)}
              />
            </PickerWidth>
          </div>
        </RecruitsPeriod>
        <div
          style={{
            marginTop: '10px',
          }}
        >
          <Tags tagList={tags}>직무추가</Tags>
        </div>
        <Recruits style={{ display: 'block', width: '95%' }}>
          <RecruitLabels>공고 내용</RecruitLabels>
          <textarea
            name="content"
            placeholder="내용을 입력하세요"
            onChange={(e) => onChange(e)}
            style={{
              width: '100%',
              height: '150px',
              resize: 'none',
              outline: 'none',
            }}
          />
        </Recruits>
      </RecruitDetails>
    </>
  );
}
