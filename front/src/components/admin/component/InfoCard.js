import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

const Card = styled(animated.div)`
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}` : '100%')};
  border-radius: 15px;
  background-color: white;
`;

export default function InfoCard({ index = 0, children, height, styleProps }) {
  const [ani, set] = useState(false);
  useEffect(() => {
    set(true);
  }, []);
  const style = useSpring({
    opacity: '1',
    from: { opacity: '0' },
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
