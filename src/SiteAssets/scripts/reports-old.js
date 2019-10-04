// load all necessary sharepoint javascript libaries
SP.SOD.executeFunc('sp.js', 'SP.ClientContext',	function () {
	
	CheckScreenSize();
	
	// load the sharepoint list.
	loadSharepointList();
	
});

// loads the sharepoint list
function loadSharepointList() {

	// create the sharepoint content.
	var context = SP.ClientContext.get_current();
	
	// get the list by the title (Use Display Name).
	var list = context.get_web().get_lists().getByTitle('RelatÃ³rios');

	// create the query.
	var caml = new SP.CamlQuery();
    caml.set_viewXml(`<View><Query></Query></View>`); 
	
	// get the list items asynchronously
	var listItems = list.getItems(caml);
	context.load(listItems);
	context.executeQueryAsync(
    
	// success delegate
	Function.createDelegate(this, function() {
	
	// loop through the items.
        var listEnumerator = listItems.getEnumerator();
        while (listEnumerator.moveNext()) {
        
        	// get the current list item.
        	var listItem = listEnumerator.get_current();
        	
        	// get the field value by internalName.
            var linkReport = listItem.get_item('Title');            
            var categoria = listItem.get_item('categoria');
            var apresentacao = listItem.get_item('apresentacao');
            var site = listItem.get_item('site');
            var grupoAutorizado = listItem.get_item('permissaoDeAcesso');
            
            // console.log(`Link para o relatÃ³rio:  ${linkReport}`) //String interpolation
            // console.log(`Grupo autorizado:  ${grupoAutorizado.$5z_1}`) //Nome do grupo 
            
			if (site == "Portal principal"){
				if (categoria == "Capa" && apresentacao == "Desktop")            	
			        $('.areaContent-home-desktop').append(`<iframe src=${linkReport} frameborder="0"></iframe>`);
			    else if (categoria == "Capa" && apresentacao == "Mobile")	
			        $('.areaContent-home-mobile').append(`<iframe src=${linkReport} frameborder="0"></iframe>`);
			    
				// Para as páginas de detalhes não terá versão mobile dos Dashboards
				if (categoria == "Detalhe")             	
			        $('.areaContent-detalhes').append(`<iframe src=${linkReport} frameborder="0"></iframe>`);
		    }        
           
            // Verifica se o usuário atual é membro membro do grupo especificado
	        /*CurrentUserMemberOfGroup(grupoAutorizado.$1w_1, context, function (isCurrentUserInGroup){		        	
	        	if (isCurrentUserInGroup){	
	        		if (categoria == "Capa" && apresentacao == "Desktop")            	
			        $('.areaContent-home-desktop').append(`<iframe src=${linkReport} frameborder="0"></iframe>`);
			    	else if (categoria == "Capa" && apresentacao == "Mobile")	
			        $('.areaContent-home-mobile').append(`<iframe src=${linkReport} frameborder="0"></iframe>`);
			    
					// Para as páginas de detalhes não terá versão mobile dos Dashboards
					if (categoria == "Detalhe")             	
			        $('.areaContent-detalhes').append(`<iframe src=${linkReport} frameborder="0"></iframe>`);
	        	}     	
	        	else{
	        		$('.areaContent-home').hide()
	        		alert('Acesso negado');
	        	}
	        });*/
        }               
	}),
	
	// error delegate
	Function.createDelegate(this, function() {
		alert('Error fetching data from Sharepoint!');   	
	}));
}

function CurrentUserMemberOfGroup(groupId, context, result) {
    var currentUser = context.get_web().get_currentUser();
    context.load(currentUser);

    var Groups = currentUser.get_groups();
    context.load(Groups);

    var group = Groups.getById(groupId);
    context.load(group);

    var groupUsers = group.get_users();
    context.load(groupUsers);

    context.executeQueryAsync(
        function (sender, args) {
            var userInGroup = UserInGroup(currentUser, group);
            result(userInGroup);
        },
        function OnFailure(sender, args) {
            result(false);
        }
    );

    function UserInGroup(user, group) {
        var groupUsers = group.get_users();
        var userInGroup = false;
        var groupUserEnumerator = groupUsers.getEnumerator();
        while (groupUserEnumerator.moveNext()) {
            var groupUser = groupUserEnumerator.get_current();
            if (groupUser.get_id() == user.get_id()) {
                userInGroup = true;
                break;
            }
        }
        return userInGroup;
    }
}

function CheckScreenSize(){
	if (screen.width > 992){
		$('.areaContent-home-mobile').hide()
		$('.areaContent-home-desktop').show()
	}
	else{
		$('.areaContent-home-desktop').hide()
		$('.areaContent-home-mobile').show()
	}		
}