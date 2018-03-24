// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBIevTR-mQFdjL0Up4vopFmlROoboi0p9I",
    authDomain: "test-4e111.firebaseapp.com",
    databaseURL: "https://test-4e111.firebaseio.com",
    projectId: "test-4e111",
    storageBucket: "test-4e111.appspot.com",
    messagingSenderId: "50749461627"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();


// Initial Values
var name = "";
var email = "";
var age = 0;
var comment = "";
var startdate = "";
var bill = 0;
// var members = 0;


// Clear Firebase
// database.ref().set({

//   });

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
});

database.ref().on("child_added", function(snapshot) {
    console.log("Child added");
    // members++;
    // var index = members;
    var newname = snapshot.val().name;
    var newage = snapshot.val().age;
    var newemail = snapshot.val().email;
    var newcomment = snapshot.val().comment;
    var newstartdate = snapshot.val().startdate;
    var newmonthspassed = snapshot.val().months;
    var newbill = snapshot.val().bill;
    // console.log(newbill);
    createRow(newname,newage,newemail,newcomment,newstartdate,newmonthspassed,newbill);
});

var createRow = function(newname,newage,newemail,newcomment,newstartdate, newmonthspassed, newbill) {
    // Get reference to existing tbody element, create a new table row element
    var tBody = $("tbody");
    var tRow = $("<tr>");

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    // var membernum = $("<td>").text(" " + index);
    var nameTd = $("<td>").text(newname);
    var ageTd = $("<td>").text(newage);
    var emailTd = $("<td>").text(newemail);
    var commentTd = $("<td>").text(newcomment);
    var startdateTd = $("<td>").text(newstartdate);
    var monthsTd = $("<td>").text(newmonthspassed);
    var billedTd = $("<td>").text(newbill);

    // Append the newly created table data to the table row
    tRow.append(nameTd, ageTd, emailTd, commentTd, startdateTd, monthsTd, billedTd);
    // tRow.append(nameTd, ageTd, emailTd, commentTd, startdateTd);

    // Append the table row to the table body
    tBody.append(tRow);
  };

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
    startdate = $("#startdate-input").val().trim();
    if (startdate.length == 8){
        // console.log("Correct length");
        var year = startdate.substring(0,4);
        var month = startdate.substring(4,6);
        var day = startdate.substring(6,8);
        // console.log(moment().format("YYYYMMDD"));

        var currenttime = moment().format("YYYYMMDD");

        var datemoment = moment(startdate);
        console.log(datemoment);

        var monthspassed = datemoment.from(currenttime,true);

        var currentyear = currenttime.substring(0,4);
        var currentmonth = currenttime.substring(4,6);
        var currentday = currenttime.substring(6,8);

        var yearbilled = 50000;
        var monthbilled = yearbilled/12;
        var daybilled = yearbilled/365;

        var dyear = currentyear - year;
        var dmonth = currentmonth - month;
        var dday = currentday - day;

        var billed = precisionRound((dyear*yearbilled + dmonth*monthbilled + dday*daybilled),2);
        // console.log(precisionRound(billed, 2));
        // console.log(billed);

        bill = billed;

        // console.log(moment(startdate, "YYYYMMDD").fromNow());
    } else {
        billed = "";
        console.log("Incorrect length");
    }

    // Save the new post in Firebase
    database.ref().push({
        name: name,
        email: email,
        age: age,
        comment: comment,
        startdate: startdate,
        months: monthspassed,
        bill: billed,
      });
  
});  

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }