$(function()
{

    $("#contact").submit(function(event)
    {
        event.preventDefault();

        $.ajax({
            url: '/contact',
            type: 'POST',
            data: {"name": $("#name").val(), "email": $("#email").val(), "subject": $("#subject").val(), "message": $("#message").val(),},
            success: function(response, textStatus, request)
            {
                $("#contactDiv").hide();
                $("#mesaggeSent").html('').hide().addClass("alert alert-success").html('<div class="display-4">Mensaje enviado</div><p class="font-weight-light">Enhorabuena, su mensaje ha sido enviado. En breve recibirá una respuesta. Por favor, esté atento a su correo electrónico.</p>').fadeIn(1000);
            },
            error: function(xhr, ajaxOptions, error)
            {
                if(xhr.status == 500)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</strong>. No se ha podido enviar el correo, por favor, inténtelo más tarde.').fadeIn(1000).delay(1000);  
                }

                if(xhr.status == 400)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('Revise los campos del formulario e inténtelo de nuevo.').fadeIn(1000).delay(1000);   
                }
            }
        });
    });


});