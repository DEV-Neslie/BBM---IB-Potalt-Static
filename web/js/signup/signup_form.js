var input = document.querySelector("#intlTelInput");

getLocation(
    function (location) {
        window.intlTelInput(input, {
            hiddenInput: "phone",
            initialCountry: location.country_code,
            preferredCountries: false,
            utilsScript: "/wp-content/themes/Blueberry-Markets-WP-Market-Analysis/assets/js/signup/utils.js",
        });
    }
);

$("#lp_form").submit(function (event) {
    const form = event.target;
    const fname = form.elements['firstname'];
    const lname = form.elements['lastname'];
    const email = form.elements['email'];

    fname_new = fname.value.replace(/\s+/g, ' ').trim();
    lname_new = lname.value.replace(/\s+/g, ' ').trim();
    email_new = email.value.replace(/\s+/g, ' ').trim();

    fname.value = fname_new;
    lname.value = lname_new;
    email.value = email_new;

    directToLive(event);
    event.preventDefault();
});