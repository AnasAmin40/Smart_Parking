$(document).ready(function () {
    DataTable();
    CountLocations();

    document.getElementById('userName').textContent = sessionStorage.getItem("Name");


});


function DataTable() {
    $('#Tableid').DataTable({
        processing: true,
        lengthChange: true,
        lengthMenu: [[4, 10, 15, -1], [4, 10, 15, "All"]],
        searching: true,
        paging: true,
        ordering: true,
        ajax: {
            url: '/ToLocation/GetAllLocation',
            type: 'get',
            dataType: 'json',
            dataSrc: '',
        },
        columns: [
            { data: 'parkingLocationId' },
            { data: 'name' },
            { data: 'city' },
            { data: 'totalSlots' },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="btn btn-primary btn-sm " onclick="Edit(' + row.parkingLocationId + ')">Edit</button>';
                }
            }

        ]
    });
}

$('#AddBtn').click(function () {
    $('#LocationModal').modal('show');
    $('#ModalHeading').html("Add New Location");

});

function CloseModal() {
    $('#LocationName').val('');
    $('#CityName').val('');
    $('#TotolSlots').val('');
    $('#LocationModal').modal('hide');
    var table = $('#Tableid').DataTable();
    table.ajax.reload(null, false);
}


function NewLocation() {
    var LocationData = {
        Name: $('#LocationName').val(),
        City: $('#CityName').val(),
        TotalSlots: parseInt($('#TotolSlots').val())
    }

    if (!LocationData.Name || !LocationData.City || !LocationData.TotalSlots) {
        alert('Something Missing');
        return;
    }

    $.ajax({
        url: '/ToLocation/AddLocation',
        type: 'Post',
        data: JSON.stringify(LocationData),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert('Successfully Added');
            CloseModal();
        },
        error: function () {
            alert('Error To New Location!');
        }
    });
}

function Edit(parkingLocationId) {
    $.ajax({
        url: '/ToLocation/GetLocationById?id=' + parkingLocationId,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            $('#LocationId').val(result.parkingLocationId);
            $('#LocationIdHidden').val(result.parkingLocationId);

            $('#LocationModal').modal('show');
            $('#LocationName').val(result.name);
            $('#CityName').val(result.city);
            $('#TotolSlots').val(result.totalSlots);
            $('#ModalHeading').html("Update Location");
            $('#AddLocationBtn').hide();
            $('#UpdateLocationBtn').show();

        },
        error: function () {
            alert('errror');
        }

    });
}

function UpdateLocation() {
    var LocationData = {
        ParkingLocationId: parseInt($('#LocationIdHidden').val()),
        Name: $('#LocationName').val(),
        City: $('#CityName').val(),
        TotalSlots: parseInt($('#TotolSlots').val())
    }

    $.ajax({
        url: '/ToLocation/UpdateLocation',
        type: 'post',
        data: JSON.stringify(LocationData),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert('Successfully Updated');
            CloseModal();
            $('#AddLocationBtn').show();
            $('#UpdateLocationBtn').hide();
        },
        error: function () {
            alert('Error');
        }
    });
}

function CountLocations() {
 
    $.ajax({
        url: '/ToLocation/CountLocation',
        type: 'GET',

        success: function (data) {
            console.log(data);
            $('#totalLocations').text(data);
        },
        error: function () {
            $('#totalLocations').text('Error');
        }
    })
}


