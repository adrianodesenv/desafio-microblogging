import produce from 'immer';

import formatDate from '../../../utils/formatDate';
import Posts from '../../../assets/Post.json';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IPost {
  id: string;
  text: string;
  created_at: string;
  formattedDate: string;
  user: IUser;
}

function orderBy(elem): IPost[] {
  elem.map((elem: IPost) => {
    const date = new Date(elem.created_at);
    elem.formattedDate = formatDate(Number(date));
    return elem;
  });

  elem.sort(function (a, b) {
    var dateA = new Date(a.created_at),
      dateB = new Date(b.created_at);
    return dateB - dateA;
  });

  return elem;
}

let listaPosts = orderBy(Posts);

const INITIAL_STATE = {
  lista: listaPosts,
};

function addPost(posts: IPost[]) {
  let postOrdenadoPorData = orderBy(posts);
  return postOrdenadoPorData;
}

function updatePost(posts: IPost[], post: IPost) {
  let listaPost = posts.map((elem) => {
    if (elem.id === post.id) {
      elem = post;
    }
    return elem;
  });

  return listaPost;
}

function deletePost(posts: IPost[], id: string) {
  let listaPost = posts.filter((post) => post.id !== id);
  return listaPost;
}

export default function post(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@post/ADD_POST': {
        draft.lista = addPost([...state.lista, action.payload]);
        break;
      }
      case '@post/UPDATE_POST': {
        draft.lista = updatePost(state.lista, action.payload);
        break;
      }
      case '@post/DELETE_POST': {
        draft.lista = deletePost(state.lista, action.payload);
        break;
      }
      default:
    }
  });
}
