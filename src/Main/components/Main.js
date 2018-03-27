import React from 'react';
import './Main.css';
import ItemList from './ItemList';
import {connect} from 'react-redux';
import {negativeItemsSelector, positiveItemsSelector} from '../redux/reducer';


const mapStateToProps = (state) => ({
    positiveItems: positiveItemsSelector(state),
    negativeItems: negativeItemsSelector(state),
});

const Main = ({positiveItems, negativeItems}) => {
    return (
        <div className="Main">
            <ItemList title="Puntos positivos:" items={positiveItems} canBeVoted={false}/>
            <ItemList title="Puntos a mejorar:" items={negativeItems} canBeVoted={true}/>
        </div>
    );
};

export default connect(mapStateToProps)(Main);
