export function AddPost(payload) {
  return {
    type: '@post/ADD_POST',
    payload: payload,
  };
}

export function UpdatePost(payload) {
  return {
    type: '@post/UPDATE_POST',
    payload: payload,
  };
}

export function DeletePost(payload) {
  return {
    type: '@post/DELETE_POST',
    payload: payload,
  };
}
