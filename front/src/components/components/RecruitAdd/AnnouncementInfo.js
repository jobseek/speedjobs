import React from 'react';
import { DataInputs } from '../Styled';

export default function AnnouncementInfo() {
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
              고용형태 :
            </span>
            <DataInputs type="text" />
          </span>
        </div>
        <textarea
          style={{
            width: '100%',
            height: '200px',
            resize: 'none',
          }}
        >
          글입력
        </textarea>
      </div>
    </>
  );
}
