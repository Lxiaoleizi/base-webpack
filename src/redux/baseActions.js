import { keyMirror } from '../utils/mixin';

const baseActions = keyMirror({
    SUB_COUNT: '',
    ADD_COUNT: '',
});

function _addCount() {
    return {
        type: baseActions.ADD_COUNT,
    };
}

function _subCount() {
    return {
        type: baseActions.SUB_COUNT,
    };
}

const baseActionCreator = {
    addCount: _addCount,
    subCount: _subCount,
};

export { baseActions, baseActionCreator };
