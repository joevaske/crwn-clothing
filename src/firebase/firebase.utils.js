import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCOql_PzFEqQdQCeHN8KNxuU2P6vtW6XPc",
    authDomain: "crwn-db-7aec1.firebaseapp.com",
    databaseURL: "https://crwn-db-7aec1.firebaseio.com",
    projectId: "crwn-db-7aec1",
    storageBucket: "crwn-db-7aec1.appspot.com",
    messagingSenderId: "210851166118",
    appId: "1:210851166118:web:1635e50860d9297cfc4167",
    measurementId: "G-QBM6B0C0K2"
  }

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

   if(!snapShot.exists) {
        const{ displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    
    return userRef;

}

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};

  export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
      const transformedCollection = collectionsSnapshot.docs.map(doc => {
          const { title, items } = doc.data();

          return {
              routeName: encodeURI(title.toLowerCase()),
              id: doc.id,
              title,
              items

            };
      });
      return transformedCollection.reduce( (accumulator, collection) => {
         accumulator[collection.title.toLowerCase()] = collection;
         return accumulator;
      }, {});
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);


  export default firebase;