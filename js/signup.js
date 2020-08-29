var path = "/users"
$(document).ready(function () {
    firebase_init();
    is_login();
    signup_btn();


    
});
// ---------------------------------------------------------
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
// ---------------------------------------------------------
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
function get_date_now() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today
}
// ---------------------------------------------------------
function add_user_sign_up(email,password,name) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (data) {
        console.log("data",data["user"]["uid"]);
        firebase.database().ref(path+"/"+data["user"]["uid"]).set({
            email:email,
            name:name,
            date:get_date_now()
        });   
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        $("#login-err").append("<p  style='display: block;color: red;'>" +
        error.message+" </p>");
        setTimeout(function(){$("#login-err").empty();},3000) ;
        
        $("#login-err").css("display", "block");
        
    });
}
// ---------------------------------------------------------
// ---------------------------------------------------------
function signup_btn() {
    $("#sign_up_btn").click(function () {
        var email = $("#InputEmail1").val();
        var password = $("#InputPassword1").val();
        var password1 = $("#InputPassword2").val();
        var name = $("#InputName").val();
        if (password.localeCompare(password1)==0){
            add_user_sign_up(email,password,name)
        }else{
            let str_message  = "need to be the some password";
            $("#login-err").append("<p  style='display: block;color: red;'>" + str_message +" </p>");
            setTimeout(function(){$("#login-err").empty();},3000) ;
        }
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