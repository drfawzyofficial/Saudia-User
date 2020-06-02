const contactStatus = (status, message) => {
    if(status === "error") {
        $(".contact-status").html(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <audio autoplay class="d-none">
                    <source src="/assets/sounds/notification.mp3" type="audio/mpeg">
                </audio>
                <strong>Important Notification!</strong><span class="d-block">${ message } </span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `).fadeIn(250).delay(5000).fadeOut(250);
    } else if(status === "success") {
        $(".contact-status").html(`
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <audio autoplay class="d-none">
                 <source src="/assets/sounds/notification.mp3" type="audio/mpeg">
            </audio>
            <strong>Important Notification!</strong><span class="d-block">${ message } </span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `).fadeIn(250).delay(5000).fadeOut(250);
    }
    
}

$(".bottom-contact").submit((e) => {
    e.preventDefault();
    const [ fullname, email, heading, message, csrfToken ] = [
            $("#fullname").val(), 
            $("#email").val(), 
            $("#heading").val(), 
            $("#message").val(),
            $("#csrf").val()
         ];

    if(fullname.trim().length === 0 || email.trim().length === 0 || heading.trim().length === 0 || message.trim().length === 0 ) 
         return contactStatus('error', 'All fields are required')

    if(fullname.length < 3)
         return contactStatus('error', 'Fullname must be at least 3 characters')

    if(!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)))
         return contactStatus('error', 'Email Address is wrong')

    if(heading.length < 3)
         return contactStatus('error', 'Heading must be at least 3 characters')

    if(message.length < 3 || message.length > 255)
        return contactStatus('error', 'Message must be between [3-255]')
    
    grecaptcha.ready(() => {
        grecaptcha.execute('6LeTf_YUAAAAALUQEZyFe7txDsiqeozqhFx4mBgg', { action: 'Contact' } )
            .then(function(token) {
                axios.post('/contact', {
                    fullname: fullname,
                    email: email,
                    heading: heading,
                    message: message,
                    token: token,
                  }, {
                    headers: {
                        'CSRF-Token': csrfToken
                    }
                  })
                  .then((res) => {
                      console.log(res)
                    contactStatus('success', `${ res.data.msg }`)
                    $("#fullname").val('');  $("#email").val(''); $("#heading").val(''); $("#message").val('');
                  })
                  .catch(err => contactStatus('error', `${err.response.data.msg}`))
            });
    });
    
})