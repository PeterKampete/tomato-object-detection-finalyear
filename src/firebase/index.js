// import firebase from "firebase/app";
// import "firebase/storage";


// export const firebaseConfig = {
//   apiKey: "AIzaSyA90rywUFoZDxwXmJGtUWadJfD8VfSnHkA",
//   authDomain: "tomato-detection-54d8d.firebaseapp.com",
//   databaseURL: "https://tomato-detection-54d8d-default-rtdb.firebaseio.com",
//   projectId: "tomato-detection-54d8d",
//   storageBucket: "tomato-detection-54d8d.appspot.com",
//   messagingSenderId: "124782614680",
//   appId: "1:124782614680:web:bb923a94783771f42398ed",
// };

// const listAll = (folder) => {
//   const storageRef = firebase.storage().ref();

//   const listRef = storageRef.child(folder);

//   listRef
//     .listAll()
//     .then((res) => {
//       res.prefixes.forEach((folderRef) => {});
//       res.items.forEach((itemRef) => {
//         itemRef.getDownloadURL().then((url) => {
//           console.log("Download url: " + url);
//         });
//       });
//     })
//     .catch((error) => console.log(error));
// };

// firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();

// export { storage, listAll, firebase as default };
