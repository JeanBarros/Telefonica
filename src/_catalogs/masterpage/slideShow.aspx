<%-- SPG:

Este arquivo HTML foi associado a um Layout de Página do SharePoint (arquivo. aspx) que possui o mesmo nome. Embora os arquivos permaneçam associados, você não poderá editar o arquivo. aspx, e quaisquer operações para renomear, mover ou excluir serão retribuídas.

To criar o layout de página diretamente a partir desse arquivo HTML, basta preencher o conteúdo de espaços reservados para conteúdo. Use o Gerador de Trechos em https://keyruspbi.sharepoint.com/sites/VivoClassic/_layouts/15/ComponentHome.aspx?Url=https%3A%2F%2Fkeyruspbi%2Esharepoint%2Ecom%2Fsites%2FVivoClassic%2F%5Fcatalogs%2Fmasterpage%2FslideShow%2Easpx para criar e personalizar espaços reservados para conteúdo adicionais e outras entidades úteis do SharePoint e, em seguida, copie-os e cole-los como trechos de HTML no seu código HTML.   Todas as atualizações nesse arquivo dentro de espaços reservados para conteúdo serão automaticamente sincronizadas com o layout de página associado.

 --%>
<%@Page language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage, Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="Publishing" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderAdditionalPageHead">
            
            
            
            <Publishing:EditModePanel runat="server" id="editmodestyles">
                <SharePoint:CssRegistration name="&lt;% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %&gt;" After="&lt;% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %&gt;" runat="server">
                </SharePoint:CssRegistration>
            </Publishing:EditModePanel>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderMain">        	
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm">
					<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
					  <ol class="carousel-indicators">
					    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
					    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
					  </ol>  
					  <div class="carousel-inner">
					  </div>  
					  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
					    <span class="sr-only">Previous</span>
					  </a>
					  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					    <span class="carousel-control-next-icon" aria-hidden="true"></span>
					    <span class="sr-only">Next</span>
					  </a>
					</div>
				</div>
			</div>
			<div class="row" style="margin:0; background-color:purple">
				<div class="col-sm">
	            	<div data-name="WebPartZone">
					    
					    
					    <div>
					        <WebPartPages:WebPartZone runat="server" AllowPersonalization="false" ID="x90dade3fc5ad42739159753294a16477" FrameType="TitleBarOnly" Orientation="Vertical">
					            <ZoneTemplate>
					                
					            </ZoneTemplate>
					        </WebPartPages:WebPartZone>
					    </div>
					    
					</div>
	            </div>
				<div class="col-sm">
					<div data-name="WebPartZone">
					    
					    
					    <div>
					        <WebPartPages:WebPartZone runat="server" AllowPersonalization="false" ID="xa7b70a73e2ba40498d2928093379ba56" FrameType="TitleBarOnly" Orientation="Vertical">
					            <ZoneTemplate>
					                
					            </ZoneTemplate>
					        </WebPartPages:WebPartZone>
					    </div>
					    
					</div>
				</div>
				<div class="col-sm">
					<div data-name="WebPartZone">
					    
					    
					    <div>
					        <WebPartPages:WebPartZone runat="server" AllowPersonalization="false" ID="x281014b8b1c846229ab12e93a6b14a5a" FrameType="TitleBarOnly" Orientation="Vertical">
					            <ZoneTemplate>
					                
					            </ZoneTemplate>
					        </WebPartPages:WebPartZone>
					    </div>
					    
					</div>
				</div>
			</div>
			<div class="row" style="margin:0; background-color:orange">
				<div class="col-sm">
					<div data-name="WebPartZone">
				    
				    
				    <div>
				        <WebPartPages:WebPartZone runat="server" AllowPersonalization="false" ID="x9f1059688086426e97a265d42fd6e80b" FrameType="TitleBarOnly" Orientation="Vertical">
				            <ZoneTemplate>
				                
				            </ZoneTemplate>
				        </WebPartPages:WebPartZone>
				    </div>
				    
				</div>
				</div>
			</div>
		</div>
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageDescription">
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderFormDigest">
            <SharePoint:FormDigest runat="server" />
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderBodyAreaClass">
        </asp:Content>