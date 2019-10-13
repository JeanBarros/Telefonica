ExecuteOrDelayUntilScriptLoaded(function () { GetSlides() }, "SP.js");


function GetSlides() {

	// Obtém a url absoluta do site
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var clientContext = new SP.ClientContext(siteUrl);
	var list = clientContext.get_web().get_lists().getByTitle("Slides");	
	clientContext.load(list);
		
	var camlQuery = new SP.CamlQuery();            
    var items = list.getItems(camlQuery);
	
	slideCollection = list.getItems(camlQuery);
	clientContext.load(slideCollection);

	clientContext.executeQueryAsync(Function.createDelegate(this,this.resultSuccess), Function.createDelegate(this,this.resultFailed));
}

function resultSuccess(sender, args) {
	var enumerator = slideCollection.getEnumerator();
	
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
		
        /*var linkReport = listItem.get_item('linkRelatorio');            
        var categoria = listItem.get_item('categoria');
        var apresentacao = listItem.get_item('apresentacao');
        var site = listItem.get_item('site');
        var Id_GrupoAutorizado = listItem.get_item('permissaoDeAcesso');        
        var tipoLink = listItem.get_item('tipoLink');
        var urlIcon = listItem.get_item('icone');
        var header = listItem.get_item('header'); */
        
		$(".carousel-inner").append(`<div id="${countSlides}" class="carousel-item">
			<a href="${linkTo.$1_1}">
		      <img class="d-block w-100" src="${imageLink.$1_1}">
		      <div class="carousel-caption d-none d-md-block">
			    <h1>${itemTitle}</h1>
			    <p>${subtitulo}</p>
			  </div>
		  	</a>
		</div>`)
		
		
		countSlides ++;  
	}
	
	$('#1').addClass("active");	
}

function resultFailed(sender, args) {
    console.log('Ocorreu um erro ao recuperar os itens da lista: ' + args.get_message());
}