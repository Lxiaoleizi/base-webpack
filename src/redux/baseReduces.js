import { fromJS } from 'immutable';

import { baseActions } from './baseActions';

const initialState = fromJS({
    count: 0,
});

export default (state = initialState, action) => {
    const count = state.get('count');

    switch (action.type) {
        case baseActions.ADD_COUNT:
            return state.set('count', count + 1);
        case baseActions.SUB_COUNT:
            // const subCount = state.get('count');
            return state.set('count', count - 1);
        default:
            return state;
    }
};
