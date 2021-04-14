import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

const Card = styled(animated.div)`
  width: 100%;
  min-width: 300px;
  margin: 30px auto;
  height: 100%;
  min-height: 400px;
  border-radius: 15px;
  background-color: white;
`;

export default function InfoCard({ index = 0, children }) {
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
      <Card style={ani ? style : {}}>{children}</Card>
    </>
  );
}
