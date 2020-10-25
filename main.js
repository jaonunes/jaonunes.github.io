var repositorios = document.querySelector('#lista-repo');
var starreds = document.querySelector('#lista-starred');
function buscaUser(f){

    let usuario = f.pesquisaUser.value;
    f.pesquisaUser.value='';
    hideDivResultado();

    $.getJSON('https://api.github.com/users/'+usuario, function(data) {
        let user = data;
        showDivResultado();
        buscarDados(usuario);
        showUser(user);
        
    }).fail(function(){
        alert("Usuário não encontrado")
        window.location.reload()
        
    })
    
    
}
function buscarDados(usuario){
    $.getJSON('https://api.github.com/users/'+usuario+'/repos', function(data) {
        let dadosRepositorios = data;
       showRepositorios(dadosRepositorios);
    })

    $.getJSON('https://api.github.com/users/'+usuario+'/starred', function(data) {
        owner:'octocat'
        repo:'hello-world'
        let dadoStarred = data;
     showStarred(dadoStarred);
    })
}
function showUser(dadosUsuario){
    let titleResult = document.querySelector('#title-resultado');
    titleResult.innerHTML = '';
    let nickname = dadosUsuario.login;    
    $('#title-resultado').append('User: '+nickname);
}


function showRepositorios(dadosRepositorios){
    repositorios.innerHTML = '';
    let tamanho = dadosRepositorios.length;
    if(tamanho==0){
        let repositorio = document.createTextNode("Nenhum repositório encontrado");
        let newRepositorio = document.createElement('li');
        newRepositorio.appendChild(repositorio);
        repositorios.appendChild(newRepositorio);
    }
    else{
        for (let i = 0; i < tamanho; i++){
            let repositorio = document.createTextNode(dadosRepositorios[i].name);
            let newRepositorio = document.createElement('li');
            newRepositorio.appendChild(repositorio);
            repositorios.appendChild(newRepositorio);
        }
    }
}

function showStarred(dadosStarred){
    starreds.innerHTML = ' ';
    var tamanho = dadosStarred.length;
    if(tamanho==0){
        let starred = document.createTextNode("Nenhum visitado encontrado");
        let newStarred = document.createElement('li');
        newStarred.appendChild(starred);
        starreds.appendChild(newStarred);
    }
    else{
        for (var i = 0; i < tamanho; i++){
            let starred = document.createTextNode(dadosStarred[i].name);
            let newStarred = document.createElement('li');
            newStarred.appendChild(starred);
            starreds.appendChild(newStarred);
        }
    }
}


function filter(el){
    let itens = document.getElementsByClassName("lista-resultado-busca");
    
        idButton = el.id;
        idBusca = 'lista-' + idButton.substring(idButton.indexOf("-") + 1);
		
	for(var i = 0; i < itens.length; i++){
	  if(itens[i].classList.contains(idBusca)){
        $(itens[i]).removeClass("div-esconde");
		$(itens[i]).addClass("div-aparece");

	  }
	  else{
        $(itens[i]).removeClass("div-aparece");
		$(itens[i]).addClass("div-esconde");
		
	  }
	}
};

function showDivResultado(){
    let div =  document.getElementsByClassName("div-resultado-filtro");
    $(div).addClass("div-aparece");
}
function hideDivResultado(){
    let div =  document.getElementsByClassName("div-resultado-filtro");
    $(div).removeClass("div-aparece");
}