$(function()
{
    $("#formRegistro").submit(function(event)
    {
        event.preventDefault();
        
        let password = $("#formRegistro #password").val();
        let repeatPassword = $("#formRegistro #repeatPassword").val();
        let passwordStrength = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        
        if(password.length != 0 && repeatPassword.length != 0)
        {
            if(password === repeatPassword)
            {
                if(passwordStrength.test(password))
                {
                    $.ajax({
                        url: "/signup",
                        type: 'POST',
                        data: {"user": $("#formRegistro #user").val(), "email":$("#formRegistro #email").val(), "password": $("#formRegistro #password").val()},
                        success: function(respuesta,textStatus,request) {
                            if (request.status==200)
                            {
                                document.location = '/login';
                            }
                        },
                        error: function (xhr,ajaxOptions,error)
                        {
                            if (xhr.status==401)
                            {
                                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error al darse de alta.</strong> El correo electrónico introducido ya existe.').fadeIn(1000);
                            }
                            if (xhr.status==403)
                            {
                                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error al darse de alta.</strong> Comprueba que todos los campos son correctos. La contraseña debe tener al menos una letra mayúscula, un número y tener más de 8 carácteres.').fadeIn(1000);
                            }
                            if (xhr.status==500)
                            {
                                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error al crear la cuenta.</strong> No se ha podido crear la cuenta. Por favor, recargue la página e inténtelo de nuevo.').fadeIn(1000);
                            }
                        }
                    });
                } else 
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('La contraseña debe tener al menos un dígito, una letra en mayúscula y una letra en minúsula y contener al menos 8 carácteres.').fadeIn(1000);
                }
            } else 
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('Las contraseñas no coinciden.').fadeIn(1000);
            }
        } else 
        {
            $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('La contraseña debe ser de al menos 8 carácteres.').fadeIn(1000);
        }
    });
});