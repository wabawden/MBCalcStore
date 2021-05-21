export const saveCalc = (calc) => {
    return {
        type: 'SAVE_CALC',
        payload: calc
    };
};

export const fetchCalcs = () => {
    return {
        type: 'FETCH_CALCS',
        payload: null
    };
};

export const fetchCalc = (calc) => {
    return {
      type: 'FETCH_CALC',
      payload: calc
    };
  };