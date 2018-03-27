import * as React from 'react';
import {connect} from 'react-redux';
import {has, not, or} from '../../utils';
import Item from './Item';


export const ItemList = ({title, items, canBeVoted, userId}) => {
    const isMine = item => item.user === userId;
    const nonEmptyItems = items.filter(or(isMine, not(has('text', ''))));

    return (
        <div className="item-list">
            <span className="title">{title}</span>
            <div>
                {nonEmptyItems.map(item => (
                    <Item key={item.id} item={item} canBeVoted={canBeVoted}/>
                ))}
            </div>
        </div>
    );
};


const mapStateToProps = ({main: state}) => ({
    userId: state.user,
});

export default connect(mapStateToProps)(ItemList);