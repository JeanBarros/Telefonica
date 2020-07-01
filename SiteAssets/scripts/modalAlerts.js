ExecuteOrDelayUntilScriptLoaded(function () { getSiteContext() }, "SP.js");

var currentWebTitle = '';

var title, message, imagem, validade;

function getAlertMessage() {
  var listName = "Alertas";
  var siteurl = "https://telefonicacorp.sharepoint.com/sites/PortalB2CcertOCBNL";
  
  $.ajax({
      url: siteurl + "/_api/web/lists/getbytitle('" + listName + "')/items",
      method: "GET",
      headers: { "Accept": "application/json; odata=verbose" },
      
      success: function (data) { 
		getAlertSuccess(data);
	  },
	  error: function (data) { 
		failure(data);
	  }      
  });
}

function getAlertSuccess(data){
  var items = data.d.results;
      
  for (var i = 0; i < items.length; i++) {  
	  // Obtém o título do alerta
	  if(items[i].Title != null)
	    title = items[i].Title; 
	    
	  // Obtém o texto
	  if(items[i].mensagem != null)
	    message = items[i].mensagem;
	    
	  // Obtém a imagem
	  if(items[i].imagem != null)
	    imagem = items[i].imagem;
	    
	  // Obtém a data de vencimento do alerta
	  if(items[i].validade != null)
	    validade = items[i].validade;		    
	  	
	  //-------------------------------------------------------------------------------------------------------
	  
	  var expiresDate = moment(validade).format('DD/MM/YYYY');
	  var currentDate = moment(new Date()).format('DD/MM/YYYY');
	  		        		
	  if(items[i].site == currentWebTitle && currentDate <= expiresDate){
	  	if(sessionStorage.getItem("activatedAlertMessage") != 'true')
	  		setModal()      	
	  }          
  }
}

function failure(data) {
	console.log(data);
}

function setModal(){
	$('.container-fluid').append('<div class="modal" tabindex="-1" role="dialog">' +
	  '<div class="modal-dialog" role="document">' +
	    '<div class="modal-content">' +
	      '<div class="modal-header">' +
	        '<h5 class="modal-title">' + title + '</h5>' +
	        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
	          '<span aria-hidden="true">&times;</span>' +
	        '</button>' +
	     ' </div>' +
	      '<div class="modal-body">' +
	      	'<div class="modalImage" style="background: url('+ imagem +') no-repeat;"></div>' +
	        '<p>' + message + '</p>' +
	     ' </div>'+
	      '<div class="modal-footer">'+
	        '<button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>' +
	      '</div>'+
	    '</div>'+
	 ' </div>'+
	'</div>');
	
	$("#overlay").show();
	$(".modal").show();
	$('#O365_NavHeader').hide();
	
	$('.close').click(function() {
	  $("#overlay").hide();
	  $(".modal").hide();
	  $('#O365_NavHeader').show();
	});
	
	$('.btn-secondary').click(function() {
	  $("#overlay").hide();
	  $(".modal").hide();
	  $('#O365_NavHeader').show();
	});
	
	sessionStorage.setItem("activatedAlertMessage", "true");
}

function getSiteContext(){    
    var clientContext = new SP.ClientContext.get_current();
    
	web = clientContext.get_web();
	clientContext.load(web);
	clientContext.executeQueryAsync(success, failure);

	function success() {
		currentWebTitle = web.get_title();
		getAlertMessage();		
	}
	function failure() {
		console.log("Não foi possível obter o titulo do site!");
	}
}