import { FETCH_USER, } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // 로그인 상태이면 payload, 아니면 false, 기본값으로 null 반환
      return action.payload || false;
    default:
      return state;
  }
}
