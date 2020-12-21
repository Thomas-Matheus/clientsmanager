import { all } from 'redux-saga/effects';

import clients from './client/sagas';

export default function* rootSaga() {
  return yield all([clients]);
}
