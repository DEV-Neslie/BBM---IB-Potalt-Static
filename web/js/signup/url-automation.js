
function cameFromSearchEngine(v, details) {
	var url = new URL(v);
	const protocol = url.protocol;  // "http:"
	const hostname = url.hostname;  // "aaa.bbb.ccc.com"
	const pathname = url.pathname;  // "/asdf/asdf/sadf.aspx"
	const search = url.search;    // "?blah"
	for (const queryParamName of details.search)
		if (hostname.startsWith(details.domain + '.') || hostname.includes('.' + details.domain + '.')) return true;	
	return false;
}
	
function isOrganic(v)
{
	try {
		const organicEngines = [ 
			{
				domain: 'google', 
				search: ['q' ]
			},
			{ 
				domain: 'yahoo', 
				search: ['p' ]
			},
			{
				domain: 'bing', 
				search: ['q' ]
			},
			{
				domain: 'duckduckgo', 
				search: ['q' ]
			},
			{
				domain: 'baidu', 
				search: ['wd', 'word']
			},
			{
				domain: 'aol', 
				search: ['encquery', 'q', 'query']
			},
			{
				domain: 'ask', 
				search: ['q']
			},
			{
				domain: 'yandex', 
				search: ['text']
			}
		];
		for (const details of organicEngines)
			if (cameFromSearchEngine(v, details)) return true;
	} catch (e)
	{
	}
	return false;
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    setCookie(name,"",-1);
}
function getArrayValue(arr, key, def)
{
	if (key in arr) return arr[key];
	return def;
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
	return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
	return uri + separator + key + "=" + value;
  }
}

function getUtmValFromLink(_link, utmName, defaultVal)
{
	const find = 'data-' + utmName;
	if (!_link.hasAttribute(find))
		return defaultVal;
	return _link.getAttribute(find);
}

function varIsString(v) 
{
	return typeof v === 'string' || v instanceof String;
}


try {
	var urlParams = (function(a) {
		if (a == "") return {};
		var b = {};
		for (var i = 0; i < a.length; ++i)
		{
			var p=a[i].split('=', 2);
			if (p.length == 1)
				b[p[0]] = "";
			else
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})(window.location.search.substr(1).split('&'));

	if (('utm_source' in urlParams) && (getCookie('utm_source') == null))
		setCookie('utm_source', urlParams['utm_source'], 365*3);

	if (('utm_medium' in urlParams) && (getCookie('utm_medium') == null))
		setCookie('utm_medium', urlParams['utm_medium'], 365*3);

	if (('utm_campaign' in urlParams) && (getCookie('utm_campaign') == null))
		setCookie('utm_campaign', urlParams['utm_campaign'], 365*3);

	//if (('utm_term' in urlParams) && (getCookie('utm_term') == null))
		//setCookie('utm_term', urlParams['utm_term'], 365*3);
	//setCookie('utm_term', document.referrer, 365*3);

	if (('utm_content' in urlParams) && (getCookie('utm_content') == null))
		setCookie('utm_content', urlParams['utm_content'], 365*3);

	if (('utm_channel' in urlParams) && (getCookie('channel') == null))
		setCookie('channel', urlParams['utm_channel'], 365*3);

	if (('channel' in urlParams) && (getCookie('channel') == null))
		setCookie('channel', urlParams['channel'], 365*3);

	if (('utm_partner' in urlParams) && (getCookie('partner') == null))
		setCookie('partner', urlParams['utm_partner'], 365*3);

	if (('partner' in urlParams) && (getCookie('partner') == null))
		setCookie('partner', urlParams['partner'], 365*3);

	// Figure out UTMs
	const default_utm_value = isOrganic(document.referrer) ? 'organic' : 'Direct';
	setCookie('default_utm_value', default_utm_value, 365*3);
	var utm_source_val = getCookie('utm_source') ?? default_utm_value;
	var utm_medium_val = getCookie('utm_medium') ?? '';
	var utm_campaign_val = getCookie('utm_campaign') ?? '';
	var utm_term_val = document.referrer ?? '/';
	var utm_content_val = getCookie('utm_content') ?? '';
	var channel_val = getCookie('channel') ?? '';
	var partner_val = getCookie('partner') ?? '';

	var refer_val = (urlParams['refer'] ?? getCookie('refer')) ?? '';
	var cxd_val = urlParams['cxd'] ?? '';
	
	if (!varIsString(utm_source_val) || utm_source_val.trim() == '') utm_source_val = default_utm_value;
	if (!varIsString(utm_term_val) || utm_term_val.trim() == '') utm_term_val = '/';
	
	window.liveChatUtmParams = [
		{ 	name: "utm_source", value: utm_source_val },
		{ 	name: "utm_medium", value: utm_medium_val },
		{ 	name: "utm_campaign", value: utm_campaign_val },
		{ 	name: "utm_term", value: utm_term_val },
		{ 	name: "utm_content", value: utm_content_val }
	];

	setTimeout(function() {
		try {
			var links = document.querySelectorAll("a");
			for(var i = 0, len = links.length; i < len; i++){
				const _link = links[i];
				var href = _link.href;
				if (
					// href.includes('auth/open-demo') || 
					// href.includes('auth/create-account')
					href.includes('secure.blueberrymarkets.com')
				)
				{
					href = updateQueryStringParameter(href, 'utm_source', getUtmValFromLink(_link, 'utm_source', utm_source_val));
					href = updateQueryStringParameter(href, 'utm_medium', getUtmValFromLink(_link, 'utm_medium', utm_medium_val));
					href = updateQueryStringParameter(href, 'utm_campaign', getUtmValFromLink(_link, 'utm_campaign', utm_campaign_val));
					href = updateQueryStringParameter(href, 'utm_term', getUtmValFromLink(_link, 'utm_term', utm_term_val));
					href = updateQueryStringParameter(href, 'utm_content', getUtmValFromLink(_link, 'utm_content', utm_content_val));
					href = updateQueryStringParameter(href, 'utm_channel', getUtmValFromLink(_link, 'channel', channel_val));
					href = updateQueryStringParameter(href, 'utm_partner', getUtmValFromLink(_link, 'partner', partner_val));
					href = updateQueryStringParameter(href, 'channel', getUtmValFromLink(_link, 'channel', channel_val));
					href = updateQueryStringParameter(href, 'partner', getUtmValFromLink(_link, 'partner', partner_val));
					
					if (refer_val != '')
						href = updateQueryStringParameter(href, 'refer', getUtmValFromLink(_link, 'refer', refer_val));
					
					if (cxd_val != '')
						href = updateQueryStringParameter(href, 'cxd', getUtmValFromLink(_link, 'cxd', cxd_val));
					
					links[i].href = href;
					//console.log('new utm\'d url = ' + href);
				}
			}
		} catch (e) { console.log('UTM error'); console.log(e); }
	}, 500);
} catch (e) { console.log('UTM error'); console.log(e); }