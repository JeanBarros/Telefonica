$(document).ready(function() {
    // Mostra botão de "abrir e fechar" apenas quando existem "Headers" com sublinks no menu lateral
    $('#closeMenu').hide()
});

ExecuteOrDelayUntilScriptLoaded(function () { getCurrentWebTitle() }, "SP.js");
ExecuteOrDelayUntilScriptLoaded(function () { GetHeaders() }, "SP.js");

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
		var idRelatorio = listItem.get_item('ID');
        var nomeRelatorio = listItem.get_item('Title');
        var linkTitle = listItem.get_item('linkTitle0');     
        var site = listItem.get_item('site');
		var gruposAutorizados = listItem.get_item('permissaoDeAcesso');
		var blackList = listItem.get_item('blackList');
		var tipoLink = listItem.get_item('tipoLink');		
        var urlIcon = listItem.get_item('icone');
        
        var link_ref = nomeRelatorio.replace(/\s/g, "");
        
		if (linkTitle == null)
			linkTitle = "";        
        
        // Compara o valor cadastrado na coluna "Site" com o site onde o usuário está logado para mostrar os itens no menu correspondente a cada site
        if (site == currentWebTitle){        	
        	if(urlIcon != null){
				$("#sidebar").append('<div id=' + idRelatorio + ' class="leftNavIcons sidebarCollapse"' +
					'style="background:url(' + urlIcon.$1_1 + ') no-repeat top center">' +
					'<div class="link-title">' + linkTitle + '</div>' +
				'</div>' +									
				'<ul class="list-unstyled components">' +
	                '<li class="sidebar-links" >' +
	                	'<!-- Cria dinamicamente o link para expandir os subitens do menu -->' +
						'<a href="#sublink_' + link_ref + '" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"></a>' +
	                    '<!-- Cria dinamicamente o ID para fazer referência ao item pai e então expandir os subitens do menu -->' +
	                    '<ul class="collapse list-unstyled" id="sublink_' + link_ref + '"></ul>' +
	                '</li>' +
	           '</ul>');  
            } 
            // Quando não há ícone cadastrado exibe apenas o Nome do Relatório (Title)
            else{
            	$("#sidebar").append('<div id=' + idRelatorio + ' class="leftNavIcons sidebarCollapse">' +
					'<div class="link-title">' + linkTitle + '</div>' +
				'</div>' +									
				'<ul class="list-unstyled components">' +
                    '<li class="sidebar-links" >' +
                    	'<!-- Cria dinamicamente o link para expandir os subitens do menu -->' +
						'<a href="#sublink_' + link_ref + '" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"></a>' +
                        '<!-- Cria dinamicamente o ID para fazer referência ao item pai e então expandir os subitens do menu -->' +
                        '<ul class="collapse list-unstyled" id="sublink_' + link_ref + '">' +                        
                        '</ul>' +
                    '</li>' +
                '</ul>');
            }
            
			$('.leftNavIcons').css('visibility','hidden')			
						           
			if(blackList != null){
				blackList.forEach(checkUser);
				
				function checkUser(element) {			    	
			    	if (element.$1x_1 == _spPageContextInfo.userId){
			    		$('#' + idRelatorio).hide()
						$('#' + idRelatorio).next().css('visibility','hidden')
			    	}	 
				}
			}			
			else if(gruposAutorizados != null){
						
				gruposAutorizados.forEach(setMenuItems);
	
				function setMenuItems(element, index, array) {
					resetLinks(element.$1x_1, idRelatorio, tipoLink)
				}
			}
			else{
				itemsToShow.push(idRelatorio)
				//console.log('Acesso permitido no item ' + idRelatorio)
			}
		}
	}
	
	//console.log('Cabeçalhos-----------------------------------------------------------------------------')
	showItems("Header")
    
	// Exibe os subitens do cabeçalho ao clicar no icone
	$('.leftNavIcons').click(function(){
		var groupItemID = $(this).next().find('.list-unstyled').attr('id')
		var linkItemID = $(this).attr('id')				
				
		if($("#" + linkItemID).hasClass('clickedOn')){
			$("#" + groupItemID).removeClass('show')
			$("#" + linkItemID).removeClass('clickedOn')
			$("#" + linkItemID).addClass('clickedOff')
		}
					
		if($("#sidebar").hasClass('active')){			
			if($("#" + linkItemID).hasClass('clickedOff')){
				$("#" + groupItemID).removeClass('show')
				$("#" + linkItemID).removeClass('clickedOff')
			}
			else{
				$("#" + groupItemID).addClass('show')
				$("#" + linkItemID).addClass('clickedOn')
			}
		}
		
		// Expande o menu para a lateral e abre os subitens do link clicado
		if(!$("#sidebar").hasClass('active')){
			$('#sidebar').toggleClass('active')	
			$("#" + groupItemID).addClass('show')
			$("#" + linkItemID).addClass('clickedOn')	
			
			if($("#sidebar").hasClass('active')){
				$("#closeMenu").css('webkit-transform','scaleX(1)')
				$("#closeMenu").css('transform','scaleX(1)')
				$("#closeMenu").css('background-position-x','right')
				}
			else{
				$("#closeMenu").css('webkit-transform','scaleX(-1)')
				$("#closeMenu").css('transform','scaleX(-1)')
				$("#closeMenu").css('background-position-x','center')
			}	
		}
		
		/*if($("#" + groupItemID).hasClass('show'))
			$("ul.list-unstyled.components").css('visibility','visible')
		else{
			$("ul.list-unstyled.components").css('visibility','hidden')
		}*/
				
		$("#sidebar a").unbind().click(function() {
		    var clickedlinkID = $(this).attr('id');
		    var clickedLinkTitle = $(this).text();
		    
		    if(clickedlinkID != undefined)		    	
		    	getClickedLinkProps(clickedlinkID, clickedLinkTitle)
		});
  	});
  			  
	// Cria uma área específica para adicionar os links fixos - Sempre abaixo dos cabeçalhos (links contendo sublinks)
	$("#sidebar").append('<div id="fixedLinks"></div>');

	ExecuteOrDelayUntilScriptLoaded(function () { GetMenuLinks() }, "SP.js");
}

function GetMenuLinks() {

	// Obtém a url absoluta do site
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
	var list = clientContext.get_web().get_lists().getByTitle("Reports");	
	clientContext.load(list);
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml("<View><Query><Where><Neq><FieldRef Name='tipoLink' /><Value Type='Choice'>Header</Value></Neq></Where></Query></View>");
	
	itemCollection_SideNav = list.getItems(camlQuery);
	clientContext.load(itemCollection_SideNav);

	clientContext.executeQueryAsync(Function.createDelegate(this,this.onSuccess1), Function.createDelegate(this,this.onFailed));
} 
	
function onSuccess1(sender, args) {
	var enumerator = itemCollection_SideNav.getEnumerator();
	
    while (enumerator.moveNext()) {        
    
        // get the current list item.
        var listItem = enumerator.get_current();
        
		// get the field value by internalName.
		var idRelatorio = listItem.get_item('ID');
		var nomeRelatorio = listItem.get_item('Title');	
		var linkTitle = listItem.get_item('linkTitle0');	
		var desktopLinkReport = listItem.get_item('desktopLinkReport');
		var mobileLinkReport = listItem.get_item('mobileLinkReport');            
        var categoria = listItem.get_item('categoria');
        var site = listItem.get_item('site');
        var gruposAutorizados = listItem.get_item('permissaoDeAcesso');
        var blackList = listItem.get_item('blackList');
        var tipoLink = listItem.get_item('tipoLink');
        var urlIcon = listItem.get_item('icone');
		var header = listItem.get_item('header');
		var paginaDetalhe = listItem.get_item('paginaDetalhes');
		var paginaInterna = listItem.get_item('paginaInterna');	
		
		if (linkTitle == null)
			linkTitle = "";	
        
		// Compara o valor cadastrado na coluna "Site" com o site onde o usuário está logado 
		// para mostrar os itens no menu correspondente a cada site
        if (site == currentWebTitle){
        	
        	if (tipoLink == "Sublink"){	
				// Verifica se o usuário está navegando em desktop ou mobile 
				if (screen.width > 991){
					if(header != null && desktopLinkReport != null){
						var sublink_header = header.replace(/\s/g, "");	
						if(categoria == "Detalhe"){
							if(paginaDetalhe != null){
								$('#sublink_' + sublink_header).append('<li>' +
									'<a id=' + idRelatorio + ' href=' + paginaDetalhe.$1_1 + '?' + desktopLinkReport + '>' 
									+ nomeRelatorio + '</a>' +
								'</li>')
							}
							else
								alert('Um sublink foi cadastrado sem uma URL para a página de detalhes')
						}	
						else{				
							$('#sublink_' + sublink_header).append('<li>' +
								'<a id=' + idRelatorio + ' href="#" onclick="setUrlIframeDesktop(' + "'" + desktopLinkReport + "'" +'); CloseNavbar();">' 
								+ nomeRelatorio + '</a>' +
							'</li>')
						}
					}	
					else
						alert('Um Sublink foi cadastrado sem um cabeçalho ou uma URL para o relatório')
				}
				else{
					if(header != null && mobileLinkReport != null){	        	
						var sublink_header = header.replace(/\s/g, "");
						if(categoria == "Detalhe"){
							if(paginaDetalhe != null){
								$('#sublink_' + sublink_header + ').append(<li>' +
									'<a id=' + idRelatorio + ' href=' + paginaDetalhe.$1_1 + '?' + mobileLinkReport + '>' + nomeRelatorio + '</a>' +
								'</li>')
							}
							else
								alert('Um sublink foi cadastrado sem uma URL para a página de detalhes')
						}
						else{							
							$('#sublink_' + sublink_header).append('<li>' +
								'<a id=' + idRelatorio + ' href="#" onclick="setUrlIframeMobile(' + "'" + mobileLinkReport + "'" +'); CloseNavbar();">' 
								+ nomeRelatorio + '</a>' +
							'</li>')
						}
					}
					else
						alert('Um Sublink foi cadastrado sem um cabeçalho ou uma URL.')
				}					
	        }	        
	        if (tipoLink == "Link"){
				// Verifica se o usuário está navegando em desktop
				if (screen.width > 991){					
					if(urlIcon != null){
						if(categoria == "Detalhe"){
							if(desktopLinkReport != null){
								if(paginaDetalhe != null){
									$("#fixedLinks").append('<a id=' + idRelatorio + ' href=' + paginaDetalhe.$1_1 + '?' + desktopLinkReport + '>' +
											'<div class="leftNavIcons" style="background:url(' + urlIcon.$1_1 + ') no-repeat top center">' +
											'<div class="link-title">' + linkTitle + '</div>' +
										'</div>' +									
									'</a>');
								}
								else
									alert('Um link foi cadastrado sem uma URL para a página de detalhes')
							}								
							else
								alert('Um link foi cadastrado sem uma URL para o relatório.')
						}
						else if(categoria == "Interna"){
							if(paginaInterna != null){
								$("#fixedLinks").append('<a id=' + idRelatorio + ' href=' + paginaInterna.$1_1 + '>' +
										'<div class="leftNavIcons" style="background:url(' + urlIcon.$1_1 + ') no-repeat top center">' +
										'<div class="link-title">' + linkTitle + '</div>' +
									'</div>' +									
								'</a>');
							}
							else
								alert('Um link foi cadastrado sem uma URL para a página interna')
						}
						else{
							if(desktopLinkReport != null){
								$("#fixedLinks").append('<a id=' + idRelatorio + ' href="#" onclick="setUrlIframeDesktop(' + "'" + desktopLinkReport + "'" + ');">' +
										'<div class="leftNavIcons" style="background:url(' + urlIcon.$1_1 + ') no-repeat top center">' +
										'<div class="link-title">' + linkTitle + '</div>' +
									'</div>' +							
								'</a>');
							}
							else
								alert('Um link foi cadastrado sem uma URL para o relatório.')
						}
					}
					// Quando não há ícone cadastrado exibe apenas o Nome do Relatório (Title)
					else{
						if(categoria == "Detalhe"){
							if(desktopLinkReport != null){
								if(paginaDetalhe != null){
									$("#fixedLinks").append('<a id=' + idRelatorio + ' href=' + paginaDetalhe.$1_1 + '?' + desktopLinkReport + '>' +
											'<div class="link-title">' + linkTitle + '</div>' +
										'</div>' +
									'</a>');
								}
								else
									alert('Um link foi cadastrado sem uma URL para a página de detalhes')
							}
							else
								alert('Um link foi cadastrado sem uma URL para o relatório.')
						}
						else if(categoria == "Interna"){
							if(paginaInterna != null){
								$("#fixedLinks").append('<a id=' + idRelatorio + ' href=' + paginaInterna.$1_1 + '>' +
										'<div class="link-title">' + linkTitle + '</div>' +
									'</div>' +
								'</a>');
							}
							else
								alert('Um link foi cadastrado sem uma URL para a página interna')
						}
						else{
							if(desktopLinkReport != null){
								$("#fixedLinks").append('<a id=' + idRelatorio + ' href="#" onclick="setUrlIframeDesktop(' + "'" + desktopLinkReport + "'" + ');">' +
										'<div class="link-title">' + linkTitle + '</div>' +
									'</div>' +								
								'</a>');
							}
							else
								alert('Um link foi cadastrado sem uma URL para o relatório.')
						}
					}
				}
				// Verifica se o usuário está navegando em mobile
				else{					
					if(urlIcon != null){
						if(categoria == "Detalhe"){
							if(mobileLinkReport != null){
								if(paginaDetalhe != null){
									$("#fixedLinks").append('<a id=' + idRelatorio + ' href=' + paginaDetalhe.$1_1 + '?' + mobileLinkReport + '>' +
											'<div class="leftNavIcons" style="background:url(' + urlIcon.$1_1 + ') no-repeat top center">' +
											'<div class="link-title">' + linkTitle + '</div>' +
										'</div>' +									
									'</a>');
								}
								else
									alert('Um link foi cadastrado sem uma URL para a página de detalhes')
							}								
							else
								alert('Um link foi cadastrado sem uma URL para o relatório.')
						}
						else if(categoria == "Interna"){
							if(paginaInterna != null){
								$("#fixedLinks").append('<a id=' + idRelatorio + ' href=' + paginaDetalhe.$1_1 + '>' +
										'<div class="leftNavIcons" style="background:url(' + urlIcon.$1_1 + ') no-repeat top center">' +
										'<div class="link-title">' + linkTitle + '</div>' +
									'</div>' +									
								'</a>');
							}
							else
								alert('Um link foi cadastrado sem uma URL para a página interna')
						}
						else{
							if(mobileLinkReport != null){
								$("#fixedLinks").append('<a id=' + idRelatorio + ' href="#" onclick="setUrlIframeMobile(' + "'" + mobileLinkReport + "'" + ');">' +
										'<div class="leftNavIcons" style="background:url(' + urlIcon.$1_1 + ') no-repeat top center">' +
										'<div class="link-title">' + linkTitle + '</div>' +
									'</div>' +							
								'</a>');
							}
							else
								alert('Um link foi cadastrado sem uma URL para o relatório.')
						}
					}
					// Quando não há ícone cadastrado exibe apenas o Nome do Relatório (Title)
					else{
						if(categoria == "Detalhe"){
							if(mobileLinkReport != null){
								if(paginaDetalhe != null){
									$("#fixedLinks").append('<a id=' + idRelatorio + ' href=' + paginaDetalhe.$1_1 + '?' + mobileLinkReport + '>' +
											'<div class="link-title">' + linkTitle + '</div>' +
										'</div>' +
									'</a>');
								}
								else
									alert('Um link foi cadastrado sem uma URL para a página de detalhes')
							}
							else
								alert('Um link foi cadastrado sem uma URL para o relatório.')
						}
						else if(categoria == "Interna"){
							if(paginaInterna != null){
								$("#fixedLinks").append('<a id=' + idRelatorio + ' href=' + paginaInterna.$1_1 + '>' +
										'<div class="link-title">' + linkTitle + '</div>' +
									'</div>' +
								'</a>');
							}
							else
								alert('Um link foi cadastrado sem uma URL para a página interna')
						}
						else{
							if(mobileLinkReport != null){
								$("#fixedLinks").append('<a id=' + idRelatorio + ' href="#" onclick="setUrlIframeMobile(' + "'" + mobileLinkReport + "'" + ');">' +
										'<div class="link-title">' + linkTitle + '</div>' +
									'</div>' +								
								'</a>');
							}
							else
								alert('Um link foi cadastrado sem uma URL para o relatório.')
						}
					}
				}
			}			
			
			// mantém os itens ocultos até verificar se o usuário atual é membro de algum grupo autorizado
			$('#fixedLinks .leftNavIcons').css('visibility','hidden')
				
			if(blackList != null){
				blackList.forEach(checkUser);
				
				function checkUser(element) {
			    	console.log(element);
			    	if (element.$1x_1 == _spPageContextInfo.userId){
			    		$('#' + idRelatorio).hide()
						$('#' + idRelatorio).next().css('visibility','hidden')
			    	}	 
				}
			}			
			else if(gruposAutorizados != null){
				
				gruposAutorizados.forEach(setMenuItems);

				function setMenuItems(element, index, array) {
					resetLinks(element.$1x_1, idRelatorio, tipoLink)
				}
			}
			else{
				itemsToShow.push(idRelatorio)
				//console.log('Acesso permitido no item ' + idRelatorio)
			}	
       }
	}	
	//console.log('Links fixos----------------------------------------------------------------------------')
	showItems("Link")
}

// Armazena os itens do menu que serão exibidos se o usuários for membro 
// de qualquer grupo cadastrado na lista
var itemsToShow = [];

function resetLinks(gruposAutorizados, linkID, tipoLink){

    // Primeiro verifica se o usuário atual é membro de um determinado grupo.
	// Então exibe os itens do menu conforme o acesso.
    promise = checkUserMembership(gruposAutorizados, linkID).then(showItems(tipoLink));
}

function checkUserMembership(gruposAutorizados, linkID, tipoLink)
{
    d = new $.Deferred();
    
	IsCurrentUserMemberOfGroup(gruposAutorizados).done(function (result) {		
		if(result){
			// Armazena no Array os itens do menu
			itemsToShow.push(linkID);
			console.log('No item ' + linkID + ' da lista Reports, o usuário está no grupo ' + gruposAutorizados)
		}					
		else{
			// Remove os cabeçalhos, sublinks e links fixos do menu lateral se o usuário não é membro 
			// dos grupos autorizados cadastrados na lista Reports
			$('#' + linkID).hide()
			//$('#' + linkID).next().css('visibility','hidden')
			console.log('No item ' + linkID + ' da lista Reports, o usuário não está no grupo ' + gruposAutorizados)
		}
	});

	d.resolve()
    
    return d.promise()
}

function showItems(tipoLink)
{
    d = new $.Deferred();
    
    setTimeout(function(){ 
    	if(itemsToShow != null){
						
		itemsToShow.forEach(executeItem);

		function executeItem(element, index, array) {
				if(tipoLink == "Header"){
					// Garante a operação apenas nos itens do menu lateral
					// Sem causar impacto no menu superior
					$('#sidebar ' + '#' + element).show()
					$('#sidebar ' + '#' + element).next().css('display','block')
				}
				else{
					$('#sidebar ' + '#' + element).next().css('display','block')
					$('#sidebar ' + '#' + element).next().css('visibility','visible')
					$('#sidebar ' + '#' + element).show()	
				}		
			}
		}
		// Exibe os itens do menu
		$('.leftNavIcons').css('visibility','visible')
		
		// Mostra botão de "abrir e fechar" apenas quando existem "Headers" com sublinks no menu lateral
		if($("#sidebar li").hasClass('sidebar-links')){
			$("#closeMenu").show()
			$("#fixedLinks .leftNavIcons").css("margin-top","45px")
		}				
    	//console.log("Itens exibidos conforme perfil de acesso");
    	d.resolve(); 
    }, 2000);
		
    return d.promise()
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

function setUrlIframeDesktop(linkReport){
	$('#homeReportDesktop').attr('src', linkReport);
}

function setUrlIframeMobile(linkReport){
	$('#homeReportMobile').attr('src', linkReport);	
}

function IsCurrentUserMemberOfGroup(groupId) {

    var deferred = new $.Deferred();
    
    var currentContext = new SP.ClientContext.get_current();
    var currentWeb = currentContext.get_web();

    var currentUser = currentContext.get_web().get_currentUser();
    currentContext.load(currentUser);

    var allGroups = currentWeb.get_siteGroups();
    currentContext.load(allGroups);

    var group = allGroups.getById(groupId);
    currentContext.load(group);

    var groupUsers = group.get_users();
    currentContext.load(groupUsers);
    
    currentContext.executeQueryAsync(
	    function OnSuccess2(sender, args) {
	        var userInGroup = false;
	        var groupUserEnumerator = groupUsers.getEnumerator();
	        while (groupUserEnumerator.moveNext()) {
	            var groupUser = groupUserEnumerator.get_current();
	            if (groupUser.get_id() == currentUser.get_id()) {
	                userInGroup = true;
	                break;
	            }
	        }
	
	        deferred.resolve(userInGroup);
	    },
	    function OnFailure(sender, args) {
	        deferred.reject(false);
	    }
	);	
	
	return deferred.promise();  
}

$('#closeMenu').click(function(){
	$('#sidebar').toggleClass('active')
	$(".collapse").removeClass('show')
	
	if($("#sidebar").hasClass('active')){
		$("#closeMenu").css('webkit-transform','scaleX(1)')
		$("#closeMenu").css('transform','scaleX(1)')
		$("#closeMenu").css('background-position-x','right')
	}
	else{
		$("#closeMenu").css('webkit-transform','scaleX(-1)')
		$("#closeMenu").css('transform','scaleX(-1)')
		$("#closeMenu").css('background-position-x','center')
	}
});

function CloseNavbar(){
	$('#sidebar').toggleClass('active')
	
	if($("#sidebar").hasClass('active')){
		$("#closeMenu").css('webkit-transform','scaleX(1)')
		$("#closeMenu").css('transform','scaleX(1)')
		$("#closeMenu").css('background-position-x','right')
	}
	else{
		$("#closeMenu").css('webkit-transform','scaleX(-1)')
		$("#closeMenu").css('transform','scaleX(-1)')
		$("#closeMenu").css('background-position-x','center')
	}
}