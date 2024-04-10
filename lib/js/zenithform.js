/* Formulário Zenith - Manipulação de objetos e eventos
 * Autor: Sr. Victor Batista - t.me/LevyMac, https://github.com/srvictorbatista/ZenithForm
 **/

 function charg(){
    $('form').submit(function(e){
            createNewForm(e);
    });
    function createNewForm(e){
         e.preventDefault();
        $.ajax({
            url: 'response.php',
            type: 'POST',
            dataType: 'json',
            data: $('#conteudo form').serialize(),
            success: function(data){            
                $('html').css('overflow-y','hidden');
                $("body").off("keyup", pressTeclado);
                $('#conteudo').addClass('saida').on('transitionend', function(){
                    setTimeout(function(){
                       $('#conteudo').addClass('fade').off('transitionend');
                   }, 200);
                });
            setTimeout(function(){
                var newconteudo = '<section id="new-conteudo">';
                if(data.titulo){
                    newconteudo += '<h2>' + data.titulo + '</h2>';
                }
                if(data.conteudo){
                    newconteudo += '<div class="contentForm">' + data.conteudo + '</div>';
                }
                newconteudo += '<form id="new-form" method="POST"></form>  </section>';
                $('body').append(newconteudo);
                $.each(data.campos, function(index, campo){

                    if (campo.tipo === 'text' || campo.tipo === 'password' || campo.tipo === 'hidden') {

                        var inputField = '<input type="' + campo.tipo + '"';
                        if (campo.nome) {
                            inputField += ' name="' + campo.nome + '"';
                        }
                        if (campo.id) {
                            inputField += ' id="' + campo.id + '"';
                        }
                        if (campo.class) {
                            inputField += ' class="' + campo.class + '"';
                        }
                        if (campo.value) {
                            inputField += ' value="' + campo.value + '"';
                        }
                        if (campo.placeholder) {
                            inputField += ' placeholder="' + campo.placeholder + '"';
                        }
                        if (campo.onclick) {
                            inputField += ' onClick="' + campo.onclick + '"';
                        }
                        if (campo.required) {
                            inputField += ' ' + campo.required;
                        }
                        if (campo.tipo === 'hidden'){
                        inputField += ' />';
                        }else{
                            inputField += ' /> <br>';
                        }
                        $('#new-form').append('<div>'+inputField+'</div>');


                    } else if (campo.tipo === 'submit' || campo.tipo === 'button') {

                        var buttonField = '<button type="' + campo.tipo + '"';
                        if (campo.nome) {
                            buttonField += ' name="' + campo.nome + '"';
                        }
                        if (campo.id) {
                            buttonField += ' id="' + campo.id + '"';
                        }
                        if (campo.class) {
                            buttonField += ' class="' + campo.class + '"';
                        }
                        if (campo.placeholder) {
                            buttonField += ' placeholder="' + campo.placeholder + '"';
                        }
                        if (campo.onclick) {
                            buttonField += ' onClick="' + campo.onclick + '"';
                        }
                        if (campo.value) {
                            buttonField += ' />' + campo.value;
                        }


                        if (campo.tipo === 'submit'){
                            buttonField = '<div style="margin-top:50px;">' + buttonField + '</button> Press <strong>Enter ↵</strong> </div> <p id="validate">AAA</p>';
                        }else{
                            buttonField = '<div>' + buttonField + '</button>  </div>';
                        }


                        $('#new-form').append(buttonField);

                    }

                });

                $.each(data.scripts, function(index, script){
                    $('#new-form').append('<script>' + script + '<\/script>');
                });

                
                PoweredBy = "<a href=\"https://t.me/levymac\" target=\"_blank\"><span class=\"powerby\">Powered by &nbsp; <strong>Sr. Victor Batista</strong></span></a>";
                indice = $('input[name="indice"]').val();

                if( indice == 1){
                    navDiv = "<span class=\"fa fa-chevron-up /*fa-chevron-right*/ chevron\" onclick=\"\$('form').submit();\"></span>";
                }else if( indice >= indiceFim ){
                    navDiv = "<span class=\"fa fa-chevron-down chevron\" onclick=\"\$('input[name=\\'indice\\']').val( "+(indice-2)+" );  \$('form').submit();\"></span>";
                }else{
                    navDiv = "<span class=\"fa fa-chevron-up /*fa-chevron-right*/\" onclick=\"\$('form').submit();\"></span>";
                    navDiv += "<span class=\"fa fa-chevron-down /*fa-chevron-left*/\" onclick=\"\$('input[name=\\'indice\\']').val( "+(indice-2)+" );  \$('form').submit();\"></span>";
                }
                $('#new-form').append("<div id=\"div-navigate\"> " + PoweredBy+navDiv + " <\/div>");


                setTimeout(function(){
                    $('#new-conteudo').addClass('entrada').on('transitionend', function(){
                        $(this).addClass('fade').off('transitionend');
                        $('#conteudo').remove();
                        $('#new-conteudo').attr('id', 'conteudo').removeAttr('class');
                        $('#new-form').attr('id', 'old-form').removeAttr('class');

                            charg();
                            $("body").keyup(pressTeclado);
                    });
                }, 100);

            }, 800);
            },
            error: function(xhr, status, error){
                console.error('ERRO NO FORMULARIO: \n' + error);

                $('#validate').css('display','inline-block').html("<span class=\"fa fa-exclamation-triangle\"></span> Algo deu errado durante a solicitação");


            }
        });
        
    }

}


pressTeclado = function(e){
    function next(){
        e.preventDefault();
        imput = $('form input[type="text"]');
            if(
                (imput.attr('required') == 'required') &&
                (imput.val() == '')
            ){
                $('#validate').css('display','inline-block').html("<span class=\"fa fa-exclamation-triangle\"></span> Por favor, preencha este campo");
                imput.focus();
                return false;
            }
            $('form').submit();
    }

    function revin(){
        e.preventDefault();
        imput = $('form input[name="indice"]');
            if(
                (imput.val() > 2)
            ){
                $('input[name=\'indice\']').val( $('input[name=\'indice\']').val()-2 ); $('form').submit();
            }
            
    }

    if (e.keyCode === 13) {// Enter
        next();
    }else if(e.keyCode === 38){ // cima
        next();
    }else if(e.keyCode === 40){ // baixo
        revin()       
    }else if(e.keyCode === 37){ // <-
        revin()
    }else if(e.keyCode === 39){ // ->
        next();   
    }
}

function progress(perc){
  const progressBar = document.getElementById('porgress');
  if(perc>100){perc='100';}
  $('#porgress').css('width', perc + '%');
  $('#porgress-display').css('display', 'block');
}

$(document).ready( function(){
    charg();
    $("body").keyup(pressTeclado);
});