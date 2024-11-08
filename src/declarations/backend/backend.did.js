export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getNewQuote' : IDL.Func([], [IDL.Text, IDL.Text], []),
    'isTimerRunning' : IDL.Func([], [IDL.Bool], ['query']),
    'startTimer' : IDL.Func([IDL.Nat], [IDL.Text], []),
    'stopTimer' : IDL.Func([], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
