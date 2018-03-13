import * as React from 'react';
import {connect} from 'react-redux';
import {editItem, toggleVote} from '../redux/actions';
import {has, not, or} from '../../utils';
import Item from './Item';


const mapStateToProps = ({main: state}) => ({
    userId: state.user,
    votedItems: state.votedItems,
});

const mapDispatchToProps = (dispatch) => ({
    editItem: (itemId) => (text) => dispatch(editItem({itemId, text})),
    toggleVote: (itemId) => (previousVote) => (voteType) => () => dispatch(toggleVote({itemId, voteType, previousVote})),
});


export const ItemList = ({title, items, userId, votedItems, editItem, toggleVote}) => {
    const voteForItem = (id) => {
        const vote = votedItems.find(has('itemId', id));
        return vote ? vote.voteType : null;
    };
    const myVotes = votedItems.map(vote => vote.voteType);

    const isMine = item => item.user === userId;
    const nonEmptyItems = items.filter(or(isMine, not(has('text', ''))));

    return (
        <div className="item-list">
            <span className="title">{title}</span>
            <div>
                {nonEmptyItems.map(item => (
                    <Item
                        key={item.id}
                        text={item.text}
                        votes={item.votes}
                        isEditable={isItemEditable(item, userId)}
                        myVote={voteForItem(item.id)}
                        myVotes={myVotes}
                        onEdit={editItem(item.id)}
                        onToggleVote={toggleVote(item.id)}
                    />
                ))}
            </div>
        </div>
    );
};

function isItemEditable(item, userId) {
    return item.user === userId;
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);