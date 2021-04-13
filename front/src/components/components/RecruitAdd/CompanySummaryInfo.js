import React, { useState } from 'react';
import { DataInputs } from '../Styled';

export default function CompanySummaryInfo({ onChange }) {
  const [summaryinfo, setSummaryinfo] = useState({ title: '', content: '' });

  return (
    <>
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
            <DataInputs type="text" onChange={onChange} />
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
            <DataInputs type="text" onChange={onChange} />
          </span>
          <span>
            <span
              style={{
                marginRight: '10px',
              }}
            >
              연락처 :
            </span>
            <DataInputs type="text" onChange={onChange} />
          </span>
        </div>
        <textarea
          placeholder="내용을 입력하세요"
          style={{
            width: '100%',
            height: '200px',
            resize: 'none',
          }}
          value={summaryInfo}
          onChange={(e) => {
            setRecruitForm((prev) => ({
              ...prev,
              summaryInfo: e.target.value,
            }));
          }}
          name="summaryInfo"
        />
      </div>
    </>
  );
}
