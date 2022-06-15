const get_date_parts = (date_str) => {
    let tmp_date    = new Date(date_str);
    let month       = (tmp_date.getMonth()) + 1;
        month       = month.toString().length == 1 ? `0${month}` : month;
    let date        = tmp_date.getDate();
        date        = date.toString().length == 1 ? `0${date}` : date;
    let year        = tmp_date.getFullYear();
    let day         = tmp_date.getDay();
    let response    = {'month' : month, 'date' : date, 'year' : year, 'day' : day};
    
    return response;
};
const get_add_date  = (date, days, return_type=1, op='+') => {
    let date_parts      = date.split("/");
    let ymd_date        = `${date_parts[2]}-${date_parts[1]}-${date_parts[0]}`;
    let obj_date        = new Date(ymd_date); 
    let obj_sat_date    = null;

    if (op == '+') {
        obj_sat_date    = obj_date.setDate(obj_date.getDate() + days);
    } else {
        obj_sat_date    = obj_date.setDate(obj_date.getDate() - days);
    }
    
    let sat_date_parts  = get_date_parts(obj_sat_date);
    let sat_month       = sat_date_parts['month'];
    let sat_day         = sat_date_parts['date'];
    let sat_year        = sat_date_parts['year'];

    if (return_type == 1) {
        return `${sat_day}/${sat_month}/${sat_year}`;    
    } else {
        return sat_date_parts;
    }
};
const today_obj   = new Date().toDateString();
const today_parts = get_date_parts(today_obj);
let   today       = `${today_parts['date']}/${today_parts['month']}/${today_parts['year']}`;
const yesterday   = get_add_date(today, 1, 1, '-');
const tomorrow    = get_add_date(today, 1, 1, '+');
const sunday      = get_add_date(today, today_parts['day'], 1, '-');
const prev_sunday = get_add_date(sunday, 7, 1, '-');
const next_sunday = get_add_date(sunday, 7, 1, '+');
const weekdays    = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const month_names = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
const local_gmt   = new Date().toTimeString().substring(9, 17);
const gmt         = local_gmt.substring(3,4) + local_gmt.substring(4,6).replace(/\b0+/g, '') + ':' + local_gmt.substring(6)

$(document).ready(function() {
    let auto_tz_time     = get_tz_time(`GMT ${gmt}`);
    $('span.active-gmt-tz').text(`(GMT ${gmt})`.replace(':00', ''));
    $('span.active-gmt-time').text(auto_tz_time['time']);
    $('#div-gmt').data('gmt', `GMT ${gmt}`);
    $('#filter-gmt > li').each(function() {
        $(this).data('value', $(this).attr('data-value')).removeAttr('data-value');
    });

    get_calendar_info();
    init_daterangepicker();

    $(document).on('click', '.filter-importance__item', function() {
        let importance = $.trim($(this).text().toLowerCase());
        let active_imp_cnt = $('.filter-importance__item.is-active').length;
        
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
        } else {
            $(this).addClass('is-active');
        }
        
        search_calendar();
    });

    $(document).on('click', '.custom-checkbox__label > input[type="checkbox"]', function() {
        let checked_session_cnt = $('.custom-checkbox__label > input[type="checkbox"]:checked').length;

        search_calendar();
    });

    $(document).on('keyup', '.controls__search-input', function() {
        search_calendar();
    });

    $(document).on('click', '.controls__filter-text.day-filter', function() {
        $('.controls__filter-text.day-filter.is-active').removeClass('is-active');
        $(this).addClass('is-active');

        get_calendar_info();
    });

    $(document).on('click', '#filter-gmt > li', function() {
        let selected_gmt    = $(this).data('value');
        let gmt_tz_name     = $(this).children('span').text();
        let gmt_tz_time     = get_tz_time(selected_gmt);

        // $('.btn-open-gmt-list').data('gmt', selected_gmt);
        $('#div-gmt').data('gmt', selected_gmt);
        $('span.active-gmt-tz').text(gmt_tz_name);
        $('span.active-gmt-time').text(gmt_tz_time['time']);

        get_calendar_info();
    });
});

const init_daterangepicker = () => {
    $('.calendar-daterangepicker').daterangepicker({
        opens: 'left',
        startDate: moment(format_ymd(sunday)), 
        endDate: moment(format_ymd(get_add_date(sunday, 6)))
    }, function(start, end, label) {
        $('.calendar-date-text').text(`${start.format('MMM DD')} - ${end.format('MMM DD')}`);
        $('.calendar-daterangepicker')
            .data('date_from', start.format('DD/MM/YYYY'))
            .data('date_to', end.format('DD/MM/YYYY'))
    }).on('apply.daterangepicker', function(ev, picker) {
        $('.controls__filter-text.day-filter.is-active').removeClass('is-active');

        get_calendar_info();
    });
}

const get_date_range = () => {
    let date_from   = today;
    let tmp_date_to = date_from;
    let date_to     = get_add_date(date_from, 1);
    let range_type  = 1;

    if ($('.controls__filter-text.day-filter.is-active').length > 0) {
        let source_from_btn = $('.controls__filter-text.day-filter.is-active');
        let day_filter  = $.trim(source_from_btn.text().toLowerCase());
        
        if (day_filter == 'yesterday') {
            date_from   = yesterday;
            tmp_date_to = date_from;
            date_to     = get_add_date(date_from, 1);
        } else if (day_filter == 'tomorrow') {
            date_from   = tomorrow;
            tmp_date_to = date_from;
            date_to     = get_add_date(date_from, 1);
        } else if (day_filter == 'last week') {
            date_from   = prev_sunday;
            date_to     = get_add_date(date_from, 6);
            tmp_date_to = date_to;
            range_type  = 2;
        } else if (day_filter == 'this week') {
            date_from   = sunday;
            date_to     = get_add_date(date_from, 6);
            tmp_date_to = date_to;
            range_type  = 2;
        } else if (day_filter == 'next week') {
            date_from   = next_sunday;
            date_to     = get_add_date(date_from, 6);
            tmp_date_to = date_to;
            range_type  = 2;
        }
    } else {
        date_from   = $('.calendar-daterangepicker').data('date_from');
        date_to     = $('.calendar-daterangepicker').data('date_to');
        tmp_date_to = date_to;
        range_type  = 2;

        if (date_from == date_to) {
            tmp_date_to = date_from;
            date_to     = get_add_date(date_from, 1);
            range_type  = 1;
        }
    }

    return {
        'range_type'    : range_type,
        'date_from'     : date_from,
        'date_to'       : date_to,
        'tmp_date_to'   : tmp_date_to
    }
};
const get_tz_time = (time_zone) => {
    time_zone       = time_zone.replace(/[GMT\s]/g, "");
    time_zone       = (time_zone != "" ? time_zone : "+0:00");
    tz_op           = time_zone.substring(0, 1);
    tz_time_arr     = time_zone.substring(1).split(':');
    tz_hour         = parseInt(tz_time_arr[0]);
    tz_minute       = parseInt(tz_time_arr[1]);

    local_datetime  = new Date();
    local_utcminute = local_datetime.getUTCMinutes();
    new_utc_minute  = null;

    if (tz_op == '+') {
        new_utc_minute = local_utcminute + ((tz_hour * 60) + tz_minute);
    } else {
        new_utc_minute = local_utcminute - ((tz_hour * 60) + tz_minute);
    }
    local_datetime.setUTCMinutes(new_utc_minute)
    utc_hour    = local_datetime.getUTCHours();
    utc_minute  = local_datetime.getUTCMinutes();
    utc_hour    = (utc_hour.toString().length == 1 ? '0' : '') + utc_hour;
    utc_minute  = (utc_minute.toString().length == 1 ? '0' : '') + utc_minute;

    utc_date    = local_datetime.getUTCDate();
    utc_date    = utc_date.toString().length == 1 ? `0${utc_date}` : utc_date;
    utc_year    = local_datetime.getUTCFullYear();
    utc_month   = (local_datetime.getUTCMonth() + 1);

    return {
        'time' : `${utc_hour}:${utc_minute}`,
        'date' : `${utc_date}/${utc_month}/${utc_year}`,
    };
}
const search_calendar = () => {
    let search_text     = $.trim($('.controls__search-input').val()).toLowerCase();
    let sel_impact      = new Array();
    let sel_session     = new Array();

    $('.filter-importance__item.is-active').each(function() {
        sel_impact.push($.trim($(this).text()).toLowerCase());
    });

    $('.filter-session__item input[type="checkbox"]:checked').each(function() {
        sel_session.push($(this).val());
    });

    if (sel_session.length == 4) {
        sel_session.push('tentative');
    }

    if (sel_impact.length > 0 && sel_session.length > 0) {
        $('.item__content').each(function() {
            let item_instance       = $(this);
            let visible_list_item   = 0;
            
            item_instance.find('.data__list').children('.data__list__item').filter(function() {
                let list_item_instance    = $(this);
                let visibility_stat       = false;
                

                let evt_name_data   = search_text =='' ? true : (list_item_instance.children('.data__list__item-col:eq(2)').text().toLowerCase().indexOf(search_text) > -1);
                let importance_data = false;
                let session_data    = false;

                for (let impact of sel_impact) {
                    if (importance_data == false) {
                        importance_data = (list_item_instance.children('.data__list__item-col:eq(0)').children('span.data__level-status').attr('class').indexOf(impact) > -1);
                    } else {
                        break;
                    }
                }

                for (let session of sel_session) {
                    if (session_data == false) {
                        session_data = (list_item_instance.attr('class').indexOf(session) > -1);
                    } else {
                        break;
                    }
                }

                console.log(`${evt_name_data} - ${importance_data} - ${session_data}`);
                if (evt_name_data == true && importance_data == true && session_data == true) {
                    visibility_stat = true;
                }

                list_item_instance.toggle(visibility_stat);

                if (visibility_stat == true) {
                    visible_list_item++;
                }
            });

            if (visible_list_item > 0) {
                item_instance.removeClass('d-none');
            } else {
                item_instance.addClass('d-none');
            }
        });
        
        if ($('.item__content:visible').length == 0) {
            //show no event list message

            $('#div-no-event-msg').removeClass('d-none');
        } else {
            //hide no event list message
            $('#div-no-event-msg').addClass('d-none');
        }
    } else {
        $('.item__content').addClass('d-none');
        $('#div-no-event-msg').removeClass('d-none');
    }
};
const show_loading = () => {
    $('#div-loading-msg').removeClass('d-none');
    $('#div-no-event-msg').addClass('d-none');
    $('#div-calendar-by-date').addClass('d-none').html('');
};
const show_error = () => {
    $('#calendarByDate').html(`<center>Something went wrong.</center>`);
};
const get_event_by_date = (events, date) => {
    return events.filter(
        function(event){ return event[1] == date }
    );
};
const format_ymd = (date_str) => {
    let date_parts      = date_str.split("/");
    
    return `${date_parts[2]}-${date_parts[1]}-${date_parts[0]}`;
};
const to_camel_case = (string) => {
    return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
};

const get_calendar_info = () => {
    let date_range_info = get_date_range();
    let date_from       = date_range_info['date_from'];
    let date_to         = date_range_info['date_to'];
    let range_type      = date_range_info['range_type'];
    let tmp_date_to     = date_range_info['tmp_date_to'];
    let param_gmt       = $('#div-gmt').data('gmt');
    
    let mom_date_from   = moment(format_ymd(date_from));
    let mom_tmp_date_to = moment(format_ymd(tmp_date_to));
    let mom_date_to     = moment(format_ymd(date_to));

    $('.calendar-date-text').text(`${mom_date_from.format('MMM DD')} - ${mom_tmp_date_to.format('MMM DD')}`);
    $('.calendar-daterangepicker')
        .data('date_from', mom_date_from.format('DD/MM/YYYY'))
        .data('date_to', mom_date_to.format('DD/MM/YYYY'))

    if (typeof $('.calendar-daterangepicker').data('daterangepicker') !== 'undefined') {
        $('.calendar-daterangepicker').data('daterangepicker').setStartDate(mom_date_from);
        $('.calendar-daterangepicker').data('daterangepicker').setEndDate(mom_tmp_date_to);
    }

    $.ajax({
        url: 'https://my.staging.blueberrymarkets.com/en/site/getcalendarinfo',
        type: 'POST',
        dataType: 'JSON',
        data: {
            "date_from" : date_from,
            "date_to"   : date_to,
            "gmt"       : param_gmt
        },
        headers : {
            "Authorization": "Basic YmJtZGV2czpKaEFweDI3Z24zZFo="
        },
        beforeSend: function() {
            show_loading();
        },
        success: function(res) {
            let dates = res.dates;
            let events = res.events;

            for (i in dates) {
                if ((range_type == 2) || (range_type == 1 && i == 0)) {
                    let event_list  = get_event_by_date(events, dates[i]);

                    if (event_list.length > 0) {
                        let date_parts  = get_date_parts(format_ymd(dates[i]));
                        let day_index   = date_parts['day'];
                        let month_index = date_parts['month'];
                        let date_num    = date_parts['date'];
                        let year        = date_parts['year'];
                        let day_name    = to_camel_case(weekdays[day_index]);
                        let date_ymd    = `${year} ${to_camel_case(month_names[parseInt(month_index)])} ${date_num}`;

                        $('#div-calendar-by-date').append(`
                            <div class="item__content p-0 m-20">

                                <div class="data">
                    
                                    <div class="data__header">
                    
                                        <div class="data__header__left">
                                            <h5 class="data__header-title">${date_ymd}</h5>
                                        </div>
                    
                                        <div class="data__header__right">
                                            <span class="data__header-date">${day_name}</span>
                                        </div>
                    
                                    </div>
                    
                                    <div class="data__content data__content--calendar">
                                        <div class="data__list__header">
                                            <div class="data__list__item data__list__item--header">
                                                <div class="data__list__item-col">
                                                    <h6 class="data__list__item-label">Time</h6>
                                                </div>
                                                <div class="data__list__item-col">
                                                    <h6 class="data__list__item-label">Currency</h6>
                                                </div>
                                                <div class="data__list__item-col">
                                                    <h6 class="data__list__item-label">Event</h6>
                                                </div>
                                                <div class="data__list__item-col">
                                                    <h6 class="data__list__item-label">Actual</h6>
                                                </div>
                                                <div class="data__list__item-col">
                                                    <h6 class="data__list__item-label">Forecast</h6>
                                                </div>
                                                <div class="data__list__item-col">
                                                    <h6 class="data__list__item-label">Previous</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="data__list" id="data-list">
                                        </div>
                    
                                        <div class="data__content__cta">
                                            <button id="btn--load-more" class="btn btn--blue-outline btn--load-more">Load more</button>
                                        </div>
                    
                                        <div class="pagination">
                                            <ul class="pagination__list">
                                                <li class="pagination__list__item arrow-prev">
                                                    <a href="#" class="pagination__list__item-link"></a>
                                                </li>
                    
                                                <li class="pagination__list__item active">
                                                    <a href="#" class="pagination__list__item-link">1</a>
                                                </li>
                    
                                                <li class="pagination__list__item">
                                                    <a href="#" class="pagination__list__item-link">2</a>
                                                </li>
                    
                                                <li class="pagination__list__item">
                                                    <a href="#" class="pagination__list__item-link">3</a>
                                                </li>
                    
                                                <li class="pagination__list__item ellipses">
                                                    <a href="#" class="pagination__list__item-link">...</a>
                                                </li>
                    
                                                <li class="pagination__list__item arrow-next">
                                                    <a href="#" class="pagination__list__item-link"></a>
                                                </li>
                                            </ul>
                                        </div>
                    
                                    </div>
                    
                                </div>
                    
                            </div>
                        `);

                        build_event_list(event_list);
                        $('#btn--load-more').data('click_count', 1).removeAttr('id');
                    }
                }
                    
            }

            $('#div-loading-msg').addClass('d-none');
            $('#div-calendar-by-date').removeClass('d-none');
            search_calendar();
        },
        error: function() {
            $('#div-loading-msg').addClass('d-none');
            $('#div-no-event-msg').removeClass('d-none');
        },
        failure: function() {
            $('#div-loading-msg').addClass('d-none');
            $('#div-no-event-msg').removeClass('d-none');
        }
    });
};

const build_event_list = (event_list) => {
    let event_ids       = new Array();

    let time_zone       = $('#div-gmt').data('gmt').replace(/[GMT\s]/g, "");
        time_zone       = (time_zone != "" ? time_zone : "+0:00");
    let tz_op           = time_zone.substring(0, 1);
    let tz_time_arr     = time_zone.substring(1).split(':');
    let tz_hour         = parseInt(tz_time_arr[0]);
    let tz_minute       = parseInt(tz_time_arr[1]);

    let convert_to_gmt0 = {
        '+' : function(dt_str) {let tmp_dt_obj = new Date(dt_str); return tmp_dt_obj.setMinutes(tmp_dt_obj.getMinutes() - ((tz_hour * 60) + tz_minute));},
        '-' : function(dt_str) {let tmp_dt_obj = new Date(dt_str); return tmp_dt_obj.setMinutes(tmp_dt_obj.getMinutes() + ((tz_hour * 60) + tz_minute));}
    };
    let convert_to_gmt = {
        '+' : function(dt_str, minutes) {let tmp_dt_obj = new Date(dt_str); return new Date(tmp_dt_obj.setMinutes(tmp_dt_obj.getMinutes() + minutes));},
        '-' : function(dt_str, minutes) {let tmp_dt_obj = new Date(dt_str); return new Date(tmp_dt_obj.setMinutes(tmp_dt_obj.getMinutes() - minutes));}
    };

    event_list.forEach(event_info => {
        let event_id    = event_info[0];
        let date        = event_info[1];
        let time        = event_info[2];
        let country     = event_info[3];
        let currency    = event_info[4];
        let impact      = event_info[5];
        let event_name  = event_info[6];
        let actual      = (event_info[7] == null ? '' : event_info[7]);
        let forecast    = (event_info[8] == null ? '' : event_info[8]);
        let previous    = (event_info[9] == null ? '' : event_info[9]);
        let session_str = '';

        event_dt_str        = format_ymd(date) + 'T' + time + ':00';
        event_dt_obj        = new Date(event_dt_str);
        ldn_event_dt_str    = convert_to_gmt0[tz_op](event_dt_obj);
        ldn_event_dt_obj    = new Date(ldn_event_dt_str);
        syd_event_dt_obj    = convert_to_gmt['+'](ldn_event_dt_obj, (11*60))
        tky_event_dt_obj    = convert_to_gmt['+'](ldn_event_dt_obj, (9*60))
        ny_event_dt_obj     = convert_to_gmt['-'](ldn_event_dt_obj, (5*60))

        ldn_start_time      = new Date(ldn_event_dt_obj.toDateString() + ' 08:00:00');
        ldn_end_time        = new Date(ldn_event_dt_obj.toDateString() + ' 17:00:00');

        syd_start_time      = new Date(syd_event_dt_obj.toDateString() + ' 07:00:00');
        syd_end_time        = new Date(syd_event_dt_obj.toDateString() + ' 16:00:00');

        tky_start_time      = new Date(tky_event_dt_obj.toDateString() + ' 09:00:00');
        tky_end_time        = new Date(tky_event_dt_obj.toDateString() + ' 18:00:00');

        ny_start_time       = new Date(ny_event_dt_obj.toDateString() + ' 08:00:00');
        ny_end_time         = new Date(ny_event_dt_obj.toDateString() + ' 17:00:00');

        if (ldn_event_dt_obj >= ldn_start_time && ldn_event_dt_obj <= ldn_end_time) {
            session_str += 'ldn-';
        }

        if (syd_event_dt_obj >= syd_start_time && syd_event_dt_obj <= syd_end_time) {
            session_str += 'syd-';
        }

        if (tky_event_dt_obj >= tky_start_time && tky_event_dt_obj <= tky_end_time) {
            session_str += 'tky-';
        }

        if (ny_event_dt_obj >= ny_start_time && ny_event_dt_obj <= ny_end_time) {
            session_str += 'ny-';
        }

        if (time == 'Tentative') {
            session_str = 'tentative';
        }

        if ($.inArray(event_id, event_ids) == -1) {
            event_ids.push(event_id);

            let flag            = ``;
            let event_currency  = ``;
            let impact_class    = ``;

            if (currency != null && currency != '') {
                flag            = `<img class="data__country-flag" src="/images/flags/${currency.substring(0,2).toLowerCase()}.svg" alt="${currency} flag">`
                event_currency  = currency;
            }

            if (impact != null && impact != '') {
                impact_class = `--${impact}`;
            }

            $('#data-list').append(`
                <div class="data__list__item ${session_str}">
                    <div class="data__list__item-col">
                        <span class="data__list__item-label">Time</span>
                        <span class="data__list__item-value data__level-status data__level-status${impact_class}">${time}</span>
                    </div>
                    <div class="data__list__item-col">
                        <span class="data__list__item-label">Currency</span>
                        <div class="data__list__item-value data__country">
                            ${flag}
                            <span class="data__country-name">${event_currency}</span>
                        </div>
                    </div>
                    <div class="data__list__item-col">
                        <span class="data__list__item-label">Event</span>
                        <span class="data__list__item-value data__event">${event_name}</span>
                    </div>
                    <div class="data__list__item-col">
                        <span class="data__list__item-label">Actual</span>
                        <span class="data__list__item-value data__list__item-value data__actual">${actual}</span>
                    </div>
                    <div class="data__list__item-col">
                        <span class="data__list__item-label">Forecast</span>
                        <span class="data__list__item-value data__list__item-value data__forecast">${forecast}</span>
                    </div>
                    <div class="data__list__item-col">
                        <span class="data__list__item-label">Previous</span>
                        <span class="data__list__item-value data__list__item-value data__previous">${previous}</span>
                    </div>
                </div>`);
        }

        
    });

    $('#data-list').removeAttr('id');
};