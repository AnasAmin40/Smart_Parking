
$(document).ready(function () {


    function formatDateTimeLocal(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const now = new Date();

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0); 
    document.getElementById('StartTime').value = formatDateTimeLocal(startOfDay);

    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59); 
    document.getElementById('EndTime').value = formatDateTimeLocal(endOfDay);

    
    $.get('/ToBooking/OnlyGetLocation', function (data) {
        $.each(data, function (index, item) {
            $('#LocationDropdown').append(
                $('<option>', {
                    value: item.locationId,
                    text: item.locationName
                })
            );
        });

        let locationid = sessionStorage.getItem("Search_Location");

        if (locationid) {
            //$('#LocationDropdown').val(locationid).trigger('change');
            $('#LocationDropdown').val(locationid);
            console.log("Saved LocationId:", locationid);
        }
        toggleSearchButton();
    });

    $('#LocationDropdown').on('change', function () {

        SaveTime();
        let locationId = $(this).val();
        let Name = $('#LocationDropdown option:selected').text();
        console.log(`locationid : ${locationId} and Name : ${Name}`);
        sessionStorage.setItem("Search_Location", locationId);
        sessionStorage.setItem("Location_Name", Name);
    });

    

    $('#SlotTypeDropdown').on('change', function () {
        SaveTime();

        let slotType = $(this).val();
        sessionStorage.setItem("Search_slotType", slotType);
    });
    
    let slottype = sessionStorage.getItem("Search_slotType");
   
    if (slottype) {
        $('#SlotTypeDropdown').val(slottype);
        console.log("Saved SlotType:", slottype);
    }
    

    //DisAbled SreachButton Section
    const locationDropdown = document.getElementById('LocationDropdown');
    const slotTypeDropdown = document.getElementById('SlotTypeDropdown');
    const searchButton = document.getElementById('SearchParking');

    function toggleSearchButton() {

        
        if (locationDropdown.value != 'Select Location' && locationDropdown.value != '' && slotTypeDropdown.value != 'Slot Type' && slotTypeDropdown.value != '' ) {
            searchButton.disabled = false;
        } else {
            searchButton.disabled = true;
        }
    }
    locationDropdown.addEventListener('change', toggleSearchButton);
    slotTypeDropdown.addEventListener('change', toggleSearchButton);
    toggleSearchButton();



    //Time Section

    document.getElementById('StartTime').addEventListener("change", SaveTime);
    document.getElementById('EndTime').addEventListener("change", SaveTime);

    function SaveTime() {
        const startT = document.getElementById("StartTime").value;
        const endT = document.getElementById("EndTime").value;

        if (startT != '' && endT != '') {

            const startTime = new Date(startT);
            const EndTime = new Date(endT);


            if (startTime < EndTime) {
                sessionStorage.setItem("StartTime", startT);
                sessionStorage.setItem("EndTime", endT);


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





