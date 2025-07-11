$(document).ready(function () {


	

	$.ajax({
		
		url: '/ToBooking/ToIncome',
		type: 'GET',

		success: function (data) {
			debugger;
			console.log(data);
			$('#Revenue').text(data);
		},
		error: function () {
			$('#Revenue').text('Error');
		}
	});


	$.ajax({
		url: '/ToBooking/EntriesCar',
		type: 'get',
		success: function (data) {
			$('#CarEntries').text(data);
		},
		error: function () {
			$('#CarEntries').text('Error');
		}
	});

	$.ajax({
		url: '/ToBooking/EntriesBike',
		type: 'get',
		success: function (data) {
			$('#BikeEntries').text(data);
		},
		error: function () {
			$('#BikeEntries').text('Error');
		}
	});

	$.ajax({
		url: '/ToBooking/AllActiveBooking',
		type: 'get',
		success: function (data) {
			$('#ActiveBookings').text(data);
		},
		error: function () {
			$('#ActiveBookings').text('Error');
		}
	});


});