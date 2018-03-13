import React from 'react';
import './Main.css';
import ItemList from './ItemList';
import {connect} from 'react-redux';
import {negativeItemsSelector, positiveItemsSelector} from '../redux/reducer';


const listSelector = (listFromFirebase) => {
    return Object.keys(listFromFirebase).reduce((list, itemId) => {
        const newItem = itemId !== 'length'
            ? {...listFromFirebase[itemId], id: itemId}
            : null;
        return [...list, newItem];
    }, [])
        .filter(i => i !== null);
};

const mapStateToProps = (state) => ({
    positiveItems: listSelector(positiveItemsSelector(state)),
    negativeItems: listSelector(negativeItemsSelector(state)),
});

const Main = ({positiveItems, negativeItems, editItem, voteItemUp, voteItemDown}) => {
    return (
        <div className="Main">
            <ItemList title="Puntos positivos:" items={positiveItems} editItem={editItem}/>
            <ItemList title="Puntos a mejorar:" items={negativeItems} editItem={editItem}/>
        </div>
    );
};

export default connect(mapStateToProps)(Main);
