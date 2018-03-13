import * as React from 'react';
import {voteTypes} from '../redux/reducer';

export const Item = ({text, isEditable, onEdit, votes, myVote, myVotes, onToggleVote}) => {
    const toggleVote = onToggleVote(myVote);
    const availableVoteTypes = Object.values(voteTypes).filter(type => !myVotes.includes(type));
    const isTypeAvailable = (voteType) => (availableVoteTypes.includes(voteType) && !myVote) || myVote === voteType;
    return (
        <p>
            {isEditable
                ? <input type="text" onChange={e => onEdit(e.target.value)} value={text}/>
                : <span>{text}</span>
            }
            &nbsp;
            <span>{votes}</span>
            <button onClick={toggleVote(voteTypes.ONE)} disabled={!isTypeAvailable(voteTypes.ONE)}>+1</button>
            <button onClick={toggleVote(voteTypes.TWO)} disabled={!isTypeAvailable(voteTypes.TWO)}>+2</button>
            <button onClick={toggleVote(voteTypes.THREE)} disabled={!isTypeAvailable(voteTypes.THREE)}>+3</button>
        </p>
    );
};

export const memoizeComponent = (Component, propNames) => {
    let memo = {};
    return (props) => {
        const useMemoized = propNames.find(propName => props[propName] !== memo[propName]) !== undefined;

        if (useMemoized) {
            memo = <Component {...props}/>;
        }
        return memo;
    }
};

const MemoizedItem = memoizeComponent(Item, ['text', 'isEditable', 'votes']);

export default MemoizedItem;
