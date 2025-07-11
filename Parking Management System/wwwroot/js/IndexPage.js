
$(document).ready(function () {

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
        let locationId = $(this).val();
        let Name = $('#LocationDropdown option:selected').text();

        sessionStorage.setItem("Search_Location", locationId);
        sessionStorage.setItem("Location_Name", Name);
    });

    $('#SlotTypeDropdown').on('change', function () {
        let slotType = $(this).val();
        sessionStorage.setItem("Search_slotType", slotType);
    });

    document.getElementById('StartTime').addEventListener("change", SaveTime);
    document.getElementById('EndTime').addEventListener("change", SaveTime);

    function SaveTime() {
        const startT = document.getElementById("StartTime").value;
        const endT = document.getElementById("EndTime").value;

        if (startT!='' && endT!='') {

            const startTime = new Date(startT);
            const EndTime = new Date(endT);
           

            if (startTime < EndTime) {
                sessionStorage.setItem("StartTime", startT);
                sessionStorage.setItem("EndTime", endT);
                console.log(sessionStorage);
               
            }
            else {
                console.log("End Time must be after Start Time!");
            }
            
        } 


    }

});

function AdminLogin() {
    if (sessionStorage.getItem("Role") !== 'Admin') {
        alert('First Admin Login');
        window.location.href = '/ToAuthentication/LoginPage';
    }
}