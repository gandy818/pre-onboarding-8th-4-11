const LOAD_COMMENT = "comment/LOAD_COMMENT";
const ADD_COMMENT = "comment/ADD_COMMENT";
const UPDATE_COMMENT = "comment/UPDATE_COMMENT";
const UPDATE_MODE = "comment/UPDATE_MODE";
const DELETE_COMMENT = "comment/DELETE_COMMENT";

export const loadComment = (comments) => ({
  type: LOAD_COMMENT,
  payload: comments,
});

export const addComment = (comments) => ({
  type: ADD_COMMENT,
  payload: comments,
});

export const updateComment = (comments) => ({
  type: UPDATE_COMMENT,
  payload: comments,
});

export const updateMode = (comments) => ({
  type: UPDATE_MODE,
  payload: comments,
});

export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: id,
});

const INITIAL_STATE = {
  comments: [],
};

export default function commentReducer(
  state = INITIAL_STATE,

  { type, payload }
) {
  switch (type) {
    case LOAD_COMMENT:
      return {
        comments: [...state.comments, ...payload],
      };

    case ADD_COMMENT:
      return {
        comments: [
          ...state.comments,
          {
            id: payload.id,
            author: payload.author,
            content: payload.content,
            createdAt: payload.createdAt,
            profile_url: payload.profile_url,
          },
        ],
      };
    case UPDATE_MODE: {
      console.log(payload);
      return state;
    }
    case UPDATE_COMMENT:
      state.comments.map((comment) => {
        if (comment.id === payload.id) {
          console.log(payload);
        }
      });
      return state;

    case DELETE_COMMENT:
      return {
        comments: state.comments.filter((comment) => {
          return comment.id !== payload;
        }),
      };

    default:
      return state;
  }
}
