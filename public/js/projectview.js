$(function()
{  
    $.ajax({
        url: '/projectview',
        type: 'POST',
        success: function(response, textStatus, request)
        {
            let title = response.data.projectinfo[0].title;
            let description = response.data.projectinfo[0].description;
            let resume1 = response.data.projectinfo[0].resume1;
            let resume2 = response.data.projectinfo[0].resume2;
            let resume3 = response.data.projectinfo[0].resume3;
            let tags = response.data.projectinfo[0].tags;
            
            let tagsArray = tags.split(",");
            
            for(let i = 0; i < tagsArray.length; i++)
            {
                let span = document.createElement('span');
                $(span).addClass('badge badge-primary');
                $(span).html(tagsArray[i]);
                $("#tags").append(span);
                $("#tags").append(" ");
            }
            
            // Cargamos todas las imágenes del carousel
            let j = 0;
            for(let i = 0; i < response.data.projectimages.length; i++)
            {
                if(response.data.projectimages[i].type == 'carousel')
                {
                    let listItem = document.createElement('li');
                    listItem.setAttribute("data-target", "#projectCarousel");
                    listItem.setAttribute("data-slide-to", j);
                    
                    if(j == 0) 
                    {
                        $(listItem).addClass('active');
                    }
                    
                    let carouselDiv = document.createElement('div');
                    
                    if(j == 0)
                    {
                        $(carouselDiv).addClass('carousel-item active')
                    } else {
                        $(carouselDiv).addClass('carousel-item')
                    }
                    
                    let carouselImage = document.createElement('img');
                    $(carouselImage).addClass('d-block w-100');
                    carouselImage.setAttribute('src', './images/' + response.data.projectimages[i].image);
                    
                    carouselDiv.append(carouselImage);
                    $("#carouselImages").append(carouselDiv);
                    $("#carouselList").append(listItem);
                    j++;
                } 
            }
            
            // Añadimos la información principal a la vista del proyecto
            $("#title").html(title);
            $("#description").html(description);
            $("#projectName").html(title);
            $("#resume1").html(resume1);
            $("#resume2").html(resume2);
            $("#resume3").html(resume3);
            
            for(let i = 0; i < response.data.projectimages.length; i++)
            {
                if(response.data.projectimages[i].type === "description1")
                {
                    var description1Image = response.data.projectimages[i].image;
                }
                if(response.data.projectimages[i].type === "description2")
                {
                    var description2Image = response.data.projectimages[i].image;
                }  
                if(response.data.projectimages[i].type === "description3")
                {
                    var description3Image = response.data.projectimages[i].image;
                }   
            }
            
            if(!description1Image)
            {
                document.getElementById("imgDesc1").setAttribute('src', './images/axe.jpg');
            } else{
                document.getElementById("imgDesc1").setAttribute('src', './images/' + description1Image);
            }
            
            if(!description2Image)
            {
                document.getElementById("imgDesc2").setAttribute('src', './images/axe.jpg');
            } else{
                document.getElementById("imgDesc2").setAttribute('src', './images/' + description2Image);
            }
            
            if(!description3Image)
            {
                document.getElementById("imgDesc3").setAttribute('src', './images/axe.jpg');
            } else{
                document.getElementById("imgDesc3").setAttribute('src', './images/' + description3Image);
            }
            
            // Mostramos las últimas 5 noticias del proyecto
            if(response.data.projectupdates.length == 0)
            {
                $("#lastNews").html('').hide().addClass("alert alert-danger").attr("role","alert").html('Todavía no hay noticias nuevas para este proyecto.').fadeIn(1000).delay(1000); 
            }
            for(let i = 0; i < response.data.projectupdates.length; i++)
            {
                let updateid = response.data.projectupdates[i].id;
                let title = response.data.projectupdates[i].title;
                let text = response.data.projectupdates[i].text;
                let time = response.data.projectupdates[i].date;
                
                let div = document.getElementById('lastNews');
                let br = document.createElement('br');
                let card = document.createElement('div');
                $(card).addClass('card');
                
                let cardBody = document.createElement('div');
                $(cardBody).addClass('card-body');
                
                let titleDiv = document.createElement('div');
                $(titleDiv).addClass('card-title');
                
                let cardTitle = document.createElement('h4');
                $(cardTitle).html(title);
                
                let cardDate = document.createElement('p');
                $(cardDate).addClass('small');
                $(cardDate).html(time);
                
                let cardText = document.createElement('p');
                $(cardText).addClass('card-text');
                $(cardText).html(text);
                
                var a = document.createElement('button');
                $(a).addClass('card-link btn btn-primary');
                $(a).html("Seguir leyendo");
                a.setAttribute('id', updateid);
                a.addEventListener('click', viewUpdate)
                
                titleDiv.append(cardTitle);
                titleDiv.append(cardDate);
                cardBody.append(titleDiv);
                cardBody.append(cardText);
                cardBody.append(a);
                card.append(cardBody);
                div.append(card);
                div.append(br);
            }
        },
        error: function(xhr, ajaxOptions, error)
        {
            $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</strong>. No se puede cargar el proyecto. Por favor, vuelva a la <a href="/projects">lista de proyectos</a> y seleccione uno.').fadeIn(1000).delay(1000);  
        }
    });

    function viewUpdate()
    {
        $.ajax({
            url: '/currentUpdateID',
            type: 'POST',
            data: {"updateid": $(this).attr('id')},
            success: function(response, textStatus, request)
            {
                document.location = '/updateview'
            },
            error: function(xhr, ajaxOptions, error)
            {
                
                $("#notification").html('').hide().addClass("alert alert-danger").attr("role","alert").html('<strong>Error</strong>. No se puede cargar la noticia seleccionada. Por favor, vuelva a la <a href="/projects">lista de proyectos</a> y seleccione uno.').fadeIn(1000).delay(1000); 
            }
        });
    }
});