import React, {useState, useEffect} from 'react';

export const Enough = props => {
  const [enoughButton, setEnoughButton] = useState(true);

  useEffect(() => {
    if (props.turns === 5) setEnoughButton(false);
    return () => {};
  });

  return (
    <>
      <button
        disabled={enoughButton}
        className="enough-bt"
        onClick={() => props.onClick()}
      >
        Enough!
      </button>
    </>
  );
};

export default Enough