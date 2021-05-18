import React, { useEffect, useRef, useState } from 'react';
import { useChain, useSpring, animated } from 'react-spring';
import { NavMenuContent } from '../Nav/NavMenu';

export default function NavAnimation({ children, toggle }) {
  const [animation, set] = useState(false);
  const ref = useRef();
  const refInside = useRef();
  const props = useSpring({
    ref,
    from: { height: '0%' },
    height: animation ? '100%' : '0%',
  });
  const propsInside = useSpring({
    ref: refInside,
    from: { transform: 'translateX(-30px)', opacity: '0' },
    transform: animation ? 'translateX(0px)' : 'translateX(-30px)',
    opacity: animation ? '1' : '0',
  });

  useChain(animation ? [ref, refInside] : [refInside, ref], [
    0,
    animation ? 0.3 : 0.1,
  ]);
  useEffect(() => {
    if (toggle) {
      set(true);
    } else {
      set(false);
    }
  }, [toggle]);

  return (
    <>
      <NavMenuContent style={props}>
        <animated.div style={propsInside}>{children}</animated.div>
      </NavMenuContent>
    </>
  );
}
