<?php 
/* Formulário Zenith - lógica para processar e retornar dados
 * Autor: Sr. Victor Batista - t.me/LevyMac, https://github.com/srvictorbatista/ZenithForm
 **/

set_time_limit(3);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Host-Type: Print-Server");
header("X-Powered-By: Hello Print-POS");
header("X-Powered-Documentation-in: github.com/srvictorbatista");
header("X-Developer-By: Sr. Victor Batista");
header("X-Developer-Contact: t.me/levymac");

header("Content-Type: application/json, text/joson");



$retorno = [];





// Remove todos os caracteres não numéricos do indice
$_POST['indice'] = isset($_POST['indice']) ? preg_replace("/[^0-9.]/", "", $_POST['indice']) : 0;

// Total de páginas
$indiceFim = 4;



// valida e conta indices
$_POST['indice'] = ($_POST['indice']>=2) ? $_POST['indice'] : '1';





switch ($_POST['indice']) {
    case ($indiceFim+1):

		    $retorno['conteudo'] = "
		                       <center><h1 style=\"font-weight: normal; align-itens:center; text-align: center !important;\">
		                        	🏆  Obrigado por participar!
		                        </h1></center><br>		                        	
		                        	Seu feedback nos ajuda a entender melhor as necessidades e expectativas dos nossos usuários, permitindo-nos oferecer experiências cada vez melhores. Estamos comprometidos em fornecer produtos e serviços de alta qualidade que atendam às suas expectativas e superem necessidades.<br>
									Por favor, saiba que sua contribuição é muito apreciada e será cuidadosamente considerada. Estamos constantemente trabalhando para aprimorar nossos processos e oferecer soluções que agreguem valor à sua experiência.<br>
									<br>
									Mais uma vez, obrigado por sua participação. Se houver algo mais em que possamos ajudar ou se tiver alguma dúvida, não hesite em nos contatar.<br>
		                     ";






			$retorno['scripts'][] = "
				setTimeout(function(){
				 \$('.chevron, .fa-chevron-up, .fa-chevron-down').css('display','none');
				}, 400); 


				 \$('body').prepend(\"<div id=\\\"bgFest\\\" class=\\\"bg bg4\\\"></div>\");
				 setTimeout(function(){
				    \$('#bg').removeClass('bg2').addClass('bg3');
				    \$('#bg').fadeIn(8000);
				    pressTeclado = null;
				 }, 100);




				setTimeout(function(){
				 progress(".( ($_POST['indice']-1) * (100/$indiceFim+1) ).");
				}, 1500);




			    setInterval( function(){
				     // poiscar .powerby
				    var powerby = \$('.powerby');

				    function piscar(){
				        powerby.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
				        // powerby.fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
				    }

				    // Chama a função de piscar três vezes
				    setTimeout(piscar, 500);
			    }, 8000);



                setTimeout(function(){
                	$('html').css('overflow-y','auto');
                }, 900);

			";

                     


       break; 
    /////////////////////////////////


    default:





			$retorno['titulo'] ="";

			$retorno['conteudo'] = "
		                        <center><h1 style=\"font-weight: normal; align-itens:center; text-align: center !important;\">
		                        	Check-in Obrigatório.
		                        </h1></center><br>
		                        	{$_POST['indice']} <i class=\"fa fa-long-arrow-right\" aria-hidden=\"true\"></i> 
		                        	Est quasi quos non galisum sequi est ducimus animi. Non blanditiis illo id molestias quisquam sed consequatur illum et doloribus iure vel ratione perferendis ut voluptatem quidem quo corporis voluptas. 33 praesentium consequatur in enim aperiam et vero molestias et eaque accusamus eos aperiam internos qui consequuntur animi est quibusdam dolorum. Non aperiam perspiciatis et accusamus voluptatum et harum temporibus et perspiciatis obcaecati.<br>
		                         👊
		                     ";


			$retorno['campos'][] = [
				"tipo"			=> 'text', 
				"nome"			=> 'texto',
				"id"			=> null,
				"class"			=> null,
				"style"			=> null,
				"placeholder"	=> 'Digite algo...', 
				"value"			=> '',	
				"onclick"		=> null,
				"required"		=> null,
			];

			$retorno['campos'][] = [
				"tipo"			=> 'password', 
				"nome"			=> 'texto',
				"id"			=> null,
				"class"			=> null,
				"style"			=> null,
				"placeholder"	=> 'Digite algo...', 
				"value"			=> '',	
				"onclick"		=> null,
				"required"		=> null,
			];

			$retorno['campos'][] = [
				"tipo"			=> 'hidden', 
				"nome"			=> 'indice',
				"id"			=> null,
				"class"			=> null,
				"style"			=> null,
				"placeholder"	=> null, 
				"value"			=> (@$_POST['indice']+1),	
				"onclick"		=> null,
			];



			$retorno['campos'][] = [
				"tipo"			=> 'submit', 
				"nome"			=> null,
				"id"			=> null,
				"class"			=> null,
				"style"			=> null,
				"placeholder"	=> null, 
				"value"			=> 'OK <i class="fa fa-check" aria-hidden="true"></i>',	
				"onclick"		=> null,
			];



			$retorno['scripts'][] = "
				 \$('#bg').addClass('bg2');

				setTimeout(function(){
				  \$('input')[0].focus();
				 progress(".( ($_POST['indice']-1) * (100/$indiceFim+1) ).");
				}, 1500); indiceFim = {$indiceFim};
			";


       break;
}

die(json_encode($retorno)); // exit();

?>