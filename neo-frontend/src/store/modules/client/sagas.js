import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { clientInSuccess, clientFailure } from './actions';

export function* clientRequest({ payload }) {
  try {
    const response = yield call(api.get, 'client', payload);

    const clients = response.data;

    yield put(clientInSuccess(clients));
  } catch (err) {
    console.log(err);
    toast.error('We had a problem trying to recover customers.');
    yield put(clientFailure());
  }
}

export default all([takeLatest('@client/REQUEST', clientRequest)]);
