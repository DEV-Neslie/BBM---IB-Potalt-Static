function redirectIfCountry(desiredCountryCode, dest) 
{
	jQuery.ajax({
		url: atob("aHR0cHM6Ly9pcGFwaS5jby9qc29uLz9rZXk9Rldoajc5OWN1WHVNQXUwTXlES256RnNid2R4VzBkZFlzemNRdWIxN0FiTDVEcElkWGE="),
		dataType: "json",
		success: function (location) {
			var country = location.country;
			var countryCode = location.country_code;
			if (countryCode == desiredCountryCode)
				window.location = dest;
		}
   });
}
function redirectIfNotCountry(undesiredCountryCode, dest) 
{
	jQuery.ajax({
		url: atob("aHR0cHM6Ly9pcGFwaS5jby9qc29uLz9rZXk9Rldoajc5OWN1WHVNQXUwTXlES256RnNid2R4VzBkZFlzemNRdWIxN0FiTDVEcElkWGE="),
		dataType: "json",
		success: function (location) {
			var country = location.country;
			var countryCode = location.country_code;
			if (countryCode != undesiredCountryCode)
				window.location = dest;
		}
   });
}

function getLocation(callback) 
{
	jQuery.ajax({
		url: atob("aHR0cHM6Ly9pcGFwaS5jby9qc29uLz9rZXk9Rldoajc5OWN1WHVNQXUwTXlES256RnNid2R4VzBkZFlzemNRdWIxN0FiTDVEcElkWGE="),
		dataType: "json",
		success: function (location) {
			if (callback)
				callback(location);
		}
   });
}