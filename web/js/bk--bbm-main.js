// INIT
$(window).on('load resize scroll',function(){

});

$(window).on('load resize',function(){
    var $windowWidth = $(window).width();
    if ($windowWidth < 768) {
        resetClosedNav();
    }
});

$(function() {
    sidebarNav();
    themeMode();
    customSelect();
    headerNav();
    quickLinks();
    modal();
    bankList();
    tabularControl();
    checkView();
    loginField();
    profileMobileTabControl();
    notificationBar();
    viewPort();
    initTel();
    tabularTabs();
    controlFilters();
    depositMobileView();
    passwordVisToggle();
    tabLink();
    customUploadInput();
    appSurvey();
    datePicker();
    dateRange();
    notifPage();
    copyToClipboard();
    snsButton();
    accountForms();
    depositForms();
    commonFormValidation();

    onDemoSubAccountCreation();
    onLiveSubAccountCreation();
    onSignupAccountCreation();
    onPrivacyPolicySubmit();
    onUpdateAccount();

    // On Boarding Process
    onBoardingIntro();
    onBoardingBox();
    onBoardingLiveness();
    onBoardingBox_verification();
    onBoardingAgreement();
    onBoardingPersonalinfo();
});



// FUNCTIONS
function sidebarNav() {
    // Sidebar submenu dropdown click
    if($('.sidebar__nav-list-link--dropdown').length) {
        
        $('.sidebar__nav-list-link--dropdown').click(function(e){
            e.preventDefault();

            if($('.sidebar').hasClass('is-close')) {
                if($(this).parent('.sidebar__nav-list-item').hasClass('is-open')) {
                } else {
                    $('.is-open .sidebar__nav-list--inner').slideToggle(150);
                    $('.sidebar__nav-list-item').removeClass('is-open');
                }
            } else {
                $(this).parent('.sidebar__nav-list-item').toggleClass('is-open');
                $(this).next('.sidebar__nav-list--inner').slideToggle(200);
            }
            
        });
    }

    // Close all active submenu when closed (shorten width sidebar)
    if($('.sidebar__close-btn').length) {
        $('.sidebar__close-btn').click(function(e){
            e.preventDefault();

            // Close all active sub list on close
            $('.is-open .sidebar__nav-list--inner').css("display", "none");
            $('.sidebar__nav-list-item').removeClass('is-open');

            $(this).parent('.sidebar').toggleClass('is-close');
            $('main').toggleClass('sidebar-is-close');    
        });
    }

    // Hover subitem for shorten width sidebar
    if($('.sidebar__nav-list-item--main').length) {
        $('.sidebar__nav-list-item--main').hover(
            function(e){
                if($('.sidebar.is-close').length) {
                    var element = $(this);
                    var subitem = element.find('.sidebar__nav-list--inner');                 
                    var sidebar = $('.sidebar');
                    var sidebarNavPos = $('.sidebar__nav').position().top;
                    var topPos = element.position().top;
                    var logoHeight = $('.sidebar__logo').height();
                    var elementMarginT = $(element).outerHeight(true) - $(element).height();
                    var sidebarWidth = sidebar.width();
                    topPos = sidebarNavPos + logoHeight + elementMarginT + topPos;
                    subitem.css({
                        'display' : 'block',
                        'position' : 'fixed',
                        'top' : topPos+'px',
                        'left' : sidebarWidth+'px'
                    });
                }
            },
            function(e){
                if($('.sidebar.is-close').length) {
                    var element = $(this);
                    var subitem = element.find('.sidebar__nav-list--inner');                 
                    subitem.css({
                        'display' : 'none',
                        'position' : 'initial',
                        'top' : 'initial',
                        'left' : 'initial'
                    });
                }
            },
        );
    }
}

function customSelect() {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
            }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
        });
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
}

function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
        arrNo.push(i)
        } else {
        y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
        }
    }
}

function themeMode() {
    let mode = $('.theme_mode');
    let main_content = $('body');
    let storageModeVal = localStorage.getItem('theme_mode');
    
    // Check if theme_mode key exist and if val is dark
    if (storageModeVal !== null) {
        if(storageModeVal == 'dark') {
            mode.addClass('theme_mode--dark');
            main_content.addClass('dark-mode');
        }
    }

    mode.click(function() {
        //set localstorage theme_mode
        if (storageModeVal !== null) {
            if(storageModeVal == 'dark') {
                localStorage.removeItem("theme_mode");
            }
        } else {
            localStorage.setItem("theme_mode", "dark");
        }

        $(this).toggleClass('theme_mode--dark');
        $(this).hasClass('theme_mode--dark') ? main_content.addClass('dark-mode') : main_content.removeClass('dark-mode');

        setTimeout(function() {
            $('.menuToggler, .sidebar').removeClass('is-active');
        }, 300);
    })
}

function headerNav() {
    let toggler = $('.menuToggler');
    let nav_menu = $('.sidebar');
    let nav_menu_close = $('.sidebar__nav-line');
    let notice = $('.notice');

    toggler.click(function() {
        $(this).toggleClass('is-active');

        if($(this).hasClass('is-active') ) {
            nav_menu.addClass('is-active');
            notice.addClass('is-active');
        } else {
            nav_menu.removeClass('is-active');
        }
    });

    nav_menu_close.click(function() {
        nav_menu.removeClass('is-active');
        toggler.removeClass('is-active');
        notice.removeClass('is-active');
    })
}

function quickLinks() {
    $('.quick-links__item').hover(function(e) {
        var hoverIcon = $(this).find('.quick-links__item-icon--hover').attr('data-src');
        $(this).find('.quick-links__item-icon--hover').attr('src',hoverIcon);
    });
}

function modal() {
    let modal_trigger_edit = $('.modal_trigger--edit');
    let modal_trigger_add = $('.modal_trigger--add');
    let modal_container = $('.modal');
    let modal_box = $('.modal__box');
    let modal_title = $('.modal__header-title');
    let btn_cancel = $('#modal_btn--cancel');

    // Modal Input field
    let m_bank_name = $('#m_bank_name');
    let m_account_number = $('#m_account_number');
    let m_country = $('#m_country');
    let m_branch_name = $('#m_branch_name');
    let m_swift_code = $('#m_swift_code');
    let m_iban = $('#m_iban');

    // ADD Modal
    modal_trigger_add.click(function() {
        modal_container.addClass('is-active');
        modal_box.removeClass('modal__box--edit');

        setTimeout(function() {
            modal_box.addClass('is-active modal__box--add');
            modal_title.text('Add your Bank Account');
        }, 200);
    });

    // EDIT Modal
    modal_trigger_edit.click(function() {
        let i_bank_name = $(this).parents('.data__list__item').find('.data__bank-name').text();
        let i_account_number = $(this).parents('.data__list__item').find('.data__account-number').text();
        let i_country = $(this).parents('.data__list__item').find('.data__country').text();
        let i_branch_name = $(this).parents('.data__list__item').find('.data__branch-name').text();
        let i_swift_code = $(this).parents('.data__list__item').find('.data__swift-code').text();
        let i_iban = $(this).parents('.data__list__item').find('.data__iban').text();
        
        modal_container.addClass('is-active');
        modal_box.removeClass('modal__box--add');

        m_bank_name.val(i_bank_name);
        m_account_number.val(i_account_number);
        m_country.val(i_country);
        m_branch_name.val(i_branch_name);
        m_swift_code.val(i_swift_code);
        m_iban.val(i_iban);

        setTimeout(function() {
            modal_box.addClass('is-active modal__box--edit');
            modal_title.text('Edit your Bank Account');
        }, 200);
    });
    

    // Close modal
    btn_cancel.click(function() {
        modal_box.removeClass('is-active');

        // Reset Modal Field
        m_bank_name.val('');
        m_account_number.val('');
        m_country.val('');
        m_branch_name.val('');
        m_swift_code.val('');
        m_iban.val('');

        setTimeout(function() {
            modal_container.removeClass('is-active');
        }, 700);
    });


    // Common modal control for showing content item
    if($('.js--modal-control').length) {
        let modalControl = $('.js--modal-control');
        let modalClose = $('.js--modal-close');
        let modalTitle = $('.modal__header-title');
        let modalContentItem = $('.modal__content-item');

        $(modalControl).click(function(e){
            e.preventDefault();

            // get modal content title and content unique identifier
            var currContentId = '';
            var currModalTitle = '';
            currContentId = $(this).attr('data-id');
            currModalTitle = $(this).attr('data-title');

            // Reset is-active content
            $(modalContentItem).removeClass('is-active');

            // Update Modal Content
            $(modalTitle).html(currModalTitle);
            $('.'+currContentId).addClass('is-active');

            // Show Modal
            if($('.'+currContentId).length) {
                modal_container.addClass('is-active');
                setTimeout(function() {
                    modal_box.addClass('is-active');
                }, 200);
            }
        });

        $(modalClose).click(function(e){
            modal_box.removeClass('is-active');
            setTimeout(function() {
                modal_container.removeClass('is-active');
            }, 700);
        });
    }

    // Signup privacy policy modal control
    if($('.js--privacy-modal-control').length) {
        let modalControl = $('.js--privacy-modal-control');
        let modalClose = $('.modal__close-btn');

        // Show Modal
        $(modalControl).click(function(e){
            e.preventDefault();
            modal_container.addClass('is-active');
            setTimeout(function() {
                modal_box.addClass('is-active');
            }, 200);
        });

        // Close Modal
        $(modalClose).click(function(e){
            modal_box.removeClass('is-active');
            setTimeout(function() {
                modal_container.removeClass('is-active');
            }, 700);
        });
    }

    // Common modal control for page modal
    if($('.js--page-modal-control').length) {
        let pageModalControl = $('.js--page-modal-control');
        let pageModal = $('.page-modal');
        let pageModalClose = $('.page-modal__close-btn');
        let pageModalItem = $('.page-modal__item');
        let pageModalBox = $('.page-modal__box');

        $(pageModalControl).click(function(e){
            e.preventDefault();

            // get modal content title and content unique identifier
            var currModalItem = '';
            currModalItem = $(this).attr('data-modal');
            currModalItem = '.'+currModalItem;

            // Reset active modal item
            $(pageModalItem).removeClass('is-active');

            // Show Modal
            pageModal.addClass('is-active');
            $(currModalItem).addClass('is-active');

            setTimeout(function() {
                $(pageModalBox).addClass('is-active');
            }, 200);
        });

        $(pageModalClose).click(function(e){
            pageModalBox.removeClass('is-active');
            pageModal.removeClass('is-active');
            setTimeout(function() {
                pageModalItem.removeClass('is-active');
            }, 400);
        });
    }
    
}

function bankList() {
    let delete_btn = $('.data__cta-btn--delete');

    delete_btn.each(function() {
        $(this).click(function() {
            $(this).parents('.data__list__item').remove();
        })
    })
}

function tabularControl() {
    if($('.js--tab').length && $('.js--tab-control').length) {
        $('.js--tab-control').click(function(e){
            e.preventDefault();
            // get index
            var currControl = $(this);
            $currIndex = $(currControl).index();
            // update active control
            $('.js--tab-control').removeClass('is-active');
            currControl.addClass('is-active');
            // update active item
            $('.tabular__content-item').removeClass('is-active');
            $('.tabular__content-item').eq($currIndex).addClass('is-active');
        });
    }
}

function tabularTabs() {
    let item = $('.tabular__tab__item.is-active');

    if (item.length) {
        let item_width = item.width();
        let item_location = item.offset().left + item_width - $('.tabular__tab').offset().left;
    
        if (item_location > $('body').width()) {
            setTimeout(function() {
                $('.tabular__tab-wrapper').animate({scrollLeft: item_location}, 1000);
            }, 400);
        }
    }
}

function checkView() {
    let target = $('.is-animated');
    let scroll_position = $(this).scrollTop();
    let viewport = scroll_position + $(window).height();

    $.each(target, function() {
        let offset_distance = 150;
        let elem_position = $(this).offset().top;
        let target_position = elem_position + offset_distance;

        viewport > target_position ? $(this).addClass('is-active') : $(this).removeClass('is-active');
    });
}

function loginField() {
    let pass_toggler = $('.pass-toggler');

    pass_toggler.click(function() {
        let pass_parent = $(this).parent('.pass-toggler-parent');
        let pass_input = pass_parent.find('input');

        pass_parent.toggleClass('is-open');
        pass_parent.hasClass('is-open') ? pass_input.attr('type', 'text') : pass_input.attr('type', 'password');
    })
}

function profileMobileTabControl() {
    if($('.js--mobile-profile-control').length) {
        $('.js--mobile-profile-control').click(function(e){
            e.preventDefault();
            // get index
            var currControl = $(this).parents('.profile__content-item');
            $currIndex = $(currControl).index();
            
            // update active control
            $(this).toggleClass('is-active');
            
            // update active item
            $('.profile__content-item').removeClass('is-active');
            $('.profile__content-item').eq($currIndex).find('.profile__content-item__wrapper').toggleClass('is-active').slideToggle(300);
        });
    }
}

function notificationBar() {
    if($('.notification').length && $('.js--notif-close').length) {
        $('.js--notif-close').click(function(e){
            e.preventDefault();
            var currControl = $(this);
            var currParent = $(currControl).parent('.notification')
            $(currParent).fadeOut(200,function() {
                $(currParent).remove();
            });
        });
    }
}

function resetClosedNav() {
    if($("main").hasClass("sidebar-is-close")) {
        $('main').removeClass('sidebar-is-close');   
    }

    if($(".sidebar").hasClass("is-close")) {
        $('.sidebar').removeClass('is-close');   
    }
}

// DEVICE CHEKER
function isMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}
function isTablet() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
}

// VIEWPORT MANIPULATION
function viewPort() {
    let viewport = $('#viewport');

    if(isTablet()) {
        viewport.attr('content', 'width=1440, initial-scale=1, shrink-to-fit=yes');
    } else if (isMobile()) {
        viewport.attr('content', 'width=360, initial-scale=1, shrink-to-fit=yes');
    } else {
        viewport.attr('width=device-width, initial-scale=1, shrink-to-fit=no');
    }
}

function initTel() {
    if($('#intlTelInput').length) {
        var input = document.querySelector("#intlTelInput");
        getLocation(
            function (location) {
                window.intlTelInput(input, {
                    hiddenInput: "phone",
                    initialCountry: location.country_code,
                    preferredCountries: false,
                    // utilsScript: "/js/signup/utils.js",
                    utilsScript: "./../web/js/signup/utils.js",
                });
            }
        );
    }
}

function controlFilters() {
    let filter_sort = $('.controls__filter--sort');
    let filter_time = $('.controls__filter--time');

    if(filter_sort.length || filter_time.length) {

        // Sort
        filter_sort.each(function() {
            let trigger = $(this).find('.controls__filter-text, .controls__filter-icon');

            trigger.click(function() {
                $(this).parent().toggleClass('is-active');
            });
        });

        // GMT
        filter_time.each(function() {
            $(this).click(function() {
                $(this).toggleClass('is-active');
            });
        });

        // Hide dropdown on outside click
        $(document).on('click',function(e){
            if(!($(e.target).closest(".controls__filter--sort").length > 0 )){
                filter_sort.removeClass('is-active');
            }

            if(!($(e.target).closest(".controls__filter--time").length > 0 )){
                filter_time.removeClass('is-active');
            }
        });
    }
}

function depositMobileView() {
    if($('.js--deposit-item'.length)) {
        $('.js--deposit-item').click(function(e){
            $('.deposit__method').addClass('d-mobile-none')
            $('.deposit__content').removeClass('d-mobile-none');
        });
    
        $('.deposit__content__item-back').click(function(e){
            $('.deposit__method').removeClass('d-mobile-none');
            $('.deposit__content').addClass('d-mobile-none');
        });
    }
}

function passwordVisToggle() {
    if($('.password-vis-toggle'.length)) {
        $('.password-vis-toggle').click(function(e) {
            $(this).toggleClass('is-active');
            if($(this).hasClass('is-active')) {
                $(this).prev().prop("type", "text");
            } else {
                $(this).prev().prop("type", "password");
            }
        });
    }
}



function tabLink() {
    if($('.tab-link__nav-item').length && $('.tab-link__content-item').length) {
        $('.tab-link__nav-item').click(function(e){
            e.preventDefault();
            // get index
            var currItem = $(this);
            $currIndex = $(currItem).index();
            // update active control
            $('.tab-link__nav-item').removeClass('is-active');
            currItem.addClass('is-active');
            // update active item
            $('.tab-link__content-item').removeClass('is-active');
            $('.tab-link__content-item').eq($currIndex).addClass('is-active');
        });
    }
}

function customUploadInput() {
    if($('.custom-upload__input').length && $('.custom-upload__text').length) {
        $('input[type="file"]').change(function(e){
            var fileName = e.target.files[0].name;
            $('.custom-upload__text').text(fileName);
        });
    }
}

function appSurvey() {
    let survey = $('.survey');

    if(survey.length) {
        let servey_item = $('.survey__box__scoreboard-item');

        servey_item.each(function() {
            $(this).click(function() {
                servey_item.not($(this)).removeClass('is-active');
                $(this).toggleClass('is-active');
            })
        })
    }
}

function homeNews() {
    let home_news = $('#home_news');

    if(home_news.length) {
        function format_date(date_string) {
            let date_obj    = new Date(date_string);
            let month_arr   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let month       = month_arr[date_obj.getMonth()];
            let date_num    = date_obj.getDate();
                date_num    = date_num.length == 1 ? `0${date_num}` : date_num;
            let year        = date_obj.getFullYear();
    
            return `${month} ${date_num}, ${year}`;
        }
    
        // NEWS ARTICLE - WP REST API
        let cat_list = new Array();
        let get_post_excat = (cat_id, page_num, per_page) => {
            fetch(`https://blueberrymarkets.com/market-analysis/news/wp-json/wp/v2/posts?_embed&page=${page_num}&per_page=${per_page}&categories_exclude=${cat_id}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(posts) {
                    // console.log(posts);
    
                    if (posts) {
                        posts.forEach(function(post) { 
                            let date_time       = post.date.split('T');
                            let date_created    = format_date(date_time[0]);
                            let thumbnail       = post._embedded['wp:featuredmedia'][0].source_url;
    
                            let cat_names       = new Array();
    
                            post.categories.forEach(function(cat_id) {
                                if (cat_id in cat_list) {
                                    let cat_info = cat_list[cat_id];
                                    
                                    cat_names.push(`<span class="news_slider-card-date-category">${cat_info.cat_name}</span>`)
                                }
                            });
    
                            $('.news__content content__item-col__content').append(`
                                <a href="${post.link}" target="_blank" class="news__content-item">
                                    <div class="news__thumb">
                                        <img src="${thumbnail}" alt="news image">
                                    </div>
                                    <div class="news__main">
                                        <div class="news__info">
                                            <h6 class="news__info-title">${post.title.rendered}</h6>
                                            <p class="news__info-date">${date_created}</p>
                                        </div>
                                        <span class="news__category">${cat_names.join(', ')}</span>
                                    </div>
                                </a>
                            `)

                        });
                    }
                });
        }
        let get_all_cat = async () => {
            fetch(`https://blueberrymarkets.com/market-analysis/news/wp-json/wp/v2/categories`)
            .then(function(response) {
                return response.json();
            })
            .then(function(categories) {
                // console.log(categories);
    
                if (categories) {
                    categories.forEach(function(category) {
                        let cat_id = category.id;
                        let cat_name = category.name;
                        let cat_link = category.link;
    
                        cat_list[cat_id] = {
                            'cat_name' : cat_name,
                            'cat_link' : cat_link
                        }
                    });
    
                }
            });
        }
    
        // Init
        get_all_cat();
        get_post_excat(18, 1, 7);
    }
}

function datePicker() {
    var calendar = $('.custom-calendar__input');
    if(calendar.length) {
        $(calendar).daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            minYear: 2000,
            maxYear: parseInt(moment().format('YYYY'),10)
        }, function(start, end, label) {
        var years = moment().diff(start, 'years');
        });
    }
}

function dateRange() {
    var calendarRangePicker = $('.js--date-range-picker');
    if(calendarRangePicker.length) {
        calendarRangePicker.click(function(e){
            e.preventDefault();
        });
        calendarRangePicker.daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });
        calendarRangePicker.on('apply.daterangepicker', function(ev, picker) {
            $(this).find('.date-range-val').text(picker.startDate.format('MMM DD') + ' - ' + picker.endDate.format('MMM DD'));
        });
        calendarRangePicker.on('cancel.daterangepicker', function(ev, picker) {
            $(this).find('.date-range-val').text('Date');
        });
    }
}

function notifPage() {
    var notifView = $('.notifications__inner-view');
    if(notifView.length) {
        $(notifView).click(function(e){
            e.preventDefault();
            $(this).parents('.notifications__inner-item').addClass('viewed');
            $(this).fadeOut(200);
            setTimeout(function() {
                $(this).remove();
            }, 200);
        });  
    }

    var notifFave = $('.notifications__inner-fave');
    if(notifFave.length) {
        $(notifFave).click(function(e){
            e.preventDefault();
            $(this).parents('.notifications__inner-item').toggleClass('is-fave');
            $(this).toggleClass('is-active');
        });  
    }
}

function copyToClipboard() {
    if($('#copy-link-input').length) {
        var inputText = $('#copy-link-input')[0];
        var inputBtn = $('#copy-link-btn')[0];
        var inputToolTip = $('#copy-link-tooltip');
        $(inputBtn).on('click', function(e) {
            inputText.select();
            inputText.setSelectionRange(0, 99999);
            document.execCommand("copy");
            inputToolTip.addClass('is-active');
            setTimeout(function() { inputToolTip.removeClass('is-active'); }, 3000)
        });
    }
}

function snsButton() {
    var snsItem = $('.sns__item');
    if($(snsItem).length) {
        $(snsItem).each(function(e) {
            var dataLink = $(this).attr('data-link');
            var dataText = $(this).attr('data-text');
            if(dataLink) {
                dataLink = encodeURIComponent(dataLink);
                dataText = encodeURIComponent(dataText);

                // Whats App
                if($(this).hasClass('sns__item--whatsapp')) {
                    $(this).attr('href','https://web.whatsapp.com/send?text='+dataLink);
                }

                // Twitter
                else if($(this).hasClass('sns__item--twitter')) {
                    $(this).attr('href','https://twitter.com/intent/tweet?text='+dataText+'%20'+dataLink);
                }
                
                // Facebook
                else if($(this).hasClass('sns__item--fb')) {
                    $(this).attr('href','https://www.facebook.com/sharer/sharer.php?u='+dataLink);
                }

                // Mail
                else if($(this).hasClass('sns__item--mail')) {
                    $(this).attr('href','mailto:?body='+dataLink+'&subject='+dataText);
                }

                // Telegram
                else if($(this).hasClass('sns__item--telegram')) {
                    $(this).attr('href','https://telegram.me/share/url?url='+dataLink+'&text='+dataText);
                }

                else {

                }
                
            }
        });
    }
}

function validatePass(pass,confPass) {
    if(pass != '' && confPass != '' && pass == confPass) {
        return true;
    } else {
        return false;
    }
}

function accountForms() {
    // Edit account form validation
    if($('.form--edit-account').length) {
        var editAccntForm = $('.form--edit-account');
        var editAccntPass = $('#account_new_password');
        var editAccntConfirmPass = $('#account_confirm_password');
        var editAccntSubmit = $('.edit-account-btn');
        
        editAccntSubmit.click(function(e) {
            e.preventDefault();
            var confirmPassStatus = validatePass(editAccntPass.val(),editAccntConfirmPass.val());

            // Validate Each Field
            $('.form--edit-account input').each(function(index){
                var checkType = $(this).attr('type');
                var checkVal = $(this).val();
                // Text
                if(checkType == 'text' && checkVal == '' ) {
                    $(this).parent('.form__field-input').addClass('has-error');
                // Confirm Password
                } else if(checkType == 'password' && $(this).hasClass('js--confirm-pass') && confirmPassStatus == false ) {
                    $(this).parent('.form__field-input').addClass('has-error');
                // Password
                } else if(checkType == 'password' && checkVal == '' ) {
                    $(this).parent('.form__field-input').addClass('has-error');
                } else {
                    $(this).parent('.form__field-input').removeClass('has-error');
                }
            });

            // Submit if has no error
            if(!$('.form--edit-account .has-error').length) {
                editAccntForm.removeClass('has-form_error');
                editAccntForm.submit();
            } else {
                editAccntForm.addClass('has-form_error');
            }
            
        });
    }

    // Create account form validation
    if($('.form--create-account').length) {
        var createAccntForm = $('.form--create-account');
        var createAccntSubmit = $('.create-account-btn');

        createAccntSubmit.click(function(e) {
            e.preventDefault();

            // Validate Each Field
            $('.form--create-account select').each(function(index){
                var checkVal = $(this).val();
                if(checkVal == '' ) {
                    $(this).parents('.form__field-input').addClass('has-error');
                } else {
                    $(this).parents('.form__field-input').removeClass('has-error');
                }
            });

            // Submit if has no error
            if(!$('.form--create-account .has-error').length) {
                createAccntForm.removeClass('has-form_error');
                createAccntForm.submit();
            } else {
                createAccntForm.addClass('has-form_error');
            }
            
        });
    }
}

function limitCharacters(obj, limit){
    var characters = $(obj).val(); 
    var length = characters.length;
    if(length > limit){
       $(obj).val(characters.substr(0,limit));
    }
}

function depositForms() {
    var amountInput = $('.deposit__input');
    var amountRadio = $('.deposit__amount-selection__radio');
    var acceptTerms = $('.deposit__confirm-amount input[type="checkbox"]');
    var amountProceed = $('.deposit__proceed-btn');

    // Amount radio
    amountRadio.click(function(e){
        var selectedAmount = $(this).val();
        if(selectedAmount != '' && amountInput.length) {
            amountInput.val(selectedAmount);
        }
    });

    // Numbers only
    amountInput.keypress(function(e){
        amountRadio.prop('checked', false);
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    // Paste numbers only
    amountInput.on('input', function(e){
        var currentVal = $(this).val();
        var numbersOnly = currentVal.replace(/[^0-9]/g, "");
        $(this).val(numbersOnly);
    });

    // Max 8 numbers only
    amountInput.on('keyup keypress',function(e){
        limitCharacters($(this), 8);
    })

    // Input Validation
    amountProceed.click(function(e){
        e.preventDefault();
        $('.deposit__input-wrapper input').each(function(index){
            var checkType = $(this).attr('type');
            var checkVal = $(this).val();
            if(checkType == 'checkbox' && $(this).prop("checked") == false) {
                $(this).parents('.deposit__input-wrapper').addClass('has-error');
            } else if(checkType == 'text' && checkVal == '') {
                $(this).parents('.deposit__input-wrapper').addClass('has-error');
            } else {
                $(this).parents('.deposit__input-wrapper').removeClass('has-error');
            }
        });
    });

    // Terms checkbox custom validation
    acceptTerms.click(function(e) {
        if($(this).prop("checked") == false) {
            $(this).parents('.deposit__input-wrapper').addClass('has-error');
        } else {
            $(this).parents('.deposit__input-wrapper').removeClass('has-error');
        } 
    });

}

function commonFormValidation() {
    if($('.js--form-validation').length) {
        $('.js--form-validation').each(function(index) {
            var currentForm = $(this);
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

            // Submit Form event
            currentForm.on('submit', function(e) {
                //e.preventDefault();
                currentForm.find('.js--input-validate').each(function(index) {
                    var currentInput = $(this);
                    var checkType = currentInput.attr('type');
                    var checkVal = currentInput.val();

                    // select
                    if(currentInput.is("select") && checkVal == '' ) {
                        currentInput.parents('.form__field-input').addClass('has-error');
                    } 
                    // text
                    else if(checkType == 'text' && checkVal == '' ) {
                        currentInput.parents('.form__field-input').addClass('has-error');
                    }
                    // textarea
                    else if(currentInput.is("textarea") && checkVal == '' ) {
                        currentInput.parents('.form__field-input').addClass('has-error');
                    }
                    // checkbox
                    else if(checkType == 'checkbox' && currentInput.prop("checked") == false ) {
                        currentInput.parents('.form__field-input').addClass('checkbox-has-error');
                        currentInput.next('.custom-checkbox__mark').addClass('has-error');
                    }
                    // email
                    else if(checkType == 'email' && checkVal == '' ) {
                        currentInput.parents('.form__field-input').addClass('has-error');
                    }
                    else if(checkType == 'email' && checkVal != '' && emailRegex.test(checkVal) == false ) {
                        currentInput.parents('.form__field-input').addClass('has-error');
                    } 
                    // remove error class
                    else {

                        // remove error class for each type
                        if(checkType == 'checkbox') {
                            currentInput.parents('.form__field-input').removeClass('checkbox-has-error');
                            currentInput.next('.custom-checkbox__mark').removeClass('has-error');
                        } else {
                            currentInput.parents('.form__field-input').removeClass('has-error');
                        }
                    
                    }
                });

                // Submit if has no error
                if(!currentForm.find('.has-error').length) {
                    currentForm.removeClass('has-form_error');
                } else {
                    currentForm.addClass('has-form_error');
                    return false;
                }

            });
        });
    }
}


// ON BOARDING JS - Start ----------------------------------

function onBoardingBox() {
    let onboard = $('.onboarding');

    if(onboard.length) {
        let status_head = $('.onboarding__labels__head');
        let status_head_list = $('.onboarding__labels__list');

        // Pop Up
        let popup = $('.onboarding__popup');
        let popup_item = $('.pop-item');
        let popup_otp = $('.popup-otp');
        let popup_deposit = $('.popup-deposit');
        let popup_deposit_later = $('.popup-deposit_later');
        let popup_trigger = $('.popup_trigger');
        let otp_status = $('.otp-status');
        let popup_close = $('.close_popup');
        let resend_otp = $('#resend_otp');

        let close_deposit_btn = $('.onboarding__box-close');
        let deposit_btn_cancel = $('#deposit_btn_no');

        let confirm_btn = $('#confirm_details');


        // Deposit Funds
        let to_pay_btn = $('#to_pay_btn');
        let payment_box_backbtn = $('#to_selection');

        let payment_amount = $('#payment_selection');
        let payment_box = $('#to_payment');

        status_head.click(function() {
            $(this).toggleClass('is-open');
            $(this).hasClass('is-open') ? status_head_list.slideDown('400') : status_head_list.slideUp('400');
        })


        // DEPOSIT - Start ------------------------------------------------
        // To Payment
        to_pay_btn.click(function() {
            payment_amount.hide();
            payment_box.show();
        });

        // Back to amount selection
        payment_box_backbtn.click(function() {
            payment_box.hide();
            payment_amount.show();
        });
        // DEPOSIT - End --------------------------------------------------


        // POP UP - Start -----------------------------------------------
        // Pop Up - Trigger Point
        popup_trigger.click(function() {
            
            // Check action point is achieved
            if($(this).hasClass('is-done')) {
                return false;
            } else {
                popup.addClass('is-active');
                popup_item.hide();

                // Check if action is for OTP
                $(this).hasClass('popup_trigger--otp') ? popup_otp.show() : '';

                // Check if action is for Deposit
                $(this).hasClass('popup_trigger--deposit') ? popup_deposit.show() : '';

                // Check if action is for Deposit
                $(this).hasClass('popup_trigger--deposit_later') ? popup_deposit_later.show() : '';
            }
        })

        

        deposit_btn_cancel.click(function() {
            popup_item.fadeOut('slow');
            setTimeout(function() { 
                popup.removeClass('is-active'); 
            
                setTimeout(function() {
                    $('.onboarding').fadeOut('fast');
                })
            }, 600)
        })





        // OTP - Validate
        $('#otp_submit').click(function() {
            let otp_input = $('#opt_code');

            // If OTP is Correct
            if(otp_input.val() == '1') {
                otp_input.parent().addClass('is-verified');

                setTimeout(function() {
                    otp_input.parent().removeClass('has-error');
                    otp_status.addClass('is-done');
                    popup_otp.fadeOut('slow');

                    setTimeout(function() { popup.removeClass('is-active'); }, 600)
                    setTimeout(function() { 
                        otp_status.addClass('is-verified'); 
                        confirm_btn.removeClass('is-disabled');

                        $('#stage_personalinfo').removeClass('is-active').addClass('is-verified');
                        $('#stage_counter').attr('data-progress', '100');
                        $('.progressBar__counter').text('4/4');
                        $('.onboarding__labels__head-text').text('You are now ready to trade!')
                    }, 1000)
                }, 1200)
                
            } else {
                otp_input.parent().addClass('has-error');
            }

            otp_input.keypress(function() {
                otp_input.parent().removeClass('has-error');
            })
        })

        // OTP Resend Timer
        function otpTimer() {
            let timer = $('.popup-otp__resend__timer-counter');
            let limit = 5;

            let counter = setInterval(function() {
                limit--;
                limit < 10 ? limit = '0' + limit : limit;

                timer.text('00:' + limit);

                if(limit == 0) {
                    limit = 5;

                    clearInterval(counter);
                    $('.popup-otp__resend').removeClass('is-active');
                }
            }, 1000);

            counter;
        }

        // OTP Resend
        resend_otp.click(function() {
            let otp_input = $('#opt_code');

            otp_input.val('');
            otp_input.parent().removeClass('has-error');
            $('.popup-otp__resend').addClass('is-active');
            otpTimer();
        })



        // Close Pop Up
        popup_close.click(function() {
            popup_item.fadeOut('slow');
            setTimeout(function() { popup.removeClass('is-active'); }, 600)
        })
        // POP UP - End -------------------------------------------------
    }
}


// On Boarding - Intro Form
function onBoardingIntro() {
    let obp_itro = $('.onboarding__intro');

    if(obp_itro.length) {

        if(!isMobile()) {
            $('html, body').css({'overflow':'hidden'});
        }

        let intro_field = $('.form--obp_intro');
        let quiz_submit_btn = $('#quiz_submit');
        let first_name = $('#a_first_name');
        let last_name = $('#a_last_name');
        let platform = $('#a_platform');
        let currency =  $('#a_currency');
        let leverage_row =  $('#a_leverage_row');
        let leverage_aus =  $('#a_leverage_aus');

        quiz_submit_btn.click(function() {

            first_name.val() == '' ?  first_name.parent().addClass('has-error') : first_name.parent().removeClass('has-error');
            last_name.val() == '' ?  last_name.parent().addClass('has-error') : last_name.parent().removeClass('has-error');
            platform.find('.select-selected').text() == 'Choose Platform' ?  platform.addClass('has-error') : platform.removeClass('has-error');
            currency.find('.select-selected').text() == 'Choose Currency' ?  currency.addClass('has-error') : currency.removeClass('has-error');

            if(first_name.val() == '' || last_name.val() == '' || platform.find('.select-selected').text() == 'Choose Platform' || currency.find('.select-selected').text() == 'Choose Currency') {
                intro_field.addClass('has-form_error');
            } else {
                intro_field.removeClass('has-form_error');
                // Proceed to STEP 1 (Verification Stage)

                obp_itro.hide();
                $('.onboarding__box').removeClass('is-inactive');
                $('.obp-stage--verification').show();
            }
        })
    }
}

// STEP 1 - Verification Stage
function onBoardingBox_verification() {
    let onboarding = $('.onboarding');
    let risk_level = onboarding.data('risk');
    let btn_change = $('#change_country');
    let btn_confirm_country = $('#confirm_country');
    let btn_toupload_id = $('#to_uploadID');
    let country_selection = $('#ifnot_au');
    let country_options = $('#country_options');
    let selected_country = $('#selected_country');
    let id_selection = $('.onboarding__verify__body');
    let id_selection_item = $('.idlist__item');
    let back_button = $('.back-button');
    let banned_country_msg = $('#banned_country_msg');
    let suspicious_msg = $('#suspicious_document_msg');

    let to_other_docu = $('#to_other_docu');
    let to_stage_liveness = $('#to_stage_liveness');

    let id_selection_text = $('.onboarding__verify__body-text');


    // STAGE 1 - Start --------------------
    let first_stage = $('.onboarding__verify');
    if(first_stage.length) {
        // Change country
        btn_change.click(function() {
            $(this).toggleClass('is-other');

            if($(this).hasClass('is-other')) {
                $(this).text('Cancel');
                country_selection.slideDown('fast');
            } else {
                $(this).text('Change');
                country_selection.slideUp('fast');
                id_selection.removeClass('is-banned');
                btn_toupload_id.removeClass('is-disabled');
            }
        })

        // Confirm Country
        btn_confirm_country.click(function() {
            let banned_countries = [
                'Afghanistan',
                'Albania',
                'American Samoa',
                'Bahamas',
                'Belarus',
                'Burundi',
                'Central African Republic',
                'China',
                'Congo (Democratic Republic)',
                'Cyprus',
                'Eritrea',
                'Guam',
                'Guinea-Bissau',
                'Haiti',
                'Iran',
                'Iraq',
                'Jamaica',
                'Japan',
                'Korea, North',
                'Kosovo',
                'Lebanon',
                'Libya',
                'Mali',
                'Myanmar',
                'Nicaragua',
                'Northern Mariana Islands',
                'Pakistan',
                'Panama',
                'Puerto Rico',
                'Russia',
                'Somalia',
                'South Sudan',
                'Sudan',
                'Syria',
                'Trinidad and Tobago',
                'Tristan da Cunha',
                'Ukraine',
                'United States',
                'United States Minor Outlying Islands',
                'Virgin Islands (U.S.)',
                'Vanuatu',
                'Venezuela',
                'Vietnam',
                'Western Sahara',
                'Yemen',
                'Zimbabwe'
            ];
            let selected = country_options.find('.select-selected').text();
            
            btn_change.text('Change');
            selected_country.val(selected);
            country_selection.slideUp();

            function checkValue(value,arr){
                let status = false;
            
                for(let i=0; i<arr.length; i++) {
                    let name = arr[i];

                    if(name == value){
                        status = true;
                        break;
                    }
                }
                return status;
            }

            // Check if the selected country is in banned countries
            if(checkValue(selected, banned_countries)) {
                // id_selection.addClass('is-banned');
                first_stage.hide();
                banned_country_msg.show();
            } else {
                // id_selection.removeClass('is-banned');
                selected_country.parent('.form__field-input').removeClass('form__field-input--focused');
                selected_country.parent('.form__field-input').addClass('form__field-input--active');
            }
        })


        // ID Selection - Proceed to target Item
        id_selection_item.click(function() {
            let target_id = $(this).data('id');

            first_stage.hide();
            $('#' + target_id).show();
            to_stage_liveness.attr('data-target', '');
        })
    }
    // STAGE 1 - End ----------------------



    // STAGE 2 - Start --------------------
    let upload_field = $('.onboarding__verify');
    if(upload_field.length) {

        // Input fields
        let upload_ducument = $('#pp_document');
        let upload_id_1_front = $('#any_id_front');
        let upload_id_1_back = $('#any_id_back');
        let upload_id_2_front = $('#driver_id_front');
        let upload_id_2_back = $('#driver_id_back');

        let upload_docu_mortgage = $('#docu_mortgage');
        let upload_docu_bank = $('#docu_bank');
        let upload_docu_utility = $('#docu_utility');
        let upload_docu_income = $('#docu_income');
        let upload_docu_payslip = $('#docu_payslip');
        
        // Thumbnail Wrapper
        let image_list = $('.upload__box__controls__list');

        // Continue Buttons
        let continue_btn = $('.onboarding__updocu__footer-btn');
        let id_0_btn = $('#id_0_btn');
        let id_1_btn = $('#id_1_btn');
        let id_2_btn = $('#id_2_btn');
        let other_docu_btn = $('#other_docu_btn');

        let target_item_id = '';
        let target_item_name = '';
        let target_other_item = '';
        let action_type = '';


        // File uploader
        function uploadFile(file_input) {
            file_input.change(function() {
                let input_id = $(this).attr('id');
                let this_input = $(this);
                let file = this_input.get(0).files[0];
                let parent_main = this_input.parents('.upload');
                let parent_cont = this_input.parent('.upload__box__display-wrapper');
                let preview_img = parent_cont.find('.upload__box__display-preview-img img');
                let preview_box = parent_cont.find('.upload__box__display-preview');
                let thumbnail_list = parent_main.find('.upload__box__controls__list');

                if(file) {
                    let reader = new FileReader();
                    let front_class = '';
                    let back_class = '';
            
                    reader.onload = function(){
                        preview_box.fadeIn('fast');
                        preview_img.attr("src", reader.result);
                        continue_btn.show();

                        if(this_input.hasClass('front-display') || this_input.hasClass('back-display')) {
                            parent_cont.addClass('has-item');
                            parent_main.addClass('has-multiple_item');

                            this_input.hasClass('front-display') ? front_class = 'front-view' : '';
                            this_input.hasClass('back-display') ? back_class = 'back-view' : '';
                        } else {
                            parent_main.addClass('has-item');
                        }
    
                        thumbnail_list.append(`
                            <div class="upload__box__controls__list-item is-active">
                                <div class="upload__box__controls__list-item-close ${front_class}${back_class}" data-id="${input_id}"></div>
                                <div class="upload__box__controls__list-item-img">
                                    <img src="${reader.result}" alt="Uploaded Thumbnail">
                                </div>
                            </div>
                        `);
                    }
            
                    reader.readAsDataURL(file);
                }
            })
        }

        // Processing 
        function processingFile(item_container, item_id, item_name, item_type) {
            let status = true;
            let process_box = $('.onboarding__processing');
            
            if(status) {
                $(item_container).hide();
                process_box.show();

                target_item_id = item_id;
                target_item_name = item_name;
                action_type = item_type;
            } else {
                // if Error in verifying document/ID
                // suspicious_msg.show();
            }
        }

        // Remove Thumbnail Item
        function removeThumbnail() {
            image_list.on('click', '.upload__box__controls__list-item-close', function() {
                let parent_main = $(this).parents('.upload');
                let preview_img = '';
                let preview_box = '';
                let target_input = $(this).data('id');
    
                $(this).parent().remove();
    
                // If NOT ID Front & Back View
                if (!$(this).hasClass('front-view') && !$(this).hasClass('back-view')) {
                    preview_box = parent_main.find('.upload__box__display-preview');
                    preview_img = preview_box.find('.upload__box__display-preview-img img');
                }
    
                // If for ID Front View
                if ($(this).hasClass('front-view')) {
                    parent_main = parent_main.find('.upload__box__display-wrapper.front-view');
                    preview_box = parent_main.find('.upload__box__display-preview');
                    preview_img = preview_box.find('.upload__box__display-preview-img img');
                }
    
                // If for ID Back View
                if ($(this).hasClass('back-view')) {
                    parent_main = parent_main.find('.upload__box__display-wrapper.back-view');
                    preview_box = parent_main.find('.upload__box__display-preview');
                    preview_img = preview_box.find('.upload__box__display-preview-img img');
                }
    
    
                preview_box.fadeOut('fast'); // Hide the preview Container
                continue_btn.hide(); // Hide Continue button
    
                setTimeout(function() {
                    parent_main.removeClass('has-item'); // Display the upload field
                    preview_img.attr('src', ''); // Reset the image preview
                    $('#' + target_input).val(''); // Clear the value of input field
                }, 400);
            });
        }

        // ID Uploads
        function idUploads() {
            // Upload Document
            uploadFile(upload_ducument);

            // Validate - Passprot
            id_0_btn.click(function() {
                processingFile('#upload_document', '#item_passport', 'Passport', 'Document');
            })



            // Upload Any ID - Front & Back
            uploadFile(upload_id_1_front);
            uploadFile(upload_id_1_back);

            // Check if Front & Back Picture are provided before proceeding
            $('#any_id_front, #any_id_back').change(function() {
                if (upload_id_1_front.val() != '' && upload_id_1_back.val() != '') {
                    id_1_btn.removeClass('is-disabled');
                } else {
                    id_1_btn.addClass('is-disabled');
                }
            })

            // Validate ID 1
            id_1_btn.click(function() {
                processingFile('#upload_id_1', '#item_anyid', 'ID', 'ID');
            })



            // Upload Driver's ID - Front & Back
            uploadFile(upload_id_2_front);
            uploadFile(upload_id_2_back);

            // Check if Front & Back Picture are provided before proceeding
            $('#driver_id_front, #driver_id_back').change(function() {
                if (upload_id_2_front.val() != '' && upload_id_2_back.val() != '') {
                    id_2_btn.removeClass('is-disabled');
                } else {
                    id_2_btn.addClass('is-disabled');
                }
            })

            // Validate ID 2
            id_2_btn.click(function() {
                processingFile('#upload_id_2', '#item_drivers', "Driver's license", 'ID');
            })


            // Other Documents
            uploadFile(upload_docu_mortgage);
            uploadFile(upload_docu_bank);
            uploadFile(upload_docu_utility);
            uploadFile(upload_docu_income);
            uploadFile(upload_docu_payslip);

            // Validate Other Document
            other_docu_btn.click(function() {
                let item_id = $('#other_docu_' + target_other_item);

                processingFile('#upload_others', item_id, target_other_item, 'Others');
            })
        }


        // OPTION - Selection
        function optionSelection() {
            let item = $('.option__head__item');

            item.each(function() {
                $(this).click(function() {
                    let t_ID = $(this).data('id');
                    let opt_body = $(this).parents('.option').find('.option__body__content');

                    // Reset QR Code Display
                    $('.upload__box__display-wrapper').removeClass('is-qrcode is-ID is-ID_driver');

                    item.not($(this)).removeClass('is-active');
                    $(this).addClass('is-active');

                    opt_body.removeClass('is-active');
                    $('#content_' + t_ID).addClass('is-active');
                })
            })
        }

        // Init Selection
        optionSelection();


        // CHECK RISK LEVEL
        if(risk_level == 'low-risk') {
            id_selection_text.text('Select one (1) ID Type');

            // INIT - ID Uploads
            idUploads();

            // INIT - Remove Thumbnail Items
            removeThumbnail();

            // Processing Continue Button
            to_stage_liveness.click(function() {
                $('.obp-stage--verification').hide();
                $('.obp-stage--liveness').show();

                // Labels 
                $('#stage_verification').removeClass('is-active').addClass('is-verified');
                $('#stage_liveness').addClass('is-active');
                $('#stage_counter').attr('data-progress', '25');
                $('.progressBar__counter').text('1/4');

                console.log($('#stage_counter').data('progress'));
                
                $('.onboarding__labels__head-title').text('Liveness Detection');
            })

        // If MEDIUM RISK
        } else if (risk_level == 'medium-risk') {
            id_selection_text.text('For faster processing of your application, we recommend uploading 1 of the ID options below that includes your residential address.');

            let other_documents = $('.others');
            let to_liveness_btn = $('#to_liveness_btn');
            let docu_item = $('.upload__box__option__item');
            let input_field = $('.upload--selection .upload__box__display-input');
            let upload_field = $('.upload--selection .upload__box__display');

            let otherDocu_delete_btn = $('.item_action--close');
            let otherDocu_edit = $('.item_action--edit');

            to_liveness_btn.hide();

            // INIT - ID Uploads
            idUploads();

            // INIT - Remove Thumbnail Items
            removeThumbnail();

            // OPEN - Other document Selection
            to_other_docu.click(function() {
                first_stage.hide();
                $('#upload_others').show();
                to_other_docu.fadeOut();
            })


            // DELETE - Other Document
            otherDocu_delete_btn.each(function() {
                $(this).click(function() {
                    $(this).parents('.others__list__item').removeClass('is-processing is-verified is-active');
                    to_liveness_btn.fadeOut();

                    setTimeout(function() {
                        other_documents.fadeOut();

                        setTimeout(function() {
                            to_other_docu.fadeIn();
                        }, 1000)
                    }, 400)
                })
            })

            // Edit Item
            otherDocu_edit.each(function() {
                $(this).click(function() {
                    $(this).parents('.others__list__item').removeClass('is-processing is-verified is-active');

                    first_stage.hide();
                    $('#upload_others').show();
                    to_other_docu.fadeOut();
                })
            })


            // Document selection
            docu_item.each(function() {
                $(this).click(function() {
                    let i_target = $(this).data('id');
                    target_input = $('#docu_' + i_target);

                    target_other_item = i_target;

                    // Reset preview display
                    if($(this).hasClass('is-active')) {
                        // console.log('Already active!');
                    } else {
                        let parent_main = $('.upload--selection');
                        let preview_img = $('.upload--selection .upload__box__display-preview-img img');
                        let preview_box = $('.upload--selection .upload__box__display-preview');

                        $('.upload--selection .upload__box__controls__list').empty();

                        preview_box.hide(); // Hide the preview Container
                        continue_btn.hide(); // Hide Continue button
                        parent_main.removeClass('has-item'); // Display the upload field
                        preview_img.attr('src', ''); // Reset the image preview
                        target_input.val(''); // Clear the value of input field
                    }
                    
                    docu_item.not($(this)).removeClass('is-active');
                    $(this).addClass('is-active');

                    upload_field.removeClass('is-disabled');
                    input_field.hide();
                    target_input.show();
                })
            })

            // Processing Continue Button
            to_stage_liveness.each(function() {
                $(this).click(function() {
                    let process_box = $('.onboarding__processing');
                    
                    // Other Documents
                    if (action_type == 'Others') {
                        $('.others').show();

                        setTimeout(function() {
                            $('#other_docu_' + target_other_item).addClass('is-processing is-active');
                            to_other_docu.hide();
                            to_liveness_btn.fadeIn();

                            setTimeout(function() {
                                $('#other_docu_' + target_other_item).removeClass('i-processing').addClass('is-verified');
                                
                            }, 2000);
                        }, 400)


                    // ID & Passport
                    } else {
                        let status_text = $(target_item_id).find('.idlist__item__process-text');

                        $(target_item_id).addClass('is-processing');

                        setTimeout(function() {
                            $(target_item_id).removeClass('is-processing').addClass('is-verified');
                            status_text.text('Your ' +target_item_name+ ' is verified');
                        }, 2000);
                    }

                    setTimeout(function() {
                        let upload_id_counter = $('.idlist__item.is-verified').length;
                        let upload_otherDoc_counter = $('.others__list__item.is-verified').length;

                        if(upload_id_counter >= 2 && upload_otherDoc_counter >= 1) {
                            to_liveness_btn.removeClass('is-disabled');
                        }

                    }, 3000);

                    process_box.hide();
                    first_stage.show();
                })
            })

            // To Next Stage | Liveness
            to_liveness_btn.click(function() {
                $('.obp-stage--verification').hide();
                $('.obp-stage--liveness').show();

                // Labels 
                $('#stage_verification').removeClass('is-active').addClass('is-verified');
                $('#stage_liveness').addClass('is-active');
                $('#stage_counter').attr('data-progress', '25');
                $('.progressBar__counter').text('1/4');
                
                $('.onboarding__labels__head-title').text('Liveness Detection');
            })


        // HIGH RISK
        } else if (risk_level == 'high-risk') {
            id_selection_text.text('For faster processing of your application, we recommend uploading 1 of the ID options below that includes your residential address.');

            let other_documents = $('.others');
            let to_liveness_btn = $('#to_liveness_btn');
            let docu_item = $('.upload__box__option__item');
            let input_field = $('.upload--selection .upload__box__display-input');
            let upload_field = $('.upload--selection .upload__box__display');

            let otherDocu_delete_btn = $('.item_action--close');
            let otherDocu_edit = $('.item_action--edit');

            to_liveness_btn.hide();

            // INIT - ID Uploads
            idUploads();

            // INIT - Remove Thumbnail Items
            removeThumbnail();

            // OPEN - Other document Selection
            to_other_docu.click(function() {
                first_stage.hide();
                $('#upload_others').show();
                to_other_docu.fadeOut();
            })


            // DELETE - Other Document
            otherDocu_delete_btn.each(function() {
                $(this).click(function() {
                    $(this).parents('.others__list__item').removeClass('is-processing is-verified is-active');
                    to_liveness_btn.fadeOut();

                    setTimeout(function() {
                        other_documents.fadeOut();

                        setTimeout(function() {
                            to_other_docu.fadeIn();
                        }, 1000)
                    }, 400)
                })
            })

            // Edit Item
            otherDocu_edit.each(function() {
                $(this).click(function() {
                    $(this).parents('.others__list__item').removeClass('is-processing is-verified is-active');

                    first_stage.hide();
                    $('#upload_others').show();
                    to_other_docu.fadeOut();
                })
            })



            // Document selection
            docu_item.each(function() {
                $(this).click(function() {
                    let i_target = $(this).data('id');
                    target_input = $('#docu_' + i_target);

                    target_other_item = i_target;

                    // Reset preview display
                    if($(this).hasClass('is-active')) {
                        // console.log('Already active!');
                    } else {
                        let parent_main = $('.upload--selection');
                        let preview_img = $('.upload--selection .upload__box__display-preview-img img');
                        let preview_box = $('.upload--selection .upload__box__display-preview');

                        $('.upload--selection .upload__box__controls__list').empty();

                        preview_box.hide(); // Hide the preview Container
                        continue_btn.hide(); // Hide Continue button
                        parent_main.removeClass('has-item'); // Display the upload field
                        preview_img.attr('src', ''); // Reset the image preview
                        target_input.val(''); // Clear the value of input field
                    }
                    
                    docu_item.not($(this)).removeClass('is-active');
                    $(this).addClass('is-active');

                    upload_field.removeClass('is-disabled');
                    input_field.hide();
                    target_input.show();
                })
            })

            // Processing Continue Button
            to_stage_liveness.each(function() {
                $(this).click(function() {
                    let process_box = $('.onboarding__processing');
                    
                    // Other Documents
                    if (action_type == 'Others') {
                        $('.others').show();

                        setTimeout(function() {
                            $('#other_docu_' + target_other_item).addClass('is-processing is-active');
                            to_other_docu.hide();
                            to_liveness_btn.fadeIn();

                            setTimeout(function() {
                                $('#other_docu_' + target_other_item).removeClass('i-processing').addClass('is-verified');
                                
                            }, 2000);
                        }, 400)


                    // ID & Passport
                    } else {
                        let status_text = $(target_item_id).find('.idlist__item__process-text');

                        $(target_item_id).addClass('is-processing');

                        setTimeout(function() {
                            $(target_item_id).removeClass('is-processing').addClass('is-verified');
                            status_text.text('Your ' +target_item_name+ ' is verified');
                        }, 2000);
                    }

                    setTimeout(function() {
                        let upload_id_counter = $('.idlist__item.is-verified').length;
                        let upload_otherDoc_counter = $('.others__list__item.is-verified').length;

                        if(upload_id_counter >= 3 && upload_otherDoc_counter >= 1) {
                            to_liveness_btn.removeClass('is-disabled');
                        }

                    }, 3000);

                    process_box.hide();
                    first_stage.show();
                })
            })

            // To Next Stage | Liveness
            to_liveness_btn.click(function() {
                $('.obp-stage--verification').hide();
                $('.obp-stage--liveness').show();

                // Labels 
                $('#stage_verification').removeClass('is-active').addClass('is-verified');
                $('#stage_liveness').addClass('is-active');
                $('#stage_counter').attr('data-progress', '25');
                $('.progressBar__counter').text('1/4');
                
                $('.onboarding__labels__head-title').text('Liveness Detection');
            })
        }
    }
    // STAGE 2 - End ----------------------



    // Back to ID Selection
    back_button.click(function() {
        $(this).parents('.onboarding__updocu').hide();
        first_stage.show();
    })
}


// STEP 2 - Liveness Stage
function onBoardingLiveness() {
    // Choice A
    $('.liveness-item-step-a-1').click(function(e){
        e.preventDefault();
        $('.face-detection__initial').toggleClass('is-active');

        $('.face-detection__capture').toggleClass('is-active');
    });

    $('.liveness-item-step-a-2').click(function(e){
        e.preventDefault();
        $('.face-detection__capture').toggleClass('is-active');

        $('.face-detection__result').toggleClass('is-active');
        //$('.face-detection__camera').toggleClass('is-active');
    });


    // Choice B
    $('.liveness-item-step-b-1').click(function(e){
        e.preventDefault();
        $('.face-detection__initial').toggleClass('is-active');

        $('.face-detection__mobile').toggleClass('is-active');
    });

    $('.liveness-item-step-b-2').click(function(e){
        e.preventDefault();
        $('.face-detection__mobile').toggleClass('is-active');

        $('.face-detection__result').toggleClass('is-active');

        // Add Back Class
        // $('.face-detection__camera .back-link').addClass('liveness-step-b-back-1');
        // onBoardingLivenessBack();
    });


    // Data Analyzing
    $('.liveness-start-analyze').click(function(e){
        e.preventDefault();
        $('.face-detection__camera').toggleClass('is-active');

        $('.face-detection__analyzing').toggleClass('is-active');

        setTimeout(function() {
            $('.face-detection__analyzing').toggleClass('is-active');
            $('.face-detection__progress').toggleClass('is-active');
        }, 2500);

        setTimeout(function() {
            $('.custom-progress-bar__line').css("width", "100%");
        }, 3000);

        setTimeout(function() {
            $('.face-detection__progress').toggleClass('is-active');
            $('.face-detection__result').toggleClass('is-active');
        }, 6500);

    });


    // To Next Stage Button
    $('#to_agreement').click(function() {

        $('.obp-stage--liveness').hide();
        $('.obp-stage--agreement').show();

        // Labels 
        $('#stage_liveness').removeClass('is-active').addClass('is-verified');
        $('#stage_agreement').addClass('is-active');
        $('#stage_counter').attr('data-progress', '50');
        $('.progressBar__counter').text('2/4');

        $('.onboarding__labels__head-title').text('Client Agreement');
    })
}
function onBoardingLivenessBack() {
    // Back Choice B
    $('.liveness-step-b-back-1').click(function(e){
        e.preventDefault();
        $('.face-detection__camera').removeClass('is-active');

        $('.face-detection__mobile').addClass('is-active');

        $('.face-detection__camera .back-link').removeClass('liveness-step-b-back-1');
    });
}


// STEP 3 - Client Agreement
function onBoardingAgreement() {
    let btn_agree = $('#agreement_yes');
    let agreement_doc = document.querySelector('.onboarding__docu__details');

    // Enabled "I agree" button when the user have read the full content
    agreement_doc.addEventListener('scroll', () => {  
        if (agreement_doc.offsetHeight + agreement_doc.scrollTop + 4 >= agreement_doc.scrollHeight) {  
            btn_agree.removeClass('is-disabled');
        }  
    })
    

    btn_agree.click(function() {
        $('.obp-stage--agreement').hide();
        $('.obp-stage--personal-info').show();

        // Labels 
        $('#stage_agreement').removeClass('is-active').addClass('is-verified');
        $('#stage_personalinfo').addClass('is-active');
        $('#stage_counter').attr('data-progress', '75');
        $('.progressBar__counter').text('3/4');

        $('.onboarding__labels__head-title').text('Personal Information');
    })
}


// STEP 4 - Personal Information
function onBoardingPersonalinfo() {
    let confirm_btn = $('#confirm_details');

    confirm_btn.click(function() {
        $('.obp-stage--personal-info, .onboarding__box__left, .onboarding__box__right').hide();
        $('.onboarding__box').addClass('onboarding__box--deposit');
        $('#obp_deposit').show();
    })
}

// ON BOARDING JS - End ------------------------------------






// creation of sub accounts
function onLiveSubAccountCreation() {
    $(document).on('submit', '#create_sub_live_account', function (e) {
        e.preventDefault();
        e.stopPropagation();

        let csrfParam = $('meta[name="csrf-param"]').attr('content');
        let csrfToken = $('meta[name="csrf-token"]').attr('content');
        let data = { 'data': $('#create_sub_live_account').serialize() };

        data[csrfParam] = csrfToken;

        $.ajax({
            url: '/en/site/bbmcreatesubaccount',
            type: 'POST',
            dataType: 'JSON',
            data: data,
            // success: function (res) {
            //     if (res.type == 'Success') {
            //         window.location.replace("https://my.staging.blueberrymarkets.com/en/site/bbmobp_low_risk");
            //     }
            // },
            // error: function () {
            //     alert('Please reload the page.');
            // },
        });

    });
}

function onDemoSubAccountCreation() {
    $(document).on('submit', '#create_sub_demo_account', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let csrfParam = $('meta[name="csrf-param"]').attr('content');
        let csrfToken = $('meta[name="csrf-token"]').attr('content');
        let data = { 'data': $('#create_sub_demo_account').serialize() };

        data[csrfParam] = csrfToken;

        $.ajax({
            url: '/en/site/bbmcreatedemosubaccount',
            type: 'POST',
            dataType: 'JSON',
            data: data,
        });
    });
}

function onPrivacyPolicySubmit() {
    $(document).on('click', '#privacy-policy-confirm', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let csrfParam = $('meta[name="csrf-param"]').attr('content');
        let csrfToken = $('meta[name="csrf-token"]').attr('content');
        let data = { 'data': $('#accountSignUp').serialize() };

        data[csrfParam] = JSON.stringify(csrfToken);

        $.ajax({
            url: '/en/site/bbmcreateaccount',
            type: 'POST',
            dataType: 'JSON',
            data: data,
            success: function (res) {
                if (res.type == 'Success') {
                    console.log('success')
                    window.location.replace("https://my.staging.blueberrymarkets.com/en/site/bbmobp_low_risk_copy");
                }
            },
            error: function (requestObject, error, errorThrown) {
                console.log(requestObject, error, errorThrown);
            },
        });
    });
}

function onSignupAccountCreation() {
    let modal_container = $('.modal');
    let modal_box = $('.modal__box');
    $(document).on('submit', '#accountSignUp', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let csrfParam = $('meta[name="csrf-param"]').attr('content');
        let csrfToken = $('meta[name="csrf-token"]').attr('content');
        let data = { 'data': $('#accountSignUp').serialize() };

        data[csrfParam] = JSON.stringify(csrfToken);

        // Signup privacy policy modal control
        if ($('.js--privacy-modal-control').length) {
            modal_container.addClass('is-active');
            modal_box.addClass('is-active');
        }

        // $.ajax({
        //     url: '/en/site/bbmcreateaccount',
        //     type: 'POST',
        //     dataType: 'JSON',
        //     data: data,
        //     success: function (res) {
        //         if (res.type == 'Success') {
        //             console.log('success')
        //             window.location.replace("https://my.staging.blueberrymarkets.com/en/site/bbmobp_low_risk_copy");
        //         }
        //     },
        //     error: function (requestObject, error, errorThrown) {
        //         console.log(requestObject, error, errorThrown);
        //     },
        // });
    });
}

function onUpdateAccount() {
    $(document).on('submit', '#setup-account', function (e) {
        e.preventDefault();
        e.stopPropagation();
        let csrfParam = $('meta[name="csrf-param"]').attr('content');
        let csrfToken = $('meta[name="csrf-token"]').attr('content');
        let data = { 'data': $('#setup-account').serialize() };

        data[csrfParam] = JSON.stringify(csrfToken);
        console.log(data)
        // $.ajax({
        //     url: '/en/site/bbmcreateaccount',
        //     type: 'POST',
        //     dataType: 'JSON',
        //     data: data,
        //     success: function (res) {
        //         if (res.type == 'Success') {
        //             console.log('success')
        //             window.location.replace("https://my.staging.blueberrymarkets.com/en/site/bbmobp_low_risk_copy");
        //         }
        //     },
        //     error: function (requestObject, error, errorThrown) {
        //         console.log(requestObject, error, errorThrown);
        //     },
        // });
    });
}