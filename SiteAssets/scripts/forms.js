document.write('<script src="/sites/PortalB2CcertOCBNL/SiteAssets/scripts/jquery-3.4.1.js"><\/script>')

setTimeout(function(){ 
	$( document ).ready(function() {
	    // SharePoint elements 
  		$("#suiteBarTop, .ms-cui-topBar2, [id='Ribbon.ListForm.Edit.Clipboard'], [id='Ribbon.ListForm.Edit.Commit.Cancel-Large']," +
  		"[id='ctl00_ctl33_g_db964cb1_3fb9_484c_bb56_28f81fc53927_ctl00_toolBarTbl_RightRptControls_ctl01_ctl00_diidIOGoBack']," +
  		"[id='Ribbon.ListForm.Edit.SpellCheck'], #sideNavBox").hide()
  		
  		$(".ms-core-tableNoSpace").css({"box-shadow":"3px 6px 5px #888888", "background-color": "#f9f9f9", "padding":"5px"})
	}); 
}, 2000);

loadForm()

function loadForm() {
  // Aguarda o carregamento do JQuery
  setTimeout(function(){ 
  	$( document ).ready(function() {  
  	
  		// Elementos a serem ocultados de acorco com cada "Tipo de Ocorrência" selecionada
		var ocorrenciaBase = [
			$("[id='DataHomologacao_77b7e553-c6cf-4235-bf27-c7490be08f37_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Desenvolvedor_8be7f856-adb9-4e5d-aefc-b896030057a8_$ClientPeoplePicker']").closest('tr'),
			$("[id='nomeDashboard_172f7c78-705f-4568-bc75-d67f9396e363_$TextField']").closest('tr'),
			$("[id='PontosFocais_bb161828-8e68-46f7-a35a-dea4187c28a1_$ClientPeoplePicker']").closest('tr'),
			$("[id='TipoAcesso_ca9d5d82-ea35-49e8-908a-b04da3b2ba5b_ChoiceRadioTable']").closest('tr'),
			$("[id='TipoSolicitacao_a409bbd6-4f4e-42a4-ac89-b6ea808e7440_$DropDownChoice']").closest('tr'),
			$("[id='workspace_ddac690c-7570-4f60-8271-86ca0a3e896f_MultiChoiceTable']").closest('tr'),
			$("[id='DataSolicitacao_5589bf53-4042-420e-a8c4-656066fd8363_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='DataConclusao_de6db42d-0ad1-41ae-8e83-c87e0bd90374_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Natureza_ea17db17-fb02-47a2-acc1-945b6c1ba293_$TextField_inplacerte']").closest('tr'),
			$("[id='Metrica_5156134c-6286-444f-99e2-070185d75ec9_$TextField_inplacerte']").closest('tr'),
			$("[id='LinkCapaDesktop_4ce985f2-3b00-4893-b219-65478b7e487e_$TextField']").closest('tr'),
			$("[id='LinkRelatorioMobile_1c320ee8-6ec1-4a4d-b4a7-2058e7d63ee1_$TextField']").closest('tr'),
			$("[id='LinkCapaMobile_82034220-c0d5-45c6-a953-fc45a0f0b80f_$TextField']").closest('tr'),
			$("[id='LinkRelatorioDesktop_f2ec06c0-1961-4a29-8232-ed514dc1bc1a_$TextField']").closest('tr'),
			$("[id='grupoSustentacaoPortal_dd74465a-f30b-49ad-aa46-7f73e2cfd681_$TextField']").closest('tr')];
				
		// Elementos a serem ocultados de acorco com cada "Tipo de Ocorrência" selecionada
		var ocorrenciaRelatorio = [
			$("[id='DataHomologacao_77b7e553-c6cf-4235-bf27-c7490be08f37_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Desenvolvedor_8be7f856-adb9-4e5d-aefc-b896030057a8_$ClientPeoplePicker']").closest('tr'),
			$("[id='InicioDaOcorrencia_302c5597-10f0-439c-8db7-1cf72c4077b9_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='FimDaOcorrencia_e3bc4432-3d90-4fc1-bd79-c57513b63ba2_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='PontosFocais_bb161828-8e68-46f7-a35a-dea4187c28a1_$ClientPeoplePicker']").closest('tr'),
			$("[id='Produto_6c4057ab-93a6-46dc-8186-00050a4b00ad_ChoiceRadioTable']").closest('tr'),
			$("[id='QueryDaOcorrencia_40e27f36-4af9-426f-bd5b-c5fa45054088_$TextField_topDiv']").closest('tr'),
			$("[id='Regional_94ec581e-aafc-4331-ae4a-372a85aefa28_$DropDownChoice']").closest('tr'),
			$("[id='Status_9ea74f5d-dd89-4bec-ba96-f702461d47af_$DropDownChoice']").closest('tr'),				
			$("[id='TipoAcesso_ca9d5d82-ea35-49e8-908a-b04da3b2ba5b_ChoiceRadioTable']").closest('tr'),
			$("[id='TipoMovimento_2814230d-ef57-46e0-aa71-e68d92c71eff_ChoiceRadioTable']").closest('tr'),
			$("[id='TipoSolicitacao_a409bbd6-4f4e-42a4-ac89-b6ea808e7440_$DropDownChoice']").closest('tr'),
			$("[id='workspace_ddac690c-7570-4f60-8271-86ca0a3e896f_MultiChoiceTable']").closest('tr'),				
			$("[id='DataSolicitacao_5589bf53-4042-420e-a8c4-656066fd8363_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='DataConclusao_de6db42d-0ad1-41ae-8e83-c87e0bd90374_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Natureza_ea17db17-fb02-47a2-acc1-945b6c1ba293_$TextField_inplacerte']").closest('tr'),				
			$("[id='Metrica_5156134c-6286-444f-99e2-070185d75ec9_$TextField_inplacerte']").closest('tr'),
			$("[id='LinkCapaDesktop_4ce985f2-3b00-4893-b219-65478b7e487e_$TextField']").closest('tr'),
			$("[id='LinkRelatorioMobile_1c320ee8-6ec1-4a4d-b4a7-2058e7d63ee1_$TextField']").closest('tr'),				
			$("[id='LinkCapaMobile_82034220-c0d5-45c6-a953-fc45a0f0b80f_$TextField']").closest('tr'),
			$("[id='grupoSustentacaoBase_b10279f8-9d9f-4a05-ab65-9eb0dec2d3b2_$TextField']").closest('tr')];
				
		// Elementos a serem ocultados de acorco com cada "Tipo de Ocorrência" selecionada
		var solicNovoRelatorio = [
			$("[id='Canal_bcf546d3-127a-442f-9f32-77edbb79702f_$DropDownChoice']").closest('tr'),
			$("[id='DataHomologacao_77b7e553-c6cf-4235-bf27-c7490be08f37_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Desenvolvedor_8be7f856-adb9-4e5d-aefc-b896030057a8_$ClientPeoplePicker']").closest('tr'),
			$("[id='InicioDaOcorrencia_302c5597-10f0-439c-8db7-1cf72c4077b9_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='FimDaOcorrencia_e3bc4432-3d90-4fc1-bd79-c57513b63ba2_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='nomeDashboard_172f7c78-705f-4568-bc75-d67f9396e363_$TextField']").closest('tr'),
			$("[id='Produto_6c4057ab-93a6-46dc-8186-00050a4b00ad_ChoiceRadioTable']").closest('tr'),
			$("[id='QueryDaOcorrencia_40e27f36-4af9-426f-bd5b-c5fa45054088_$TextField_topDiv']").closest('tr'),
			$("[id='Regional_94ec581e-aafc-4331-ae4a-372a85aefa28_$DropDownChoice']").closest('tr'),
			$("[id='Status_9ea74f5d-dd89-4bec-ba96-f702461d47af_$DropDownChoice']").closest('tr'),	
			$("[id='TipoAcesso_ca9d5d82-ea35-49e8-908a-b04da3b2ba5b_ChoiceRadioTable']").closest('tr'),	
			$("[id='TipoMovimento_2814230d-ef57-46e0-aa71-e68d92c71eff_ChoiceRadioTable']").closest('tr'),
			$("[id='TipoSolicitacao_a409bbd6-4f4e-42a4-ac89-b6ea808e7440_$DropDownChoice']").closest('tr'),	
			$("[id='workspace_ddac690c-7570-4f60-8271-86ca0a3e896f_MultiChoiceTable']").closest('tr'),				
			$("[id='DataSolicitacao_5589bf53-4042-420e-a8c4-656066fd8363_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='DataConclusao_de6db42d-0ad1-41ae-8e83-c87e0bd90374_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Natureza_ea17db17-fb02-47a2-acc1-945b6c1ba293_$TextField_inplacerte']").closest('tr'),				
			$("[id='Metrica_5156134c-6286-444f-99e2-070185d75ec9_$TextField_inplacerte']").closest('tr'),
			$("[id='LinkRelatorioDesktop_f2ec06c0-1961-4a29-8232-ed514dc1bc1a_$TextField']").closest('tr'),
			$("[id='LinkCapaDesktop_4ce985f2-3b00-4893-b219-65478b7e487e_$TextField']").closest('tr'),
			$("[id='LinkRelatorioMobile_1c320ee8-6ec1-4a4d-b4a7-2058e7d63ee1_$TextField']").closest('tr'),				
			$("[id='LinkCapaMobile_82034220-c0d5-45c6-a953-fc45a0f0b80f_$TextField']").closest('tr'),
			$("[id='grupoSustentacaoBase_b10279f8-9d9f-4a05-ab65-9eb0dec2d3b2_$TextField']").closest('tr')];
			
		// Elementos a serem ocultados de acorco com cada "Tipo de Ocorrência" selecionada
		var duvidasAjuda = [
			$("[id='Canal_bcf546d3-127a-442f-9f32-77edbb79702f_$DropDownChoice']").closest('tr'),
			$("[id='DataHomologacao_77b7e553-c6cf-4235-bf27-c7490be08f37_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Desenvolvedor_8be7f856-adb9-4e5d-aefc-b896030057a8_$ClientPeoplePicker']").closest('tr'),
			$("[id='InicioDaOcorrencia_302c5597-10f0-439c-8db7-1cf72c4077b9_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='FimDaOcorrencia_e3bc4432-3d90-4fc1-bd79-c57513b63ba2_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='nomeDashboard_172f7c78-705f-4568-bc75-d67f9396e363_$TextField']").closest('tr'),
			$("[id='PontosFocais_bb161828-8e68-46f7-a35a-dea4187c28a1_$ClientPeoplePicker']").closest('tr'),
			$("[id='Produto_6c4057ab-93a6-46dc-8186-00050a4b00ad_ChoiceRadioTable']").closest('tr'),
			$("[id='QueryDaOcorrencia_40e27f36-4af9-426f-bd5b-c5fa45054088_$TextField_topDiv']").closest('tr'),
			$("[id='Regional_94ec581e-aafc-4331-ae4a-372a85aefa28_$DropDownChoice']").closest('tr'),
			$("[id='Status_9ea74f5d-dd89-4bec-ba96-f702461d47af_$DropDownChoice']").closest('tr'),	
			$("[id='TipoMovimento_2814230d-ef57-46e0-aa71-e68d92c71eff_ChoiceRadioTable']").closest('tr'),
			$("[id='workspace_ddac690c-7570-4f60-8271-86ca0a3e896f_MultiChoiceTable']").closest('tr'),				
			$("[id='DataSolicitacao_5589bf53-4042-420e-a8c4-656066fd8363_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='DataConclusao_de6db42d-0ad1-41ae-8e83-c87e0bd90374_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Natureza_ea17db17-fb02-47a2-acc1-945b6c1ba293_$TextField_inplacerte']").closest('tr'),				
			$("[id='Metrica_5156134c-6286-444f-99e2-070185d75ec9_$TextField_inplacerte']").closest('tr'),
			$("[id='LinkRelatorioDesktop_f2ec06c0-1961-4a29-8232-ed514dc1bc1a_$TextField']").closest('tr'),
			$("[id='LinkCapaDesktop_4ce985f2-3b00-4893-b219-65478b7e487e_$TextField']").closest('tr'),
			$("[id='LinkRelatorioMobile_1c320ee8-6ec1-4a4d-b4a7-2058e7d63ee1_$TextField']").closest('tr'),				
			$("[id='LinkCapaMobile_82034220-c0d5-45c6-a953-fc45a0f0b80f_$TextField']").closest('tr'),
			$("[id='grupoSustentacaoBase_b10279f8-9d9f-4a05-ab65-9eb0dec2d3b2_$TextField']").closest('tr')];
			
		// Elementos a serem ocultados de acorco com cada "Tipo de Ocorrência" selecionada
		var inventarioPortal = [
			$("[id='Canal_bcf546d3-127a-442f-9f32-77edbb79702f_$DropDownChoice']").closest('tr'),
			$("[id='InicioDaOcorrencia_302c5597-10f0-439c-8db7-1cf72c4077b9_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='FimDaOcorrencia_e3bc4432-3d90-4fc1-bd79-c57513b63ba2_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Produto_6c4057ab-93a6-46dc-8186-00050a4b00ad_ChoiceRadioTable']").closest('tr'),
			$("[id='QueryDaOcorrencia_40e27f36-4af9-426f-bd5b-c5fa45054088_$TextField_topDiv']").closest('tr'),
			$("[id='Regional_94ec581e-aafc-4331-ae4a-372a85aefa28_$DropDownChoice']").closest('tr'),
			$("[id='TipoAcesso_ca9d5d82-ea35-49e8-908a-b04da3b2ba5b_ChoiceRadioTable']").closest('tr'),	
			$("[id='TipoMovimento_2814230d-ef57-46e0-aa71-e68d92c71eff_ChoiceRadioTable']").closest('tr'),
			$("[id='TipoSolicitacao_a409bbd6-4f4e-42a4-ac89-b6ea808e7440_$DropDownChoice']").closest('tr'),	
			$("[id='Natureza_ea17db17-fb02-47a2-acc1-945b6c1ba293_$TextField_inplacerte']").closest('tr'),				
			$("[id='Metrica_5156134c-6286-444f-99e2-070185d75ec9_$TextField_inplacerte']").closest('tr'),
			$("[id='grupoSustentacaoPortal_dd74465a-f30b-49ad-aa46-7f73e2cfd681_$TextField']").closest('tr'),
			$("[id='grupoSustentacaoBase_b10279f8-9d9f-4a05-ab65-9eb0dec2d3b2_$TextField']").closest('tr')];
		
		// Elementos a serem ocultados de acorco com cada "Tipo de Ocorrência" selecionada
		var acessoPowerBi = [
			$("[id='Canal_bcf546d3-127a-442f-9f32-77edbb79702f_$DropDownChoice']").closest('tr'),
			$("[id='DataHomologacao_77b7e553-c6cf-4235-bf27-c7490be08f37_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Desenvolvedor_8be7f856-adb9-4e5d-aefc-b896030057a8_$ClientPeoplePicker']").closest('tr'),
			$("[id='InicioDaOcorrencia_302c5597-10f0-439c-8db7-1cf72c4077b9_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='FimDaOcorrencia_e3bc4432-3d90-4fc1-bd79-c57513b63ba2_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='nomeDashboard_172f7c78-705f-4568-bc75-d67f9396e363_$TextField']").closest('tr'),
			$("[id='PontosFocais_bb161828-8e68-46f7-a35a-dea4187c28a1_$ClientPeoplePicker']").closest('tr'),
			$("[id='Produto_6c4057ab-93a6-46dc-8186-00050a4b00ad_ChoiceRadioTable']").closest('tr'),
			$("[id='QueryDaOcorrencia_40e27f36-4af9-426f-bd5b-c5fa45054088_$TextField_topDiv']").closest('tr'),	
			$("[id='Regional_94ec581e-aafc-4331-ae4a-372a85aefa28_$DropDownChoice']").closest('tr'),
			$("[id='Status_9ea74f5d-dd89-4bec-ba96-f702461d47af_$DropDownChoice']").closest('tr'),	
			$("[id='TipoMovimento_2814230d-ef57-46e0-aa71-e68d92c71eff_ChoiceRadioTable']").closest('tr'),
			$("[id='TipoSolicitacao_a409bbd6-4f4e-42a4-ac89-b6ea808e7440_$DropDownChoice']").closest('tr'),	
			$("[id='DataSolicitacao_5589bf53-4042-420e-a8c4-656066fd8363_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='DataConclusao_de6db42d-0ad1-41ae-8e83-c87e0bd90374_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Natureza_ea17db17-fb02-47a2-acc1-945b6c1ba293_$TextField_inplacerte']").closest('tr'),				
			$("[id='Metrica_5156134c-6286-444f-99e2-070185d75ec9_$TextField_inplacerte']").closest('tr'),
			$("[id='LinkRelatorioDesktop_f2ec06c0-1961-4a29-8232-ed514dc1bc1a_$TextField']").closest('tr'),
			$("[id='LinkCapaDesktop_4ce985f2-3b00-4893-b219-65478b7e487e_$TextField']").closest('tr'),
			$("[id='LinkRelatorioMobile_1c320ee8-6ec1-4a4d-b4a7-2058e7d63ee1_$TextField']").closest('tr'),				
			$("[id='LinkCapaMobile_82034220-c0d5-45c6-a953-fc45a0f0b80f_$TextField']").closest('tr'),
			$("[id='grupoSustentacaoBase_b10279f8-9d9f-4a05-ab65-9eb0dec2d3b2_$TextField']").closest('tr')];
			
		// Elementos a serem ocultados de acorco com cada "Tipo de Ocorrência" selecionada
		var glossario = [
			$("[id='Canal_bcf546d3-127a-442f-9f32-77edbb79702f_$DropDownChoice']").closest('tr'),
			$("[id='DataHomologacao_77b7e553-c6cf-4235-bf27-c7490be08f37_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='Desenvolvedor_8be7f856-adb9-4e5d-aefc-b896030057a8_$ClientPeoplePicker']").closest('tr'),
			$("[id='InicioDaOcorrencia_302c5597-10f0-439c-8db7-1cf72c4077b9_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='FimDaOcorrencia_e3bc4432-3d90-4fc1-bd79-c57513b63ba2_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='nomeDashboard_172f7c78-705f-4568-bc75-d67f9396e363_$TextField']").closest('tr'),
			$("[id='PontosFocais_bb161828-8e68-46f7-a35a-dea4187c28a1_$ClientPeoplePicker']").closest('tr'),
			$("[id='Produto_6c4057ab-93a6-46dc-8186-00050a4b00ad_ChoiceRadioTable']").closest('tr'),
			$("[id='QueryDaOcorrencia_40e27f36-4af9-426f-bd5b-c5fa45054088_$TextField_topDiv']").closest('tr'),	
			$("[id='Regional_94ec581e-aafc-4331-ae4a-372a85aefa28_$DropDownChoice']").closest('tr'),
			$("[id='Status_9ea74f5d-dd89-4bec-ba96-f702461d47af_$DropDownChoice']").closest('tr'),	
			$("[id='telefone_f9d2ce6e-32b0-458e-a587-0434a6fb8fe4_$TextField']").closest('tr'),	
			$("[id='TipoAcesso_ca9d5d82-ea35-49e8-908a-b04da3b2ba5b_ChoiceRadioTable']").closest('tr'),	
			$("[id='TipoMovimento_2814230d-ef57-46e0-aa71-e68d92c71eff_ChoiceRadioTable']").closest('tr'),
			$("[id='TipoSolicitacao_a409bbd6-4f4e-42a4-ac89-b6ea808e7440_$DropDownChoice']").closest('tr'),
			$("[id='workspace_ddac690c-7570-4f60-8271-86ca0a3e896f_MultiChoiceTable']").closest('tr'),				
			$("[id='DataSolicitacao_5589bf53-4042-420e-a8c4-656066fd8363_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='DataConclusao_de6db42d-0ad1-41ae-8e83-c87e0bd90374_$DateTimeFieldTopTable']").closest('tr'),
			$("[id='LinkRelatorioDesktop_f2ec06c0-1961-4a29-8232-ed514dc1bc1a_$TextField']").closest('tr'),
			$("[id='LinkCapaDesktop_4ce985f2-3b00-4893-b219-65478b7e487e_$TextField']").closest('tr'),
			$("[id='LinkRelatorioMobile_1c320ee8-6ec1-4a4d-b4a7-2058e7d63ee1_$TextField']").closest('tr'),				
			$("[id='LinkCapaMobile_82034220-c0d5-45c6-a953-fc45a0f0b80f_$TextField']").closest('tr'),
			$("[id='grupoSustentacaoPortal_dd74465a-f30b-49ad-aa46-7f73e2cfd681_$TextField']").closest('tr'),
			$("[id='grupoSustentacaoBase_b10279f8-9d9f-4a05-ab65-9eb0dec2d3b2_$TextField']").closest('tr')];				
		
	    $("[id='TipoDeOcorrencia_f55beaaf-40d6-48a1-9c89-9592e5ccee1d_$DropDownChoice']").change(function(){
			if(this.value == "Alerta de Ocorrência na Base"){				
				showElements(ocorrenciaRelatorio)
				showElements(solicNovoRelatorio)
				showElements(duvidasAjuda)
				showElements(inventarioPortal)
				showElements(acessoPowerBi)
				showElements(glossario)				
				
				hideElements(ocorrenciaBase)		
			}
			else if(this.value == "Alerta de Ocorrência em Relatório"){
				showElements(ocorrenciaBase)
				showElements(solicNovoRelatorio)
				showElements(duvidasAjuda)
				showElements(inventarioPortal)
				showElements(acessoPowerBi)	
				showElements(glossario)			
				
				hideElements(ocorrenciaRelatorio)
			}
			else if(this.value == "Solicitação de Novo Relatório"){
				showElements(ocorrenciaBase)
				showElements(ocorrenciaRelatorio)
				showElements(duvidasAjuda)
				showElements(inventarioPortal)
				showElements(acessoPowerBi)
				showElements(glossario)
			
				hideElements(solicNovoRelatorio)
			}
			else if(this.value == "Dúvida / Ajuda"){
				showElements(ocorrenciaBase)
				showElements(ocorrenciaRelatorio)
				showElements(solicNovoRelatorio)
				showElements(inventarioPortal)
				showElements(acessoPowerBi)
				showElements(glossario)
			
				hideElements(duvidasAjuda)
			}
			else if(this.value == "Inventário do Portal"){
				showElements(ocorrenciaBase)
				showElements(ocorrenciaRelatorio)
				showElements(solicNovoRelatorio)
				showElements(duvidasAjuda)
				showElements(acessoPowerBi)
				showElements(glossario)
			
				hideElements(inventarioPortal)
			}
			else if(this.value == "Acesso Power BI"){
				showElements(ocorrenciaBase)
				showElements(ocorrenciaRelatorio)
				showElements(solicNovoRelatorio)
				showElements(duvidasAjuda)
				showElements(inventarioPortal)
				showElements(glossario)
			
				hideElements(acessoPowerBi)
			}
			else if(this.value == "Glossário"){
				showElements(ocorrenciaBase)
				showElements(ocorrenciaRelatorio)
				showElements(solicNovoRelatorio)
				showElements(duvidasAjuda)
				showElements(inventarioPortal)
				showElements(acessoPowerBi)
			
				hideElements(glossario)
			}			    	
		});
	}); 
  }, 3000);
}

function hideElements(elementSet){
	$.each(elementSet, function (index, value) {
		value.hide()					
	});
}

function showElements(elementSet){
	$.each(elementSet, function (index, value) {
		value.show()					
	});
}