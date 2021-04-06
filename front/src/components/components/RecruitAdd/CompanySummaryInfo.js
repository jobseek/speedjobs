import React from 'react';
import { DataInputs } from '../Styled';

export default function CompanySummaryInfo({ onChange }) {
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
            <DataInputs type="text" />
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
            <DataInputs type="text" />
          </span>
          <span>
            <span
              style={{
                marginRight: '10px',
              }}
            >
              연락처 :
            </span>
            <DataInputs type="text" />
          </span>
        </div>
        <textarea
          placeholder="내용을 입력하세요"
          style={{
            width: '100%',
            height: '200px',
            resize: 'none',
          }}
          onChange={onChange}
        />
      </div>
    </>
  );
}
