import { put } from 'redux-saga/effects'

import axios from '../../axios-orders'
import * as actions from '../actions'

export function* purchaseBurgerSaga(action) {

        yield put ( actions.purchaseBurgerStart() )

        try {
            const response = yield axios.post('/orders.json?auth=' + token, orderData)
            yield put(actions.purchaseBurgerSuccess(response.data.name))
            
        } catch {

        }


        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
    }
}