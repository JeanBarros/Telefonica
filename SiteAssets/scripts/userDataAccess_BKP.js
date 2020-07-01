function getClickedLinkProps(linkID, linkTitle, pageTitle){

	// Obtém a url absoluta do site
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
	list = clientContext.get_web().get_lists().getByTitle('User Data Access');
	
    var itemCreateInfo = new SP.ListItemCreationInformation(); 
    
    this.oListItem = list.addItem(itemCreateInfo);
    oListItem.set_item('linkId', linkID);      
    oListItem.set_item('Title', linkTitle);
    oListItem.set_item('P_x00e1_gina_x002f_Subsite', pageTitle);
 
    oListItem.update(); 
    clientContext.load(oListItem);
     
    clientContext.executeQueryAsync( 
	    Function.createDelegate(this, this.onAddSucceeded), 
	    Function.createDelegate(this, this.onAddFailed)
 
    );
}

function onAddSucceeded(sender, args) { 
    console.log("Um item foi adicionando na lista [Data Access]"); 
}
 
function onAddFailed(sender, args) { 
    alert('Request failed. ' + args.get_message() + 
    '\n' + args.get_stackTrace());
}