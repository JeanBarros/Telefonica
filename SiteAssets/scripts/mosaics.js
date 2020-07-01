var webTitleCtx = _spPageContextInfo.webTitle;

getNews();

var itemId, itemTitle, isDefaultPage, urlPageToken, slider1Images, slider1Titles, slider1Links, slider2Images, slider2Titles, slider2Links, 
	slider3Images, slider3Titles, slider3Links, tilesImages, tilesLabels, tilesLinks, textAreaTitles, textAreaLinks,
	sectionTitles, slidingText, slidingTextExpires, pbiContent, pbiRedirectLinks, accessPermission;

function getNews() {
  var listName = "Cadastro de Notícias";
  var siteurl = "https://telefonicacorp.sharepoint.com/sites/PortalB2CcertOCBNL";
  
  $.ajax({
      url: siteurl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=Id, Title, site, ativo, defaultPage, urlPageToken, slider1Images, slider1Titles, slider1Links, slider2Images, slider2Titles, slider2Links, slider3Images, slider3Titles, slider3Links, tilesImages, tilesLabels, tilesLinks, tileBoxTextArea, tileBoxTextAreaLinks, sectionTitles, slidingText, slidingTextExpires, pbiContent, pbiRedirectLinks&$filter=site eq '" + webTitleCtx + "'",
      method: "GET",
      headers: {"Accept": "application/JSON; odata=verbose"},
      
      success: function (data) { 
		getNewsSuccess(data);
	  },
	  error: function (data) { 
		failure(data);
	  }      
  });
}

function getNewsSuccess(data){
	var items = data.d.results;
      
  for (var i = 0; i < items.length; i++) {
  
  	  urlPageToken = "";
  	  
  	  // obtém o ID item
	  itemId = items[i].Id;
			  
	  // obtém o Título do item
	  itemTitle = items[i].Title;
  	  
  	  // obtém o tipo de página (default ou não)
  	  if(items[i].defaultPage != null)
	    isDefaultPage = items[i].defaultPage;
  	  
  	  // Obtém o token da página a ser exibida
  	  if(items[i].urlPageToken != null)
	    urlPageToken = items[i].urlPageToken;
    
	  // Obtém o Texto para exibir no letreiro deslizante //-----------------------------------------------------------------------
	  if(items[i].slidingText != null)
	    slidingText = items[i].slidingText;
	    
	  // Obtém a data de vencimento da mensagem do letreiro deslizante
	  if(items[i].slidingTextExpires != null)
	    slidingTextExpires = items[i].slidingTextExpires;
	    
	  // Obtém as propriedades do Slider 1 //-----------------------------------------------------------------
	  if(items[i].slider1Images != null)
	  	slider1Images = items[i].slider1Images.split(";");
	  else
		slider1Images = [""];
	  	
	  // Obtém os títulos do Slider 1
	  if(items[i].slider1Titles != null)
	  	slider1Titles = items[i].slider1Titles.split(";");
	  else
		slider1Titles = [""];
	  
	  // Obtém os links do Slider 1
	  if(items[i].slider1Links != null)
	  	slider1Links = items[i].slider1Links.split(";");  
	  else
		slider1Links = [""];			
		
	  // Obtém as propriedades do Slider 2 //-----------------------------------------------------------------
	  if(items[i].slider2Images != null)
	  	slider2Images = items[i].slider2Images.split(";");
	  else
		slider2Images = [""];
	  	
	  // Obtém os títulos do Slider 2
	  if(items[i].slider2Titles != null)
	  	slider2Titles = items[i].slider2Titles.split(";");
	  else
		slider2Titles = [""];
		
	  // Obtém os links do Slider 2
	  if(items[i].slider2Links != null)
	  	slider2Links = items[i].slider2Links.split(";");  
	  else
		slider2Links = [""];
	  
	  // Obtém as propriedades do Slider 3 //-----------------------------------------------------------------
	  if(items[i].slider3Images != null)
	  	slider3Images = items[i].slider3Images.split(";");
	  else
		slider3Images = [""];
	  	
	  // Obtém os títulos do Slider 3
	  if(items[i].slider3Titles != null)
	  	slider3Titles = items[i].slider3Titles.split(";");
	  else
		slider3Titles = [""];
		
	  // Obtém os links do Slider 3
	  if(items[i].slider3Links != null)
	  	slider3Links = items[i].slider3Links.split(";");  
	  else
		slider3Links = [""];
	
	  // Obtém as IMAGENS dos tiles //-----------------------------------------------------------------------
	  if(items[i].tilesImages != null)
	  	tilesImages = items[i].tilesImages.split(";");
	  else
	    tilesImages = [""];
		  
	  // Obtém os TÍTULOS dos tiles //-----------------------------------------------------------------------
	  if(items[i].tilesLabels != null)
	  	tilesLabels = items[i].tilesLabels.split(";");
	  else
		tilesLabels = [""];			
	  			  
	  // Obtém os LINKS dos tiles //-----------------------------------------------------------------------
	  if(items[i].tilesLinks != null)
	    tilesLinks = items[i].tilesLinks.split(";");
	  else
	    tilesLinks = [""];
	    		    
	  // Obtém os Títulos das áreas de texto dos tiles //-----------------------------------------------------------------------
	  if(items[i].tileBoxTextArea != null)
	    textAreaTitles = items[i].tileBoxTextArea.split(";");
	  else
	    textAreaTitles = [""];
	    
	  // Obtém os Links das áreas de texto dos tiles //-----------------------------------------------------------------------
	  if(items[i].tileBoxTextAreaLinks != null)
	    textAreaLinks = items[i].tileBoxTextAreaLinks.split(";");
	  else
	    textAreaLinks = [""];
	    
	  // Obtém os Títulos das sessões dos tiles //-----------------------------------------------------------------------
	  if(items[i].sectionTitles != null)
	    sectionTitles = items[i].sectionTitles.split(";");
	  else
	    sectionTitles = [""];		    
	    
	  // Obtém as urls dos reports ou imagens para exibir nos iframes //-----------------------------------------------------------------------
	  if(items[i].pbiContent != null)
	  	pbiContent = items[i].pbiContent.split(";");
	  else
	    pbiContent = [""];
	    
	  // Obtém os LINKS para onde o usuário será redirecionado ao clicar nos reports ou imagens dos iframes //-----------------------------------------------------------------------
	  if(items[i].pbiRedirectLinks != null)
	  	pbiRedirectLinks = items[i].pbiRedirectLinks.split(";");
	  else
	    pbiRedirectLinks = [""];		    
	  	
	  //-------------------------------------------------------------------------------------------------------
		
	  if(items[i].site == webTitleCtx && items[i].ativo == true){	  	
	  	
	  	var urlString = document.URL;	  	
	  	
	  	if(urlString.match('_') != null){
	  		if(isDefaultPage == false){
	  			var urlSubString = document.URL.split('_');	  		
				var urlPageIdentifier = urlSubString[1].split('.');
				
				if(urlPageIdentifier[0] == urlPageToken){
		  			setSlider(1, slider1Images, slider1Titles, slider1Links);
				  	setSlider(2, slider2Images, slider2Titles, slider2Links);
				  	setSlider(3, slider3Images, slider3Titles, slider3Links);
				  	setTiles(tilesImages, tilesLabels, tilesLinks, textAreaTitles, textAreaLinks, sectionTitles, slidingText, slidingTextExpires, pbiContent, pbiRedirectLinks);
				  	getFloatNavLinks();					
		  		}
	  		}
	  	}
	  	else{
	  		if(isDefaultPage == true){
		  		setSlider(1, slider1Images, slider1Titles, slider1Links);
			  	setSlider(2, slider2Images, slider2Titles, slider2Links);
			  	setSlider(3, slider3Images, slider3Titles, slider3Links);
			  	setTiles(tilesImages, tilesLabels, tilesLinks, textAreaTitles, textAreaLinks, sectionTitles, slidingText, slidingTextExpires, pbiContent, pbiRedirectLinks);
			  	getFloatNavLinks();
		  	}
	  	}
	 }          
  }
}

function setTiles(imagens, labels, links, textAreaTitles, textAreaLinks, sectionTitles, slidingText, slidingTextExpires, pbiContent, pbiRedirectLinks){

	var currentPageTitle = $(document).attr('title');
	
	// Registra o acesso na lista User Data Access	
	createListItem(itemTitle, itemId.toString(), currentPageTitle);	

	// Define o Texto na área do letreiro
	$('.marquee span').text(slidingText);
	
	// Define a data de expiração da mensagem do letreiro
	var expiresDate = moment(slidingTextExpires).format('DD/MM/YYYY');
	var currentDate = moment(new Date()).format('DD/MM/YYYY');
	 
	if(currentDate > expiresDate){
		$('.marquee span').text("");
	}
	
	// Define as IMAGENS de fundos dos tiles
	$('.tileBoxBg').css('background', 'none');
	
	imagens.forEach(setTileImage);
	
	function setTileImage(item, index) {	
	  if(item.trim() == "")
	  	  imagens.pop();
	  else{	  	   
          $('#tileBox'+index + ' .tileBoxBg').css('background', 'url(' + item.trim() + ') no-repeat center center');
      }
	}
	
	// Define as LABELS dos titles
	$('.tileBoxBg a').empty()
	
	labels.forEach(setTileLabel);
				
	function setTileLabel(item, index) {
		if(item.trim() == "")
	  	 	labels.pop();
	  	else{
	  		$('#tileBox'+index + ' a').text(item);
	  	}			
	}
	
	// Adiciona os LINKS nos titles independente de permissão de acesso
	links.forEach(setTileLink);
				
	function setTileLink(item, index) {
		if(item.trim() == "")
	  	 	links.pop();
	  	else{
	  		$('#tileBox'+index + ' a').attr("href", item);
	  		$('#tileBox'+index + ' a').hide();	  		
	  	}		
	}
		
	// Define os TÍTULOS das áreas de texto dos tiles
		
	textAreaTitles.forEach(setTextAreaTitles);
				
	function setTextAreaTitles(item, index) {
		if(item.trim() == "")
	  	 	textAreaTitles.pop();
	  	else{	  		
	  		$('#tileBoxTextArea'+index + ' a').text(item);
	  	}		
	}
	
	// Define os LINKS das áreas de texto dos tiles
	textAreaLinks.forEach(setTextAreaLinks);
				
	function setTextAreaLinks(item, index) {
		if(item.trim() == "")
	  	 	textAreaLinks.pop();
	  	else{
	  		$('#tileBoxTextArea'+index + ' a').attr("href", item);
	  	}		
	}
	
	// Define os TÍTULOS das Seções maiores dos tiles
	sectionTitles.forEach(setSectionTitles);
				
	function setSectionTitles(item, index) {
		if(item.trim() == "")
	  	 	sectionTitles.pop();
	  	else{
	  		$('#sectionTitle'+index).text(item);
	  	}		
	}
	
	// Define os LINKS nos iframes dos relatórios
	pbiContent.forEach(setPbiContent);
				
	function setPbiContent(item, index) {
		if(item.trim() == "")
	  	 	pbiContent.pop();
	  	else{
	  		$('#pbiContent'+index + ' iframe').attr("src", item);
	  	}		
	}
	
	// Define os LINKS para onde o usuário será redirecionado ao clicar nos reports ou imagens dos iframes
	pbiRedirectLinks.forEach(setPbiRedirectLinks);
				
	function setPbiRedirectLinks(item, index) {
		if(item.trim() == "")
	  	 	pbiRedirectLinks.pop();
	  	else{
	  		$('#pbiContent'+index + ' a').attr("href", item);
	  	}		
	}
	
	tilesImages = [];
}

function failure(data) {
	console.log(data);
}

function getFloatNavLinks() {
  var listName = "Menu flutuante";
  var siteurl = "https://telefonicacorp.sharepoint.com/sites/PortalB2CcertOCBNL";
  
  var tilePosition, labels, links, floatNavItemsPermission, componentType, openLinksInNewWindow;

	$.ajax({
      url: siteurl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=site, defaultPage, urlPageToken, tilePosition, labels, links, visibleOnTile, componentType, openNewWindow, accessPermission/Title&$expand=accessPermission&$filter=site eq '" + webTitleCtx + "'",
      method: "GET",
      headers: { "Accept": "application/json; odata=verbose" },
      
	  success: function (data) { 
		getFloatNavLinksSuccess(data);
	  },
	  error: function (data) { 
		failure(data);
	  }     
  });
}

function getFloatNavLinksSuccess(data){
  var items = data.d.results;
      
  for (var i = 0; i < items.length; i++) {
  
  	  // obtém o tipo de página (default ou não)
  	  if(items[i].defaultPage != null)
	    isDefaultPage = items[i].defaultPage;
  	  
  	  // Obtém o token da página a ser exibida
  	  if(items[i].urlPageToken != null)
	    urlPageToken = items[i].urlPageToken;
  
  	  // Obtém a posição do tile //-----------------------------------------------------------------------
      if(items[i].tilePosition != null)
  	    tilePosition = items[i].tilePosition;
  	    
  	  // Obtém as labels a serem adicionadas no menu flutuante //-----------------------------------------
  	  if(items[i].labels != null)
  	  	labels = items[i].labels.split(";");
  	  else
	    labels = [""];
		  
	  // Obtém os links a serem adicionadas no menu flutuante //------------------------------------------
  	  if(items[i].links != null)
  	  	links = items[i].links.split(";");
  	  else
		links = [""];
		
	  // Obtém o tipo de componente para definir onde o menu flutuante deve ser criado  //------------------------------------------
  	  if(items[i].links != null)
  	  	componentType = items[i].componentType;
  	  else
		componentType = [""];		
		
	  // Obtém a opção de abrir o link em nova ou mesma guia //-----------------------------------------------------------------------
  	  openLinksInNewWindow = items[i].openNewWindow;
		
	  // Obtém as permissões de cada conjunto de links do menu flutuante //------------------------------
	  if(items[i].accessPermission.results != undefined)
  	  	floatNavItemsPermission = items[i].accessPermission.results;
  	  else
  	  	floatNavItemsPermission = [];		  
  		
      if(items[i].site == webTitleCtx){
      
		var urlString = document.URL;
		
		if(urlString.match('_') != null){
	  		if(isDefaultPage == false){
	  			var urlSubString = document.URL.split('_');	  		
				var urlPageIdentifier = urlSubString[1].split('.');
				
				if(urlPageIdentifier[0] == urlPageToken){
					if(items[i].visibleOnTile == true)       
      					setFloatNav(tilePosition, labels, links, floatNavItemsPermission, componentType, openLinksInNewWindow);
				}
	  		}
	  	}
	  	else{
	  		if(isDefaultPage == true){
	  			if(items[i].visibleOnTile == true)       
      			setFloatNav(tilePosition, labels, links, floatNavItemsPermission, componentType, openLinksInNewWindow);      			
	  		}	  		
	  	}
	  	
	  	getTilesLinks();
      }          
  }
}

function getTilesLinks() {
  var listName = "Links do Mosaico";
  var siteurl = "https://telefonicacorp.sharepoint.com/sites/PortalB2CcertOCBNL";
  
  var tileLinkPosition, tileLinkPermission, openLinksInNewWindow;
  
  $.ajax({
      url: siteurl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=site, tilePosition, urlPageToken, openNewWindow, accessPermission/Title&$expand=accessPermission&$filter=site eq '" + webTitleCtx + "'",
      method: "GET",
      headers: { "Accept": "application/json; odata=verbose" },
      
      success: function (data) { 
		getTilesLinksSuccess(data);
	  },
	  error: function (data) { 
		failure(data);
	  }      
  });
}

function getTilesLinksSuccess(data){
  var items = data.d.results;
      
  for (var i = 0; i < items.length; i++) {
  
  	  urlPageToken = "";
  	  
  	  // Obtém o token da página a ser exibida
  	  if(items[i].urlPageToken != null)
	    urlPageToken = items[i].urlPageToken;

	  // Obtém a posição do tile //-----------------------------------------------------------------------
  	  tileLinkPosition = items[i].tilePosition;
		
	  // Obtém as permissões de cada link //------------------------------
	  if(items[i].accessPermission.results != undefined)
  	  	tileLinkPermission = items[i].accessPermission.results;
  	  	
	  // Obtém a opção de abrir o link em nova ou mesma guia //-----------------------------------------------------------------------
  	  openLinksInNewWindow = items[i].openNewWindow;
  	  	
  	  //--------------------------------------------------------------------------------------------------
  		
      if(items[i].site == webTitleCtx){      
      	var urlString = document.URL;
		
		if(urlString.match('_') != null){
	  		var urlSubString = document.URL.split('_');	  		
			var urlPageIdentifier = urlSubString[1].split('.');
				
			if(urlPageIdentifier[0] == urlPageToken)
				resetTilesLinksByPermission(tileLinkPosition, tileLinkPermission, openLinksInNewWindow);
	  	}
	  	else
	  		resetTilesLinksByPermission(tileLinkPosition, tileLinkPermission, openLinksInNewWindow);
      }          
  }
}

// Verifica se o usuário corrente possui permissão de acesso em cada link individualmente
function resetTilesLinksByPermission(position, linkPermission, openLinksInNewWindow){
	
	if(linkPermission != undefined){
		linkPermission.forEach(resetTileLink);

		function resetTileLink(element) {		
			if(isCurrentUserMemberOfGroup(element.Title) || element.Title == _spPageContextInfo.userDisplayName){
				$('#tileBox'+position + ' a').show();
				
				if(!openLinksInNewWindow)
					$('#tileBox'+position + ' a').attr('target', '_self')	
			}			
		}
	}
}

function setFloatNav(tilePosition, labels, links, floatNavItemsPermission, componentType, openLinksInNewWindow){

	var activeFloatNav = false;
	
	// Cria a estrutura inicial do menu flutuante em cada tile
	if(floatNavItemsPermission != undefined){
					
  		floatNavItemsPermission.forEach(setLinkItems);

		function setLinkItems(element) {
			if(activeFloatNav == false){
				if(isCurrentUserMemberOfGroup(element.Title) || element.Title == _spPageContextInfo.userDisplayName){
			
					if(componentType == "TileBox"){
						// Remove o link padrão quando um menu flutuante está definido para o tile
						$('#tileBox'+tilePosition + ' a').remove();
			
						// Cria o menu flutuante
						$('#tileBox'+tilePosition).append('<div class="dropdown">' +
						'<ul id=floatNav'+tilePosition +  ' class="dropdown-menu" role="menu" aria-labelledby="dLabel"></ul></div>');
					}
					else if(componentType == "TextArea"){
						// Obtém o texto do link antes de ser removido
						var text = $('#tileBoxTextArea'+tilePosition + ' a').text();
						
						// Remove o link padrão quando um menu flutuante está definido para a área de texto
						$('#tileBoxTextArea'+tilePosition + ' a').remove();
						
						$('#tileBoxTextArea'+tilePosition + ' .tileBoxTextArea').text(text);						

						$('#tileBoxTextArea'+tilePosition + ' .tileBoxTextArea').css('padding-top', '15%');
			
						// Cria o menu flutuante						
						$('#tileBoxTextArea'+tilePosition).append('<div id="TextAreaContentFloatNav"><div class="dropdown">' +
						'<ul id=floatNavTextArea'+tilePosition +  ' class="dropdown-menu" role="menu" aria-labelledby="dLabel"></ul></div></div>');
					}
					else if(componentType == "Report"){
						// Adiciona um botão quando um menu flutuante está definido para áreas com iframe
						$('#pbiContent'+tilePosition).append('<div class="btnFloatNav"></div>');

						$('#pbiContent'+tilePosition).append('<div id="pbiContentFloatNav"><div class="dropdown">' +
						'<ul id=floatNavpbiContent'+tilePosition +  ' class="dropdown-menu" role="menu" aria-labelledby="dLabel"></ul></div></div>');
					}	
					
					activeFloatNav = true;				
				}
			}
		}
	}

	// Define os LINKS a serem adicionadas no menu flutuante
	links.forEach(setFloatNavLinks);
				
	function setFloatNavLinks(item, index) {
		if(item.trim() == "")
	  	 	links.pop();
	  	else{
	  		if(componentType == "TileBox"){
	  			if(openLinksInNewWindow)	  	
		  			$('#tileBox'+tilePosition + ' ul').append('<li><a tabindex="-1" href=' + item + ' target="_blank" >' + labels[index] + ' </a></li>');
		  		else
		  			$('#tileBox'+tilePosition + ' ul').append('<li><a tabindex="-1" href=' + item + ' target="_self" >' + labels[index] + ' </a></li>');
		  			
		  		$('#tileBox'+tilePosition).click(function() {
		
					$('#floatNav'+tilePosition).show();
					
					$(this).mouseleave(function(){
					  $('#floatNav'+tilePosition).hide();
					});  			
				});
	  		}
	  		else if(componentType == "TextArea"){
	  			if(openLinksInNewWindow)	  	
		  			$('#tileBoxTextArea'+tilePosition + ' ul').append('<li><a tabindex="-1" href=' + item + ' target="_blank" >' + labels[index] + ' </a></li>');
		  		else
		  			$('#tileBoxTextArea'+tilePosition + ' ul').append('<li><a tabindex="-1" href=' + item + ' target="_self" >' + labels[index] + ' </a></li>');
		  			
		  		$('#tileBoxTextArea'+tilePosition).click(function() {
		
					$('#floatNavTextArea'+tilePosition).show();
					
					$(this).mouseleave(function(){
					  $('#floatNavTextArea'+tilePosition).hide();
					});  			
				});
	  		}
	  		else if(componentType == "Report"){
	  			if(openLinksInNewWindow)	  	
		  			$('#pbiContent'+tilePosition + ' ul').append('<li><a tabindex="-1" href=' + item + ' target="_blank" >' + labels[index] + ' </a></li>');
		  		else
		  			$('#pbiContent'+tilePosition + ' ul').append('<li><a tabindex="-1" href=' + item + ' target="_self" >' + labels[index] + ' </a></li>');
		  			
		  		$('#pbiContent'+tilePosition).click(function() {
		
					$('#floatNavpbiContent'+tilePosition).show();
					
					$(this).mouseleave(function(){
					  $('#floatNavpbiContent'+tilePosition).hide();
					});  			
				});
	  		}	  		
	  	}	
	}
}

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

function setSlider(sliderPosition, imagens, titles, links){

	$('#slider'+sliderPosition + ' .carousel-inner').empty();
	
	// Define as imagens no SLIDER
	imagens.forEach(setImageSlide);
	
	function setImageSlide(item, index) {	
	  if(item.trim() == "")
	  	  imagens.pop();
	  else{			
			$('#slider'+sliderPosition + ' .carousel-inner').append('<div id=slider' + sliderPosition + '_image' + index + ' class="carousel-item">' +
				'<a href=# target="_blank">' +
			      	'<img class="d-block w-100" src=' + item.trim() + '>' +
			      	'<div class="carousel-caption d-none d-md-block"></div>' +
			  	'</a>' +
			'</div>');
			
			$('#slider'+ sliderPosition + '_image' + 0).addClass("active");
	  	}	
	}
	
	// Define os títulos no SLIDER
	titles.forEach(setTitleSlide);
				
	function setTitleSlide(item, index) {
		if(item.trim() == "")
	  	 	titles.pop();
	  	else{
	  		$('#slider'+ sliderPosition + ' .carousel-caption').eq(index).append('<h1>' + item + '</h1>');
	  	}			
	}
	
	// Define os links no SLIDER
	links.forEach(setLinkSlide);
				
	function setLinkSlide(item, index) {
		if(item.trim() == "")
	  	 	links.pop();
	  	else{
	  		$('#slider'+sliderPosition + ' a').eq(index).attr('href',item);
	  	}		
	}
}