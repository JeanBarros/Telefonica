$(document).ready(function () {
    //don't exectute any jsom until sp.js file has loaded.        
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', loadSharepointList);
}); 

var webTitle, urlSubString, urlPageIdentifier = '';
var urlString = document.URL;

function loadSharepointList() {

getItemsWithCaml('Reports').then(
function (camlItems) {
   	var listItemEnumerator = camlItems.getEnumerator();
	    while (listItemEnumerator.moveNext()) {
	        
	        // get the current list item.
	        var listItem = listItemEnumerator.get_current();
	        
	        // get the field value by internalName.
	        var idRelatorio = listItem.get_item('ID');
        	var nomeRelatorio = listItem.get_item('Title');
	        var desktopLinkReport = listItem.get_item('desktopLinkReport');
			var mobileLinkReport = listItem.get_item('mobileLinkReport');            
	        var categoria = listItem.get_item('categoria');	        
	        var site = listItem.get_item('site');
			var isDefaultPage= listItem.get_item('defaultPage');
			var urlPageToken = listItem.get_item('urlPageToken');
	        var gruposAutorizados = listItem.get_item('permissaoDeAcesso');
			var blackList = listItem.get_item('blackList');
	        
			// Compara o valor cadastrado na coluna "Site" com o site onde o usuário está logado 
			// para mostrar os itens no menu correspondente a cada site
			if (site == webTitle){
				if(categoria == "Home"){
					if(blackList != null){
						
						blackList.forEach(checkUser);
						
						// Verifica se o usuário atual está na coluna Black list da lista Reports
						function checkUser(element) {
							// Compara pelo ID do usuário			    	
					    	if (element.$1z_1 == _spPageContextInfo.userId){
					    		// Verifica se o usuário está navegando em desktop ou mobile 
								if (screen.width > 991){
									if(urlString.match('_') != null){
									  	if(isDefaultPage == false){
									  		urlSubString = document.URL.split('_');	  		
											urlPageIdentifier = urlSubString[1].split('.');
												
											if(urlPageIdentifier[0] == urlPageToken){
												// Substitui o relatório da página (Desktop) por uma mensagem para o usuário 
												$('.areaContent-home-desktop').text('Sem permissão para visualizar este conteúdo. Contate o administrador.');
									    		$('.areaContent-home-desktop').css({'padding-top': '15%', 'text-align': 'center'});	
											}
										}
									}
									else{
										if(isDefaultPage == true){
											// Substitui o relatório da página (Desktop) por uma mensagem para o usuário 
											$('.areaContent-home-desktop').text('Sem permissão para visualizar este conteúdo. Contate o administrador.');
								    		$('.areaContent-home-desktop').css({'padding-top': '15%', 'text-align': 'center'});
										}
									}
						    	}
					    		else{
					    			if(urlString.match('_') != null){
									  	if(isDefaultPage == false){
									  		urlSubString = document.URL.split('_');	  		
											urlPageIdentifier = urlSubString[1].split('.');
												
											if(urlPageIdentifier[0] == urlPageToken){
												// Substitui o relatório da página (Mobile) por uma mensagem para o usuário 
												$('.areaContent-home-mobile').text('Sem permissão para visualizar este conteúdo. Contate o administrador.');
								    			$('.areaContent-home-mobile').css({'padding-top': '50%', 'text-align': 'center'});	
											}
										}
									}
									else{
										if(isDefaultPage == true){
											// Substitui o relatório da página (Mobile) por uma mensagem para o usuário 
											$('.areaContent-home-mobile').text('Sem permissão para visualizar este conteúdo. Contate o administrador.');
							    			$('.areaContent-home-mobile').css({'padding-top': '50%', 'text-align': 'center'});
										}
									}
					    		}
					    	}	 
						}
					}
					else if(gruposAutorizados != null){				
						gruposAutorizados.forEach(setReports);
		
						function setReports(element, index, array) {
							// Verifica se o usuário está navegando em desktop ou mobile 
							if (screen.width > 991){
								if(urlString.match('_') != null){
								  	if(isDefaultPage == false){
								  		urlSubString = document.URL.split('_');	  		
										urlPageIdentifier = urlSubString[1].split('.');
											
										if(urlPageIdentifier[0] == urlPageToken){
											resetHomeReport(element.$1z_1, idRelatorio, desktopLinkReport);	
										}
									}
								}
								else{
									if(isDefaultPage == true)
										resetHomeReport(element.$1z_1, idRelatorio, desktopLinkReport);
								}								
							}
							else{
								if(urlString.match('_') != null){
								  	if(isDefaultPage == false){
								  		urlSubString = document.URL.split('_');	  		
										urlPageIdentifier = urlSubString[1].split('.');
											
										if(urlPageIdentifier[0] == urlPageToken){
											resetHomeReport(element.$1z_1, idRelatorio, mobileLinkReport);
										}
									}
								}
								else{
									if(isDefaultPage == true)
										resetHomeReport(element.$1z_1, idRelatorio, mobileLinkReport);
								}
							}
						}
					}
					else{					
						// Verifica se o usuário está navegando em desktop ou mobile 
						if (screen.width > 991){
							if(urlString.match('_') != null){
								if(isDefaultPage == false){
							  		urlSubString = document.URL.split('_');	  		
									urlPageIdentifier = urlSubString[1].split('.');
										
									if(urlPageIdentifier[0] == urlPageToken){
										// Substitui o relatório da página (Desktop) por uma mensagem para o usuário 
										$('.areaContent-home-desktop').text('Sem permissão para visualizar este conteúdo. Contate o administrador.');
							    		$('.areaContent-home-desktop').css({'padding-top': '15%', 'text-align': 'center'});	
									}
								}
							}
							else{
								if(isDefaultPage == true){
									// Substitui o relatório da página (Desktop) por uma mensagem para o usuário 
									$('.areaContent-home-desktop').text('Sem permissão para visualizar este conteúdo. Contate o administrador.');
						    		$('.areaContent-home-desktop').css({'padding-top': '15%', 'text-align': 'center'});
								}
							}
				    	}
						else{							
							if(urlString.match('_') != null){
							  	if(isDefaultPage == false){
							  		urlSubString = document.URL.split('_');	  		
									urlPageIdentifier = urlSubString[1].split('.');
										
									if(urlPageIdentifier[0] == urlPageToken){
										// Substitui o relatório da página (Mobile) por uma mensagem para o usuário 
										$('.areaContent-home-mobile').text('Sem permissão para visualizar este conteúdo. Contate o administrador.');
						    			$('.areaContent-home-mobile').css({'padding-top': '50%', 'text-align': 'center'});	
									}
								}
							}
							else{
								if(isDefaultPage == true){
									// Substitui o relatório da página (Mobile) por uma mensagem para o usuário 
									$('.areaContent-home-mobile').text('Sem permissão para visualizar este conteúdo. Contate o administrador.');
					    			$('.areaContent-home-mobile').css({'padding-top': '50%', 'text-align': 'center'});
								}
							}
						}
					}
					
					if ($("#homeReportDesktop").length || $("#homeReportMobile").length){
						var currentPageTitle = $(document).attr('title');
						
					    //getClickedLinkProps(idRelatorio, nomeRelatorio, currentPageTitle);
					    createListItem(nomeRelatorio, idRelatorio.toString(), currentPageTitle);
					}
				}
		    }
	    }    
	},

	function (sender, args) {
    	console.log('Ocorreu um erro ao recuperar os itens da lista: ' + args.get_message());
	});   
}

// Armazena os relatórios que serão exibidos se o usuário for membro de 
// qualquer grupo cadastrado na coluna [Permissão de Acesso] da lista Reports
var reportsToShow = [];

function resetHomeReport(gruposAutorizados, linkID, linkReport){

    // Primeiro verifica se o usuário atual é membro de um dos grupos definidos na coluna [Permissão de Acesso] da lista Reports.
	// Então exibe os relatórios conforme o acesso.
    promise = checkUserOnGroup(gruposAutorizados, linkID).then(showReports(linkReport));
}

// Adiciona os relatórios na variável [reportsToShow]
function checkUserOnGroup(gruposAutorizados, linkID)
{
    d = new $.Deferred();
    
	IsUserMemberOfGroup(gruposAutorizados).done(function (result) {					
		if(result){			
			// Armazena no Array os itens do menu
			reportsToShow.push(linkID);
		}
	});

	d.resolve()
    
    return d.promise()
}

// Exibe os relatórios adicionados na variável [reportsToShow]
function showReports(linkReport)
{
    d = new $.Deferred();
    
    setTimeout(function(){ 
    	if(reportsToShow.length > 0){						
			reportsToShow.forEach(executeItem);
			function executeItem(element, index, array) {					
				// Verifica se o usuário está navegando em desktop ou mobile 
				if (screen.width > 991){
					$('.areaContent-home-desktop').html('<iframe id="homeReportDesktop" src=' + linkReport + ' frameborder="0"></iframe>')
					$('.areaContent-home-desktop').css({'padding-top': '41.5%', 'text-align': 'center'})
				}
				else{
					$('.areaContent-home-mobile').html('<iframe id="homeReportMobile" src=' + linkReport + ' frameborder="0"></iframe>')
					$('.areaContent-home-mobile').css({'padding-top': '160%', 'text-align': 'center'})
				}	
			}
		}
		else{		    		
    		// Verifica se o usuário está navegando em desktop ou mobile 
			if (screen.width > 991){
				// Substitui o relatório da página (Desktop) por uma mensagem para o usuário 
				$('.areaContent-home-desktop').text('Sem permissão para visualizar este conteúdo. Contate o administrador.')
	    		$('.areaContent-home-desktop').css({'padding-top': '15%', 'text-align': 'center'})
	    	}
    		else{
    			// Substitui o relatório da página (Mobile) por uma mensagem para o usuário 
				$('.areaContent-home-mobile').text('Sem permissão para visualizar este conteúdo. Contate o administrador.')
    			$('.areaContent-home-mobile').css({'padding-top': '50%', 'text-align': 'center'})
    		}
		}
		
    	d.resolve(); 
    }, 2000);
		
    return d.promise()
}

// Verifica se o usuário atual está em um dos grupos da coluna [Permissão de Acesso] da lista Reports
function IsUserMemberOfGroup(groupId) {

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

/* Exibe os Relatórios */
function showDesktopReport(desktopLinkReport){	
	if(desktopLinkReport != null)					
		$('#homeReportDesktop').attr('src', desktopLinkReport)
	else
		alert('Um relatório foi cadastrado sem uma URL.')
}    

function showMobileReport(mobileLinkReport){
	if(mobileLinkReport != null)					
		$('#homeReportMobile').attr('src', mobileLinkReport)
	else
		alert('Um relatório foi cadastrado sem uma URL.')
}

/* Obtém as configurações iniciais para acessar os dados da lista */
function getItemsWithCaml(listTitle) {

	// Obtém a url absoluta do site
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    
    //use of $.Deferred in the executeQueryAsync delegate allows the consumer of this method to write 'syncronous like' code
    var deferred = $.Deferred();
    
    var clientContext = new SP.ClientContext(siteUrl);
	list = clientContext.get_web().get_lists().getByTitle(listTitle);
    
    //var list = clientContext.get_web().get_lists().getByTitle(listTitle);
    var camlQuery = new SP.CamlQuery();            
    var items = list.getItems(camlQuery);
    
    clientContext.load(items);
    clientContext.executeQueryAsync(
    	Function.createDelegate(this, function () { deferred.resolve(items); }),
    	Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
    	);
    	
    	getWebTitle();    	

    return deferred.promise();
};

/* Obtém o nome do site */
function getWebTitle(){
    
    var clientContext = new SP.ClientContext.get_current();
    
	web = clientContext.get_web();
	clientContext.load(web);
	clientContext.executeQueryAsync(success, failure);

	function success() {
		webTitle = web.get_title();
		//console.log(web.get_title());
	}
	function failure() {
		alert("Não foi possível obter o nome do site!");
	}
}