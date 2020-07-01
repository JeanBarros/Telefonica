function createListItem(reportTitle, linkID, pageTitle){

  var absoluteWebUrl = _spPageContextInfo.siteAbsoluteUrl;

  return getFormDigest(absoluteWebUrl).then(function(data){
    $.ajax ({
      url: absoluteWebUrl + "/_api/web/lists/GetByTitle('User Data Access')/items",  
        type: "POST",  
        data: JSON.stringify({ __metadata: { type: "SP.Data.DataAccessListItem" }, Title: reportTitle, linkId: linkID, P_x00e1_gina_x002f_Subsite: pageTitle}),

        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue,  
            "X-HTTP-Method": "POST"  
        },

        success: function (data) {
            success(data.d);
        },
        error: function (data) {
            failure(data);
        }
        		
      });              
  });
}

function getFormDigest(webUrl) {
  return $.ajax({
      url: webUrl + "/_api/contextinfo",
      method: "POST",
      headers: { "Accept": "application/json; odata=verbose" }
  });
}