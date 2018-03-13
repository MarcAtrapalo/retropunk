import {linkMain} from './Main/redux/firebase';

export const linkStoreWithFirebase = (database, store) => {
    linkMain(database, store);
};
