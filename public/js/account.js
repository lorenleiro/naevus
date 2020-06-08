$(function()
{
    
    $("#userTypeNormal").hide();
    $("#userTypeDev").hide();
    $("#saveButton").hide();
    $("#cancelButton").hide();
    $("#currentPasswordDiv").hide();
    $("#newPasswordDiv").hide();
    $("#changuePassword").hide();
    
    // Cargamos los datos de la cuenta del usuario
    $.ajax({
        url: '/account',
        type: 'POST',
        success: function(response, textStatus, request)
        {
            let username = response.data[0].username;
            let email = response.data[0].email;
            let userType = response.data[0].type;
            let photo = response.data[0].photo;
            let personalImage = document.getElementById("image");
            
            $("#title").append(username);
            $("#username").val(username);
            $("#email").val(email);
            personalImage.setAttribute('src', './images/' + photo);
            
            
            
            if(userType === 'dev')
            {
                $('input[name="user"]').val("Usuario desarrollador. Puedes crear proyectos.");
                $("#devUser").prop("checked", true);
            }
            if(userType === 'user')
            {
                $('input[name="user"]').val("Usuario estándar. No puedes crear proyectos, pero puedes ayudar en la comunidad.");
                $("#normalUser").prop("checked", true);
            }
        },
        error: function(xhr, ajaxOptions, error)
        {
            $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al cargar los datos de su cuenta.').fadeIn(1000);
        }
    });
    
    // Al pulsar el botón de edición, se ocultarán los otros botones, se mostrarám los botones
    // de guardar y cancelar t se mostrarán también los nuevos inputs para modificar los datos 
    // de la cuenta.
    $("#editButton").on('click', function()
    {
        userEmail = $("#email").val();
        userName = $("#username").val();
        
        $("#user").hide();
        $("#passwordButton").hide();
        $("#editButton").hide();
        $("#deleteButton").hide();
        $("#userTypeNormal").show();
        $("#userTypeDev").show();
        $("#email").prop('disabled', false);
        $("#username").prop('disabled', false);
        $("#saveButton").show();
        $("#cancelButton").show();
    });
    
    // Al pulsar el botón de guardar, se enviará una petición Ajax al servidor, si los datos introducidos son válidos
    // se volverá a mostrar la vista original con los cambios realizados.
    $("#saveButton").on('click', function()
    {
        let userType = $('input[name="userType"]:checked').val();
        
        $.ajax({
            url: '/editaccount',
            type: 'POST',
            data: {"username": $("#username").val(), "email": $("#email").val(), "type": userType},
            success: function(response, textStatus, request)
            {
                if(userType === 'dev')
                {
                    $('input[name="user"]').val("Usuario desarrollador. Puedes crear proyectos.")
                }
                if(userType === 'user')
                {
                    $('input[name="user"]').val("Usuario estándar. No puedes crear proyectos, pero puedes ayudar en la comunidad.")
                }
                $("#user").show();
                $("#passwordButton").show();
                $("#editButton").show();
                $("#deleteButton").show();
                $("#userTypeNormal").hide();
                $("#userTypeDev").hide();
                $("#email").prop('disabled', true);
                $("#username").prop('disabled', true);
                $("#saveButton").hide();
                $("#cancelButton").hide();
                $("#notification").html('').hide().addClass("alert alert-success").attr("role","alert").html('Datos de la cuenta actualizados correctamente. Para que los cambios sean efectivos, debe volver a iniciar sesión.').fadeIn(1000).delay(4000).fadeOut(1000);
            },
            error: function(xhr, ajaxOptions, error)
            {
                if(xhr == 400)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Los datos introducidos son incorrectos.').fadeIn(1000);
                }
                if(xhr == 500)
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al intentar actualizar los datos, por favor, inténtelo más tarde.').fadeIn(1000);
                }
            }
        });
        
    });
    
    // Al pulsar el botón de cancelar la vista se volverá a mostrar como al principio.
    $("#cancelButton").on('click', function()
    {
        $("#user").show();
        $("#passwordButton").show();
        $("#editButton").show();
        $("#deleteButton").show();
        $("#userTypeNormal").hide();
        $("#userTypeDev").hide();
        $("#email").prop('disabled', true);
        $("#username").prop('disabled', true);
        $("#saveButton").hide();
        $("#cancelButton").hide();
        $("#currentPasswordDiv").hide();
        $("#newPasswordDiv").hide();
        $("#changuePassword").hide();
    });
    
    // Elimina la cuenta de usuario permanentemente.
    $("#removeAccount").on('click', function(event)
    {
        event.preventDefault();
        
        $.ajax({
            url: '/accountdelete',
            type: 'DELETE',
            success: function(response, textStatus, request)
            {
                if(request.status == 204)
                {
                    document.location = '/';
                }
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al intentar eliminar su cuenta.').fadeIn(1000);
            }
        });
    });
    
    // Al pulsar el botón de cambiar contraseña se mostrarán los inputs 
    // para añadir una nueva contraseña.
    $("#passwordButton").on('click', function()
    {
        $(this).hide();
        $("#currentPasswordDiv").show();
        $("#newPasswordDiv").show();
        $("#editButton").hide();
        $("#deleteButton").hide();
        $("#changuePassword").show();
        $("#cancelButton").show();
    });
    
    $("#changuePassword").on('click', function()
    {
        
        let newPassword = $("#newPassword").val();
        let newPasswordRepeated = $("#newPasswordRepeated").val();
        // Mínimo 8 carácteres, que contenga un dígito al menos, mínimo una 
        // letra en minúscula y una letra en mayúscula
        let passwordStrength = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        
        
        // Comprobamos que la nuea contraseña introducida dos veces es igual
        if(newPassword.length != 0 && newPasswordRepeated.length != 0 && $("#currentPassword").length != 0)
        {
            if(newPassword === newPasswordRepeated)
            {
                if(passwordStrength.test(newPassword))
                {
                    $.ajax({
                        url: '/changuepassword',
                        type: 'POST',
                        data: {"currentPassword": $("#currentPassword").val(), "newPassword": $("#newPassword").val(), "newPasswordRepeated": $("#newPasswordRepeated").val()},
                        success: function(response, textStatus, request)
                        {
                            if(request.status == 200)
                            {
                                $("#passwordButton").show();
                                $("#currentPasswordDiv").hide();
                                $("#newPasswordDiv").hide();
                                $("#editButton").show();
                                $("#deleteButton").show();
                                $("#changuePassword").hide();
                                $("#cancelButton").hide();
                                $("#notification").html('').hide().addClass("alert alert-success").attr("role","alert").html('Su contraseña ha sido actualizada. Cauando inicie sesión debe hacerlo con su nueva contraseña.').fadeIn(1000).fadeOut(4000);
                            }
                        },
                        error: function(xhr, ajaxOptions, error)
                        {
                            $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>Ha ocurrido un error al cambiar la contraseña.').fadeIn(1000);
                        }
                    });
                } else 
                {
                    $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('La contraseña debe tener al menos un dígito, una letra en mayúscula y una letra en minúsula.').fadeIn(1000);
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
    
    $("#personalPhoto").change(function()
    {
        if ($(this).val()) 
        {
            $('#changuePersonalPhoto input:submit').attr('disabled',false); 
        } 
    });
    
    $("#changuePersonalPhoto").submit(function(event)
    {
        event.preventDefault();
        
        let formData = new FormData(this);
        
        $.ajax({
            url: '/changuephoto',
            type: 'POST',
            data: formData,
            success: function(response, textStatus, request)
            {
                if(request.status == 200)
                {
                    location.reload();
                }
            },
            error: function(xhr, ajaxOptions, error)
            {
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error. </strong>No se ha podido cambiar la imagen.').fadeIn(1000);
            },
            contentType: false,
            processData: false
        });
    });
    
});