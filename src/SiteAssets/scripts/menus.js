ExecuteOrDelayUntilScriptLoaded(function () { getCurrentWebTitle() }, "SP.js");
ExecuteOrDelayUntilScriptLoaded(function () { GetHeaders() }, "SP.js");
ExecuteOrDelayUntilScriptLoaded(function () { GetMenuLinks() }, "SP.js");

//ExecuteOrDelayUntilScriptLoaded(function () { getCurrentWebTitle(), GetMenuLinks(), GetHeaders()  }, "SP.js");

var currentWebTitle = '';

function GetHeaders() {

	// Obtém a url absoluta do site
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
	var list = clientContext.get_web().get_lists().getByTitle("Reports");	
	clientContext.load(list);
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='tipoLink' /><Value Type='Choice'>Header</Value></Eq></Where></Query></View>");
	
	headerCollection = list.getItems(camlQuery);
	clientContext.load(headerCollection);

	clientContext.executeQueryAsync(Function.createDelegate(this,this.onSuccess), Function.createDelegate(this,this.onFailed));
}

function onSuccess(sender, args) {
	var enumerator = headerCollection.getEnumerator();
	
    while (enumerator.moveNext()) {        
    
        // get the current list item.
        var listItem = enumerator.get_current();
        
        // get the field value by internalName.        
        var site = listItem.get_item('site');
        var Id_GrupoAutorizado = listItem.get_item('permissaoDeAcesso');
        var nomeRelatorio = listItem.get_item('Title')
        var urlIcon = listItem.get_item('icone');
        var header = listItem.get_item('header');
        
        var link_ref = nomeRelatorio.replace(/\s/g, "");        
        
        // Compara o valor cadastrado na coluna "Site" com o site onde o usuário está logado para mostrar os itens no menu correspondente a cada site
        if (site == currentWebTitle){
        	
        	if(urlIcon != null){
    				$("#sidebar").append(`<div class="leftNavIcons sidebarCollapse" style="background:url(${urlIcon.$1_1}) no-repeat center center"></div>
    							
					<ul class="list-unstyled components">
	                    <li class="sidebar-links">
	                    	<!-- Cria dinamicamente o link para expandir os subitens do menu -->
	                        <a href="#sublink_${link_ref}" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
	                        	${nomeRelatorio}                                            
	                        </a>
	                        <!-- Cria dinamicamente o ID para fazer referência ao item pai e então expandir os subitens do menu -->
	                        <ul class="collapse list-unstyled" id="sublink_${link_ref}">                         
	                        </ul>
	                    </li>
	                </ul>`);  
                } 
                else
	        		alert('Um cabeçalho foi definido sem um ícone')
       		}
		}
    
    $('.sidebarCollapse').on('click', function () {
    	$('#sidebar').toggleClass('active');
	});
	
	// Cria uma área específica para adicionar os links fixos - Sempre abaixo dos cabeçalhos (links contendo sublinks)
	$("#sidebar").append(`<div id="fixedLinks"></div>`);
}


function GetMenuLinks() {

	// Obtém a url absoluta do site
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
	var list = clientContext.get_web().get_lists().getByTitle("Reports");	
	clientContext.load(list);
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml("<View></View>");
	
	itemCollection = list.getItems(camlQuery);
	clientContext.load(itemCollection);

	clientContext.executeQueryAsync(Function.createDelegate(this,this.onSuccess1), Function.createDelegate(this,this.onFailed));
} 
	
function onSuccess1(sender, args) {
	var enumerator = itemCollection.getEnumerator();
	
    while (enumerator.moveNext()) {        
    
        // get the current list item.
        var listItem = enumerator.get_current();
        
		// get the field value by internalName.
		var idRelatorio = listItem.get_item('ID');
		var nomeRelatorio = listItem.get_item('Title');		
        var linkReport = listItem.get_item('linkRelatorio');            
        var categoria = listItem.get_item('categoria');
        var apresentacao = listItem.get_item('apresentacao');
        var site = listItem.get_item('site');
        var Id_GrupoAutorizado = listItem.get_item('permissaoDeAcesso');        
        var tipoLink = listItem.get_item('tipoLink');
        var urlIcon = listItem.get_item('icone');
        var header = listItem.get_item('header'); 
        
        var link_ref = nomeRelatorio.replace(/\s/g, "");
        
        
        // Compara o valor cadastrado na coluna "Site" com o site onde o usuário está logado para mostrar os itens no menu correspondente a cada site
        if (site == currentWebTitle){
        	
        	if (tipoLink == "Sublink"){	        
				if(header != null && linkReport != null)	        	
	        		var sublink_header = header.replace(/\s/g, "");
	        	else
	        		alert('Um Sublink foi definido sem um cabeçalho ou uma URL.')
	        	
				$(`#sublink_${sublink_header}`).append(`<li>
					<a id="${idRelatorio}" href="#" onclick="setUrlIframe('${linkReport.$1_1}')">${nomeRelatorio}</a>
				</li>`)	
	        }
	        
	        if (tipoLink == "Link"){
	        	
	        	if(urlIcon != null && linkReport != null){
					$("#fixedLinks").append(`<a id="${idRelatorio}" href="#" onclick="setUrlIframe('${linkReport.$1_1}')">
					<div class="leftNavIcons" style="background:url(${urlIcon.$1_1}) no-repeat center center"></div>
					</a>`);
                } 
                else
	        		alert('Um link foi definido sem um ícone ou uma URL.')
	        }
       }
	}
}

function onFailed(sender, args) {
    console.log('Ocorreu um erro ao recuperar os itens da lista: ' + args.get_message());
}

function getCurrentWebTitle(){
    
    var clientContext = new SP.ClientContext.get_current();
    
	web = clientContext.get_web();
	clientContext.load(web);
	clientContext.executeQueryAsync(success, failure);

	function success() {
		currentWebTitle = web.get_title();		
	}
	function failure() {
		console.log("Não foi possível obter o nome do site!");
	}
}

function setUrlIframe(linkReport){
	$('#homeReportDesktop').attr('src', linkReport)
}