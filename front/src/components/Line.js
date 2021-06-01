import React from 'react';

export default function Line(props) {
  return (
    <>
      <hr
        className="solid"
        style={{ margin: props.margin + ' 0 ' + props.margin + ' 0' }}
      ></hr>
    </>
  );
}

Line.defaultProps = {
  margin: '1px',
};
//
// Horizen.propTypes = {
//   margin: PropTypes.string,
// };
