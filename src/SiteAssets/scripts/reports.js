$(document).ready(function () {
    //don't exectute any jsom until sp.js file has loaded.        
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', loadSharepointList);
}); 

var webTitle = '';

function loadSharepointList() {

getItemsWithCaml('Reports').then(
function (camlItems) {
   	var listItemEnumerator = camlItems.getEnumerator();
	    while (listItemEnumerator.moveNext()) {
	        
	        // get the current list item.
	        var listItem = listItemEnumerator.get_current();
	        
	        // get the field value by internalName.
	        var desktopLinkReport = listItem.get_item('desktopLinkReport');
			var mobileLinkReport = listItem.get_item('mobileLinkReport');            
	        var categoria = listItem.get_item('categoria');	        
	        var site = listItem.get_item('site');
	        
			// Compara o valor cadastrado na coluna "Site" com o site onde o usuário está logado 
			// para mostrar os itens no menu correspondente a cada site
			if (site == webTitle){
				if(categoria == "Home"){
					// Verifica se o usuário está navegando em desktop ou mobile 
					if (screen.width > 991){
						if(desktopLinkReport != null)					
							$('#homeReportDesktop').attr('src', `${desktopLinkReport}`)
						else
							alert('Um relatório foi cadastrado sem uma URL.')
					}
					else{	
						if(mobileLinkReport != null)					
							$('#homeReportMobile').attr('src', `${mobileLinkReport}`)
						else
							alert('Um relatório foi cadastrado sem uma URL.')
					}					
				}
				else if(categoria == "Detalhe"){
					if (screen.width > 991){
						if(desktopLinkReport != null)						
							$('#reportDetails').attr('src', `${desktopLinkReport}`)
					}
					else{	
						if(mobileLinkReport != null)					
							$('#reportDetails').attr('src', `${mobileLinkReport}`)
					}
				}
		    }
	    }    
	},

	function (sender, args) {
    	console.log('Ocorreu um erro ao recuperar os itens da lista: ' + args.get_message());
	});   
}    

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

function getWebTitle(){
    
    var clientContext = new SP.ClientContext.get_current();
    
	web = clientContext.get_web();
	clientContext.load(web);
	clientContext.executeQueryAsync(success, failure);

	function success() {
		webTitle = web.get_title();
		console.log(web.get_title());
	}
	function failure() {
		alert("Não foi possível obter o nome do site!");
	}
}