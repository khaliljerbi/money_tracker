import { createStore, applyMiddleware , compose } from "redux";
import thunk from 'redux-thunk';
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from "redux-firestore";
import firebase from 'firebase'
import rootReducer from "./reducers/index";


const firebaseConfig = { }  //confing here
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

  firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);

  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
  )(createStore)
  

 const initialState= {}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleWare= [thunk];
export const store = createStoreWithFirebase(rootReducer, initialState,composeEnhancers(applyMiddleware(...middleWare)));

