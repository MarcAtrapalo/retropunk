import {EDIT_ITEM, TOGGLE_VOTE, UPDATE_MAIN} from './actions';
import {combineReducers} from 'redux';
import * as _ from 'lodash';
import {has, not} from '../../utils';

const initialState = {
    firebase: {
        positiveItems: {},
        negativeItems: {},
        users: {},
    },
    user: 'user2',
    votedItems: [],
};


export const voteTypes = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
};

export const positiveItemsSelector = state => state.main.firebase.positiveItems;
export const negativeItemsSelector = state => state.main.firebase.negativeItems;

export const item = (state, action) => {
    switch (action.type) {
        case EDIT_ITEM:
            return {...state, text: action.text};
        case TOGGLE_VOTE:
            const addedVote = action.previousVote !== action.voteType ? action.voteType : 0;
            const cancelledVote = action.previousVote ? action.previousVote : 0;
            return {...state, votes: state.votes + addedVote - cancelledVote};
        default:
            return state;
    }
};

export const items = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_VOTE:
        case EDIT_ITEM:
            const whenItemIdEquals = (id) => (itm, key) => key === id;
            return replace(state, whenItemIdEquals(action.itemId), i => item(state[action.itemId], action));
        default:
            return state;
    }
};

export const users = (state = initialState.firebase.users, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const firebase = (state = initialState.firebase, action) => {
    switch (action.type) {
        case UPDATE_MAIN:
            return action.payload;
        default:
            return {
                positiveItems: items(state.positiveItems, action),
                negativeItems: items(state.negativeItems, action),
                users: users(state.users, action),
            };
    }
};

export const user = (state = initialState.user, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const votedItems = (state = initialState.votedItems, action) => {
    switch (action.type) {
        case TOGGLE_VOTE:
            const otherItems = state.filter(not(has('itemId', action.itemId)));
            if (action.voteType === action.previousVote) {
                return otherItems;
            }
            return [...otherItems, {itemId: action.itemId, voteType: action.voteType}];
        default:
            return state;
    }
};

export default combineReducers({
    firebase,
    user,
    votedItems,
});

function replace(obj, when, fn) {
    return _.mapValues(obj, (value, key) => when(value, key)
        ? fn(value)
        : value
    );
}