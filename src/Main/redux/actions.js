export const EDIT_ITEM = 'EDIT_ITEM';
export const UPVOTE_ITEM = 'UPVOTE_ITEM';
export const DOWNVOTE_ITEM = 'DOWNVOTE_ITEM';
export const UPDATE_MAIN = 'UPDATE_MAIN';

export const editItem = ({itemId, text}) => ({type: EDIT_ITEM, text, itemId});
export const upvoteItem = ({itemId, vote}) => ({type: UPVOTE_ITEM, itemId, vote});
export const downvoteItem = ({itemId, vote}) => ({type: DOWNVOTE_ITEM, itemId, vote});
export const updateMain = (main) => ({type: UPDATE_MAIN, payload: main});
