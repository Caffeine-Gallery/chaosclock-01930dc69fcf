import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getNewQuote' : ActorMethod<[], [string, string]>,
  'isTimerRunning' : ActorMethod<[], boolean>,
  'startTimer' : ActorMethod<[bigint], string>,
  'stopTimer' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
