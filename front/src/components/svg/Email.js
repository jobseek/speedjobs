import React from 'react';
import styled from 'styled-components';
import { Timeline, Tween } from 'react-gsap';

const Animated = styled.div``;

export default function Email(props) {
  return (
    <>
      <Animated>
        <svg
          version="1.1"
          id="mail-icon"
          x="0px"
          y="0px"
          viewBox="96.3 -4.7 45.1 46.2"
          style={{
            enableBackground: 'new 96.3 -4.7 45.1 46.2',
            width: '80px',
            marginTop: '20px',
          }}
        >
          <path
            // className="st0"
            style={{ fill: '#5CA4A9' }}
            d="M138.2,10.5H99.5c-1.7,0-3.1,1.4-3.1,3.1v24.8c0,1.7,1.4,3.1,3.1,3.1h38.7c1.7,0,3.1-1.4,3.1-3.1V13.6
	C141.3,11.9,139.9,10.5,138.2,10.5z"
          />
          <path
            // className="st0"
            style={{ fill: '#5CA4A9' }}
            d="M125.6,30.7c-3.7-2.6-6.6-4.6-6.8-4.7l0,0L125.6,30.7z"
          />
          <Timeline
            target={
              <>
                <path
                  id="env-lid"
                  // className="st0"
                  style={{ fill: '#5CA4A9' }}
                  d="M118.9,26L118.9,26c0,0,16-11.1,21.4-14.8c-0.5-0.5-1.2-0.8-2-0.8H99.5c-0.8,0-1.5,0.3-2,0.8
	L118.9,26L118.9,26z"
                />
                <path
                  id="env-paper"
                  style={{ fill: '#E6EBE0' }}
                  d="M135.8,34.2h-33.9c-1.3,0-2.4-1.1-2.4-2.4V0.7c0-1.3,1.1-2.4,2.4-2.4h33.9
	c1.3,0,2.4,1.1,2.4,2.4v31.1C138.1,33.1,137.1,34.2,135.8,34.2z"
                />
                <path
                  id="env-line-3"
                  style={{ fill: '#CBCCCA' }}
                  d="M131.2,6.5h-24.7c-0.9,0-1.6-0.7-1.6-1.6l0,0c0-0.9,0.7-1.6,1.6-1.6h24.6
	c0.9,0,1.6,0.7,1.6,1.6l0,0C132.8,5.7,132.1,6.5,131.2,6.5z"
                />
                <path
                  id="env-line-2"
                  style={{ fill: '#CBCCCA' }}
                  d="M131.2,14.1h-24.7c-0.9,0-1.6-0.7-1.6-1.6l0,0c0-0.9,0.7-1.6,1.6-1.6h24.6
	c0.9,0,1.6,0.7,1.6,1.6l0,0C132.8,13.4,132.1,14.1,131.2,14.1z"
                />
                <path
                  id="env-line-1"
                  style={{ fill: '#CBCCCA' }}
                  d="M131.2,21.5h-24.7c-0.9,0-1.6-0.7-1.6-1.6l0,0c0-0.9,0.7-1.6,1.6-1.6h24.6
	c0.9,0,1.6,0.7,1.6,1.6l0,0C132.8,20.8,132.1,21.5,131.2,21.5z"
                />
              </>
            }
          >
            <Tween duration={1} />
            <Tween to={{ scaleY: -1, y: 1.5 }} duration={0.3} target={0} />
            <Tween
              from={{ transformOrigin: '50% 100%', scaleY: 0 }}
              to={{ scaleY: 1 }}
              duration={0.4}
              target={1}
            />
            <Tween
              from={{ scaleX: 0 }}
              to={{ scaleX: 1 }}
              stagger={0.3}
              target={2}
              duration={0.1}
            />
            <Tween
              from={{ scaleX: 0 }}
              to={{ scaleX: 1 }}
              stagger={0.3}
              target={3}
              duration={0.1}
            />
            <Tween
              from={{ scaleX: 0 }}
              to={{ scaleX: 1 }}
              stagger={0.3}
              target={4}
              duration={0.1}
            />
          </Timeline>
          <path
            style={{ fill: '#ED6A5A' }}
            d="M97.6,11.1c-0.6,0.5-1.3,1.5-1.3,2.4v24.9c0,1.7,1.4,3.1,3.1,3.1h38.8c0.8,0,1.4-0.3,2-0.7
	C137.1,38.7,97.6,11.1,97.6,11.1z"
          />
          <path
            style={{ fill: '#F4F1BB' }}
            d="M140.3,11.2c-5.4,3.7-21.4,14.8-21.4,14.8l0,0c0.2,0.1,18.2,12.7,21.3,14.8c0.7-0.6,1.2-1.4,1.2-2.3v-25
	C141.3,12.6,140.9,11.8,140.3,11.2z"
          />
        </svg>
      </Animated>
    </>
  );
}
