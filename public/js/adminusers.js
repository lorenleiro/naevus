$(function()
{
    $.ajax({
        url: "/adminusers",
        type: 'POST',
        success: function(respuesta,textStatus,request) {
            if (request.status==200)
            {                
                for(let i = 0; i < respuesta.data.length; i++)
                {
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    let userId = "<td>"+ respuesta.data[i].id +"</td>";
                    let userName = "<td>"+ respuesta.data[i].username +"</td>";
                    let userEmail = "<td>"+ respuesta.data[i].email +"</td>";
                    let userType = "<td>"+ respuesta.data[i].type +"</td>";                    
                    let buttonRemove = document.createElement("button");
                    
                    $("#usuarios").append(tr);
                    $(tr).append(userId);
                    $(tr).append(userName);
                    $(tr).append(userEmail);
                    $(tr).append(userType);
                    $(tr).append(buttonRemove);
                    
                    buttonRemove.setAttribute("id", respuesta.data[i].id);
                    buttonRemove.innerHTML = "Eliminar <i class='fas fa-trash-alt'></i>";
                    $(buttonRemove).addClass("btn btn-danger");
                    buttonRemove.setAttribute("data-toggle", "modal");
                    buttonRemove.setAttribute("data-target", "#deleteAccount");
                    
                    buttonRemove.addEventListener("click", getId);
                }
            }
        },
        error: function (xhr,ajaxOptions,error)
        {
            if (xhr.status==404)
            {
                $("#error").html('').hide().attr('class', '').addClass("alert alert-danger").attr("role","alert").html('Error. No se puede cargar la lista de usuarios.').fadeIn(2000);
            }
        }
    });
    
    $("#formDeleteAccount").submit(function(evento)
    {
        
        evento.preventDefault();
        
        console.log(workId);
        
        if(workId == "undefined" ||workId == null)
        {
            console.log("Id para borrar no definido");
        } else
        {
            $.ajax({
                url:"/accountdelete",
                type: "DELETE",
                data: {"userId": workId},
                success: function(data, textStatus, request)
                {
                    if(request.status == 204)
                    {
                        $.ajax({
                            url: "/adminusers",
                            type: 'POST',
                            success: function(respuesta,textStatus,request) {
                                if (request.status==200)
                                {  
                                    $('#deleteAccount').modal('hide');
                                    $("#usuarios").html(""); 
                                    $("#notification").html('').hide().attr('class', '').addClass("alert alert-success").attr("role","alert").html('El usuario se ha eliminado correctamente.').fadeIn(1000).delay(1000).fadeOut(1000);             
                                    for(let i = 0; i < respuesta.data.length; i++)
                                    {   
                                        let tr = document.createElement("tr");
                                        let td = document.createElement("td");
                                        let userId = "<td>"+ respuesta.data[i].id +"</td>";
                                        let userName = "<td>"+ respuesta.data[i].username +"</td>";
                                        let userEmail = "<td>"+ respuesta.data[i].email +"</td>";
                                        let userType = "<td>"+ respuesta.data[i].type +"</td>";
                                        
                                        let buttonRemove = document.createElement("button");
                                        
                                        $("#usuarios").append(tr);
                                        $(tr).append(userId);
                                        $(tr).append(userName);
                                        $(tr).append(userEmail);
                                        $(tr).append(userType);
                                        $(tr).append(buttonRemove);
                                        
                                        buttonRemove.setAttribute("id", respuesta.data[i].id);
                                        buttonRemove.innerHTML = "Eliminar <i class='fas fa-trash-alt'></i>";
                                        $(buttonRemove).addClass("btn btn-danger");
                                        buttonRemove.setAttribute("data-toggle", "modal");
                                        buttonRemove.setAttribute("data-target", "#deleteAccount");
                                        
                                        buttonRemove.addEventListener("click", getId);
                                    }
                                }
                            },
                            error: function (xhr,ajaxOptions,error)
                            {
                                if (xhr.status==404)
                                {
                                    $("#notification").html('').hide().attr('class', '').addClass("alert alert-danger").attr("role","alert").html('Error. No se puede cargar la lista de usuarios.').fadeIn(1000).delay(1000).fadeOut(1000);
                                }
                            }
                        });
                    }
                },
                error: function(xhr,ajaxOptions,error)
                {
                    $('#deleteAccount').modal('hide');
                    $("#notification").html('').hide().attr('class', '').addClass("alert alert-danger").attr("role","alert").html('Error. El usuario no se puede eliminar. Compruebe si el usuario tiene proyectos.').fadeIn(1000).delay(1000).fadeOut(2000);
                }
            });
        }
    });
    
    $("#btnReload").on("click", function()
    {
        location.reload();
    });
    
    function getId()
    {
        workId = "";
        workId = $(this).attr("id");
    }    
});
