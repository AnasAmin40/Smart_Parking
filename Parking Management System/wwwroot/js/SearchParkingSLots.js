document.addEventListener("DOMContentLoaded", async function () {
    const locationId = sessionStorage.getItem("Search_Location");
    const slotType = sessionStorage.getItem("Search_slotType");
    const LocationName = sessionStorage.getItem("Location_Name");
    const startTime = sessionStorage.getItem("StartTime");
    const endTime = sessionStorage.getItem("EndTime");
    console.log(sessionStorage);


    document.getElementById("search-info").textContent =
        `Showing available slots for Location ID: ${LocationName}, Type: ${slotType}`;

    const slotsResponse = await fetch(`/ToBooking/AllSlot?locationid=${locationId}&slotType=${slotType}`);
    const slotsData = await slotsResponse.json();

    const availabilityResponse = await fetch(`/ToBooking/IsAvailable?LocationId=${locationId}&StartTime=${startTime}&EndTime=${endTime}&Slottype=${slotType}`);
    const availabilitySlots = await availabilityResponse.json();

    //console.log(availabilitySlots);
    //console.log(slotsData);
    let html = "";

    if (slotsData.length === 0) {
        html = `<p class="text-danger"> ❌ No available slots found. </p>`;
    } else {

        slotsData.forEach(slot => {

            const CheckslotAvailable = availabilitySlots.find(s => s.slotId === slot.slotId);
            //console.log("Available Slot IDs in availabilitySlots:", availabilitySlots.map(s => s.slotId));
            //console.log("Current slot.slotId:", slot.slotId);

            //console.log("CheckslotAvailable  :", CheckslotAvailable);
            ////console.log("isAvaible :", CheckslotAvailable.isAvaible);
            let statusText = "Unknown";
            let cardClass = "border-secondary";
            let statusColor = "text-muted";
            if (CheckslotAvailable) {
                statusText = !CheckslotAvailable.isAvailable ? "Occupied" : "Available";
                cardClass = !CheckslotAvailable.isAvailable ? "border-danger" : "border-success";
                statusColor = !CheckslotAvailable.isAvailable ? "text-danger" : "text-success";
            }


            let timeinfo = "";

            //console.log("bookingStartTime :", CheckslotAvailable.bookingStartTime);
            //console.log("bookingEndTime :", CheckslotAvailable.bookingEndTime);
            let endTimeofLastBooking= '';
            if (!CheckslotAvailable.isAvailable && CheckslotAvailable.bookingconflicts.length > 0) {


                CheckslotAvailable.bookingconflicts.forEach(every => {
                    const date = new Date(every.bookingStartTime).toLocaleDateString('en-GB');

                    const start = new Date(every.bookingStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    const end = new Date(every.bookingEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    let originalEndTime = new Date(every.bookingEndTime);
                    originalEndTime.setMinutes(originalEndTime.getMinutes() + 1);
                    every.bookingEndTime = formatDateTimeLocal(originalEndTime);
                    endTimeofLastBooking =every.bookingEndTime;
                    
                    timeinfo += `
                        <div class="mt-2">
                            <span class="badge bg-secondary">Booked: ${date}</span><br/>
                            <span class="badge bg-light text-dark">Time: ${start} - ${end}</span><br/><span class="badge bg-light text-dark">Booking Status:  ${every.status}</span>
                         </div>`;
                    console.log(`Date: ${date}, Start: ${start}, End: ${end}`);

                });
            }
            let bookButton = '';
            if (statusText === 'Available') {
                bookButton = `<button class="btn btn-success w-50 " onclick="saveSlotBookData('${slotType}',${slot.slotId},'${locationId}','${startTime}' ,'${endTime}')">Book Slot</button>`;
            } else if (statusText === 'Occupied') {
                bookButton = `<button class="btn btn-success w-50 " onclick="saveSlotBookData('${slotType}',${slot.slotId},'${locationId}','${endTimeofLastBooking}' ,'${endTime}')">Book Slot</button>`;
            }

            html += `<div class="col-md-3 mb-3">
								<div class="card ${cardClass}">
									<div class="card-body">
									<h5 class="card-title">Slot ${slot.slotNumber}</h5>

										<p class="${statusColor} fw-bold">Type: ${slotType} | Status: ${statusText}</p>
                                       ${bookButton}
                                       ${timeinfo}
									</div>
								</div>
							</div>`;

            document.getElementById("slotsContainer").innerHTML = html;
        })
    }
});



function IsLoginCheck() {
    const userid = sessionStorage.getItem("UserId");
    return userid !== null && userid !== undefined && userid !== "";
}
function StoreBookingData(slotid, slotNumber, slotType, locationId) {
    if (!IsLoginCheck()) {
        alert('Please Login First to Book a Slot.');
        window.location.href = "/ToAuthentication/LoginPage";
        return;
    };

    const startTime = document.getElementById(`start-${slotid}`).value;
    const Hour = document.getElementById(`Hours-${slotid}`).value;
    const userid = sessionStorage.getItem("UserId");
    if (!startTime || !Hour) {
        alert('Please Enter Both Start Time and Hours');
        return;
    }

    const BookingData = {
        UserId: userid,
        LocationId: locationId,
        SlotId: slotid,
        SlotType: slotType,
        StartTime: startTime,
        DurationHours: Hour,
    }
    //console.log(BookingData);


}



function saveSlotBookData(slotType, slotId, LocationId,STime,ETime) {
    const selectSlot = {
        slotType,
        slotId,
        LocationId,
        STime,
        ETime
    };

    sessionStorage.setItem("SelectedSlot", JSON.stringify(selectSlot));
    window.location.href = '/ToUser/BookParkingSlot';
    console.log(selectSlot);
}

function formatDateTimeLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
