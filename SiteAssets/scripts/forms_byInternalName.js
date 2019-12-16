document.write('<script src="https://code.jquery.com/jquery-3.4.1.js"><\/script>')
ExecuteOrDelayUntilScriptLoaded(function () { GetFieldList() }, "SP.js");

function GetFieldList(){
	var ctx = SP.ClientContext.get_current();
	this.web = ctx.get_web();
	ctx.load(this.web);
	this.list = web.get_lists().getByTitle("Requests");
	ctx.load(this.list);
	this.fields = this.list.get_fields();
	ctx.load(this.fields);
	ctx.executeQueryAsync(Function.createDelegate(this, this.getListInfoSuccess), Function.createDelegate(this, this.getListInfoFail));
}

function getListInfoSuccess(sender, args){
	var fieldEnumerator = this.fields.getEnumerator();
	while (fieldEnumerator.moveNext()) {
		var oField = fieldEnumerator.get_current();
		if (!oField.get_hidden())
			oField.get_title()
		oField.get_internalName()
		oField.get_hidden()
		
		if(oField.get_internalName() == "TipoDeOcorrencia"){
			$(`select[title= '${oField.get_title()}' ]`).css("background-color", "yellow").change(function(){
				if(this.value == "Alerta de Ocorrência na Base"){
					$("[id='DataHomologacao_77b7e553-c6cf-4235-bf27-c7490be08f37_$DateTimeFieldDate']").closest('table').closest('tr').hide()
					$("[id='Desenvolvedor_8be7f856-adb9-4e5d-aefc-b896030057a8_$ClientPeoplePicker']").closest('tr').hide()
				}			    	
			});
		}			
	}
}
function getListInfoFail(sender, args)
{
	alert('Something failed. Error:'+args.get_message());
}