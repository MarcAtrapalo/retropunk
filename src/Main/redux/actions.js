export const EDIT_ITEM = 'EDIT_ITEM';
export const TOGGLE_VOTE = 'TOGGLE_VOTE';
export const UPDATE_MAIN = 'UPDATE_MAIN';

export const editItem = ({itemId, text}) => ({type: EDIT_ITEM, text, itemId});
export const toggleVote = ({itemId, voteType, previousVote}) => ({type: TOGGLE_VOTE, itemId, voteType, previousVote});
export const updateMain = (main) => ({type: UPDATE_MAIN, payload: main});
