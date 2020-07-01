var resizeWindow, pbiContentImage0, pbiContentImage1, pbiContentImage2, pbiContentImage3,
	pbiContentImage4, pbiContentImage5, pbiContentImage6, pbiContentImage7,
	pbiContentImage8, pbiContentImage9, pbiContentImage10;

// Redefine o tamanho das imagens para modo paisagem ou retrato em mobile	
$(window).on('resize', function(){	
	if($(window).width() <= 768){
	
		$('iframe').contents().find("img").css({'width': '100%'});
		
		clearTimeout(resizeWindow);
		
	    resizeWindow = setTimeout(function(){
	    	
	    		pbiContentImage0 = $('#pbiContent0 iframe').contents().find("img").height();
				$('#pbiContent0').attr('style', 'height:' + pbiContentImage0 + 'px !important');
				
				pbiContentImage1 = $('#pbiContent1 iframe').contents().find("img").height();
				$('#pbiContent1').attr('style', 'height:' + pbiContentImage1 + 'px !important');
				
				pbiContentImage2 = $('#pbiContent2 iframe').contents().find("img").height();
				$('#pbiContent2').attr('style', 'height:' + pbiContentImage2 + 'px !important');
				
				pbiContentImage3 = $('#pbiContent3 iframe').contents().find("img").height();
				$('#pbiContent3').attr('style', 'height:' + pbiContentImage3 + 'px !important');
				
				pbiContentImage4 = $('#pbiContent4 iframe').contents().find("img").height();
				$('#pbiContent4').attr('style', 'height:' + pbiContentImage4 + 'px !important');
				
				pbiContentImage5 = $('#pbiContent5 iframe').contents().find("img").height();
				$('#pbiContent5').attr('style', 'height:' + pbiContentImage5 + 'px !important');
	
				pbiContentImage6 = $('#pbiContent6 iframe').contents().find("img").height();
				$('#pbiContent6').attr('style', 'height:' + pbiContentImage6 + 'px !important');
				
				pbiContentImage7 = $('#pbiContent7 iframe').contents().find("img").height();
				$('#pbiContent7').attr('style', 'height:' + pbiContentImage7 + 'px !important');
				
				pbiContentImage8 = $('#pbiContent8 iframe').contents().find("img").height();
				$('#pbiContent8').attr('style', 'height:' + pbiContentImage8 + 'px !important');
				
				pbiContentImage9 = $('#pbiContent9 iframe').contents().find("img").height();
				$('#pbiContent9').attr('style', 'height:' + pbiContentImage9 + 'px !important');
				
				pbiContentImage10 = $('#pbiContent10 iframe').contents().find("img").height();
				$('#pbiContent10').attr('style', 'height:' + pbiContentImage10 + 'px !important');

			
	    },500);
    }
    else
    	$('iframe').contents().find("img").css({'width': 'auto'});
});
