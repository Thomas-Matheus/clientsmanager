import produce from 'immer';

const INITIAL_STATE = {
  data: null,
  loading: false,
};

export default function clients(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@client/REQUEST': {
        draft.loading = true;
        break;
      }
      case '@client/SUCCESS': {
        draft.data = action.payload.clients;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
