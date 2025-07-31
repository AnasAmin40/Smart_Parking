$(document).ready(function () {
    
    let endTime = 0;
    const selectSlot = JSON.parse(sessionStorage.getItem("SelectedSlot"));

    $.get('/ToBooking/OnlyGetLocation', function (data) {
        $.each(data, function (index, item) {
            $('#LocationDropdown').append(
                $('<option>', {
                    value: item.locationId,
                    text: item.locationName
                })
            );
        });

        if (selectSlot?.LocationId) {
            $('#LocationDropdown').val(selectSlot.LocationId).trigger("change");
        }
    });


    $('#LocationDropdown').on('change', function () {
        $('#SlotTypeDropdown').prop('disabled', false);
        $('#AvailableSlotDropdown')
            .empty()
            .append('<option selected disabled>Select Slot</option>')
            .prop('disabled', true);

        if (selectSlot?.slotType) {
            $('#SlotTypeDropdown').val(selectSlot.slotType).trigger("change");
        }
    });



    $('#SlotTypeDropdown').on('change', function () {

        var locationId = $('#LocationDropdown').val();
        var slotType = $('#SlotTypeDropdown').val();
        var StartTime = $('#StartTime').val();
        console.log("endTime Time:", endTime);
        $.get('/ToBooking/IsAvailable', { LocationId: locationId, Slottype: slotType, EndTime: endTime, StartTime: StartTime }, function (data) {
            $('#AvailableSlotDropdown')
                .empty()
                .append('<option selected disabled>Select Slot</option>');

            console.log(data);

            $.each(data, function (index, item) {
                if (item.isAvailable === true) {

                    $('#AvailableSlotDropdown').append(
                        $('<option>', {
                            value: item.slotId,
                            text: item.slotNumber
                        })
                    );
                }

            });

            if (selectSlot?.slotId) {
                $('#AvailableSlotDropdown').val(selectSlot.slotId);
                $('#AvailableSlotDropdown').trigger('change');
            }

            $('#AvailableSlotDropdown').prop('disabled', false);
            checkSelections();

        });

    });



    function checkSelections() {
        const locationSelected = $('#LocationDropdown').val();
        const slotTypeSelected = $('#SlotTypeDropdown').val();
        const slotSelected = $('#AvailableSlotDropdown').val();



        if (locationSelected && slotTypeSelected && slotSelected) {
            $('#BookSlotId').prop('disabled', false);
        } else {
            $('#BookSlotId').prop('disabled', true);
        }
    }

    $('#LocationDropdown, #SlotTypeDropdown, #AvailableSlotDropdown').on('change', checkSelections);

    //If Slot Select in Search Parking Page
    if (selectSlot) {
        let currTimeObj = new Date();
        let currTime = formatDateTimeLocal(currTimeObj);

        if (selectSlot.STime < currTime) {
            $('#StartTime').val(currTime);
            const start = new Date(currTime);
            const end = new Date(selectSlot.ETime);
            let diffHour = Math.round((end - start) / (1000 * 60 * 60));
            if (diffHour === 24) {
                diffHour = 1;
            }
            $('#hours').val(diffHour);
        }
        else {
            $('#StartTime').val(selectSlot.STime);
            const start = new Date(selectSlot.STime);
            const end = new Date(selectSlot.ETime);
            const diffHour = Math.round((end - start) / (1000 * 60 * 60));
            $('#hours').val(diffHour);
        }

    }
    function updateTime() {
        const startTime = document.getElementById('StartTime').value;
        const Hours = document.getElementById('hours').value;

        if (startTime && Hours) {
            const startDate = new Date(startTime);
            const endDate = new Date(startDate.getTime() + Hours * 60 * 60 * 1000);
            endTime = endDate.toLocaleString('sv-SE').replace(' ', 'T').slice(0, 16);
            //console.log("endTime Time:", endTime);
            $('#SlotTypeDropdown').trigger('change');
        }
    }
    document.getElementById('StartTime').addEventListener("change", updateTime);
    document.getElementById('hours').addEventListener("input", updateTime);

    sessionStorage.removeItem("SelectedSlot");

});


//Book Slot Button
function BookingSlot(event) {
    event.preventDefault();
   
    var bookingData = {

        LocationId: $('#LocationDropdown').val(),
        SlotType: $('#SlotTypeDropdown').val(),
        SlotId: $('#AvailableSlotDropdown').val(),
        StartTime: $('#StartTime').val(),
        DurationHours: $('#hours').val(),
        UserId: sessionStorage.getItem('UserId')
    };
    debugger;
    let hour = $('#hours').val();
    if (hour === '0') {
        alert('Sorry, this slot is not available for your selected time. Please select a different slot');
        return;
    }
    if (confirm("Warning: Once booked, details cannot be changed. Proceed?")) {
        $.ajax({
            url: '/ToBooking/NewBooking',
            type: 'POST',
            data: JSON.stringify(bookingData),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                console.log(response);
                if (response.success) {
                    //alert('Booking Successful');
                    window.location.href = '/ToUser/UpcomingBooking';
                } else {
                    alert(response.message);
                }
            },
            error: function (xhr, status, error) {
                console.log("Error:", xhr.responseText);
            }
        });
    }


}




function formatDateTimeLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const Hour = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${Hour}:${min}`;
}




//$(document).ready(function () {
//    $.get('/ToBooking/OnlyGetLocation', function (data) {
//        $.each(data, function (index, item) {
//            $('#LocationDropdown').append(
//                $('<option>', {
//                    value: item.locationId,
//                    text: item.locationName
//                })
//            );
//        });
//    });



//    $('#LocationDropdown').on('change', function () {
//        $('#SlotTypeDropdown').prop('disabled', false);
//        $('#AvailableSlotDropdown').empty().append('<option selected disabled>Select Slot</option>').prop('disabled', true);
//    });


//    $('#SlotTypeDropdown').on('change'), function () {
//        var locationId = $('#LocationDropdown').val();
//        var SlotType = $('#SlotTypeDropdown').val();

//        $.get('/ToBooking/CheckFreeSlot', { locationId : locationId, Type : SlotType }, function (data) {
//            $('#AvailableSlotDropdown').empty().append('<option selected disabled>Select Slot</option>');
//            $.each(data, function (index, item) {
//                $('#AvailableSlotDropdown').append(
//                    $('<option>', {
//                        value: item.slotId,
//                        text: item.slotNumber
//                    })
//                );
//            });
//            $('#AvailableSlotDropdown').prop('disabled', false);
//        });
//    });
//});