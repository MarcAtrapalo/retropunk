import {DOWNVOTE_ITEM, EDIT_ITEM, UPDATE_MAIN, UPVOTE_ITEM} from './actions';
import {combineReducers} from 'redux';
import * as _ from 'lodash';
import {not} from '../../utils';
import shortid from 'shortid';

const initialState = {
    firebase: {
        positiveItems: {},
        negativeItems: {},
        users: {},
    },
    user: 'user1',
    votedItems: [],
};


export const voteTypes = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
};

export const positiveItemsSelector = state => listSelector(state.main.firebase.positiveItems);
export const negativeItemsSelector = state => listSelector(state.main.firebase.negativeItems);
export const userSelector = state => state.main.user;

const isVoteOfUser = user => vote => vote.votedBy === user;

const userVotes = user => state => {
    return negativeItemsSelector(state)
        .reduce((votes, i) => [...votes, ...listSelector(i.votes)], [])
        .filter(isVoteOfUser(user));
};

export const userFreeVotes = user => state => {
    const votesOfUser = userVotes(user)(state);
    const hasVoteOfType = voteType => votesOfUser.find(vote => vote.voteType === voteType);
    return Object.keys(voteTypes).map(k => voteTypes[k])
        .filter(not(hasVoteOfType));
};

// const newItem = user => ({
//     text: '',
//     user,
//     votes: [{votedBy: 'userX', voteType: 1}]
// });

export const userItemVotes = userId => item => listSelector(item.votes).filter(isVoteOfUser(userId));
export const itemVotesValue = item => listSelector(item.votes).reduce((sum, vote) => sum + vote.voteType, 0);

export const vote = ({voteType, votedBy}) => ({id: shortid.generate(), voteType, votedBy});
const voteEquals = voteA => voteB =>
    voteA.voteType === voteB.voteType && voteA.votedBy === voteB.votedBy;

export const item = (state, action) => {
    switch (action.type) {
        case EDIT_ITEM:
            return {...state, text: action.text};
        case UPVOTE_ITEM:
            return {...state, votes: {...state.votes, [action.vote.id]: action.vote}};
        case DOWNVOTE_ITEM:
            return {...state, votes: _.filter(state.votes, not(voteEquals(action.vote)))};
        default:
            return state;
    }
};

export const items = (state = {}, action) => {
    switch (action.type) {
        case UPVOTE_ITEM:
        case DOWNVOTE_ITEM:
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

export default combineReducers({
    firebase,
    user,
});

function replace(obj, when, fn) {
    return _.mapValues(obj, (value, key) => when(value, key)
        ? fn(value)
        : value
    );
}

export function listSelector(listFromFirebase) {
    return Object.keys(listFromFirebase || {}).reduce((list, itemId) => {
        const newItem = itemId !== 'length'
            ? {...listFromFirebase[itemId], id: itemId}
            : null;
        return [...list, newItem];
    }, [])
        .filter(i => i !== null);
}