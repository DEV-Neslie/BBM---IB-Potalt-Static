$('#btn-submit-bbjam').click(function() {
    let name        = $.trim($('#bbjam_form [name="name"]').val());
    let email       = $.trim($('#bbjam_form [name="email"]').val());
    let country     = $.trim($('#bbjam_form [name="country"]').val());
    let endpoint    = $('#bbjam_form').attr('action');

    let err         = function() {
        $('#bbjam_form .message-jam')
            .addClass('d-block text-red')
            .removeClass('d-none text-green')
            .text('Sorry, Please fill in all fields properly and try again. Contact support if the error persists');
    };
    
    $.ajax({
        url         : endpoint,
        type        : 'POST',
        dataType    : 'JSON',
        data        : {'action': 'bbm_jam', 'name' : name, 'email' : email, 'country' : country},
        beforeSend  : function(xhr) {},
        success     : function(response) {
            let message, added_class, removed_class = '';

            if (response == 1) {
                message         = 'Thank you. You have successfully subscribed to Blueberry Jam!';
                added_class     = 'd-block text-green';
                removed_class   = 'd-none text-red';

            } else {
                message         = 'Sorry, Please fill in all fields properly and try again. Contact support if the error persists';
                added_class     = 'd-block text-red';
                removed_class   = 'd-none text-green';
            }   

            $('#bbjam_form .message-jam')
                .addClass(added_class)
                .removeClass(removed_class)
                .text(message);
        },
        error       : err,
        failure     : err,
    })

    $('#bbjam_form')[0].reset();
});