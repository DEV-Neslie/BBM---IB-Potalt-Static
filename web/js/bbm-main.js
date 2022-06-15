// INIT
$(window).on('load resize scroll', function () {

});

$(window).on('load resize', function () {
    var $windowWidth = $(window).width();
    if ($windowWidth < 768) {
        resetClosedNav();
    }
});

$(function () {
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
    signUpValidation();
    agreeValidation();
    mobileSearchField();
    searchDropDown();
    questionnaire();

    onDemoSubAccountCreation();
    onLiveSubAccountCreation();
    onSignupAccountCreation();
});



// FUNCTIONS
function sidebarNav() {
    // Sidebar submenu dropdown click
    if ($('.sidebar__nav-list-link--dropdown').length) {

        $('.sidebar__nav-list-link--dropdown').click(function (e) {
            e.preventDefault();

            if ($('.sidebar').hasClass('is-close')) {
                if ($(this).parent('.sidebar__nav-list-item').hasClass('is-open')) {
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
    if ($('.sidebar__close-btn').length) {
        $('.sidebar__close-btn').click(function (e) {
            e.preventDefault();

            // Close all active sub list on close
            $('.is-open .sidebar__nav-list--inner').css("display", "none");
            $('.sidebar__nav-list-item').removeClass('is-open');

            $(this).parent('.sidebar').toggleClass('is-close');
            $('main').toggleClass('sidebar-is-close');
        });
    }

    // Hover subitem for shorten width sidebar
    if ($('.sidebar__nav-list-item--main').length) {
        $('.sidebar__nav-list-item--main').hover(
            function (e) {
                if ($('.sidebar.is-close').length) {
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
                        'display': 'block',
                        'position': 'fixed',
                        'top': topPos + 'px',
                        'left': sidebarWidth + 'px'
                    });
                }
            },
            function (e) {
                if ($('.sidebar.is-close').length) {
                    var element = $(this);
                    var subitem = element.find('.sidebar__nav-list--inner');
                    subitem.css({
                        'display': 'none',
                        'position': 'initial',
                        'top': 'initial',
                        'left': 'initial'
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
        for (j = 0; j < ll; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
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
        a.addEventListener("click", function (e) {
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
        if (storageModeVal == 'dark') {
            mode.addClass('theme_mode--dark');
            main_content.addClass('dark-mode');
        }
    }

    mode.click(function () {
        //set localstorage theme_mode
        if (storageModeVal !== null) {
            if (storageModeVal == 'dark') {
                localStorage.removeItem("theme_mode");
            }
        } else {
            localStorage.setItem("theme_mode", "dark");
        }

        $(this).toggleClass('theme_mode--dark');
        $(this).hasClass('theme_mode--dark') ? main_content.addClass('dark-mode') : main_content.removeClass('dark-mode');

        setTimeout(function () {
            $('.menuToggler, .sidebar').removeClass('is-active');
        }, 300);
    })
}

function headerNav() {
    let toggler = $('.menuToggler');
    let nav_menu = $('.sidebar');
    let nav_menu_close = $('.sidebar__nav-line');
    let notice = $('.notice');

    toggler.click(function () {
        $(this).toggleClass('is-active');

        if ($(this).hasClass('is-active')) {
            nav_menu.addClass('is-active');
            notice.addClass('is-active');
        } else {
            nav_menu.removeClass('is-active');
        }
    });

    nav_menu_close.click(function () {
        nav_menu.removeClass('is-active');
        toggler.removeClass('is-active');
        notice.removeClass('is-active');
    })
}

function quickLinks() {
    $('.quick-links__item').hover(function (e) {
        var hoverIcon = $(this).find('.quick-links__item-icon--hover').attr('data-src');
        $(this).find('.quick-links__item-icon--hover').attr('src', hoverIcon);
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
    modal_trigger_add.click(function () {
        modal_container.addClass('is-active');
        modal_box.removeClass('modal__box--edit');

        setTimeout(function () {
            modal_box.addClass('is-active modal__box--add');
            modal_title.text('Add your Bank Account');
        }, 200);
    });

    // EDIT Modal
    modal_trigger_edit.click(function () {
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

        setTimeout(function () {
            modal_box.addClass('is-active modal__box--edit');
            modal_title.text('Edit your Bank Account');
        }, 200);
    });


    // Close modal
    btn_cancel.click(function () {
        modal_box.removeClass('is-active');

        // Reset Modal Field
        m_bank_name.val('');
        m_account_number.val('');
        m_country.val('');
        m_branch_name.val('');
        m_swift_code.val('');
        m_iban.val('');

        setTimeout(function () {
            modal_container.removeClass('is-active');
        }, 700);
    });


    // Common modal control for showing content item
    if ($('.js--modal-control').length) {
        let modalControl = $('.js--modal-control');
        let modalClose = $('.js--modal-close');
        let modalTitle = $('.modal__header-title');
        let modalContentItem = $('.modal__content-item');

        $(modalControl).click(function (e) {
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
            $('.' + currContentId).addClass('is-active');

            // Show Modal
            if ($('.' + currContentId).length) {
                modal_container.addClass('is-active');
                setTimeout(function () {
                    modal_box.addClass('is-active');
                }, 200);
            }
        });

        $(modalClose).click(function (e) {
            modal_box.removeClass('is-active');
            setTimeout(function () {
                modal_container.removeClass('is-active');
            }, 700);
        });
    }

    // Signup privacy policy modal control
    if ($('.js--privacy-modal-control').length) {
        let modalControl = $('.js--privacy-modal-control');
        let modalClose = $('.modal__close-btn');

        // Show Modal
        $(modalControl).click(function (e) {
            e.preventDefault();
            modal_container.addClass('is-active');
            setTimeout(function () {
                modal_box.addClass('is-active');
            }, 200);
        });

        // Close Modal
        $(modalClose).click(function (e) {
            modal_box.removeClass('is-active');
            setTimeout(function () {
                modal_container.removeClass('is-active');
            }, 700);
        });
    }

    // Common modal control for page modal
    if ($('.js--page-modal-control').length) {
        let pageModalControl = $('.js--page-modal-control');
        let pageModal = $('.page-modal');
        let pageModalClose = $('.page-modal__close-btn');
        let pageModalItem = $('.page-modal__item');
        let pageModalBox = $('.page-modal__box');

        $(pageModalControl).click(function (e) {
            e.preventDefault();

            // get modal content title and content unique identifier
            var currModalItem = '';
            currModalItem = $(this).attr('data-modal');
            currModalItem = '.' + currModalItem;

            // Reset active modal item
            $(pageModalItem).removeClass('is-active');

            // Show Modal
            pageModal.addClass('is-active');
            $(currModalItem).addClass('is-active');

            setTimeout(function () {
                $(pageModalBox).addClass('is-active');
            }, 200);
        });

        $(pageModalClose).click(function (e) {
            pageModalBox.removeClass('is-active');
            pageModal.removeClass('is-active');
            setTimeout(function () {
                pageModalItem.removeClass('is-active');
            }, 400);
        });
    }

}

function bankList() {
    let delete_btn = $('.data__cta-btn--delete');

    delete_btn.each(function () {
        $(this).click(function () {
            $(this).parents('.data__list__item').remove();
        })
    })
}

function tabularControl() {
    if ($('.js--tab').length && $('.js--tab-control').length) {
        $('.js--tab-control').click(function (e) {
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
            setTimeout(function () {
                $('.tabular__tab-wrapper').animate({ scrollLeft: item_location }, 1000);
            }, 400);
        }
    }
}

function checkView() {
    let target = $('.is-animated');
    let scroll_position = $(this).scrollTop();
    let viewport = scroll_position + $(window).height();

    $.each(target, function () {
        let offset_distance = 150;
        let elem_position = $(this).offset().top;
        let target_position = elem_position + offset_distance;

        viewport > target_position ? $(this).addClass('is-active') : $(this).removeClass('is-active');
    });
}

function loginField() {
    let pass_toggler = $('.pass-toggler');

    pass_toggler.click(function () {
        let pass_parent = $(this).parent('.pass-toggler-parent');
        let pass_input = pass_parent.find('input');

        pass_parent.toggleClass('is-open');
        pass_parent.hasClass('is-open') ? pass_input.attr('type', 'text') : pass_input.attr('type', 'password');
    })
}

function profileMobileTabControl() {
    if ($('.js--mobile-profile-control').length) {
        $('.js--mobile-profile-control').click(function (e) {
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
    if ($('.notification').length && $('.js--notif-close').length) {
        $('.js--notif-close').click(function (e) {
            e.preventDefault();
            var currControl = $(this);
            var currParent = $(currControl).parent('.notification')
            $(currParent).fadeOut(200, function () {
                $(currParent).remove();
            });
        });
    }
}

function resetClosedNav() {
    if ($("main").hasClass("sidebar-is-close")) {
        $('main').removeClass('sidebar-is-close');
    }

    if ($(".sidebar").hasClass("is-close")) {
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

    if (isTablet()) {
        viewport.attr('content', 'width=1440, initial-scale=1, shrink-to-fit=yes');
    } else if (isMobile()) {
        viewport.attr('content', 'width=360, initial-scale=1, shrink-to-fit=yes');
    } else {
        viewport.attr('width=device-width, initial-scale=1, shrink-to-fit=no');
    }
}

function initTel() {
    if ($('#intlTelInput').length) {
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

    if (filter_sort.length || filter_time.length) {

        // Sort
        filter_sort.each(function () {
            let trigger = $(this).find('.controls__filter-text, .controls__filter-icon');

            trigger.click(function () {
                $(this).parent().toggleClass('is-active');
            });
        });

        // GMT
        filter_time.each(function () {
            $(this).click(function () {
                $(this).toggleClass('is-active');
            });
        });

        // Hide dropdown on outside click
        $(document).on('click', function (e) {
            if (!($(e.target).closest(".controls__filter--sort").length > 0)) {
                filter_sort.removeClass('is-active');
            }

            if (!($(e.target).closest(".controls__filter--time").length > 0)) {
                filter_time.removeClass('is-active');
            }
        });
    }
}

function depositMobileView() {
    if ($('.js--deposit-item'.length)) {
        $('.js--deposit-item').click(function (e) {
            $('.deposit__method').addClass('d-mobile-none')
            $('.deposit__content').removeClass('d-mobile-none');
        });

        $('.deposit__content__item-back').click(function (e) {
            $('.deposit__method').removeClass('d-mobile-none');
            $('.deposit__content').addClass('d-mobile-none');
        });
    }
}

function passwordVisToggle() {
    if ($('.password-vis-toggle'.length)) {
        $('.password-vis-toggle').click(function (e) {
            $(this).toggleClass('is-active');
            if ($(this).hasClass('is-active')) {
                $(this).prev().prop("type", "text");
            } else {
                $(this).prev().prop("type", "password");
            }
        });
    }
}



function tabLink() {
    if ($('.tab-link__nav-item').length && $('.tab-link__content-item').length) {
        $('.tab-link__nav-item').click(function (e) {
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
    if ($('.custom-upload__input').length && $('.custom-upload__text').length) {
        $('input[type="file"]').change(function (e) {
            var fileName = e.target.files[0].name;
            $('.custom-upload__text').text(fileName);
        });
    }
}

function appSurvey() {
    let survey = $('.survey');

    if (survey.length) {
        let servey_item = $('.survey__box__scoreboard-item');

        servey_item.each(function () {
            $(this).click(function () {
                servey_item.not($(this)).removeClass('is-active');
                $(this).toggleClass('is-active');
            })
        })
    }
}

function homeNews() {
    let home_news = $('#home_news');

    if (home_news.length) {
        function format_date(date_string) {
            let date_obj = new Date(date_string);
            let month_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let month = month_arr[date_obj.getMonth()];
            let date_num = date_obj.getDate();
            date_num = date_num.length == 1 ? `0${date_num}` : date_num;
            let year = date_obj.getFullYear();

            return `${month} ${date_num}, ${year}`;
        }

        // NEWS ARTICLE - WP REST API
        let cat_list = new Array();
        let get_post_excat = (cat_id, page_num, per_page) => {
            fetch(`https://blueberrymarkets.com/market-analysis/news/wp-json/wp/v2/posts?_embed&page=${page_num}&per_page=${per_page}&categories_exclude=${cat_id}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (posts) {
                    // console.log(posts);

                    if (posts) {
                        posts.forEach(function (post) {
                            let date_time = post.date.split('T');
                            let date_created = format_date(date_time[0]);
                            let thumbnail = post._embedded['wp:featuredmedia'][0].source_url;

                            let cat_names = new Array();

                            post.categories.forEach(function (cat_id) {
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
                .then(function (response) {
                    return response.json();
                })
                .then(function (categories) {
                    // console.log(categories);

                    if (categories) {
                        categories.forEach(function (category) {
                            let cat_id = category.id;
                            let cat_name = category.name;
                            let cat_link = category.link;

                            cat_list[cat_id] = {
                                'cat_name': cat_name,
                                'cat_link': cat_link
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
    if (calendar.length) {
        $(calendar).daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            minYear: 2000,
            maxYear: parseInt(moment().format('YYYY'), 10)
        }, function (start, end, label) {
            var years = moment().diff(start, 'years');
        });
    }
}

function dateRange() {
    var calendarRangePicker = $('.js--date-range-picker');
    if (calendarRangePicker.length) {
        calendarRangePicker.click(function (e) {
            e.preventDefault();
        });
        calendarRangePicker.daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear'
            }
        });
        calendarRangePicker.on('apply.daterangepicker', function (ev, picker) {
            $(this).find('.date-range-val').text(picker.startDate.format('MMM DD') + ' - ' + picker.endDate.format('MMM DD'));
        });
        calendarRangePicker.on('cancel.daterangepicker', function (ev, picker) {
            $(this).find('.date-range-val').text('Date');
        });
    }
}

function notifPage() {
    var notifView = $('.notifications__inner-view');
    if (notifView.length) {
        $(notifView).click(function (e) {
            e.preventDefault();
            $(this).parents('.notifications__inner-item').addClass('viewed');
            $(this).fadeOut(200);
            setTimeout(function () {
                $(this).remove();
            }, 200);
        });
    }

    var notifFave = $('.notifications__inner-fave');
    if (notifFave.length) {
        $(notifFave).click(function (e) {
            e.preventDefault();
            $(this).parents('.notifications__inner-item').toggleClass('is-fave');
            $(this).toggleClass('is-active');
        });
    }
}

function copyToClipboard() {
    if ($('#copy-link-input').length) {
        var inputText = $('#copy-link-input')[0];
        var inputBtn = $('#copy-link-btn')[0];
        var inputToolTip = $('#copy-link-tooltip');
        $(inputBtn).on('click', function (e) {
            inputText.select();
            inputText.setSelectionRange(0, 99999);
            document.execCommand("copy");
            inputToolTip.addClass('is-active');
            setTimeout(function () { inputToolTip.removeClass('is-active'); }, 3000)
        });
    }
}

function snsButton() {
    var snsItem = $('.sns__item');
    if ($(snsItem).length) {
        $(snsItem).each(function (e) {
            var dataLink = $(this).attr('data-link');
            var dataText = $(this).attr('data-text');
            if (dataLink) {
                dataLink = encodeURIComponent(dataLink);
                dataText = encodeURIComponent(dataText);

                // Whats App
                if ($(this).hasClass('sns__item--whatsapp')) {
                    $(this).attr('href', 'https://web.whatsapp.com/send?text=' + dataLink);
                }

                // Twitter
                else if ($(this).hasClass('sns__item--twitter')) {
                    $(this).attr('href', 'https://twitter.com/intent/tweet?text=' + dataText + '%20' + dataLink);
                }

                // Facebook
                else if ($(this).hasClass('sns__item--fb')) {
                    $(this).attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + dataLink);
                }

                // Mail
                else if ($(this).hasClass('sns__item--mail')) {
                    $(this).attr('href', 'mailto:?body=' + dataLink + '&subject=' + dataText);
                }

                // Telegram
                else if ($(this).hasClass('sns__item--telegram')) {
                    $(this).attr('href', 'https://telegram.me/share/url?url=' + dataLink + '&text=' + dataText);
                }

                else {

                }

            }
        });
    }
}

function validatePass(pass, confPass) {
    if (pass != '' && confPass != '' && pass == confPass) {
        return true;
    } else {
        return false;
    }
}

function accountForms() {
    // Edit account form validation
    if ($('.form--edit-account').length) {
        var editAccntForm = $('.form--edit-account');
        var editAccntPass = $('#account_new_password');
        var editAccntConfirmPass = $('#account_confirm_password');
        var editAccntSubmit = $('.edit-account-btn');

        editAccntSubmit.click(function (e) {
            e.preventDefault();
            var confirmPassStatus = validatePass(editAccntPass.val(), editAccntConfirmPass.val());

            // Validate Each Field
            $('.form--edit-account input').each(function (index) {
                var checkType = $(this).attr('type');
                var checkVal = $(this).val();
                // Text
                if (checkType == 'text' && checkVal == '') {
                    $(this).parent('.form__field-input').addClass('has-error');
                    // Confirm Password
                } else if (checkType == 'password' && $(this).hasClass('js--confirm-pass') && confirmPassStatus == false) {
                    $(this).parent('.form__field-input').addClass('has-error');
                    // Password
                } else if (checkType == 'password' && checkVal == '') {
                    $(this).parent('.form__field-input').addClass('has-error');
                } else {
                    $(this).parent('.form__field-input').removeClass('has-error');
                }
            });

            // Submit if has no error
            if (!$('.form--edit-account .has-error').length) {
                editAccntForm.removeClass('has-form_error');
                editAccntForm.submit();
            } else {
                editAccntForm.addClass('has-form_error');
            }

        });
    }

    // Create account form validation
    if ($('.form--create-account').length) {
        var createAccntForm = $('.form--create-account');
        var createAccntSubmit = $('.create-account-btn');

        createAccntSubmit.click(function (e) {
            e.preventDefault();

            // Validate Each Field
            $('.form--create-account select').each(function (index) {
                var checkVal = $(this).val();
                if (checkVal == '') {
                    $(this).parents('.form__field-input').addClass('has-error');
                } else {
                    $(this).parents('.form__field-input').removeClass('has-error');
                }
            });

            // Submit if has no error
            if (!$('.form--create-account .has-error').length) {
                createAccntForm.removeClass('has-form_error');
                if(window.dataLayer) {
                    dataLayer.push({'event': 'add-account'});
                } 
                //createAccntForm.submit();
            } else {
                createAccntForm.addClass('has-form_error');
            }

        });
    }
}

function limitCharacters(obj, limit) {
    var characters = $(obj).val();
    var length = characters.length;
    if (length > limit) {
        $(obj).val(characters.substr(0, limit));
    }
}

function depositForms() {
    var amountInput = $('.deposit__input');
    var amountRadio = $('.deposit__amount-selection__radio');
    var acceptTerms = $('.deposit__confirm-amount input[type="checkbox"]');
    var amountProceed = $('.deposit__proceed-btn');

    // Amount radio
    amountRadio.click(function (e) {
        var selectedAmount = $(this).val();
        if (selectedAmount != '' && amountInput.length) {
            amountInput.val(selectedAmount);
        }
    });

    // Numbers only
    amountInput.keypress(function (e) {
        amountRadio.prop('checked', false);
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    // Paste numbers only
    amountInput.on('input', function (e) {
        var currentVal = $(this).val();
        var numbersOnly = currentVal.replace(/[^0-9]/g, "");
        $(this).val(numbersOnly);
    });

    // Max 8 numbers only
    amountInput.on('keyup keypress', function (e) {
        limitCharacters($(this), 8);
    })

    // Input Validation
    amountProceed.click(function (e) {
        e.preventDefault();
        $('.deposit__input-wrapper input').each(function (index) {
            var checkType = $(this).attr('type');
            var checkVal = $(this).val();
            if (checkType == 'checkbox' && $(this).prop("checked") == false) {
                $(this).parents('.deposit__input-wrapper').addClass('has-error');
            } else if (checkType == 'text' && checkVal == '') {
                $(this).parents('.deposit__input-wrapper').addClass('has-error');
            } else {
                $(this).parents('.deposit__input-wrapper').removeClass('has-error');
            }
        });
    });

    // Terms checkbox custom validation
    acceptTerms.click(function (e) {
        if ($(this).prop("checked") == false) {
            $(this).parents('.deposit__input-wrapper').addClass('has-error');
        } else {
            $(this).parents('.deposit__input-wrapper').removeClass('has-error');
        }
    });

}

function commonFormValidation() {
    if ($('.js--form-validation').length) {
        $('.js--form-validation').each(function (index) {
            var currentForm = $(this);
            var emailRegex = /^([+\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

            // Submit Form event
            currentForm.on('submit', function (e) {
                //e.preventDefault();
                currentForm.find('.js--input-validate').each(function (index) {
                    var currentInput = $(this);
                    var checkType = currentInput.attr('type');
                    var checkVal = currentInput.val();

                    // select
                    if (currentInput.is("select") && checkVal == '') {
                        currentInput.parents('.form__field-input').addClass('has-error');
                    }
                    // text
                    else if (checkType == 'text' && checkVal == '') {
                        currentInput.parents('.form__field-input').addClass('has-error');
                    }
                    // textarea
                    else if (currentInput.is("textarea") && checkVal == '') {
                        currentInput.parents('.form__field-input').addClass('has-error');
                    }
                    // checkbox
                    else if (checkType == 'checkbox' && currentInput.prop("checked") == false) {
                        currentInput.parents('.form__field-input').addClass('checkbox-has-error');
                        currentInput.next('.custom-checkbox__mark').addClass('has-error');
                    }
                    // email
                    else if (checkType == 'email' && checkVal == '') {
                        currentInput.parents('.form__field-input').addClass('has-error');
                    }
                    else if (checkType == 'email' && checkVal != '' && emailRegex.test(checkVal) == false) {
                        currentInput.parents('.form__field-input').addClass('has-error');
                    }
                    // remove error class
                    else {

                        // remove error class for each type
                        if (checkType == 'checkbox') {
                            currentInput.parents('.form__field-input').removeClass('checkbox-has-error');
                            currentInput.next('.custom-checkbox__mark').removeClass('has-error');
                        } else {
                            currentInput.parents('.form__field-input').removeClass('has-error');
                        }

                    }
                });

                // Submit if has no error
                if (!currentForm.find('.has-error').length) {
                    currentForm.removeClass('has-form_error');
                } else {
                    currentForm.addClass('has-form_error');
                    return false;
                }

            });
        });
    }
}

function signUpValidation() {
    if ($('.js--signup-validation').length) {
        $('.js--signup-validation').each(function (index) {
            var currentForm = $(this);
            var emailRegex = /^([+\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

            // Submit Form event
            currentForm.on('submit', function (e) {
                //e.preventDefault();
                currentForm.find('.js--signup-input-validate').each(function (index) {
                    var currentInput = $(this);
                    var checkType = currentInput.attr('type');
                    var checkVal = currentInput.val();

                    // email
                    if (checkType == 'email' && checkVal == '') {
                        currentInput.parents('.web-signup__form-row').addClass('has-error');
                    }
                    else if (checkType == 'email' && checkVal != '' && emailRegex.test(checkVal) == false) {
                        currentInput.parents('.web-signup__form-row').addClass('has-error');
                    }

                    // password
                    else if (checkType == 'password' && checkVal == '') {
                        currentInput.parents('.web-signup__form-row').addClass('has-error');
                        if(currentInput.attr('id') == 'signup-confirm-password') {
                            currentInput.parents('.web-signup__form-row').find('.form__field-error').text('Please confirm password');
                        }
                    }

                    // confirm password
                    else if (checkType == 'password' && checkVal != '' && currentInput.attr('id') == 'signup-confirm-password' && checkVal != $('#signup-password').val()) {
                        currentInput.parents('.web-signup__form-row').addClass('has-error');
                        currentInput.parents('.web-signup__form-row').find('.form__field-error').text('Password does not match');

                    }

                    // remove error class
                    else {
                        currentInput.parents('.web-signup__form-row').removeClass('has-error');
                    }
                });

                // Submit if has no error
                if (!currentForm.find('.has-error').length) {
                    currentForm.removeClass('has-form_error');
                } else {
                    currentForm.addClass('has-form_error');
                    return false;
                }

            });
        });
    }
}

function agreeValidation() {
    $('.js--agree').click(function(e){
        var currSubmit = $(this).parents('form').find('.btn--form-submit');
        if($(this).prop("checked") == false) {
            currSubmit.addClass('is-disabled');
        } else {
            currSubmit.removeClass('is-disabled');
        }
    });
}

function mobileSearchField() {
    $('.js--mobile-search-field, .js--search-cancel').click(function(e){
        e.preventDefault();
        $('.header__search').toggleClass('is-active');
        $('#search__form #s').val('');
    });
}

function searchDropDown() {
    var searchInput = $('#search__form #s');
    var typingTimer;
    var typingInterval = 800;

    searchInput.on('keyup', function (e) {
        var currSearchVal = $(this).val();
        clearTimeout(typingTimer);

        // if field is empty hide dropdown
        if(currSearchVal == '') {
            $('.search__dropdown, .search__dropdown__loader, .search__dropdown__content').removeClass('is-active');
        } else {
            $('.search__dropdown, .search__dropdown__loader').addClass('is-active');
            $('.search__dropdown__content').removeClass('is-active');

            typingTimer = setTimeout(function(evt){
                // Show results here
                $('.search__dropdown__loader').removeClass('is-active');
                $('.search__dropdown__content').addClass('is-active');
               
            }, typingInterval);
        }   
    });

    //on keydown, reset countdown
    searchInput.on('keydown', function (e) {
        clearTimeout(typingTimer);
    });
}

function questionnaire() {
    if ($('.questionnaire__group').length) {
        var retryStatus = $('.questionnaire.retry');
        var failedStatus = $('.questionnaire.failed');
        var group = $('.questionnaire__group');
        var groupCount = parseInt(group.length);
        var topWarningCon = $('.questionnaire__warning');
        var loaderCon = $('.questionnaire__loader');
        var progressBar = $('.questionnaire__loader-progress');
        var listCon = $('.questionnaire__list');
        var btnBack = $('.questionnaire__btn-back');
        var btnNext = $('.questionnaire__btn-next');
        var btnRetry = $('.questionnaire__btn-retry');
        var btnSubmit = $('.questionnaire__btn-submit');
        var resultConPassed = $('.questionnaire__result.passed');
        var resultConRetry = $('.questionnaire__result.retry');
        var resultConFailed = $('.questionnaire__result.failed');
        var topRemainingQuiz = $('.questionnaire__warning .questionnaire__warning-remaining');
        var resultRemainingQuiz = $('.questionnaire__result.retry .questionnaire__warning-remaining');
        
        // Next Btn
        btnNext.click(function(e){
            e.preventDefault();
            var selectedGroup = parseInt($('.questionnaire__group.is-active').attr('data-num'));
            var progressBarWidth = parseInt(progressBar.attr('data-progress'));
            // Validate Fields
            if(questionnaireValidation('questionnaire__group-'+selectedGroup) == true ) {
                if(selectedGroup < groupCount) {
                    group.removeClass('is-active');
                    selectedGroup++;
                    progressBarWidth = progressBarWidth + 25;
                    progressBar.attr('data-progress',progressBarWidth);
                    progressBar.css('width', progressBarWidth+'%');
                    $('.questionnaire__group-'+selectedGroup).addClass('is-active');
    
                    // if last group show submit
                    if(selectedGroup == groupCount) {
                        btnNext.removeClass('is-active');
                        btnSubmit.addClass('is-active');
                    }
                }
    
                if(selectedGroup < groupCount) {
                    btnBack.addClass('is-active');
                    btnBack.parent('.questionnaire__cta').addClass('d-flex-center');
                } else {
                    btnBack.removeClass('is-active');
                    btnBack.parent('.questionnaire__cta').removeClass('d-flex-center');
                }
            }
            
        });

        // Back Btn
        btnBack.click(function(e){
            e.preventDefault();
            var selectedGroup = parseInt($('.questionnaire__group.is-active').attr('data-num'));
            var progressBarWidth = parseInt(progressBar.attr('data-progress'));
            group.removeClass('is-active');
            selectedGroup--;
            progressBarWidth = progressBarWidth - 25;
            progressBar.attr('data-progress',progressBarWidth);
            progressBar.css('width', progressBarWidth+'%');
            $('.questionnaire__group-'+selectedGroup).addClass('is-active');
            if(selectedGroup < 2) {
                btnBack.removeClass('is-active');
                btnBack.parent('.questionnaire__cta').removeClass('d-flex-center');
            }
        });

        // Retry Btn
        btnRetry.click(function(e){
            e.preventDefault();
            var currentRemainingQuiz = parseInt(resultRemainingQuiz.text());
            var newRemainingQuiz = currentRemainingQuiz - 1;
            console.log(currentRemainingQuiz+':'+newRemainingQuiz);
            topRemainingQuiz.text(newRemainingQuiz);
            resultRemainingQuiz.text(newRemainingQuiz);
            resultConRetry.removeClass('is-active');
            btnRetry.removeClass('is-active');
            group.removeClass('is-active');

            // Reset fields
            $('.questionnaire__input-wrapper select').prop('selectedIndex', 0).val();
            $('.questionnaire__input-wrapper input[type=radio]').prop('checked', false);
            $('.select-selected').text('Select your answer');
            
            $('.questionnaire__group-1').addClass('is-active');
            progressBar.attr('data-progress','25');
            progressBar.css('width', '25%');

            topWarningCon.addClass('is-active');
            loaderCon.addClass('is-active');
            listCon.addClass('is-active');
            btnNext.addClass('is-active');
            
        });

        // Submit Btn
        btnSubmit.click(function(e){
            e.preventDefault();
            var selectedGroup = parseInt($('.questionnaire__group.is-active').attr('data-num'));
            // Validate Fields
            if(questionnaireValidation('questionnaire__group-'+selectedGroup) == true ) {
                topWarningCon.removeClass('is-active');
                loaderCon.removeClass('is-active');
                listCon.removeClass('is-active');
                btnSubmit.removeClass('is-active');
    
                // Retry and Failed Conditions
                if(retryStatus.length || failedStatus.length) {
                    
                    var currentRemainingQuiz = parseInt(resultRemainingQuiz.text());

                    // Retry
                    if(currentRemainingQuiz >= 1) {
                        resultRemainingQuiz.html(currentRemainingQuiz);
                        resultConRetry.addClass('is-active');
                    } 
                    
                    // Failed
                    else {
                        resultRemainingQuiz.html(currentRemainingQuiz);
                        resultConFailed.addClass('is-active');
                    }

                } 
                
                // Success
                else {
                    resultConPassed.addClass('is-active');
                }
            }
        });

    }
}

function questionnaireValidation(groupTarget) {
    var targetItem = $('.'+groupTarget+' .questionnaire__item');
    var targetField = $('.'+groupTarget+' .questionnaire__input-field');
    var fieldCount = targetItem.length;
    var validField = 0;
    targetItem.addClass('error')
    targetField.each(function (index) {
        var currentInput = $(this);
        var checkVal = currentInput.val();

        // SELECT
        if (currentInput.is("select") && checkVal != '') {
            validField++;
            currentInput.parents('.questionnaire__item').removeClass('error');
        } 
        
        // RADIO
        if (currentInput.is(":radio") && currentInput.prop("checked") == true) {
            validField++;
            currentInput.parents('.questionnaire__item').removeClass('error');
        } 

    });

    if(fieldCount == validField) {
        return true;
    } else {
        return false
    }
}

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


// Signup registration button
function onSignupAccountCreation() {
    $(document).on('submit', '#accountSignUp', function (e) {
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