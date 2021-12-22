
import { createStore,combineReducers,applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import {InitialFeedback} from './forms';

//arrow function called ConfigureStore
export const ConfigureStore = () => {
    // create a variable store that will  createStore function from redux 
    //pass in Reducers and initial state
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions,
            ...createForms({
                feedbackForm: InitialFeedback
            })
        }),
        applyMiddleware(thunk,logger)
    );
 //will return store 
    return store;
};