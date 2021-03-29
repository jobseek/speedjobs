import React from 'react';
import styled from 'styled-components';

const FooterDiv = styled.div`
  margin: 20px auto;
`;

export default function Footer(props) {
  return (
    <div>
      <FooterDiv>
        <h5>speedjobs</h5>@JobSeek<p>ProtoType v1</p>
      </FooterDiv>
    </div>
  );
}
