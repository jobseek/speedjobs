import React from 'react';
import styled from 'styled-components';
import { Kakaotalk } from '@styled-icons/simple-icons/Kakaotalk';
import { Naver } from '@styled-icons/simple-icons/Naver';
import { Github, Google } from 'react-bootstrap-icons';
import address from '../../../auth/address';

const MySns = styled.div`
  text-align: center;
  .logo {
    display: inline;
    //justify-content: space-between;

    a {
      margin: 0;
    }

    * {
      color: #d3d3d3;
      width: 30px;
      height: 30px;
      margin: 0 10px;

      :hover {
        color: #f5df4d;
      }
    }
  }

  hr {
    color: #d3d3d3;
    text-align: center;
    margin: 20px 0;
    :after {
      content: 'or';
      display: inline-block;
      position: relative;
      top: -15px;
      padding: 0 5px;
      background-color: white;
    }
  }
`;

export default function Sns(props) {
  return (
    <>
      <MySns>
        <hr />
        <div className="logo">
          <a href={`${address()}/oauth2/authorization/google`}>
            <Google onClick={() => props.setSns(true)} />
          </a>
          <a href={`${address()}/oauth2/authorization/kakao`}>
            <Kakaotalk onClick={() => props.setSns(true)} />
          </a>
          <a href={`${address()}/oauth2/authorization/github`}>
            <Github onClick={() => props.setSns(true)} />
          </a>
          <a href={`${address()}/oauth2/authorization/naver`}>
            <Naver onClick={() => props.setSns(true)} />
          </a>
        </div>
      </MySns>
    </>
  );
}
