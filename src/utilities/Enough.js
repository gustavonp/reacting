import React, {useState, useEffect, useContext} from 'react';
import { ConfigContext } from '../App';

export const Enough = props => {
  const [enoughButton, setEnoughButton] = useState(true);
  
  useEffect(() => {
    if (props.turns === context.isEnough) setEnoughButton(false);
    return () => {};
  });

  const context = useContext(ConfigContext);

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