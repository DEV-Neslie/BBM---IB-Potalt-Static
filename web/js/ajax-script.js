$(function () {
    loadMore();
});

function loadMore() {
    $('#loadmore').click(function(e) {

        e.preventDefault();

        if(ajaxScript.max_page > 1) {

            // Start to page 2
            if(ajaxScript.current_page == '1') {
                ajaxScript.current_page++;
            }

            const obj = JSON.parse(ajaxScript.posts);
            var currentCat = obj.category_name;
            
            $.ajax({
            	url : ajaxScript.url, // AJAX handler
                data: "action=loadmore_post&page="+ajaxScript.current_page+"&category="+currentCat+"&post_per_page="+ajaxScript.post_per_page,
            	type : 'POST',
                beforeSend : function ( xhr ) {
            		$('#loadmore').text('Loading...');
            	},
                success: function(result) {
                    $('.js-content').find('.post-list__item:last-of-type').after(result);
                    
                    // Animation for added items
                    setTimeout(function() {
                        // Show added items
                        $('.js-content .post-list__item').removeClass('hidden');

                        // Scroll to added items
                        if($('.indicator').length) {
                            var position =  $('.indicator').offset().top - 20;
                            $([document.documentElement, document.body]).stop().animate({
                                scrollTop: position
                            }, 800);
                            $('.js-content .post-list__item').removeClass('indicator');
                        }

                    }, 100);
                    
                    $('#loadmore').text('Load More');

                    // remove load more button
                    if(ajaxScript.current_page >= ajaxScript.max_page) {
                        $('#loadmore').remove();
                    }
                    
                    ajaxScript.current_page++;
                }

            });
        }
	});
}
