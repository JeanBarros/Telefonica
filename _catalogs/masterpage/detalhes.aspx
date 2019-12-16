<%@ Page language="C#"   Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register Tagprefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceholderID="PlaceHolderPageTitle" runat="server">
	<SharePointWebControls:FieldValue id="PageTitle" FieldName="Title" runat="server"/>
</asp:Content>

<asp:Content ContentPlaceholderID="PlaceHolderMain" runat="server">
<script src="/sites/PortalB2CcertOCBNL/SiteAssets/scripts/jquery-3.4.1.js"></script>

<style type="text/css">

.sidebarCollapse-mobile {
    display: none;
}

.leftNav{
	display:none;
}

.centralContent .col-sm{
	padding-left:0;
	padding-right:0;
}

</style>
	
	<div class="areaContent-detalhes">
		<iframe id="reportDetails" src="" frameborder="0"></iframe>
	</div>
	
	<script type="text/javascript">//<![CDATA[
            $(document).ready(function () {
                    
                    var queryString = location.search;
                    var linkReport = queryString.substring(1)

                    $('#reportDetails').attr('src', `${linkReport}`)
                }); 
            
        //]]>
        </script>
	
</asp:Content>
