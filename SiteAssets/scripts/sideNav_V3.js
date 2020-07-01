var ctxWebTitle = _spPageContextInfo.webTitle;

var urlSubString, urlPageIdentifier = '';
var urlString = document.URL;


getSideNav('Header');

setTimeout(function(){ 
	getSideNav('Link');
}, 1000);

setTimeout(function(){ 
	getSideNav("Sublink");
}, 2000);


var reportId, reportName, linkLabel, siteName,isDefaultPage, urlPageToken, linkPermission, sideNavBlackList, sideNavLinkType, linkIcon,
	desktopLinkReport, mobileLinkReport, categoria, header, paginaDetalhes, paginaInterna;		

function getSideNav(sideNavLinkType) {
  var listName = "Reports";
  var siteurl = "https://telefonicacorp.sharepoint.com/sites/PortalB2CcertOCBNL";

  $. ajax ({  
		url: siteurl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID, Title, linkTitle0, site, defaultPage, urlPageToken, desktopLinkReport, mobileLinkReport, categoria, header, paginaDetalhes, paginaInterna, tipoLink, icone, permissaoDeAcesso/Title,blackList/Title&$expand=permissaoDeAcesso,blackList&$filter=site eq '" + ctxWebTitle + "'",
		method: "GET", 
		
		headers: {"Accept": "application/JSON; odata=verbose"},   
		success: function (data) { 
			sideNavSuccess(data, sideNavLinkType);
		},
		error: function (data) { 
			sideNavfailure(data);
		}
	});
}

function sideNavSuccess(data, sideNavLinkType) {
	var items = data.d.results;
	
	for (var i = 0; i < items.length; i++) {   
	
		urlPageToken = "";   	  
  	      
      	if(sideNavLinkType == items[i].tipoLink){
      	
  	      	// Obtém o nome do site para o link cadastrado //-----------------------------------------------------------------------
  	  	  	siteName = items[i].site;
  	      	
  	      	// Obtém o ID do item //-----------------------------------------------------------------------
  	  	  	reportId = items[i].ID;

  	  	  	// Obtém o título do relatório //-----------------------------------------------------------------------
  	  	  	reportName = items[i].Title;
  	  	  	
			// obtém o tipo de página (default ou não)
		  	if(items[i].defaultPage != null)
			  isDefaultPage = items[i].defaultPage;
		  	  
		  	// Obtém o token da página a ser exibida
		  	if(items[i].urlPageToken != null)
			  urlPageToken = items[i].urlPageToken;	  	  	    	
  	  	    
  	  	    // Obtém a URL do relatório para desktop //-----------------------------------------------------------------------
  	  	    if(items[i].desktopLinkReport != null)
  	  	    	desktopLinkReport = items[i].desktopLinkReport;
  	  	    else
  	  	    	desktopLinkReport = "";
			
			// Obtém a URL do relatório para mobile //-----------------------------------------------------------------------
			if(items[i].mobileLinkReport != null)
				mobileLinkReport = items[i].mobileLinkReport;  
			else
				mobileLinkReport = "";          
	        
	        // Obtém a categoria do relatório //-----------------------------------------------------------------------
	        if(items[i].categoria != null)
	        	categoria = items[i].categoria;
	        else
	        	categoria = "";
			
			// Obtém o header ao qual o sublink pertence //-----------------------------------------------------------------------
			if(items[i].header != null)
				header = items[i].header;
			else
				header = "";
			
			// Obtém a URL da página de detalhes  //-----------------------------------------------------------------------
			if(items[i].paginaDetalhes != null)
				paginaDetalhes = items[i].paginaDetalhes;
			else
				paginaDetalhes = "";
			
			// Obtém a URL da página interna  //-----------------------------------------------------------------------
			if(items[i].paginaInterna != null)
				paginaInterna = items[i].paginaInterna;	
			else
				paginaInterna  = "";	
  	  	    
  	  	  	// Obtém a label do link //-----------------------------------------------------------------------
  	  	  	if(items[i].linkTitle0 != null)
  	  	  		linkLabel = items[i].linkTitle0;
  	  	  	else
  	  	  		linkLabel = "";
  	  	  		
  	  	  	// Obtém o icone do link //-----------------------------------------------------------------------
  	  	  	if(items[i].icone != null)
  	  	  		linkIcon = items[i].icone;
  	  	  	else
  	  	  		linkIcon = "";
  	  	  
  	  	  	// Obtém os grupos da coluna Permissão de acesso //-----------------------------------------------------------------------
          	if(items[i].permissaoDeAcesso.results != undefined)
      	  		linkPermission = items[i].permissaoDeAcesso.results;
      	  	else
  	  	    	linkPermission = [];
  	  	    	
  	  	  	// Obtém os usuários da coluna Blcak List //-----------------------------------------------------------------------
  	      	if(items[i].blackList.results != undefined)
  	  	    	sideNavBlackList = items[i].blackList.results;
  	  	    else
  	  	    	sideNavBlackList = [];	  	  	    	
  	  	}      	  
  		
	    if(siteName == ctxWebTitle){
	      
			if(urlString.match('_') != null){
		  		if(isDefaultPage == false){
		  			var urlSubString = document.URL.split('_');	  		
					var urlPageIdentifier = urlSubString[1].split('.');
					
					if(urlPageIdentifier[0] == urlPageToken){
			  			setSideNav(sideNavLinkType)					
			  		}
		  		}
		  	}
		  	else{
		  		if(isDefaultPage == true){
			  		setSideNav(sideNavLinkType)
			  	}
		  	}
	    }          
  	}	
}

function sideNavfailure(data) {
	console.log(data);
}

function setSideNav(linkType){

	var link_ref = reportName.replace(/\s/g, "");
		
	if(linkType == "Header"){
	
		var activeHeader = false;
		
		// Check for users in groups
		if(linkPermission != undefined){
								
	  		linkPermission.forEach(setSideNavHeader);
	
			function setSideNavHeader(element) {
				if(activeHeader == false){
					if(isCurrentUserMemberOfGroup(element.Title)){
						if(linkIcon != null){
							$("#sidebar").append('<div id=' + reportId + ' class="leftNavIcons sidebarCollapse"' +
								'style="background:url(' + linkIcon.Url + ') no-repeat top center">' +
								'<div class="link-title">' + linkLabel + '</div>' +
							'</div>' +									
							'<ul class="list-unstyled components">' +
				                '<li class="sidebar-links" >' +
				                	'<!-- Cria dinamicamente o link para expandir os subitens do menu -->' +
									'<a href="#" onclick="showSubLinks(' + "'sublink_" + link_ref + "'" +')" class="dropdown-toggle"></a>' +
				                    '<!-- Cria dinamicamente o ID para fazer referência ao item pai e então expandir os subitens do menu -->' +
				                    '<ul class="list-unstyled" id="sublink_' + link_ref + '"></ul>' +
				                '</li>' +
				           '</ul>');  
			            } 
			            // Quando não há ícone cadastrado exibe apenas o Nome do Relatório (Title)
			            else{
			            	$("#sidebar").append('<div id=' + reportId + ' class="leftNavIcons sidebarCollapse">' +
								'<div class="link-title">' + linkLabel + '</div>' +
							'</div>' +									
							'<ul class="list-unstyled components">' +
			                    '<li class="sidebar-links" >' +
			                    	'<!-- Cria dinamicamente o link para expandir os subitens do menu -->' +
									'<a href="#" onclick="showSubLinks(' + "'sublink_" + link_ref + "'" +')" class="dropdown-toggle"></a>' +
			                        '<!-- Cria dinamicamente o ID para fazer referência ao item pai e então expandir os subitens do menu -->' +
			                        '<ul class="collapse list-unstyled" id="sublink_' + link_ref + '">' +                        
			                        '</ul>' +
			                    '</li>' +
			                '</ul>');
			            }
			            
						if(linkIcon.Url == undefined)
							$('#'+reportId + ' .link-title').css('top', '0');
							
						activeHeader = true;
					}
					else						
						console.log('O usuário ' + _spPageContextInfo.userDisplayName + ' não é membro do grupo ' + element.Title);
				}				
			}
		}
		
		if(sideNavBlackList != undefined){
	
			sideNavBlackList.forEach(checkHeadersBlackList);
		
			function checkHeadersBlackList(element) {
				if(element.Title == _spPageContextInfo.userDisplayName)
					$('#' + reportId).remove();
			}
		}	
	}	
	else if(linkType == "Sublink"){
	
		var activeSublinks = false;
		
		// Check for users in groups
		if(linkPermission != undefined){
		
			linkPermission.forEach(setSideNavSubLinks);
	
			function setSideNavSubLinks(element) {
				if(activeSublinks == false){
					if(isCurrentUserMemberOfGroup(element.Title)){
						// Verifica se o usuário está navegando em desktop ou mobile 
						if (screen.width > 991){
							if(header != null && desktopLinkReport != null){
								var sublink_header = header.replace(/\s/g, "");	
								if(categoria == "Detalhe"){
									if(paginaDetalhes != null){
										$('#sublink_' + sublink_header).append('<li>' +
											'<a id=' + reportId + ' href=' + paginaDetalhes + '?' + desktopLinkReport + '>' 
											+ reportName + '</a>' +
										'</li>')
									}
									else
										alert('Um sublink foi cadastrado sem uma URL para a página de detalhes')
								}	
								else{				
									$('#sublink_' + sublink_header).append('<li>' +
										'<a id=' + reportId + ' href="#" onclick="setUrlIframeDesktop(' + "'" + desktopLinkReport + "'" +'); toggleNavBar();">' 
										+ reportName + '</a>' +
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
											'<a id=' + reportId + ' href=' + paginaDetalhes + '?' + mobileLinkReport + '>' + reportName + '</a>' +
										'</li>')
									}
									else
										alert('Um sublink foi cadastrado sem uma URL para a página de detalhes')
								}
								else{							
									$('#sublink_' + sublink_header).append('<li>' +
										'<a id=' + reportId + ' href="#" onclick="setUrlIframeMobile(' + "'" + mobileLinkReport + "'" +'); toggleNavBar();">' 
										+ reportName + '</a>' +
									'</li>')
								}
							}
							else
								alert('Um Sublink foi cadastrado sem um cabeçalho ou uma URL.')
						}
    					
						activeSublinks = true;				
					}
					else
						console.log('O usuário ' + _spPageContextInfo.userDisplayName + ' não é membro do grupo ' + element.Title);					
				}					
			}
		}
		
		if(sideNavBlackList != undefined){
	
			sideNavBlackList.forEach(checkSublinksBlackList);
		
			function checkSublinksBlackList(element) {
				if(element.Title == _spPageContextInfo.userDisplayName)
					$('#' + reportId).parent().remove();
			}
		}				
	}
	else if(linkType == "Link"){
    					
		// Cria uma área específica para adicionar os links fixos - Sempre abaixo dos cabeçalhos (links contendo sublinks)
		if($('#fixedLinks').length == 0)
			$("#sidebar").append('<div id="fixedLinks"></div>');
			
		var activeLink = false;
		
		if(linkPermission != undefined){
		
			linkPermission.forEach(setSideNavLinks);
			
			function setSideNavLinks(element, index){
				if(activeLink == false){
					if(isCurrentUserMemberOfGroup(element.Title)){
						// Verifica se o usuário está navegando em desktop
						if (screen.width > 991){					
							if(linkIcon != null){
								if(categoria == "Detalhe"){
									if(desktopLinkReport != null){
										if(paginaDetalhes != null){
											$("#fixedLinks").append('<a href=' + paginaDetalhes + '?' + desktopLinkReport + '>' +
													'<div id=' + reportId + ' class="leftNavIcons" style="background:url(' + linkIcon.Url + ') no-repeat top center">' +
													'<div class="link-title">' + linkLabel + '</div>' +
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
										$("#fixedLinks").append('<a href=' + paginaInterna + '>' +
												'<div id=' + reportId + ' class="leftNavIcons" style="background:url(' + linkIcon.Url + ') no-repeat top center">' +
												'<div class="link-title">' + linkLabel + '</div>' +
											'</div>' +									
										'</a>');
									}
									else
										alert('Um link foi cadastrado sem uma URL para a página interna')
								}
								else{
									if(desktopLinkReport != null){
										/*$("#fixedLinks").append('<a id=' + reportId + ' href="#" onclick="setUrlIframeDesktop(' + "'" + desktopLinkReport + "'" + ');">' +
												'<div class="leftNavIcons" style="background:url(' + linkIcon.Url + ') no-repeat top center">' +
												'<div class="link-title">' + linkLabel + '</div>' +
											'</div>' +							
										'</a>');*/
										$("#fixedLinks").append('<a href="#" onclick="setUrlIframeDesktop(' + "'" + desktopLinkReport + "'" + ');">' +
												'<div id=' + reportId + ' class="leftNavIcons" style="background:url(' + linkIcon.Url + ') no-repeat top center">' +
												'<div class="link-title">' + linkLabel + '</div>' +
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
											$("#fixedLinks").append('<a href=' + paginaDetalhes + '?' + desktopLinkReport + '>' +
													'<div id=' + reportId + ' class="link-title">' + linkLabel + '</div>' +
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
										$("#fixedLinks").append('<a href=' + paginaInterna + '>' +
												'<div id=' + reportId + ' class="link-title">' + linkLabel + '</div>' +
											'</div>' +
										'</a>');
									}
									else
										alert('Um link foi cadastrado sem uma URL para a página interna')
								}
								else{
									if(desktopLinkReport != null){
										$("#fixedLinks").append('<a href="#" onclick="setUrlIframeDesktop(' + "'" + desktopLinkReport + "'" + ');">' +
												'<div id=' + reportId + ' class="link-title">' + linkLabel + '</div>' +
											'</div>' +								
										'</a>');
									}
									else
										alert('Um link foi cadastrado sem uma URL para o relatório.')
								}
							}
							
							if(linkIcon.Url == undefined)
								$('#'+reportId + ' .link-title').css('top', '0');
						}
						// Verifica se o usuário está navegando em mobile
						else{					
							if(linkIcon != null){
								if(categoria == "Detalhe"){
									if(mobileLinkReport != null){
										if(paginaDetalhe != null){
											$("#fixedLinks").append('<a href=' + paginaDetalhes + '?' + mobileLinkReport + '>' +
													'<div id=' + reportId + ' class="leftNavIcons" style="background:url(' + linkIcon.Url + ') no-repeat top center">' +
													'<div class="link-title">' + linkLabel + '</div>' +
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
										$("#fixedLinks").append('<a href=' + paginaDetalhes + '>' +
												'<div id=' + reportId + ' class="leftNavIcons" style="background:url(' + linkIcon.Url + ') no-repeat top center">' +
												'<div class="link-title">' + linkLabel + '</div>' +
											'</div>' +									
										'</a>');
									}
									else
										alert('Um link foi cadastrado sem uma URL para a página interna')
								}
								else{
									if(mobileLinkReport != null){
										$("#fixedLinks").append('<a href="#" onclick="setUrlIframeMobile(' + "'" + mobileLinkReport + "'" + ');">' +
												'<div id=' + reportId + ' class="leftNavIcons" style="background:url(' + linkIcon.Url + ') no-repeat top center">' +
												'<div class="link-title">' + linkLabel + '</div>' +
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
											$("#fixedLinks").append('<a href=' + paginaDetalhes + '?' + mobileLinkReport + '>' +
													'<div id=' + reportId + ' class="link-title">' + linkLabel + '</div>' +
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
										$("#fixedLinks").append('<a href=' + paginaInterna + '>' +
												'<div id=' + reportId + ' class="link-title">' + linkLabel + '</div>' +
											'</div>' +
										'</a>');
									}
									else
										alert('Um link foi cadastrado sem uma URL para a página interna')
								}
								else{
									if(mobileLinkReport != null){
										$("#fixedLinks").append('<a href="#" onclick="setUrlIframeMobile(' + "'" + mobileLinkReport + "'" + ');">' +
												'<div id=' + reportId + ' class="link-title">' + linkLabel + '</div>' +
											'</div>' +								
										'</a>');
									}
									else
										alert('Um link foi cadastrado sem uma URL para o relatório.')
								}
							}
							
							if(linkIcon.Url == undefined)
								$('#'+reportId + ' .link-title').css('top', '0');
						}
						//alert('O usuário ' + _spPageContextInfo.userDisplayName + ' é membro do grupo ' + element.Title);
						activeLink = true;
					}
					else
						console.log('O usuário ' + _spPageContextInfo.userDisplayName + ' não é membro do grupo ' + element.Title);
				}
			}
		}
		
		if(sideNavBlackList != undefined){
	
			sideNavBlackList.forEach(checkFixedLinksBlackList);
		
			function checkFixedLinksBlackList(element) {
				if(element.Title == _spPageContextInfo.userDisplayName)
					$('#' + reportId).parent().remove();
			}
		}		
	}
	
	// redfine o valor das variáveis após cada iteração
	linkPermission = [];
	sideNavBlackList = [];
}

function setUrlIframeDesktop(linkReport){
	$('#homeReportDesktop').attr('src', linkReport);
}

function setUrlIframeMobile(linkReport){
	$('#homeReportMobile').attr('src', linkReport);	
}

// Expande ou recolhe o menu ao clicar no icone no topo da barra lateral
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
	
	$('.sidebar-links .list-unstyled').css('display','none');
	
});

// Recolhe ou expande o menu ao clicar em um Header ou um sublink
function toggleNavBar(sublinks){
	$('#sidebar').toggleClass('active')
	
	if($("#sidebar").hasClass('active')){
		$("#closeMenu").css('webkit-transform','scaleX(1)')
		$("#closeMenu").css('transform','scaleX(1)')
		$("#closeMenu").css('background-position-x','right')
		
		showSubLinks(sublinks);
	}
	else{
		$("#closeMenu").css('webkit-transform','scaleX(-1)')
		$("#closeMenu").css('transform','scaleX(-1)')
		$("#closeMenu").css('background-position-x','center')
		
		$('.sidebar-links .list-unstyled').css('display','none');
	}
}

function showSubLinks(sublinks){

	if($('#'+sublinks).css('display') == 'block'){
		$('#'+sublinks).css('display','none');
	}
	else{
		$('.sidebar-links .list-unstyled').css('display','none');
		$('#'+sublinks).css('display','block');
	}
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

$(window).on('load', function () {	 
	// Exibe os itens do menu
	$(".leftNavIcons").each(function() {
	    var linkId = $(this).attr('id');
	    $('#sidebar ' + '#' + linkId).next().css('display','block');
	});
	
	// Mostra botão de "abrir e fechar" apenas quando existem "Headers" com sublinks no menu lateral
	if($('.sidebarCollapse').length > 0){
    	$('#closeMenu').css('visibility','visible');
    	$('#closeMenu').css('height','51px');
    }
    
	$('.sidebarCollapse').click(function(){
		var headTitle = $(this).text();
		toggleNavBar('sublink_' + headTitle);
	});
	
	var currentPageTitle = $(document).attr('title');	
	
	$("#sidebar a").click(function() {
	    var clickedlinkID = $(this).attr('id');
	    var clickedLinkTitle = $(this).text();
	    
	    if(clickedlinkID != undefined){
	    	createListItem(clickedLinkTitle, clickedlinkID, currentPageTitle);
	    }
	});
	
	$("#fixedLinks a div").click(function() {
	    var clickedlinkID = $(this).attr('id');
	    var clickedLinkTitle = $(this).text();
	    
	    if(clickedlinkID != undefined)		    	
	    	createListItem(clickedLinkTitle, clickedlinkID, currentPageTitle);
	});
});