var path = "/users"
$(document).ready(function () {
    logout_btn();
    is_login();


});

function is_login() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            console.log("log in");
            firebase.database().ref(path+"/"+user.uid).once('value').then(function (snapshot) {
                data_user = snapshot.val();
                data_user.name
                $("#hello_user").css("color","red")
                $("#hello_user").text("hello "+data_user.name);
              });
            
        } else {
            console.log(" not log in");
            window.location.href = "login.html";
            
        }
    });
    
}
function logout_btn() {
    console.log("log log lgo ou");
    $("#logout_btn").click(function () {
        console.log("logout_btn");
        firebase.auth().signOut().then(function () {
            console.log("logout successful")
        }).catch(function (error) {
            console.log("logout error " + error);
        });

    });
}

function checkout_button() {
    $("#checkout-my-cart").click(function () {
        console.log("checkout");

    });
    
}



