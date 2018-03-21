import { FETCH_USER, DELETE_WISHLIST_ITEM } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // 로그인 상태이면 payload, 아니면 false, 기본값으로 null 반환
      return action.payload || false;
    case DELETE_WISHLIST_ITEM:
      return action.payload;
    default:
      return state;
  }
}
