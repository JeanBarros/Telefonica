ExecuteOrDelayUntilScriptLoaded(function () { loadItens() }, "SP.js");

function loadItens(){
	setTimeout(function(){	
		GetSlides()	
	}, 3000);
}

function GetSlides() {

	// Obtém a url absoluta do site
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
	var list = clientContext.get_web().get_lists().getByTitle("Slides");	
	clientContext.load(list);
		
	var camlQuery = new SP.CamlQuery();            
    var items = list.getItems(camlQuery);
	
	itemCollection = list.getItems(camlQuery);
	clientContext.load(itemCollection);

	clientContext.executeQueryAsync(Function.createDelegate(this,this.resultSuccess), Function.createDelegate(this,this.resultFailed));
}

function resultSuccess(sender, args) {
	var enumerator = itemCollection.getEnumerator();
	
	var countSlides = 1;
	
    while (enumerator.moveNext()) {        
    
        // get the current list item.
        var listItem = enumerator.get_current();
        
		// get the field value by internalName.
		var itemID = listItem.get_item('ID')
		var itemTitle = listItem.get_item('Title')
		var imageLink = listItem.get_item('linkImagem')
		var linkTo = listItem.get_item('linkDestino')
		var subtitulo = listItem.get_item('subtitulo')	
		
		// Para funcionar no IE e demais navegadores - IE não suporta concatenação de strings
		$(".carousel-inner").append('<div id=' + countSlides + ' class="carousel-item">' +
			'<a href=' + linkTo.$1_1 + '>' +
		      '<img class="d-block w-100" src=' + imageLink.$1_1 + '>' +
		      '<div class="carousel-caption d-none d-md-block">' +
			    '<h1>' + itemTitle + '</h1>' +
			    '<p>' + subtitulo + '</p>'+
			  '</div>'+
		  	'</a>'+
		'</div>')			
		
		countSlides ++;  
	}
	
	$('#1').addClass("active");	
}

function resultFailed(sender, args) {
    console.log('Ocorreu um erro ao recuperar os itens da lista: ' + args.get_message());
}