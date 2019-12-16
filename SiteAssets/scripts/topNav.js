ExecuteOrDelayUntilScriptLoaded(function () { getCurrentWebTitle() }, "SP.js");
ExecuteOrDelayUntilScriptLoaded(function () { GetTopHeaders() }, "SP.js");

var currentWebTitle = '';

function GetTopHeaders() {
	// Obtém a url absoluta do site
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
	var list = clientContext.get_web().get_lists().getByTitle("Top Menu");	
	clientContext.load(list);
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='tipoLink' /><Value Type='Choice'>Header</Value></Eq></Where><OrderBy><FieldRef Name='linkPosition' Ascending='True' /></OrderBy></Query></View>");
	
	topNav_HeaderCollection = list.getItems(camlQuery);
	clientContext.load(topNav_HeaderCollection);

	clientContext.executeQueryAsync(Function.createDelegate(this,this.onGetHeadersSuccess), Function.createDelegate(this,this.onFailed));
}

function onGetHeadersSuccess(sender, args) {

	var enumerator = topNav_HeaderCollection.getEnumerator();	
	
    while (enumerator.moveNext()) {        
    
        // get the current list item.
        var listItem = enumerator.get_current();
        
		// get the field value by internalName.   
		var idLink = listItem.get_item('ID');
        var linkTitle = listItem.get_item('Title');     
        var site = listItem.get_item('site');
		var gruposAutorizados = listItem.get_item('permissaoDeAcesso');
		var blackList = listItem.get_item('blackList');
		var tipoLink = listItem.get_item('tipoLink');		
		var linkPosition = listItem.get_item('linkPosition');
		
		var headerTitleFormat = linkTitle.replace(/\s/g, "");	 
        
        // Compara o valor cadastrado na coluna "Site" com o site onde o usuário está logado para mostrar os itens no menu correspondente a cada site
        if (site == currentWebTitle){
            $('.navbar-nav').append(' <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" ' + 
            'id=' + idLink + ' data-link-position=' + linkPosition + ' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + linkTitle + '</a>' +
            '<ul id=subItems_' + headerTitleFormat + ' class="dropdown-menu" aria-labelledby=' + idLink + '></ul></li>');                        
            
			//$('#' + idLink).hide()
						           
			if(blackList != null){
				blackList.forEach(checkUser);
				
				function checkUser(element) {			    	
			    	if (element.$1x_1 == _spPageContextInfo.userId){
			    		$('#' + idLink).hide()						
			    	}	 
				}
			}			
			else if(gruposAutorizados != null){
						
				gruposAutorizados.forEach(setMenuItems);
	
				function setMenuItems(element, index, array) {
					resetLinksTopNav(element.$1x_1, idLink, tipoLink)
				}
			}
			else{
				itemsToShow_OnTopNav.push(idLink)
				console.log('Acesso permitido no item ' + idLink)
			}
		}
	}
	
	console.log('Headers----------------------------------------------------------------------------')
    
	ExecuteOrDelayUntilScriptLoaded(function () { GetSubMenus() }, "SP.js");
}

function GetSubMenus() {

	// Obtém a url absoluta do site
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
	var list = clientContext.get_web().get_lists().getByTitle("Top Menu");	
	clientContext.load(list);
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='tipoLink' /><Value Type='Choice'>Submenu</Value></Eq></Where><OrderBy><FieldRef Name='linkPosition' Ascending='True' /></OrderBy></Query></View>");
	
	itemCollectionTopNav = list.getItems(camlQuery);
	clientContext.load(itemCollectionTopNav);

	clientContext.executeQueryAsync(Function.createDelegate(this,this.onGetSubmenuSuccess), Function.createDelegate(this,this.onFailed));
} 
	
function onGetSubmenuSuccess(sender, args) {
	var enumerator = itemCollectionTopNav.getEnumerator();
	
    while (enumerator.moveNext()) {        
    
        // get the current list item.
        var listItem = enumerator.get_current();
        
		// get the field value by internalName.
		var idLink = listItem.get_item('ID');
        var linkTitle = listItem.get_item('Title');     
        var site = listItem.get_item('site');
		var gruposAutorizados = listItem.get_item('permissaoDeAcesso');
		var blackList = listItem.get_item('blackList');
		var tipoLink = listItem.get_item('tipoLink');        
		var header = listItem.get_item('header');
		var linkPosition = listItem.get_item('linkPosition');
        
		// Compara o valor cadastrado na coluna "Site" com o site onde o usuário está logado 
		// para mostrar os itens no menu correspondente a cada site
        if (site == currentWebTitle){    		
    		var linkTitleFormat = linkTitle.replace(/\s/g, "");
    		var headerFormat = '';
    		
    		// Cria os submenus
    		if(header != null){
				headerFormat = header.replace(/\s/g, "");		
				$('#subItems_' + headerFormat).append('<li id=' + idLink + ' class="dropdown-item dropdown">' +
					'<a class="dropdown-toggle" id=' + linkTitleFormat + ' data-link-position=' + linkPosition + ' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + linkTitle + '</a>' +
  					'<ul id=subItems_' + linkTitleFormat + ' class="dropdown-menu" aria-labelledby=' + linkTitleFormat + '></ul>' +
				'</li>')
			}
			else
				alert('Um Submenu foi cadastrado sem um cabeçalho')       	
			
			// mantém os itens ocultos até verificar se o usuário atual é membro de algum grupo autorizado
			//$('#' + idLink).hide()
				
			if(blackList != null){
				blackList.forEach(checkUser);
				
				function checkUser(element) {
			    	console.log(element);
			    	if (element.$1x_1 == _spPageContextInfo.userId){
			    		$('#' + idLink).hide()
			    	}	 
				}
			}			
			else if(gruposAutorizados != null){
				
				gruposAutorizados.forEach(setMenuItems);

				function setMenuItems(element, index, array) {
					resetLinksTopNav(element.$1x_1, idLink, tipoLink)
				}
			}
			else{
				itemsToShow_OnTopNav.push(idLink)
				console.log('Acesso permitido no item ' + idLink)
			}	
       }
	}	
	
	console.log('Submenus----------------------------------------------------------------------------')
    
    ExecuteOrDelayUntilScriptLoaded(function () { GetSubMenuLinks() }, "SP.js");
}

function GetSubMenuLinks() {

	// Obtém a url absoluta do site
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
	var list = clientContext.get_web().get_lists().getByTitle("Top Menu");	
	clientContext.load(list);
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml("<View><Query><Where><Or><Eq><FieldRef Name='tipoLink' /><Value Type='Choice'>Link</Value></Eq><Eq><FieldRef Name='tipoLink' /><Value Type='Choice'>Sublink</Value></Eq></Or></Where><OrderBy><FieldRef Name='linkPosition' Ascending='True' /></OrderBy></Query></View>");
	
	itemCollectionTopNav = list.getItems(camlQuery);
	clientContext.load(itemCollectionTopNav);

	clientContext.executeQueryAsync(Function.createDelegate(this,this.onGetSubmenuLinksSuccess), Function.createDelegate(this,this.onFailed));
} 
	
function onGetSubmenuLinksSuccess(sender, args) {
	var enumerator = itemCollectionTopNav.getEnumerator();
	
    while (enumerator.moveNext()) {        
    
        // get the current list item.
        var listItem = enumerator.get_current();
        
		// get the field value by internalName.
		var idLink = listItem.get_item('ID');
        var linkTitle = listItem.get_item('Title');     
        var site = listItem.get_item('site');
		var gruposAutorizados = listItem.get_item('permissaoDeAcesso');
		var blackList = listItem.get_item('blackList');
		var tipoLink = listItem.get_item('tipoLink');        
		var header = listItem.get_item('header');
		var urlTarget = listItem.get_item('url');
		var linkPosition = listItem.get_item('linkPosition');
        
		// Compara o valor cadastrado na coluna "Site" com o site onde o usuário está logado 
		// para mostrar os itens no menu correspondente a cada site
        if (site == currentWebTitle){    		
    		var linkTitleFormat = linkTitle.replace(/\s/g, "");
    		var headerFormat = '';
			
			if (tipoLink == "Sublink"){
				if(header != null){
					if(urlTarget != null){
						headerFormat = header.replace(/\s/g, "");
						$('#subItems_' + headerFormat).append('<li class="dropdown-item">' +
						'<a id=' + idLink + ' data-link-position=' + linkPosition + ' href=' + urlTarget.$1_1 + '>' + linkTitle + '</a></li></ul></li>')
					}
					else
						alert('Um Sublink foi cadastrado sem uma URL')
				}
				else
					alert('Um sublink foi cadastrado sem um cabeçalho')       		
			}
				
			// Cria os links fixos no menu superior
			if (tipoLink == "Link"){
	        	if(urlTarget != null){
		        	$('.navbar-nav').append(' <li class="nav-item"> ' + 
		            	'<a id=' + idLink + ' data-link-position=' + linkPosition + ' class="nav-link" href=' + urlTarget.$1_1 + '>' + linkTitle + '</a>' +
		            '</li>');
	            }
	            else
					alert('Um Sublink foi cadastrado sem uma URL')
        	}        	
			
			// mantém os itens ocultos até verificar se o usuério atual é membro de algum grupo autorizado
			//$('#' + idLink).hide()
				
			if(blackList != null){
				blackList.forEach(checkUser);
				
				function checkUser(element) {
			    	console.log(element);
			    	if (element.$1x_1 == _spPageContextInfo.userId){
			    		$('#' + idLink).hide()
			    	}	 
				}
			}			
			else if(gruposAutorizados != null){
				
				gruposAutorizados.forEach(setMenuItems);

				function setMenuItems(element, index, array) {
					resetLinksTopNav(element.$1x_1, idLink, tipoLink)
				}
			}
			else{
				itemsToShow_OnTopNav.push(idLink)
				console.log('Acesso permitido no item ' + idLink)
			}	
       }
	}	
	
	// Ordena os links na barra de navegação do menu superior
	sortTopNav("navbarCollapse", "nav-item")
	
	// Ordena os links nos subitens (submenus, links e sublinks)
	$('.dropdown-toggle').click(function() { 
	    var tagContainer = $(this).next().attr('id')
	    sortTopNav(tagContainer, "dropdown-item")
	});	
	
	$('.navbar .dropdown-item.dropdown').on('click', function (e) {
        var $el = $(this).children('.dropdown-toggle');
        if ($el.length > 0 && $(e.target).hasClass('dropdown-toggle')) {
            var $parent = $el.offsetParent(".dropdown-menu");
            $(this).parent("li").toggleClass('open');
    
            if (!$parent.parent().hasClass('navbar-nav')) {
                if ($parent.hasClass('show')) {
                    $parent.removeClass('show');
                    $el.next().removeClass('show');
                    $el.next().css({"top": -999, "left": -999});
                } else {
                    $parent.parent().find('.show').removeClass('show');
                    $parent.addClass('show');
                    $el.next().addClass('show');
                    $el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 4});
                }
                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }
    });

    $('.navbar .dropdown').on('hidden.bs.dropdown', function () {
        $(this).find('li.dropdown').removeClass('show open');
        $(this).find('ul.dropdown-menu').removeClass('show open');
    });
    
    
    
    console.log('Links e Sublinks---------------------------------------------------------------------')
}

// Armazena os itens do menu que serão exibidos se o usuário for membro 
// de qualquer grupo cadastrado na lista
var itemsToShow_OnTopNav = []

function resetLinksTopNav(gruposAutorizados, linkID, tipoLink){

    // Primeiro verifica se o usuário atual é membro de um determinado grupo.
	// Então exibe os itens do menu conforme o acesso.
    promise = checkUserMembershipTopNav(gruposAutorizados, linkID).then(showItemsTopNav(tipoLink));
}

function checkUserMembershipTopNav(gruposAutorizados, linkID, tipoLink)
{
    d = new $.Deferred();
    
	IsCurrentUserMemberOfGroupTopNav(gruposAutorizados).done(function (result) {		
		if(result){
			// Armazena no Array os itens do menu
			itemsToShow_OnTopNav.push(linkID);
			console.log('No item ' + linkID + ' da lista [Top Menu], o usuário está no grupo ' + gruposAutorizados)
		}					
		else{
			// Remove os cabeçalhos, links fixos, submenus e sublinks do menu superior se o usuário não é membro 
			// dos grupos autorizados cadastrados na lista Top Menu
			// Garante que somente os links dentro do elemento com a classe [.navbar-nav] (menu superior) sejam atingidos,
			// caso existam links no menu lateral com o mesmo ID, coincidentemente.
			$('.navbar-nav ' + '#' + linkID).hide()
			console.log('No item ' + linkID + ' da lista [Top Menu], o usuário não está no grupo ' + gruposAutorizados)
		}
	});

	d.resolve()
    
    return d.promise()
}

function showItemsTopNav(tipoLink)
{
    d = new $.Deferred();
    
    setTimeout(function(){ 
    	if(itemsToShow_OnTopNav != null){
    							
			itemsToShow_OnTopNav.forEach(executeItem);
	
			function executeItem(element, index, array) {
				// Garante que somente os links dentro do elemento com a classe [.navbar-nav] (menu superior) sejam atingidos,
				// caso existam links no menu lateral com o mesmo ID, coincidentemente.			
				$('.navbar-nav ' + '#' + element).show()	
			}
		}									
    	//console.log("Itens exibidos conforme perfil de acesso"); 
    	   
    	d.resolve(); 
    }, 5000);
		
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
		console.log("Não foi possível obter o titulo do site!");
	}
}

function IsCurrentUserMemberOfGroupTopNav(groupId) {

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

// Reordena os links da barra superior de acordo com os valores definidos
// na coluna [Link position] da lista [Top Menu].
function sortTopNav(container, element){
	var list, i, switching, topNavLink, currentPosition, nextPostion, shouldSwitch;
	  list = document.getElementById(container);
	  switching = true;
	  
	  while (switching) {	    
	    switching = false;
	    
	    // Verifica se são os subitens ou os links principais da barra horizontal
	    if($('#' + container).hasClass('dropdown-menu'))
			topNavLink = $('#' + container + ' > li')
		else			
			topNavLink = list.getElementsByClassName(element);
	    
	    for (i = 0; i < (topNavLink.length - 1); i++) {
		    shouldSwitch = false;
		      
		    currentPosition = topNavLink[i].firstElementChild.getAttribute('data-link-position')
		    nextPostion = topNavLink[i + 1].firstElementChild.getAttribute('data-link-position')
	      
	     	if (currentPosition > nextPostion) {
	     		shouldSwitch = true;
	        	break;
		    }
	    }
	    if (shouldSwitch) {
	      topNavLink[i].parentNode.insertBefore(topNavLink[i + 1], topNavLink[i]);
	      switching = true;
	    }
	}
}