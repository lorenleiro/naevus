$(function()
{
    $("#formLogin").submit(function(evento)
    {
        evento.preventDefault();

        $.ajax({
            url: "/login",
            type: 'POST',
            data: {"email": $("#formLogin #email").val(), "password":$("#formLogin #password").val()},
            success: function(respuesta,textStatus,request) {
                if (request.status==200)
                {
                    document.location = '/';
                }
            },
            error: function (xhr,ajaxOptions,error)
            {
                if (xhr.status==403 || xhr.status == 400)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Datos de acceso incorrectos</strong>. Por favor inténtelo de nuevo.').fadeIn(1000).delay(1000);
                }
            }
        });
    });
});