import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import imgpf from './imgpf.png';

const IncomingMsg = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  width: 17rem;
  padding-top: 5px;
`;

const IncomingMsgImg = styled.div`
  background-image: url(${imgpf});
  width: 2rem;
  height: 2rem;
  background-size: cover;
  align-self: self-start;
`;

const ReceivedWithdMsg = styled.div`
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  width: 14rem;
  display: flex;
  flex-direction: column;
`;

const ReceivedMsg = styled.div`
  background: #d3d3d3 none repeat scroll 0 0;
  border-radius: 3px;
  word-wrap: break-word;
  overflow-style: auto;
  padding: 6px;
  text-align: left; ;
`;

const TimeDate = styled.span`
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 2px 0 2px 0;
`;

const OutgoingMsg = styled.div`
  align-self: flex-end;
  right: 0px;
  align-content: center;
  float: right;
  margin: 1rem 0 1rem;
  width: 15rem;
`;
const SentWithdMsg = styled.div`
  float: right;
  width: 15rem;
`;
const SentMsg = styled.div`
  word-wrap: break-word;
  overflow-style: auto;
  padding: 6px;
  background: #e9e9e9 none repeat scroll 0 0;
  border-radius: 3px;
  color: #000000;
  font-size: 14px;
  text-align: right;
`;

export default function Message({ income, out, author, children, date }) {
  const [inDate, set] = useState('');
  useEffect(() => {
    if (typeof date === 'object') {
      set(
        date[3].toString(10).padStart(2, '0') +
          ':' +
          date[4].toString(10).padStart(2, '0') +
          ' | ' +
          date[1].toString(10).padStart(2, '0') +
          '/' +
          date[2].toString(10).padStart(2, '0') +
          ' | ' +
          author
      );
    } else {
      const split = date.split('T');
      const dates = split[0].split('-');
      const times = split[1].split(':');
      set(`${times[0]}:${times[1]} | ${dates[1]}/${dates[2]} | ${author}`);
    }
  }, [date, author]);
  return (
    <>
      {income && (
        <IncomingMsg>
          <IncomingMsgImg></IncomingMsgImg>
          <ReceivedWithdMsg>
            <ReceivedMsg>
              <p>{children}</p>
            </ReceivedMsg>
            <TimeDate>{inDate}</TimeDate>
          </ReceivedWithdMsg>
        </IncomingMsg>
      )}
      {out && (
        <OutgoingMsg>
          <SentWithdMsg>
            <SentMsg>
              <p>{children}</p>
            </SentMsg>
            <TimeDate>{inDate}</TimeDate>
          </SentWithdMsg>
        </OutgoingMsg>
      )}
    </>
  );
}
