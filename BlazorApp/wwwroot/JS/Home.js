setTimeout(function () {
	$(document).ready(function () {
		alert("kdafak");
		$('#LocationDropdown').on('change', function () {

			//SaveTime();
			let locationId = $(this).val();
			let Name = $('#LocationDropdown option:selected').text();
			console.log(`locationid : ${locationId} and Name : ${Name}`);
			sessionStorage.setItem("Search_Location", locationId);
			sessionStorage.setItem("Location_Name", Name);
		});
	})
}, 500);
