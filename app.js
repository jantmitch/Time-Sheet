// Initialize Firebase
var config = {
    apiKey: "AIzaSyAXA-mKK0pKfEk5xngqYJesNJWs-CIBo70",
    authDomain: "time-s.firebaseapp.com",
    databaseURL: "https://time-s.firebaseio.com",
    projectId: "time-s",
    storageBucket: "time-s.appspot.com",
    messagingSenderId: "763496059909"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var name = "";
var email = "";
var age = 0;
var comment = "";

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("name").exists()) {

    // Set the variables to the stored values in firebase.
    name = snapshot.val().name;
    console.log(name);

    // Print the data to the console.
    // console.log(highBidder);
    // console.log(highPrice);
  }

  // Else Firebase doesn't have anything so use the initial local values.
  else {
    database.ref().update({
        name: name,
        email: email,
        age: age,
        comment: comment,
    });
    }
});

// This function handles events where the name button is clicked
$("#submit").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();
    
    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim();
    age = $("#age-input").val().trim();
    comment = $("#comment-input").val().trim();

    if (name == ""){
        console.log("Empty Name");
    } else if (email == "") {
        console.log("Empty Email");
    } else if (age== "") {
        console.log("Empty Age");
    } else if (comment == "") {
        console.log("Empty Comment");
    } else {
        console.log("All Fields Present");
    }

    // Save the new post in Firebase
    database.ref().push({
        name: name,
        email: email,
        age: age,
        comment: comment,
      });
  
});  

//   function writeNewPost(uid, username, picture, title, body) {
//     // A post entry.
//     var postData = {
//       author: username,
//       uid: uid,
//       body: body,
//       title: title,
//       starCount: 0,
//       authorPic: picture
//     };
  
//     // Get a key for a new Post.
//     var newPostKey = firebase.database().ref().child('posts').push().key;
  
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     var updates = {};
//     updates['/posts/' + newPostKey] = postData;
//     updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
//     return firebase.database().ref().update(updates);
//   }

//   console.log(writeNewPost(1, "Max", "pic", "title", "body"));