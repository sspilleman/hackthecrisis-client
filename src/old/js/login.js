
function login(a) {
    console.log("login", a);
}

$(function () {
    $('#select_link').click(function (e) {
        e.preventDefault();
        console.log('select_link clicked');
        // window.location.replace("/test?email=sander");
        // window.location.href = "/test?email=sander";
    })
})

// window.location.replace("http://example.com");


// $(function () {
//     $('#select_link').click(function (e) {
//         e.preventDefault();
//         console.log('select_link clicked');

//         const data = {};
//         data.title = "title";
//         data.message = "message";

//         $.ajax({
//             type: 'POST',
//             data: JSON.stringify(data),
//             contentType: 'application/json',
//             url: 'http://localhost:3000/endpoint',
//             success: function (data) {
//                 console.log('success');
//                 console.log(JSON.stringify(data));
//             }
//         });

//     });
// });

// $.ajax({
//     dataType: 'jsonp',
//     data: "data=yeah",						
//     jsonp: 'callback',
//     url: 'http://localhost:3000/endpoint?callback=?',						
//     success: function(data) {
//         console.log('success');
//         console.log(JSON.stringify(data));
//     }
// });

// $.ajax('http://localhost:3000/endpoint', {
//         type: 'POST',
//         data: JSON.stringify(data),
//         contentType: 'application/json',
//         success: function() { console.log('success');},
//         error  : function() { console.log('error');}
// });
