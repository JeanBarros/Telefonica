ExecuteOrDelayUntilScriptLoaded(function () { getCurrentWebTitle() }, "SP.js");
ExecuteOrDelayUntilScriptLoaded(function () { GetHeaders() }, "SP.js");


var currentWebTitle = '';

var links = [];

function GetHeaders() {

	// Obtém a url absoluta do site
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
	var list = clientContext.get_web().get_lists().getByTitle("Reports");	
	clientContext.load(list);
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml(`<View>
			<Query>
				<Where>
					<Eq>
						<FieldRef Name='tipoLink' /><Value Type='Choice'>Header</Value>
					</Eq>
				</Where>
			</Query>
		</View>`);
	
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
        var site = listItem.get_item('site');
		var Id_GrupoAutorizado = listItem.get_item('permissaoDeAcesso');		
        var urlIcon = listItem.get_item('icone');
        
        var link_ref = nomeRelatorio.replace(/\s/g, "");        
        
        // Compara o valor cadastrado na coluna "Site" com o site onde o usuário está logado para mostrar os itens no menu correspondente a cada site
        if (site == currentWebTitle){        	
        	if(urlIcon != null){
				$("#sidebar").append(`<div id="${idRelatorio}" class="leftNavIcons sidebarCollapse" 
						style="background:url(${urlIcon.$1_1}) no-repeat center center"
						onmouseover="resetHeaders(${Id_GrupoAutorizado[0].$1w_1}, ${idRelatorio})">
					</div>    							
					<ul class="list-unstyled components">
	                    <li class="sidebar-links" >
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
	        	alert('Um cabeçalho foi cadastrado sem um ícone')
			}
			   
		$(`#${idRelatorio}`).mouseover()
	}
    
    $('.sidebarCollapse').on('click', function () {
    	$('#sidebar').toggleClass('active');
    	
    	/*if($( "#sidebar" ).hasClass( "active" )){
    		$('#sidebar').on('mouseout', function () {
    			$('#sidebar').toggleClass('');
    		});
    	}*/   	
	});

	$('.leftNavIcons').click(function(){
		var groupItemID = $(this).next().find('.list-unstyled').attr('id')
		$("#" + groupItemID).toggleClass('show')

		// if($('.list-unstyled').hasClass('show'))
		// 	$('.list-unstyled').removeClass('show')
		// else
		// 	$('.list-unstyled').addClass('show')
  	});  
	
// Teste
/*$('.sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');

    if($( "#sidebar" ).hasClass( "active" )) {
 	$('.sidebarCollapse').on('mouseout', function () {
    		$('#sidebar').toggleClass('');
	});   
    }
	
});*/
	  
	// Cria uma área específica para adicionar os links fixos - Sempre abaixo dos cabeçalhos (links contendo sublinks)
	$("#sidebar").append(`<div id="fixedLinks"></div>`);

	ExecuteOrDelayUntilScriptLoaded(function () { GetMenuLinks() }, "SP.js");
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
		var desktopLinkReport = listItem.get_item('desktopLinkReport');
		var mobileLinkReport = listItem.get_item('mobileLinkReport');            
        var categoria = listItem.get_item('categoria');
        var site = listItem.get_item('site');
        var Id_GrupoAutorizado = listItem.get_item('permissaoDeAcesso');        
        var tipoLink = listItem.get_item('tipoLink');
        var urlIcon = listItem.get_item('icone');
		var header = listItem.get_item('header'); 
		var paginaDetalhe = listItem.get_item('paginaDetalhes');        
        
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
								$(`#sublink_${sublink_header}`).append(`<li>
									<a id="${idRelatorio}" href="${paginaDetalhe.$1_1}?${desktopLinkReport}" 
									onmouseover="resetLinks(${Id_GrupoAutorizado[0].$1w_1}, ${idRelatorio})">${nomeRelatorio}</a>
								</li>`)
							}
							else
								alert('Um sublink foi cadastrado sem uma URL para a página de detalhes')
						}	
						else{				
							$(`#sublink_${sublink_header}`).append(`<li>
								<a id="${idRelatorio}" href="#" onclick="setUrlIframeHome('${desktopLinkReport}')"
								onmouseover="resetLinks(${Id_GrupoAutorizado[0].$1w_1}, ${idRelatorio})">${nomeRelatorio}</a>
							</li>`)
						}
					}	
					else
						alert('Um Sublink foi cadastrado sem um cabeçalho ou uma URL')
				}
				else{
					if(header != null && mobileLinkReport != null){	        	
						var sublink_header = header.replace(/\s/g, "");
						if(categoria == "Detalhe"){
							if(paginaDetalhe != null){
								$(`#sublink_${sublink_header}`).append(`<li>
									<a id="${idRelatorio}" href="${paginaDetalhe.$1_1}?${mobileLinkReport}"
									onmouseover="resetLinks(${Id_GrupoAutorizado[0].$1w_1}, ${idRelatorio})">${nomeRelatorio}</a>
								</li>`)
							}
							else
								alert('Um sublink foi cadastrado sem uma URL para a página de detalhes')
						}
						else{
							$(`#sublink_${sublink_header}`).append(`<li>
								<a id="${idRelatorio}" href="#" onclick="setUrlIframeMobile('${mobileLinkReport}')"
								onmouseover="resetLinks(${Id_GrupoAutorizado[0].$1w_1}, ${idRelatorio})">${nomeRelatorio}</a>
							</li>`)
						}
					}
					else
						alert('Um Sublink foi cadastrado sem um cabeçalho ou uma URL.')
				}					
	        }
	        
	        if (tipoLink == "Link"){
				// Verifica se o usuário está navegando em desktop ou mobile
				if (screen.width > 991){
					if(urlIcon != null && desktopLinkReport != null){
						if(categoria == "Detalhe"){
							if(paginaDetalhe != null){
								$("#fixedLinks").append(`<a id="${idRelatorio}" href="${paginaDetalhe.$1_1}?${desktopLinkReport}" 
										onmouseover="resetLinks(${Id_GrupoAutorizado[0].$1w_1}, ${idRelatorio})">
										<div class="leftNavIcons" style="background:url(${urlIcon.$1_1}) no-repeat center center">
									</div>
									<span class="sidebar-links-title">${nomeRelatorio}</span>
								</a>`);
							}
							else
								alert('Um link foi cadastrado sem uma URL para a página de detalhes')
						}
						else{
							$("#fixedLinks").append(`<a id="${idRelatorio}" href="#" onclick="setUrlIframeHome('${desktopLinkReport}')" 
									onmouseover="resetLinks(${Id_GrupoAutorizado[0].$1w_1}, ${idRelatorio})">
									<div class="leftNavIcons" style="background:url(${urlIcon.$1_1}) no-repeat center center">
								</div>
								<span class="sidebar-links-title">${nomeRelatorio}</span>
							</a>`);
						}
					}
					else
	        			alert('Um link foi cadastrado sem um ícone ou uma URL.')
				}
				else{
					if(urlIcon != null && mobileLinkReport != null){
						if(categoria == "Detalhe"){
							if(paginaDetalhe != null){
								$("#fixedLinks").append(`<a id="${idRelatorio}" href="${paginaDetalhe.$1_1}?${mobileLinkReport}" 
										onmouseover="resetLinks(${Id_GrupoAutorizado[0].$1w_1}, ${idRelatorio})">
										<div class="leftNavIcons" style="background:url(${urlIcon.$1_1}) no-repeat center center">
									</div>
									<span class="sidebar-links-title">${nomeRelatorio}</span>
								</a>`);
							}
							else
								alert('Um link foi cadastrado sem uma URL para a página de detalhes')
						}
						else{
							$("#fixedLinks").append(`<a id="${idRelatorio}" href="#" onclick="setUrlIframeMobile('${mobileLinkReport}')" 
								onmouseover="resetLinks(${Id_GrupoAutorizado[0].$1w_1}, ${idRelatorio})">
								<div class="leftNavIcons" style="background:url(${urlIcon.$1_1}) no-repeat center center">
							</div>
							<span class="sidebar-links-title">${nomeRelatorio}</span>
							</a>`);							
						}
					}
					else
	        			alert('Um link foi cadastrado sem um ícone ou uma URL.')
				}
					
				links.push(`${idRelatorio}`)
			}
			
			$(`#${idRelatorio}`).mouseover()
       }
	}	
}

// Remove os cabeçalhos do menu lateral e todo os sublinks se o usuário não é membro dos grupos autorizado no header cadastrado na lista
function resetHeaders(Id_GrupoAutorizado, linkID){
	ExecuteOrDelayUntilScriptLoaded(function () { IsCurrentUserMemberOfGroup(Id_GrupoAutorizado, function (isCurrentUserInGroup) {
			if(!isCurrentUserInGroup){
				$(`#${linkID}`).next().remove()
				$(`#${linkID}`).remove()
			}				
		});
	}, "SP.js");
}

// Remove os links e sublinks dos cabeçalhos onde o usuário não é membro dos grupos autorizados, cadastrados na lista
function resetLinks(Id_GrupoAutorizado, linkID){
	ExecuteOrDelayUntilScriptLoaded(function () { IsCurrentUserMemberOfGroup(Id_GrupoAutorizado, function (isCurrentUserInGroup) {
			if(!isCurrentUserInGroup)
				$(`#${linkID}`).remove()
		});
	}, "SP.js");
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

function setUrlIframeHome(linkReport){
	$('#homeReportDesktop').attr('src', linkReport);	
}

function setUrlIframeMobile(linkReport){
	$('#homeReportMobile').attr('src', linkReport);	
}

function IsCurrentUserMemberOfGroup(groupId, OnComplete) {

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

        currentContext.executeQueryAsync(OnSuccess2,OnFailure);

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
            OnComplete(userInGroup);            
        }

        function OnFailure(sender, args) {
            OnComplete(false);
        }    
}