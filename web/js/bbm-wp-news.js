// INIT
$(function() {
    getNews(1, 1, 12, 2);
    getNewsCat();
    newsContentBack();
});


function getNews(cat_id, page_num, per_page, query_url) {
    if(query_url == 1) {
        urlParams = `page=${page_num}&per_page=${per_page}&categories=${cat_id}`;
    } else {
        urlParams = `page=${page_num}&per_page=${per_page}&categories_exclude=${cat_id}`;
    }
    $.ajax({
        url     : 'https://blueberrymarkets.com/market-analysis/news/wp-json/wp/v2/posts',
        type    : 'GET',
        data    : urlParams,
        success : function(response, textStatus, request) {
            if(response.length > 0) {
                //console.log(request.getResponseHeader('X-WP-Total'));
                //console.log(request.getResponseHeader('X-WP-TotalPages'));
                let counter = 0;
                let wpTotalPosts = request.getResponseHeader('X-WP-Total');
                let wpTotalPages = request.getResponseHeader('X-WP-TotalPages');
                let currentPage = page_num;
                $('.market-news__nav-content').empty();
                response.forEach(function(post) {
                    let newsId      = post.id;
                    let newsDate    = formatNewsDate(post.date,1);
                    let newsDate2    = formatNewsDate(post.date,2);
                    let newsTitle   = post.title.rendered;
                    let newsThumb   = post.featured_image_src;
                    let newsAuthor  = post.author_info.display_name;
                    $('.market-news__nav-content').append(`
                        <a href="#" data-id="${newsId}" class="market-news__nav-item${(counter < 1) ? ' is-active' : ''}">
                            <div class="market-news__nav-item__thumb">
                                <img src="${newsThumb}" alt="news image">
                            </div>
                            <div class="market-news__nav-item__info">
                                <h6 class="market-news__nav-item__title">${newsTitle}</h6>
                                <span class="market-news__nav-item__date">${newsDate}</span>
                            </div>
                        </a>
                    `); 
                    ((counter < 1) ? getNewsContent(newsId) : '');
                    counter++;
                })
                newsPagination(wpTotalPosts, wpTotalPages, currentPage)
                initNewsItem();
                $('.market-news__wrapper .loader__wrapper').removeClass('is-active');
            }
        },
        error: function (request, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}

function getNewsContent(postId) {
    if (postId) {
        $('.market-news__content-header, .market-news__content-body').empty();
        fetch(`https://blueberrymarkets.com/market-analysis/news/wp-json/wp/v2/posts?include=${postId}`)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then(function(posts) {
            if (posts) {
                posts.forEach(function(post) {
                    let newsDate    = formatNewsDate(post.date,2);
                    let newsTitle   = post.title.rendered;
                    let newsAuthor  = post.author_info.display_name;

                    $('.market-news__content-header').append(`
                        <span class="market-news__content-date">${newsDate}</span>
                        <h3 class="market-news__content-title">${newsTitle}</h3>
                        <span class="market-news__content-author">by <span class="text-primary">${newsAuthor}</span></span>
                    `);

                    $('.market-news__content-body').append(`
                        ${post.content.rendered}
                    `);
                });
                $('.market-news__wrapper .loader__wrapper').removeClass('is-active');
            }
        }).catch((error) => {
            console.log(error)
        });
    }
}

function getNewsCat() {
    fetch(`https://blueberrymarkets.com/market-analysis/news/wp-json/wp/v2/categories?exclude=1&orderby=id`)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then(function(posts) {
        if (posts) {
            $('.market-news__content-header, .market-news__content-body').empty();
            posts.forEach(function(post) {
                $('.market-news__filters-cat__dropdown-list').append(`
                    <li data-id="${post.id}">${post.name}</li>
                `);
            });
            newsCatFilter();
        }
    }).catch((error) => {
        console.log(error)
    });
}

function newsCatFilter() {
    if($('.market-news__filters-cat').length) {
        $('.market-news__filters-cat').click(function(e) {
            $(this).toggleClass('is-active');
            $(this).find('.market-news__filters-cat__dropdown').toggleClass('is-active');
        });

        $('.market-news__filters-cat__dropdown-list li').click(function(e) {
            $('.market-news__wrapper .loader__wrapper').addClass('is-active');
            var selectedCat = $(this).attr('data-id');
            getNews(selectedCat, 1, 12, 1);
            $('.market-news__filters-cat__dropdown-list li').removeClass('is-active');
            $(this).addClass('is-active');
        });
    }
}

function newsContentBack() {
    if($('.market-news__back').length) {
        $('.market-news__back').click(function(e){
            e.preventDefault();
            $('.market-news__content').removeClass('mobile-is-active');
            $('.market-news__nav, .market-news__filters').removeClass('mobile-hide');
        });
    }
}

function newsPagination(totalPosts, totalPages, currentPage) {
    $('.market-news__pagination').empty();
    var output = '';
    var links = [];
    var paged = parseInt(currentPage);
    var max = parseInt(totalPages);
    var prevPage = paged - 1;
    var nextPage = paged + 1;
    var startInterval = 4;
    var endInterval = max - 2;

    if(max > 1) {

        // First
        if(paged <= startInterval) {
            if(paged == 1) {
                links.push(2);
                links.push(3);
            } else if(paged == 2) {
                links.push(paged);
                links.push(paged + 1);
            } else {
                links.push(paged - 1);
                links.push(paged);
                links.push(paged + 1);
            } 
        } 

        // End
        else if (paged >= endInterval && paged <= max) {
            if(paged == max) {
                links.push(paged - 1);
                links.push(paged - 2);
            } else if(paged == (max - 1)) {
                links.push(paged - 1);
                links.push(paged);
            } else {
                links.push(paged - 1);
                links.push(paged);
                links.push(paged + 1);
            }
        }

        // Middle
        else {
            links.push(paged);
            links.push((paged - 1));
            links.push((paged + 1));
        }

        // Sort Array
        links.sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });

        // Pagination Body
        output += `<ul class="pagination__list">`;
        if(paged > 1) {
            output += `
            <li class="pagination__list__item arrow-prev">
                <a href="#" data-num="${prevPage}" class="pagination__list__item-link"></a>
            </li>`;
        }
        if(paged >= 1) {
            output += `
            <li class="pagination__list__item${((paged == 1) ? ' active' : '')}">
                <a href="#" data-num="1" class="pagination__list__item-link">1</a>
            </li>`;
        }
        if(paged >= startInterval && paged <= max) {
            output += `<li class="pagination__list__item ellipses"><span>...</span></li>`;
        }
        links.forEach(function(link) {
            output += `
            <li class="pagination__list__item${((link == paged) ? ' active' : '')}">
                <a href="#" data-num="${link}" class="pagination__list__item-link">${link}</a>
            </li>`;
        });
        if(paged < endInterval) {
            output += `<li class="pagination__list__item ellipses"><span>...</span></li>`;
        }
        if(paged <= max) {
            output += `
            <li class="pagination__list__item${((paged == max) ? ' active' : '')}">
                <a href="#" data-num="${max}" class="pagination__list__item-link">${max}</a>
            </li>`;
        }
        if(paged <  max) {
            output += `
            <li class="pagination__list__item arrow-next">
                <a href="#" data-num="${nextPage}" class="pagination__list__item-link"></a>
            </li>`;
        }
        output += `</ul>`;
        $('.market-news__pagination').append(output);
        newsPaginationAction();
    }
}

function newsPaginationAction() {
    if($('.pagination__list__item-link').length) {
        var pagiItems = $('.pagination__list__item-link');
        var catId = 1;
        var queryUrl = 2;
        if($('.market-news__filters-cat__dropdown-list li.is-active').length) {
            catId = $('.market-news__filters-cat__dropdown-list li.is-active').attr('data-id');
            queryUrl = 1;
        }
        pagiItems.click(function(e){
            e.preventDefault();
            if(!$(this).parents('.pagination__list__item').hasClass('active')) {
                $('.market-news__wrapper .loader__wrapper').addClass('is-active');
                var selectedPage = parseInt($(this).attr('data-num'));
                getNews(catId, selectedPage, 12, queryUrl);
            }
        });
    }
}

function initNewsItem() {
    var newsItem = $('.market-news__nav-item');
    $('.market-news__nav-item').click(function (e) {
        if(!$(this).hasClass('is-active')) {
            $('.market-news__wrapper .loader__wrapper').addClass('is-active');
            var currNewsId = $(this).attr('data-id');
            newsItem.removeClass('is-active');
            //$('.market-news__content').removeClass('mobile-is-active');
            $(this).addClass('is-active');
            getNewsContent(currNewsId);
        }
        $('.market-news__content').addClass('mobile-is-active');
        $('.market-news__nav, .market-news__filters').addClass('mobile-hide');
    });
}

function formatNewsDate(dateString, type) {
    let date_obj    = new Date(dateString);
    let month_arr   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month       = month_arr[date_obj.getMonth()];
    let date_num    = date_obj.getDate();
        date_num    = date_num.length == 1 ? `0${date_num}` : date_num;
    let year        = date_obj.getFullYear();
    let hours = date_obj.getHours();
    let minutes = date_obj.getMinutes();

    // Check whether AM or PM
    let newformat = hours >= 12 ? 'PM' : 'AM'; 
    
    // Find current hour in AM-PM Format
    hours = hours % 12; 

    // To display "0" as "12"
    hours = hours ? hours : 12; 
    hours = String(hours).length == 1 ? `0${hours}` : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let time_created = hours + ':' + minutes + newformat;

    if(type == 1) {
        return `${month} ${date_num}, ${year}  |  ${time_created}`;
    } else {
        return `${month} ${date_num}, ${year}`;
    }
}
