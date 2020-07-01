//console.log(_spPageContextInfo.userDisplayName);
var webTitle = _spPageContextInfo.webTitle;

var linkId, site, linkTitle, linkPosition, authorizedGroups, blackList, linkType, linkHeader, linkUrl;

getTopNav("Link");
getTopNav("Header");

setTimeout(function(){ 
	getTopNav("Submenu");
}, 1000);

setTimeout(function(){ 
	getTopNav("Sublink");
}, 2000);

function getTopNav(tipoLink) {
  var listName = "Top Menu";
  var siteUrl = "https://telefonicacorp.sharepoint.com/sites/PortalB2CcertOCBNL";
  
	 $. ajax ({  
		url: siteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,site,Title,linkPosition,tipoLink,header,url,permissaoDeAcesso/Title,blackList/Title&$expand=permissaoDeAcesso,blackList&$filter=site eq '" + webTitle + "'",
		method: "GET", 
		
		headers: {"Accept": "application/JSON; odata=verbose"},   
		success: function (data) { 
			success(data, tipoLink);
		},
		error: function (data) { 
			failure(data);
		}
	});
}

function success(data, tipoLink) {

	if(tipoLink != undefined){
	
		var items = data.d.results;
	
		for (var i = 0; i < items.length; i++){
			
			if(tipoLink == items[i].tipoLink){
	  	      	// Obtém o tipo do link //-----------------------------------------------------------------------
	  	  	    linkType = items[i].tipoLink;
	  	  	    
	  	  	    // Obtém o ID do link //-----------------------------------------------------------------------
	  	  	  	linkId = items[i].ID;
	  	  	  
	  	  	  	// Obtém o nome do site para o link cadastrado //-----------------------------------------------------------------------
	  	  	  	site = items[i].site;
	
	  	  	  	// Obtém o Título do link //-----------------------------------------------------------------------
	  	  	  	linkTitle = items[i].Title;
	  	  	    
	  	  	  	// Obtém a posição do link //-----------------------------------------------------------------------
	  	  	  	linkPosition = items[i].linkPosition;
	  	  	  
	  	  	  	// Obtém os grupos da coluna Permissão de acesso //-----------------------------------------------------------------------
	          	if(items[i].permissaoDeAcesso.results != undefined)
	      	  		authorizedGroups = items[i].permissaoDeAcesso.results;
	  	  	    
	  	  	  	// Obtém os usuários da coluna Blcak List //-----------------------------------------------------------------------
	  	      	if(items[i].blackList.results != undefined)
	  	  	    	blackList = items[i].blackList.results;
	  	  	    
	  	  	  	// Obtém o cabeçalho do link //-----------------------------------------------------------------------
	  	      	if(items[i].header != null)
	  	  	    	linkHeader = items[i].header;
	  	  	    
	  	  	  	// Obtém a URL do link //-----------------------------------------------------------------------
	  	      	if(items[i].url != null)
	  	  	    	linkUrl = items[i].url.Url;
	  	  	    	
	  	  	    if(site == webTitle){
	          		setTopNav()
	          	}
	  	    }
		}
	}
	
	// Ordena os links na barra de navegação do menu superior
    sortTopNav("navbarCollapse", "nav-item");
  
    // Ordena os links nos subitens (submenus, links e sublinks)
    $('.dropdown-toggle').click(function() { 
  	  var tagContainer = $(this).next().attr('id')
      sortTopNav(tagContainer, "dropdown-item")
    });
}
	
function failure(data) {
	console.log(data);
}

function setTopNav(){

	if(linkHeader != undefined)
		var headerFormat = linkHeader.replace(/\s/g, "");

	if(linkType == "Link"){
	
		var activeTopNavLink = false;
		
		// Check for users in groups
		if(authorizedGroups != undefined){
								
	  		authorizedGroups.forEach(setFixedLinks);
	
			function setFixedLinks(element) {
				if(activeTopNavLink == false){
					if(isCurrentUserMemberOfGroup(element.Title)){
						// Cria os links fixos no menu superior
						if(linkUrl != null){
				        	$('.navbar-nav').append(' <li class="nav-item"> ' + 
				            	'<a id=' + linkId + ' data-link-position=' + linkPosition + ' class="nav-link" href=' + linkUrl + '>' + linkTitle + '</a>' +
				            '</li>');
				        }
				        else
							alert('Um link foi cadastrado sem uma URL');
							
						activeTopNavLink = true;
					}
				}				
			}
		}		
	}
	else if(linkType == "Header"){
	
		var activeTopNavHeader = false;
		
		// Check for users in groups
		if(authorizedGroups != undefined){
			
			var headerTitleFormat = linkTitle.replace(/\s/g, "");
						
	  		authorizedGroups.forEach(setHeaders);
	
			function setHeaders(element) {
				if(activeTopNavHeader == false){
					if(isCurrentUserMemberOfGroup(element.Title)){
						$('.navbar-nav').append(' <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" ' + 
		    			'id=' + linkId + ' data-link-position=' + linkPosition + ' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + linkTitle + '</a>' +
		    			'<ul id=subItems_' + headerTitleFormat + ' class="dropdown-menu" aria-labelledby=' + linkId + '></ul></li>');
		    			
						activeTopNavHeader = true;	    			
					}
				}				
			}
		}
	}
	else if(linkType == "Submenu"){	
	
		var activeTopNavSubmenu = false;
		
		// Check for users in groups
		if(authorizedGroups != undefined){
						
	  		authorizedGroups.forEach(setSubmenus);
	
			function setSubmenus(element) {
				if(activeTopNavSubmenu == false){
					if(isCurrentUserMemberOfGroup(element.Title)){
				
						var linkTitleFormat = linkTitle.replace(/\s/g, "");    	
	
						if(linkHeader != null){								
							$('#subItems_' + headerFormat).append('<li id=' + linkId + ' class="dropdown-item dropdown">' +
								'<a onclick="showSubNav()" class="dropdown-toggle" id=' + linkTitleFormat + ' data-link-position=' + linkPosition + ' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + linkTitle + '</a>' +
								'<ul id=subItems_' + linkTitleFormat + ' class="dropdown-menu" aria-labelledby=' + linkTitleFormat + '></ul>' +
							'</li>');
						}
						else
							alert('Um Submenu foi cadastrado sem um cabeçalho');
							
						activeTopNavSubmenu = true;
					}
				}				
			}
		}
	}
	else if(linkType == "Sublink"){	
	
		var activeTopNavSublink = false;
		
		// Check for users in groups
		if(authorizedGroups != undefined){
								
	  		authorizedGroups.forEach(setSublinks);
	
			function setSublinks(element) {
				if(activeTopNavSublink == false){
					if(isCurrentUserMemberOfGroup(element.Title)){
						// Cria os sublinks
						if(linkHeader != null){		
							if(linkUrl != null){				
								$('#subItems_' + headerFormat).append('<li class="dropdown-item">' +
								'<a id=' + linkId + ' data-link-position=' + linkPosition + ' href=' + linkUrl + '>' + linkTitle + '</a></li></ul></li>')
							}
							else
								alert('Um Sublink foi cadastrado sem uma URL')
						}
						else
							alert('Um sublink foi cadastrado sem um cabeçalho')
							
						activeTopNavSublink = true;
					}
				}
			}
		}		
	}
	
	if(blackList != undefined){
	
		blackList.forEach(checkBlackList);
	
			function checkBlackList(element) {
				if(element.Title == _spPageContextInfo.userDisplayName)
					$('#' + linkId).parent().remove();
			}
	}	
	
	// redfine o valor das variáveis após cada iteração
	blackList = [];
	authorizedGroups = [];
	linkType = "";		
}

// Check user permission by group name
function isCurrentUserMemberOfGroup(groupName) {
    var userIsInGroup = false;
    $.ajax({
        async: false,
        headers: { "accept": "application/json; odata=verbose" },
        method: "GET",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/currentuser/groups",
        success: function (data) {
            data.d.results.forEach( function (value) {
                if (value.Title == groupName) {               
                     userIsInGroup = true;            
                }
            });
        },
        error: function (response) {
            console.log(response.status);
        },
    });    
    return userIsInGroup;
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

// Exibe os submenus
function showSubNav(){
	
	var nav =  $('.navbar .dropdown-item.dropdown').on('click', function(e){
		//alert('xxx');
		
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
	        
	        $('.navbar .dropdown').on('hidden.bs.dropdown', function () {
			    $(this).find('li.dropdown').removeClass('show open');
			    $(this).find('ul.dropdown-menu').removeClass('show open');
			});
	        
	        $('.navbar .dropdown-item.dropdown').off('click');
	        
	        return;
	    }
	});
}