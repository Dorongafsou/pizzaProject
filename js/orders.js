var path = "/orders"
$(document).ready(function () {
    is_login();
    logout_btn();
    firebase.database().ref(path).once('value').then(function (snapshot) {
        let data_order = snapshot.val();
        create_table(data_order)
       
      }).then(function () {
          
      });


    
});
function create_products_str(products) {
    let str_pro= "";
    $.each( products, function( index, value ){
        str_pro+= value.quantity+" "+value.name+ " ,\n";
    });
    return str_pro;
    
}
function append_line_table(addres,city,date,name,phone,products,time) {
    $("#data_table").append(
        '<tr>'+
        '<td >'+name+'</td>'+
        '<td >'+date +' '+time+'</td>'+
        '<td >'+city+'</td>'+
        '<td >'+addres+'</td>'+
        '<td >'+phone+'</td>'+
        '<td >'+create_products_str(products)+'</td>'+
        '</tr>'
    );
    
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
function sort_func_date(o1,o2) {
    var d1 = new Date( Date.parse(o1.date + " " +o1.time));
    var d2 = new Date( Date.parse(o2.date + " " +o2.time));
    return d2 -d1    
}
function create_table(data) {
    data =  Object.values(data);
    data.sort(sort_func_date);
    $("#data_table").empty();
    $.each( data, function( index, value ){
        append_line_table(
            value.addres,
            value.city,
            value.date,
            value.name,
            value.phone_number,
            value.products,
            value.time,
            )
    });

    
}
// ---------------------------------------------------------
function is_login() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            console.log("log in");
           
            
        } else {
            
            window.location.href = "login.html";
           
            
        }
    });
    
}