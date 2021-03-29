import React from 'react';
import styled from 'styled-components';
import { Facebook, Google, Linkedin, Twitter } from 'react-bootstrap-icons';

const MySns = styled.div`
  text-align: center;
  .logo {
    display: inline;
    //justify-content: space-between;

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
          <Google onClick={() => props.setSns(true)} />
          <Facebook />
          <Linkedin />
          <Twitter />
        </div>
      </MySns>
    </>
  );
}
