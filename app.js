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
    
    console.log(name);

    // var newtopic = $("#name-input").val().trim();
    if (name == ""){
        // var temp = typeof(newtopic);
        console.log("Empty String");
    } else {
        console.log(name);
        // topics.push(newtopic);
    }
    // The renderButtons function is called, rendering the list of gif buttons
    // renderButtons();
});  

  function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
      author: username,
      uid: uid,
      body: body,
      title: title,
      starCount: 0,
      authorPic: picture
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);
  }

  console.log(writeNewPost(1, "Max", "pic", "title", "body"));