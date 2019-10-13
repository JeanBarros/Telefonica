<%-- SPG:

Este arquivo HTML foi associado a um Layout de Página do SharePoint (arquivo. aspx) que possui o mesmo nome. Embora os arquivos permaneçam associados, você não poderá editar o arquivo. aspx, e quaisquer operações para renomear, mover ou excluir serão retribuídas.

To criar o layout de página diretamente a partir desse arquivo HTML, basta preencher o conteúdo de espaços reservados para conteúdo. Use o Gerador de Trechos em https://keyruspbi.sharepoint.com/sites/VivoClassic/_layouts/15/ComponentHome.aspx?Url=https%3A%2F%2Fkeyruspbi%2Esharepoint%2Ecom%2Fsites%2FVivoClassic%2F%5Fcatalogs%2Fmasterpage%2FDetalhes%2Easpx para criar e personalizar espaços reservados para conteúdo adicionais e outras entidades úteis do SharePoint e, em seguida, copie-os e cole-los como trechos de HTML no seu código HTML.   Todas as atualizações nesse arquivo dentro de espaços reservados para conteúdo serão automaticamente sincronizadas com o layout de página associado.

 --%>
<%@Page language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage, Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldFieldValue" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="Publishing" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageTitle">
            
            
            <PageFieldFieldValue:FieldValue FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
            </PageFieldFieldValue:FieldValue>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderAdditionalPageHead">
            
            
            
            <Publishing:EditModePanel runat="server" id="editmodestyles">
                <SharePoint:CssRegistration name="&lt;% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %&gt;" After="&lt;% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %&gt;" runat="server">
                </SharePoint:CssRegistration>
            </Publishing:EditModePanel>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea">
            <SharePoint:SPTitleBreadcrumb runat="server" RenderCurrentNodeAsLink="true" SiteMapProvider="SPContentMapProvider" CentralAdminSiteMapProvider="SPXmlAdminContentMapProvider" SkipLinkText="">
            
            <PATHSEPARATORTEMPLATE>
            <SharePoint:ClusteredDirectionalSeparatorArrow runat="server" />
            </PATHSEPARATORTEMPLATE>
            </SharePoint:SPTitleBreadcrumb>
            
            
            <PageFieldFieldValue:FieldValue FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
            </PageFieldFieldValue:FieldValue>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderMain">
            <div class="areaContent-detalhes">
				<iframe id="reportDetails" src="" frameborder="0"></iframe>
			</div>
        </asp:Content>