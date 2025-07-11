var LocationOption = '';

$(document).ready(function () {
    DataTable();
    SelectLocation();
});

function DataTable(locationId = '') {
    $('#Tableid').DataTable().clear().destroy();

    $('#Tableid').DataTable({
        processing: true,
        lengthChange: true,
        lengthMenu: [[4, 7, 10,-1], [4, 7, 10,"All"]],
        paging: true,
        searching: true,
        ordering: true,
        ajax: {
            url: '/ToSlots/GetAllSlots',
            type: 'get',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: {
                locationId: locationId
            },
            dataSrc: ''
        },
        columns: [
            { data: 'slotId' },
            { data: 'slotNumber' },
            { data: 'status', render: function (data) { return data ? "Occupied" : "Free" } },
            { data: 'slotType' },
            { data: 'pricePerHour' },
            {
                data: 'parkingLocation',
                render: function (data) {
                    return data && data.name ? data.name : 'No Location';
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="btn btn-primary btn-sm" onclick="Edit(' + row.slotId + ')">Edit</button>';
                }
            }

        ]
    });
}


$('#locationFilter').on('change', function () {
    var selectedLocationId = $(this).val();
    DataTable(selectedLocationId);
});

$('#AddBtn').click(function () {
    $('#Modalid').modal('show');

    $('#SaveBTn').show();
    $('#UpdateBtn').hide();
    $('#ModalHeading').html('Add New Slot');
});

function Close() {
    $('#Modalid').modal('hide');
    $('#slotNumbers').val('');
    $('#status').prop('checked', false);
    $('#slotType').val('');
    $('#PPH').val('');
    $('#parkingLocation').val('');
}

function CloseModal() {
    $('#Modalid').modal('hide');
    var table = $('#Tableid').DataTable();
    table.ajax.reload(null, false);

    $('#slotNumbers').val('');
    $('#status').prop('checked', false);
    $('#slotType').val('');
    $('#PPH').val('');
    $('#parkingLocation').val('');
}

function SelectLocation() {
    return $.ajax({
        url: '/ToLocation/GetAllLocation',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            LocationOption = '<option value"">Select Location</option>';
            $.each(result, function (index, item) {
                LocationOption += '<option value="' + item.parkingLocationId + '">' + item.name + '</option>';
            });
            $('#parkingLocation').html(LocationOption);
            $('#locationFilter').html(LocationOption);
        },
        error: function () {
            alert('Failed to load Slots.');
        }
    });
}


function AddSlot() {
    var SlotObj = {
        SlotNumber: $('#slotNumbers').val(),
        Status: $('#status').prop('checked'),
        SlotType: $('#slotType').val(),
        PricePerHour: $('#PPH').val(),
        ParkingLocationId: parseInt($('#parkingLocation').val())
    }

    if (!SlotObj.SlotNumber || !SlotObj.SlotType || !SlotObj.PricePerHour || !SlotObj.ParkingLocationId) {
        alert('Miss field...!');
        return;
    }

    if (SlotObj.SlotType !== 'Car' && !SlotObj.SlotType !== 'Bike') {
        alert("Parking Slot Available for only 'Car' And 'Bike'");
        return;
    }

    $.ajax({
        url: '/ToSlots/AddSlot',
        type: 'post',
        data: JSON.stringify(SlotObj),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert('Add Slot Successfully');
            CloseModal();
        },
        error: function () {
            alert('Error');
        }
    })
}

function Edit(id) {
    $.ajax({
        url: '/ToSlots/EditSlot?id=' + id,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            $('#Modalid').modal('show');

            $('#SlotId').val(result.slotId);
            $('#SlotIdHidden').val(result.slotId);


            $('#slotNumbers').val(result.slotNumber);
            $('#status').prop('checked', result.status);
            $('#slotType').val(result.slotType);
            $('#PPH').val(result.pricePerHour);

            SelectLocation().done(function () {
                var SelectedId = result.parkingLocation ? result.parkingLocation.parkingLocationId.toString() : '';
                $('#parkingLocation').val(SelectedId);
            });

            $('#SaveBTn').hide();
            $('#UpdateBtn').show();
            $('#ModalHeading').html('Update Slot Data');


        },
        error: function () {
            alert('error');
        }
    })
}

function Update() {
    var SlotObj = {
        SlotId: $('#SlotIdHidden').val(),
        SlotNumber: $('#slotNumbers').val(),
        Status: $('#status').prop('checked'),
        SlotType: $('#slotType').val(),
        PricePerHour: $('#PPH').val(),
        ParkingLocationId: parseInt($('#parkingLocation').val())
    }

    if (!SlotObj.SlotNumber || !SlotObj.SlotType || !SlotObj.PricePerHour || !SlotObj.ParkingLocationId) {
        alert('Miss field...!');
        return;
    }

    if (SlotObj.SlotType !== 'Car' && !SlotObj.SlotType !== 'Bike') {
        alert("Parking Slot Available for only 'Car' And 'Bike'");
        return;
    }

    $.ajax({
        url: '/ToSlots/UpdateSlot',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(SlotObj),
        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert('Slot Updated');
            CloseModal();
        },
        error: function () {
            alert('Error');
        }
    });
}