import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

const Card = styled(animated.div)`
  width: 100%;
  margin: 30px auto;
  height: ${(props) => (props.height ? `${props.height}px` : '500px')};
  border-radius: 15px;
  background-color: white;
  padding: 30px 20px;
`;

export default function InfoCard({ index = 0, children, height, styleProps }) {
  const [ani, set] = useState(false);
  useEffect(() => {
    set(true);
  }, []);
  const style = useSpring({
    transform: 'translateY(0%)',
    opacity: '1',
    from: { transform: 'translateY(10%)', opacity: '0' },
    delay: 100 * index,
  });
  return (
    <>
      <Card
        height={height}
        style={ani ? { ...style, ...styleProps } : { ...styleProps }}
      >
        {children}
      </Card>
    </>
  );
}
