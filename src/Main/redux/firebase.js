import {linkStoreWithPath} from 'firebase-redux';
import {updateMain} from './actions';

export const linkMain = linkStoreWithPath('/', updateMain, state => state.main.firebase);
