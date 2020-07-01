var currentWebTitle = "";
var filteredArea = "";
var filteredSubject = "";

var docId, docTitle, docArea, docSubject, docLinkPath, docDateCreation, docDateModified, docDateExpires,
  	docAuthor, periodicidade, accessPermission, docDescription;
  	
// Armazena todos os itens econtrados de acordo com o nome da coluna fornecida
// e posteiormente os itens duplicados são removidos;
var areaCollection = [];
var subjectCollection = [];

// Armazena os resultados da pesquisa que terão os links removidos caso o usuário
// atual não seja membro de qualquer grupo cadastrado na lista
var linksToReset = [];

function getItems(searchTerm) {

	var listName = "Cadastro de Documentos";
  	var siteurl = "https://telefonicacorp.sharepoint.com/sites/PortalB2CcertOCBNL";
  	
  	// Colunas do tipo lookup e usuário, como a coluna Author, só podem ser pesquisadas fazendo um processo de expansão na query
	// Exemplo: ?$select=col1,col2,col3/Title,col4/Title.....,col54&$expand=col3,col4. 
	// Onde [col1], [col2], etc... é o internal name da coluna e [/Tile] a string retornada: (Author/Title)
	// a instrução [&expand] processa os dados dos tipos citados acima, recebendo o nome da coluna em questão como parâmetro
	$.ajax({
	  url: siteurl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=id,Title,assunto,area,linkPath,Created,Modified,dataExpiracao,periodicidade,description,Author/Title,accessPermission/Title&$expand=Author,accessPermission&$orderby=Created desc&$top=10",
	  method: "GET",
	  headers: { "Accept": "application/json; odata=verbose" },
	  
	  success: function (data){
	      topResultsSuccess(data, searchTerm);
	  },
	  error: function (data){
	      failure(data);
	  }      
	});
}

function topResultsSuccess(data, searchTerm){
	var items = data.d.results;
      
  	$('#customResults li').remove();
  	$('#allResults tbody tr').remove();
  	      	
  	linksToReset = [];

  	for (var i = 0; i < items.length; i++) {
  
  		docId = items[i].ID;
  		docTitle = items[i].Title.toLowerCase();
  		docArea = items[i].area.toLowerCase();
  		docSubject = items[i].assunto.toLowerCase();
  		docLinkPath = items[i].linkPath;
  		docDateCreation = items[i].Created;
  		docDateModified = items[i].Modified;
  		docDateExpires = items[i].dataExpiracao;
  		docAuthor = items[i].Author.Title;
  		docDescription = items[i].description;
  		accessPermission = items[i].accessPermission.results;
  		periodicidade = items[i].periodicidade;
  		      		
  		areaCollection.push(items[i].area);    			 		
		subjectCollection.push(items[i].assunto);    		
			
  		if(filteredArea != ""){
  			if(docArea.match(searchTerm)){
			
  				$('#allResults tbody').append('<tr title="' + docDescription + '">' + '<td>' + items[i].assunto + '</a></td>' + 
    			'<td>' + items[i].area + '</td>' +
    			'<td><a data-document-id=' + docId + ' target="_blank">' + items[i].Title + '</a></td>' +
    			'<td>' + moment(docDateCreation).format('DD/MM/YYYY') + '</td>' +
    			'<td>' + moment(docDateModified).format('DD/MM/YYYY') + '</td>' +
    			'<td>' + (docDateExpires != null ? moment(docDateExpires).format('DD/MM/YYYY') : '------------') + '</td>' +    			
    			'<td>' + docAuthor + '</td>' +
    			'<td>' + periodicidade + '</td>' +
    			'</tr>');
    			
    			if(accessPermission != undefined){
				
					accessPermission.forEach(setLinkItems);
		
					function setLinkItems(element) {			
						
						if(isCurrentUserMemberOfGroup(element.Title) || element.Title == _spPageContextInfo.userDisplayName){
							var resultsTable = $('#searchResults tbody tr a');
							
							for (j=0; j < resultsTable.length; j++){
							    if(docId == parseInt(resultsTable[j].getAttribute('data-document-id'))){
									resultsTable[j].setAttribute('href',docLinkPath);
								}
							}
						}
					}
				}					
  			}      			
  		}
  		else if(filteredSubject != ""){
  			if(docSubject.match(searchTerm)){      			
  					
  				$('#allResults tbody').append('<tr title="' + docDescription + '">' + '<td>' + items[i].assunto + '</a></td>' + 
    			'<td>' + items[i].area + '</td>' +
    			'<td><a data-document-id=' + docId + ' target="_blank">' + items[i].Title + '</a></td>' +
    			'<td>' + moment(docDateCreation).format('DD/MM/YYYY') + '</td>' +
    			'<td>' + moment(docDateModified).format('DD/MM/YYYY') + '</td>' +
    			'<td>' + (docDateExpires != null ? moment(docDateExpires).format('DD/MM/YYYY') : '------------') + '</td>' +    			
    			'<td>' + docAuthor + '</td>' +
    			'<td>' + periodicidade + '</td>' +
    			'</tr>');
    			
				if(accessPermission != undefined){    			
    						
					accessPermission.forEach(setLinkItems);
		
					function setLinkItems(element) {
						if(isCurrentUserMemberOfGroup(element.Title) || element.Title == _spPageContextInfo.userDisplayName){
							var resultsTable = $('#searchResults tbody tr a');
							
							for (j=0; j < resultsTable.length; j++){
							    if(docId == parseInt(resultsTable[j].getAttribute('data-document-id'))){
									resultsTable[j].setAttribute('href',docLinkPath);
								}
							}
						}
					}
				}   			
  			}
  		}      
  		else{    			
			$('#allResults tbody').append('<tr title="' + docDescription + '">' + '<td>' + items[i].assunto + '</a></td>' + 
			'<td>' + items[i].area + '</td>' +
			'<td><a data-document-id=' + docId + ' target="_blank">' + items[i].Title + '</a></td>' +
			'<td>' + moment(docDateCreation).format('DD/MM/YYYY') + '</td>' +
			'<td>' + moment(docDateModified).format('DD/MM/YYYY') + '</td>' +
			'<td>' + (docDateExpires != null ? moment(docDateExpires).format('DD/MM/YYYY') : '------------') + '</td>' +    			
			'<td>' + docAuthor + '</td>' +
			'<td>' + periodicidade + '</td>' +
			'</tr>');    			
			
			if(accessPermission != undefined){    			
						
				accessPermission.forEach(setLinkItems);
	
				function setLinkItems(element) {
					
					if(isCurrentUserMemberOfGroup(element.Title) || element.Title == _spPageContextInfo.userDisplayName){
						var resultsTable = $('#searchResults tbody tr a');
						
						for (j=0; j < resultsTable.length; j++){
						    if(docId == parseInt(resultsTable[j].getAttribute('data-document-id'))){
								resultsTable[j].setAttribute('href',docLinkPath);
							}
						}
					}						
				}
			}  			
		}				
  	}    	
  
  	removeDuplicateAreas(areaCollection);
  	removeDuplicateSubjects(subjectCollection);
}

function failure(data) {
	console.log(data);
}

function removeDuplicateAreas(areaCollection) {
	var filteredByArea = [];
    $.each(areaCollection, function(i, e) {
        if ($.inArray(e, filteredByArea) == -1) filteredByArea.push(e);
    });	
	
	filteredByArea.forEach(showResults);

	function showResults(item) {
	  	$('#resultsByArea ul').append('<li class="list-inline-item align-middle">' + 
    	'<input type="button" class="btn btn-info btn-sm btnFilter" onclick="filterResultsByArea(' + "'" + item + "'" + ')" value="' + item + '">' + '</li>');
	}
}

function removeDuplicateSubjects(subjectCollection) {
	var filteredBySubject = [];
    $.each(subjectCollection, function(i, e) {
        if ($.inArray(e, filteredBySubject) == -1) filteredBySubject.push(e);
    });	
	
	filteredBySubject.forEach(showResults);

	function showResults(item) {
	  	$('#resultsBySubject ul').append('<li class="list-inline-item align-middle">' + 
    	'<input type="button" class="btn btn-info btn-sm btnFilter" onclick="filterResultsBySubject(' + "'" + item + "'" + ')" value="' + item + '">' + '</li>');
	}
}

function getContext(){    
    var clientContext = new SP.ClientContext.get_current();
    
	web = clientContext.get_web();
	clientContext.load(web);
	clientContext.executeQueryAsync(success, failure);
	
	function success() {
		currentWebTitle = web.get_title();
		
		if(filteredArea != ""){
			getItems(filteredArea);
		}
		else if(filteredSubject != ""){
			getItems(filteredSubject);
		}
		else{
			getItems();
		}		
	}
	function failure() {
		console.log("Não foi possível obter o titulo do site!");
	}
}

function searchDocumentLinks(){
	ExecuteOrDelayUntilScriptLoaded(function () { getContext() }, "SP.js");
}

function showCustomSearch(){
		
	filteredArea = "";
	filteredSubject = "";
	
	searchDocumentLinks();	
}

function filterResultsByArea(item){
	filteredSubject = "";
	filteredArea = item.toLowerCase();

	$('#allResults tbody tr').remove();
	linksToReset = [];
	
	searchDocumentLinks();	
}

function filterResultsBySubject(item){

	filteredArea = "";
	filteredSubject = item.toLowerCase();	

	$('#allResults tbody tr').remove();
	linksToReset = [];
	
	searchDocumentLinks();	
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