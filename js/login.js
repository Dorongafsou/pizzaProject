$(document).ready(function () {
    firebase_init();
    is_login();
    login_btn();


});
function is_login() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            console.log("log in");
            setTimeout(() => {
                window.location.href = "index.html";

            }, 4000);

        } else {
            console.log(" not log in");

        }
    });

}


function login_btn() {
    ///index page
    $("#login_btn").click(function () {
        var emailUser = document.getElementById("email_input").value;
        var passwordUser = document.getElementById("pass_input").value;
        var errLogMessage = document.getElementById("login-err");

        const auth = firebase.auth();
        const flag = auth.signInWithEmailAndPassword(emailUser, passwordUser);

        flag.catch(function (e) {

            $("#login-err").append("<p  class='login100-form-err p-b-15' style='display: block;'>" +
                e.message + " </p>");
            setTimeout(function () { $("#login-err").empty(); }, 3000);
            console.log(e.message);
            $("#login-err").css("display", "block");

        });
        console.log(emailUser);
        console.log(passwordUser);

    });
}


// ---------------------------------------------------------
function firebase_init() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAsMDJxK_0qY_JyEzDE7ikwT_VEE3ZOCMw",
        authDomain: "pizza-project-doron.firebaseapp.com",
        databaseURL: "https://pizza-project-doron.firebaseio.com",
        projectId: "pizza-project-doron",
        storageBucket: "pizza-project-doron.appspot.com",
        messagingSenderId: "592145065970",
        appId: "1:592145065970:web:a85a28bdd2448aa7c3ed6b"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}