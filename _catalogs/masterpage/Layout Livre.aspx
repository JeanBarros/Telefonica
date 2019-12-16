<%-- SPG:

Este arquivo HTML foi associado a um Layout de Página do SharePoint (arquivo. aspx) que possui o mesmo nome. Embora os arquivos permaneçam associados, você não poderá editar o arquivo. aspx, e quaisquer operações para renomear, mover ou excluir serão retribuídas.

To criar o layout de página diretamente a partir desse arquivo HTML, basta preencher o conteúdo de espaços reservados para conteúdo. Use o Gerador de Trechos em https://telefonicacorp.sharepoint.com/sites/PortalB2CcertOCBNL/_layouts/15/ComponentHome.aspx?Url=https%3A%2F%2Ftelefonicacorp%2Esharepoint%2Ecom%2Fsites%2FPortalB2CcertOCBNL%2F%5Fcatalogs%2Fmasterpage%2FLayout%20Livre%2Easpx para criar e personalizar espaços reservados para conteúdo adicionais e outras entidades úteis do SharePoint e, em seguida, copie-os e cole-los como trechos de HTML no seu código HTML.   Todas as atualizações nesse arquivo dentro de espaços reservados para conteúdo serão automaticamente sincronizadas com o layout de página associado.

 --%>
<%@Page language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage, Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldFieldValue" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="Publishing" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldTextField" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldRichImageField" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldRichHtmlField" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldSummaryLinkFieldControl" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@Register TagPrefix="PageFieldDateTimeField" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageTitle">
            
            
            <PageFieldFieldValue:FieldValue FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
            </PageFieldFieldValue:FieldValue>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderAdditionalPageHead">
            
            
            
            <Publishing:EditModePanel runat="server" id="editmodestyles">
                <SharePoint:CssRegistration name="&lt;% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %&gt;" After="&lt;% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %&gt;" runat="server">
                </SharePoint:CssRegistration>
            </Publishing:EditModePanel>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderMain">
            
            
            <PageFieldFieldValue:FieldValue FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
            </PageFieldFieldValue:FieldValue>
            
        </asp:Content><asp:Content runat="server" ContentPlaceHolderID="PlaceHolderMain">
            <div>
                
                
                
                <Publishing:EditModePanel runat="server" CssClass="edit-mode-panel">
                    <PageFieldTextField:TextField FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
                    </PageFieldTextField:TextField>
                </Publishing:EditModePanel>
                
            </div>
            <div>
                
                
                <PageFieldRichImageField:RichImageField FieldName="3de94b06-4120-41a5-b907-88773e493458" runat="server">
                    
                </PageFieldRichImageField:RichImageField>
                
            </div>
            <div>
                
                
                <PageFieldRichHtmlField:RichHtmlField FieldName="f55c4d88-1f2e-4ad9-aaa8-819af4ee7ee8" runat="server">
                    
                </PageFieldRichHtmlField:RichHtmlField>
                
            </div>
            <div>
                
                
                <PageFieldSummaryLinkFieldControl:SummaryLinkFieldControl FieldName="b3525efe-59b5-4f0f-b1e4-6e26cb6ef6aa" runat="server">
                    
                </PageFieldSummaryLinkFieldControl:SummaryLinkFieldControl>
                
            </div>
            <div>
                
                
                <PageFieldTextField:TextField FieldName="d3429cc9-adc4-439b-84a8-5679070f84cb" runat="server">
                    
                </PageFieldTextField:TextField>
                
            </div>
            <div>
                
                
                <PageFieldDateTimeField:DateTimeField FieldName="71316cea-40a0-49f3-8659-f0cefdbdbd4f" runat="server">
                    
                </PageFieldDateTimeField:DateTimeField>
                
            </div>
            <div>
                
                
                <PageFieldRichHtmlField:RichHtmlField FieldName="66f500e9-7955-49ab-abb1-663621727d10" runat="server">
                    
                </PageFieldRichHtmlField:RichHtmlField>
                
            </div>
        </asp:Content>