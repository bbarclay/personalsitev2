import { GameState, GameAction } from '../types/game';
import { GAME_VERSION } from '../config/game-config';

export const initialGameState: GameState = {
  difficulty: 'medium',
  points: 0,
  isStarted: false,
  currentEra: 0,
  character: 'drFossil',
  erasDiscovered: [],
  fossilsCollected: [],
  achievementsUnlocked: [],
  version: GAME_VERSION,
  lastPlayedAt: undefined
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        isStarted: true,
        points: 10, // Initial points
        lastPlayedAt: Date.now()
      };

    case 'UPDATE_POINTS':
      if (typeof action.payload !== 'number') {
        console.error('UPDATE_POINTS requires a number payload');
        return state;
      }
      return {
        ...state,
        points: Math.max(0, state.points + action.payload)
      };

    case 'ADD_ERA':
      if (typeof action.payload !== 'number') {
        console.error('ADD_ERA requires a number payload');
        return state;
      }
      if (state.erasDiscovered.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        currentEra: action.payload,
        erasDiscovered: [...state.erasDiscovered, action.payload]
      };

    case 'ADD_FOSSIL':
      if (typeof action.payload !== 'string') {
        console.error('ADD_FOSSIL requires a string payload');
        return state;
      }
      if (state.fossilsCollected.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        fossilsCollected: [...state.fossilsCollected, action.payload]
      };

    case 'UNLOCK_ACHIEVEMENT':
      if (typeof action.payload !== 'string') {
        console.error('UNLOCK_ACHIEVEMENT requires a string payload');
        return state;
      }
      if (state.achievementsUnlocked.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        achievementsUnlocked: [...state.achievementsUnlocked, action.payload]
      };

    case 'SET_CHARACTER':
      if (typeof action.payload !== 'string') {
        console.error('SET_CHARACTER requires a string payload');
        return state;
      }
      return {
        ...state,
        character: action.payload
      };

    case 'SET_DIFFICULTY':
      if (!['easy', 'medium', 'hard'].includes(action.payload)) {
        console.error('SET_DIFFICULTY requires a valid difficulty level');
        return state;
      }
      return {
        ...state,
        difficulty: action.payload
      };

    case 'RESET_GAME':
      return {
        ...initialGameState,
        lastPlayedAt: Date.now()
      };

    default:
      console.error('Unknown action type:', action.type);
      return state;
  }
}
