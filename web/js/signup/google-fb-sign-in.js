// FB
window.fbAsyncInit = function() {
    FB.init({
        appId   : '6652755031465366',
        oauth   : true,
        status  : true, // check login status
        cookie  : true, // enable cookies to allow the server to access the session
        xfbml   : true // parse XFBML
    });
};

function fb_login(){
    FB.login(function(response) {
        if (response.authResponse) {
            access_token = response.authResponse.accessToken;
            user_id = response.authResponse.userID;

            FB.api('/me?fields=name,email', function(response) {
                var fullname = response.name;
                var splitName = fullname.split(' ');
                var firstn = splitName[0];
                var lastn = splitName[1];
                var firstName = document.getElementById("firstName");
                firstName.value = firstn;
                var lastName = document.getElementById("lastName");
                lastName.value = lastn;
                var email = document.getElementById("email");
                email.value = response.email;           
            });

        } else {
            console.log('Cancelled FB login or did not fully authorize.');
        }
    }, {
        scope: 'public_profile,email'
    });
}
(function() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}());


// Google
var clicked=false;
function clickFunc() {
    clicked=true;
}

function onSignIn(googleUser) {
    if (clicked) {
    var testApi = 'AIzaSyAUFPdkUmQ7C0tyo_5UPhzjJQLiJuvJdUs';
    var profile = googleUser.getBasicProfile();
    var testUid = profile.getId();
    firstName = document.getElementById("firstName");
    firstName.value = profile.getGivenName();
    lastName = document.getElementById("lastName");
    lastName.value = profile.getFamilyName();
    email = document.getElementById("email");
    email.value = profile.getEmail(); 

    // Additional Scope
    var SCOPE_STRING = 'https://www.googleapis.com/auth/user.phonenumbers.read';
    if (googleUser.hasGrantedScopes(SCOPE_STRING)) {
        // validate access_token
        if(googleUser.wc.hasOwnProperty('access_token')){
        var testToken = googleUser.wc.access_token;
        getGUserNumber(testUid, testApi, testToken);
        }

    } else {
        googleUser.grant({scope: SCOPE_STRING}).then(function(success) {
        if(success.wc.hasOwnProperty('access_token')){
            var testToken = googleUser.wc.access_token;
            getGUserNumber(testUid, testApi, testToken);
        }
        });
    }

    }
}

// get google user number (Note: number must avaible in https://myaccount.google.com/profile)
function getGUserNumber(testUid, testApi, testToken) {
    $.ajax({
    url: 'https://people.googleapis.com/v1/people/'+testUid+'?personFields=phoneNumbers&sources=READ_SOURCE_TYPE_PROFILE&key='+testApi+'&access_token='+testToken,
    dataType: 'json',
    success: function( data ) {
        // console.log(data);
        if(data.hasOwnProperty('phoneNumbers')){
        var userNumber = data.phoneNumbers[0].value
        intlTelInput = document.getElementById("intlTelInput");
        intlTelInput.value = userNumber;
        validateForm();
        }
    },
    error: function( data ) {
        console.log( "data not found");
    }
    });
}


// Apple
$('#apple-signin-btn').click(function(e){
    e.preventDefault();
    $('#appleid-signin').click();
});

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

document.addEventListener('AppleIDSignInOnSuccess', (data) => {
    response = parseJwt(data["detail"].authorization.id_token)
    email = document.getElementById("email");
    email.value = response["email"]; 
    firstName = document.getElementById("firstName");
    firstName.value = data["detail"].user.name.firstName;
    lastName = document.getElementById("lastName");
    lastName.value = data["detail"].user.name.lastName;
});
//Listen for authorization failures
document.addEventListener('AppleIDSignInOnFailure', (error) => {
    // console.log(error)
});
  
function validateForm() {
    var fnameVal = "";
    var lnameVal = "";
    var emailVal = "";
    var mobilePhoneVal = "";
    fnameVal = $('#firstName').val();
    lnameVal = $('#lastName').val();
    emailVal = $('#email').val();
    mobilePhoneVal = $('#intlTelInput').val();

    if(fnameVal.length != '' && lnameVal.length != '' && emailVal.length != '' && mobilePhoneVal.length != '') {
    //console.log('form is valid');
    $('.form-btn').click();
    }
}