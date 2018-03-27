import * as React from 'react';
import {connect} from 'react-redux';
import {itemVotesValue, userFreeVotes, userItemVotes, userSelector, vote, voteTypes} from '../redux/reducer';
import {downvoteItem, editItem, upvoteItem} from '../redux/actions';

export const Item = ({item, canBeVoted, isEditable, myFreeVotes, userId, onEdit, onUpvote, onDownvote}) => {
    const myVotesInItem = canBeVoted ? userItemVotes(userId)(item) : [];
    const totalVotes = canBeVoted ? itemVotesValue(item) : 0;
    const isTypeVotedByMe = (voteType) => myVotesInItem.find(v => v.voteType === voteType) !== undefined;
    const toggleVote = (voteType) => {
        const onToggleVote = isTypeVotedByMe(voteType) ? onDownvote : onUpvote;
        return () => onToggleVote(vote({voteType, votedBy: userId}));
    };
    const isTypeAvailable = (voteType) => myFreeVotes.includes(voteType) || isTypeVotedByMe(voteType);
    const className = (voteType) => isTypeVotedByMe(voteType) ? 'voted' : '';
    return (
        <p>
            {isEditable
                ? <input type="text" onChange={e => onEdit(e.target.value)} value={item.text}/>
                : <span>{item.text}</span>
            }
            {canBeVoted &&
                <React.Fragment>
                    &nbsp;
                    <span>{totalVotes}</span>
                    <button className={className(voteTypes.ONE)} onClick={toggleVote(voteTypes.ONE)} disabled={!isTypeAvailable(voteTypes.ONE)}>+1</button>
                    <button className={className(voteTypes.TWO)} onClick={toggleVote(voteTypes.TWO)} disabled={!isTypeAvailable(voteTypes.TWO)}>+2</button>
                    <button className={className(voteTypes.THREE)} onClick={toggleVote(voteTypes.THREE)} disabled={!isTypeAvailable(voteTypes.THREE)}>+3</button>
                </React.Fragment>
            }
        </p>
    );
};


function isItemEditable(item, userId) {
    return item.user === userId;
}

const mapStateToProps = (state, ownProps) => ({
    isEditable: isItemEditable(ownProps.item, userSelector(state)),
    myFreeVotes: userFreeVotes(userSelector(state))(state),
    userId: userSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onEdit: (text) => dispatch(editItem({itemId: ownProps.item.id, text})),
    onUpvote: (vote) => dispatch(upvoteItem({itemId: ownProps.item.id, vote})),
    onDownvote: (vote) => dispatch(downvoteItem({itemId: ownProps.item.id, vote})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);

// export const memoizeComponent = (Component, propNames) => {
//     let memo = {};
//     return (props) => {
//         const useMemoized = propNames.find(propName => props[propName] !== memo[propName]) !== undefined;
//
//         if (useMemoized) {
//             memo = <Component {...props}/>;
//         }
//         return memo;
//     }
// };
//
// const MemoizedItem = memoizeComponent(Item, ['text', 'isEditable', 'votes', 'user', 'userFreeVotes']);
//
// export default MemoizedItem;
