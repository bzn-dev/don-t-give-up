quartoTemporada () //[RAFAEL] um menu no seu código poedria chamar esta função e depois maisReserva() [VER FINAL DO CÓDIGO]
function quartoTemporada (){ //função que engloba quase todo este arquivo js
//----------------------------------------------------------------------------------
var dataInicial //variável que será calculada na função digitarDataInicial
var dataFinal //variável que será calculada na função digitarFinal

var ano=0 //variáveis que serão digitadas no prompt
var mes=0
var dia=0
var hora=0
var minuto=0

//-------------------------------------------------------------------------------------
var idRes=0//variável que será um número único para identificar uma reserva

function novoIdRes() { //função para perguntar se o usuário quer criar uma reserva, incrementa o idRes e chama a função digitarDataInicial
    var desejaRes=prompt ("Deseja realizar uma NOVA RESERVA? Digite 's' ou 'S' para SIM ou qualquer tecla para cancelar")
    if (desejaRes==='s' || desejaRes==='S') {idRes=idRes+1; //incrementa o idRes do objeto reserva e...
    digitarDataInicial(); //...chama a função digitarDataInicial
    } 
    else {fim (); console.log('FIM')}; //executar aqui uma função ou voltar ao menu anterior [RAFAEL!?] (está executando depois daqui digitarDataFinal, mas não deveria )
return idRes
}

function fim () { alert('FIM')} //executar ESSA função ou voltar ao menu anterior [RAFAEL!?]

//------------------------------------------------------------------------------------------------------------
idRes=novoIdRes() //chama a função novoIdRes (acima)
//------------------------------------------------------------------------------------------------------------

function digitarDataInicial (ano,mes,dia,hora,minuto){ //função para receber data e hora do início da reserva 
    
    ano=prompt(`Digite o ANO do INÍCIO da reserva`) ; //prompts seguintes para o usuário digitar a data e a hora inicial da reserva
    mes=prompt(`Digite o MÊS do INÍCIO da reserva`);
    dia=prompt(`Digite o DIA do INÍCIO da reserva`);
    hora=prompt(`Digite a HORA do INÍCIO da reserva`);
    minuto=prompt(`Digite o MINUTO do INÍCIO da reserva`)  
    
    mes=mes-1 //porque 0 é jan e 11 é dez
    var data=new Date (ano,mes,dia,hora,minuto) //Cria uma instância de data
    data.getFullYear(ano); //retorna o ano da data especificada 
    data.setMonth(mes); //atribui o mês para uma data específica
    data.setDate(dia); //atribui o dia do mês pra uma data específica
    data.setHours(hora); //atribui as horas para uma data especificada
    data.setMinutes(minuto); //atribui os minutos para uma data específica
    dataInicial=data ; //resultado da função para ser usada depois no objeto 'reserva' no formato completo de data, (Tue Mar 19 2024 18:48:23 GMT-0300 (GMT-03:00))
     
}; //fim da função digitarDataInicial

//-------------------------------------------------------------------------------------------------------------------------------------------------
var reservas=[ //array q vai armazenar os objetos das reservas (ou substituir por uma classe do Rafael?)
    { 
        
        numeroReserva: 0, //este 1º objeto do array será copiado para criar as novas reservas
        numeroQuarto: 0, // 
        horaInicial: new Date(), //
        horaFinal: new Date() //
    },
    
    { 
        numeroReserva: 1, // OBJETO SOMENTE PARA TESTE DA FUNÇÃO testeDataInicial E testeDataFinal 
        numeroQuarto: 0, // 
        horaInicial: new Date (2024,3-1,21,7,0), // 21/03/24 7h
        horaFinal: new Date (2024,3-1,21,12,0) // 21/03/24 12h
    },
    
    { 
        numeroReserva: 2, //OBJETO SOMENTE PARA TESTE DA FUNÇÃO testeDataInicial E testeDataFinal
        numeroQuarto: 0, // 
        horaInicial: new Date (2024,3-1,21,18,0), // 21/03/24 18h
        horaFinal: new Date (2024,3-1,21,21,0) // 21/03/24 21h
    }
    ];
//-------------------------------------------------------------------------------------------------------------------------------------------------
testeDataInicial () //chama a função testeDataInicial (abaixo)
//-------------------------------------------------------------------------------------------------------------------------------------------------

function testeDataInicial() { //função que testa se a hora inicial digitada é compatível com reservas existentes
    let disponivel = true;
    
    // Verifica se a data inicial já está disponível
    reservas.forEach(reserva => {
        if (dataInicial >= reserva.horaInicial && dataInicial <= reserva.horaFinal) {  //o início da nova reserva NÃO deverá ser DEPOIS DO INÍCIO ou ANTES DO FINAL de uma EXISTENTE do mesmo quarto
            disponivel = false;
        }
    });

    // Se a data inicial estiver disponível, alerta e solicita a data final
    if (disponivel) {
        alert('Horário de entrada DISPONÍVEL.');
        digitarDataFinal(); //se o horário de início está ok, pode-se digitar o horário de saída
        return; // Sai da função após solicitar a data final
    }

    // Caso contrário, continua verificando até encontrar um horário disponível
    reservas.forEach(reserva => {
        while (dataInicial >= reserva.horaInicial && dataInicial <= reserva.horaFinal) {
            alert('Horário indisponível! Selecione outro horário de início:');
            digitarDataInicial(); //repete a função para o usuário escolher um horário livre
            if (dataInicial < reserva.horaInicial || dataInicial > reserva.horaFinal) { //o início da nova reserva DEVERÁ ser ANTES DO INÍCIO ou APÓS O FINAL de uma EXISTENTE do mesmo quarto
                alert('Horário de entrada DISPONÍVEL');
                digitarDataFinal(); //se o horário de início está ok, pode-se digitar o horário de saída
            }
        }
    });
} //final da função testeDataInicial
;

//------------------------------------------------------------------------------------------------------------------------------------------------

function digitarDataFinal (ano,mes,dia,hora,minuto){ //função para receber data e hora do final da reserva 
    
    var ano=prompt(`Digite o ANO do FINAL da reserva`) ; //prompts seguintes para o usuário digitar a data e a hora final da reserva
    var mes=prompt(`Digite o MÊS do FINAL da reserva`);
    var dia=prompt(`Digite o DIA do FINAL da reserva`);
    var hora=prompt(`Digite a HORA do FINAL da reserva`);
    var minuto=prompt(`Digite o MINUTO do FINAL da reserva`)  
    
    mes=mes-1 //porque 0 é jan e 11 é dez
    var dataSaida=new Date (ano,mes,dia,hora,minuto) //Cria uma instância de data (FINAL)
    dataSaida.getFullYear(ano); //retorna o ano da data especificada (FINAL)
    dataSaida.setMonth(mes); //atribui o mês para uma data específica (FINAL)
    dataSaida.setDate(dia); //atribui o dia do mês pra uma data específica (FINAL)
    dataSaida.setHours(hora); //atribui as horas para uma data especificada (FINAL)
    dataSaida.setMinutes(minuto); //atribui os minutos para uma data específica (FINAL)
    dataFinal=dataSaida ; //resultado da função para ser usada depois no objeto 'reseva' no formato completo de data (Tue Mar 19 2024 18:48:23 GMT-0300 (GMT-03:00))
    //testeDataFinal () //...chama a função testeDataFinal para conferir se o horário final da reserva é compatível com reservas existente [NÃO FUNCIONOU AQUI DENTRO]
    
};
testeDataFinal () //chama a função testeDataFinal (abaixo)

//-----------------------------------------------------------------------------------------------------
function testeDataFinal() { //função que testa se a hora final digitada é compatível com reservas existentes
    let disponivel = true;
    
    // Verifica se a data final já está disponível
    reservas.forEach(reserva => {
        if ((dataFinal >= reserva.horaInicial && dataFinal <= reserva.horaFinal)|| dataFinal<=dataInicial) { //o final da nova reserva NÃO deverá ser após o início dela própria e APÓS O INÍCIO ou ANTES DO FINAL de uma EXISTENTE do mesmo quarto
            disponivel = false;
        }
    });

    
    if (disponivel) {
        alert('Horário de saída DISPONÍVEL');
        
        return; 
    }
///teste
    // Caso contrário, continua verificando até encontrar um horário disponível
    reservas.forEach(reserva => {
        while ((dataFinal >= reserva.horaInicial && dataFinal <= reserva.horaFinal)|| dataFinal<=dataInicial) { //o final da nova reserva NÃO deverá ser após o início dela própria e APÓS O INÍCIO ou ANTES DO FINAL de uma EXISTENTE do mesmo quarto
            alert('Horário indisponível! Selecione outro horário de saída:');
            digitarDataFinal(); //repete a função para o usuário escolher um horário livre
            if (dataFinal < reserva.horaInicial || dataFinal > reserva.horaFinal) { //o final da nova reserva DEVERÁ ser após o início dela própria e ANTES DO INÍCIO ou APÓS O FINAL de uma EXISTENTE do mesmo quarto
                alert('Horário de saída DISPONÍVEL');
                
            }
        }
    });
}; //final da função testeDataFinal

//-----------------------------------------------------------------------------------------------------    

function diaDaSemanaIniPorExtenso() { //transformar o número do dia da semana em texto (início da reserva)
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return diasDaSemana[diaSemIni]; //diaSem é um número de 0 a 6 dado por getDay
}
let diaSemIni = dataInicial.getDay(dataInicial) //getDay retorna o dia da semana para a data especificada (número de 0 a 6, sendo 0 o domingo) e passa para a var para ser usado na função que retora o nome do dia da semana
const diaDaSemanaIni = diaDaSemanaIniPorExtenso(dataInicial); //cria a variável com o nome do dia da semana por extenso a partir do resultado da função para depois ser exibido ao usuário
var dataBRIni=(dataInicial.toLocaleDateString('pt-BR')); //variável com a data no formato dd/mm/aaaa para ser exibida ao usuário
var horaBRIni=(dataInicial.toLocaleTimeString('pt-BR')); //variável com a hora no formato hh:mm:ss para ser exibida ao usuário

console.log(`Sua reserva inicia no(a) ${diaDaSemanaIni}, ${dataBRIni}, às ${horaBRIni}`); //exibe a data e hora do início da reserva

//------------------------------------------------------------------------------------------------------------------------------------------------------------
function diaDaSemanaFinPorExtenso() { //transformar o número do dia da semana em texto (final da reserva)
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return diasDaSemana[diaSemFin]; //diaSem é um número de 0 a 6 dado por getDay
}
let diaSemFin = dataFinal.getDay(dataFinal) //getDay retorna o dia da semana para a data especificada (número de 0 a 6, sendo 0 o domingo) e passa para a var para ser usado na função que retora o nome do dia da semana
const diaDaSemanaFin = diaDaSemanaFinPorExtenso(dataFinal); //cria a variável com o nome do dia da semana por extenso a partir do resultado da função para depois ser exibido ao usuário
var dataBRFin=(dataFinal.toLocaleDateString('pt-BR')); //variável com a data no formato dd/mm/aaaa para ser exibida ao usuário
var horaBRFin=(dataFinal.toLocaleTimeString('pt-BR')); //variável com a hora no formato hh:mm:ss para ser exibida ao usuário
//------------------------------------------------------------------------------------------------------------------------------------------------------------
console.log(`Sua reserva termina no(a) ${diaDaSemanaFin}, ${dataBRFin}, às ${horaBRFin}`); //exibe a data e hora do final da reserva

//-------------------------------------------------------------------------------------
    
     //function reservaNova (){ //cria um novo objeto de reserva dentro do array reservas e altera as informações da nova reserva (NÃO CONSEGUI FAZER FUNCIONAR QUANDO COLOCO ESTES COMANDOS ABAIXO DENTRO DA FUNÇÃO) [RAFAEL]
    //RAFAEL, substiuir as linhas abaixo por comando que salvam em uma classe!?
    var novaReserva={...reservas[0]};//incrementa o idRes e adiciona mais um objeto ao array reservas
    novaReserva.numeroReserva=idRes;
    novaReserva.numeroQuarto='Quarto.id'; //ALTERAR AQUI! deve puxar da classe 'Quarto' do Rafael (ver como fazer).
    novaReserva.horaInicial=dataInicial; //puxa da função 'digitarDataInicial' 
    novaReserva.horaFinal=dataFinal;  //puxa da função 'digitarDataFinal' 
    console.log(idRes) //exibe o número da reserva (é só pra teste, pode-se apagar esta linha depois)
//return novaReserva
//} 

//-----------------------------------------------------------------------------------------------------------

//var novaReserva=reservaNova() //chama a função (SE ELA FOR CRIADA)
console.log(novaReserva) //exibe o conteúdo da nova reserva (é só pra teste, pode-se apagar esta linha depois)
reservas.push(novaReserva) //adiciona a nova reserva ao array reservas (COLOCAR ESTE COMANDO DENTRO DA FUNÇÃO reservaNova???) [RAFAEL]
console.log(reservas) //exibe o conteúdo do array reservas (é só pra teste, pode-se apagar esta linha depois)
console.log(`A sua reserva é a de Nº ${reservas[idRes].numeroReserva} e o seu quarto é o ${reservas[idRes].numeroQuarto}`)    //exibe o número da reserva e o quarto (VER EXATAMENTE COMO FAZER ISSO RAFAEL!!!)


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
 }//final da função quartoTemporada

 //AQUI: VOLTAR PARA O MENU ANTERIOR OU PERGUNTAR SE QUER FAZER MAIS UMA RESERVA
maisReserva()

function maisReserva (){
    var desejaMaisRes=prompt ("Deseja realizar MAIS reservas? Digite 's' ou 'S' para SIM ou qualquer tecla para cancelar")
    if (desejaMaisRes==='s' || desejaMaisRes==='S') { //
    
        quartoTemporada(); //...chama a função quartoTemporada para repetir todo o código . AQUI DEVERIA INCREMENTAR O idRes, mas não está dando certo (está sobrescrevendo a última reserva) [RAFAEL]
    } 
    else {console.log('FIM')}; //executar aqui uma função ou voltar ao menu anterior
}

 //[RAFAEL] faltou aqui comandos para apagar reservas, etc