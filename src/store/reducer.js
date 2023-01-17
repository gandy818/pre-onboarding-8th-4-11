import { apis } from "../apis/api";

const initialState = {
  profile_url: "",
  author: "",
  content: "",
  createdAt: "",
};

const data = [];

//store를 어떻게 바꿀것인가
const reducers = async (state, action) => {
  if (state === undefined) {
    return {
      state: initialState,
    };
  }

  switch (action.type) {
    case "update":
      const { data } = await apis.getComments();
      state = data;
      console.log(state);
      return state;

    default:
      return state;
  }
};

export default reducers;
