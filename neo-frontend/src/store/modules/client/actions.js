export function clientInRequest() {
  return {
    type: '@client/REQUEST',
  };
}

export function clientInSuccess(clients) {
  return {
    type: '@client/SUCCESS',
    payload: { clients },
  };
}

export function clientFailure() {
  return {
    type: '@client/FAILURE',
  };
}
