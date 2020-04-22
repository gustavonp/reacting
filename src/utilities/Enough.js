import React from 'react';

export const Enough = props =>(
  <>
    <button
      className="enough-bt"
      onClick={() => props.onClick()}
    >
      Enough!
    </button>
  </>
);

export default Enough