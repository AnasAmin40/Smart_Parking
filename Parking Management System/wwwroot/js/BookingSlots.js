$(document).ready(function () {
    let endTime = 0;
    $.get('/ToBooking/OnlyGetLocation', function (data) {
        $.each(data, function (index, item) {
            $('#LocationDropdown').append(
                $('<option>', {
                    value: item.locationId,
                    text: item.locationName
                })
            );
        });
    });

    
    $('#LocationDropdown').on('change', function () {
        $('#SlotTypeDropdown').prop('disabled', false);
        $('#AvailableSlotDropdown')
            .empty()
            .append('<option selected disabled>Select Slot</option>')
            .prop('disabled', true);
    });

    

    
    $('#SlotTypeDropdown').on('change', function () {

        var locationId = $('#LocationDropdown').val();
        var slotType = $('#SlotTypeDropdown').val(); 
        var StartTime = $('#StartTime').val(); 
        

        
        $.get('/ToBooking/IsAvailable', { LocationId: locationId, Slottype: slotType, EndTime: endTime, StartTime: StartTime }, function (data) {
            $('#AvailableSlotDropdown')
                .empty()
                .append('<option selected disabled>Select Slot</option>');

            console.log(data);
            $.each(data, function (index, item) {
                if (item.isAvaible === true) {
                    $('#AvailableSlotDropdown').append(
                        $('<option>', {
                            value: item.slotId,
                            text: item.slotNumber
                        })
                    );
                }
                
            });

            
            $('#AvailableSlotDropdown').prop('disabled', false);
            checkSelections();

        });
        
    });


  
    function checkSelections() {
        const locationSelected = $('#LocationDropdown').val();
        const slotTypeSelected = $('#SlotTypeDropdown').val();
        const slotSelected = $('#AvailableSlotDropdown').val();
       
      

        if (locationSelected && slotTypeSelected && slotSelected ) {
            $('#BookSlotId').prop('disabled', false);
        } else {
            $('#BookSlotId').prop('disabled', true);
        }
    }

    $('#LocationDropdown, #SlotTypeDropdown, #AvailableSlotDropdown').on('change', checkSelections);


    function updateTime() {
        const startTime = document.getElementById('StartTime').value;
        const Hours = document.getElementById('hours').value;

        if (startTime && Hours) {
            const startDate = new Date(startTime);
            const endDate = new Date(startDate.getTime() + Hours * 60 * 60 * 1000);
            endTime = endDate.toISOString().slice(0, 16);
            console.log("endTime Time:", endTime);
            $('#SlotTypeDropdown').trigger('change'); 
        }
    }


    document.getElementById('StartTime').addEventListener("change", updateTime);
    document.getElementById('hours').addEventListener("input", updateTime); 

});


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

    console.log(bookingData);
    $.ajax({
        url: '/ToBooking/NewBooking',
        type: 'POST',
        data: JSON.stringify(bookingData),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            console.log(response);
            if (response.success) {
                alert('Booking Successful');
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