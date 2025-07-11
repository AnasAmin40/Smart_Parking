document.addEventListener("DOMContentLoaded", async function () {
    const locationId = sessionStorage.getItem("Search_Location");
    const slotType = sessionStorage.getItem("Search_slotType");
    const LocationName = sessionStorage.getItem("Location_Name");
    const startTime = sessionStorage.getItem("StartTime");
    const endTime = sessionStorage.getItem("EndTime");
    //console.log(sessionStorage);
    

    document.getElementById("search-info").textContent =
        `Showing available slots for Location ID: ${LocationName}, Type: ${slotType}`;

    const slotsResponse = await fetch(`/ToBooking/AllSlot?locationid=${locationId}&slotType=${slotType}`);
    const slotsData =await slotsResponse.json();

    const availabilityResponse = await fetch(`/ToBooking/IsAvailable?LocationId=${locationId}&StartTime=${startTime}&EndTime=${endTime}&Slottype=${slotType}`);
    const availabilitySlots =await availabilityResponse.json();

    console.log(availabilitySlots);
    console.log(slotsData);
    let html = "";

    if (slotsData.length === 0) {
        html = `<p class="text-danger"> ❌ No available slots found. </p>`;
    } else {

        slotsData.forEach(slot => {

            const CheckslotAvailable = availabilitySlots.find(s => s.slotId === slot.slotId);
            console.log("Available Slot IDs in availabilitySlots:", availabilitySlots.map(s => s.slotId));
            console.log("Current slot.slotId:", slot.slotId);

            console.log("CheckslotAvailable  :", CheckslotAvailable);
            //console.log("isAvaible :", CheckslotAvailable.isAvaible);
            let statusText = "Unknown";
            let cardClass = "border-secondary";
            let statusColor = "text-muted";
            if (CheckslotAvailable) {
                statusText = !CheckslotAvailable.isAvaible ? "Occupied" : "Available";
                cardClass = !CheckslotAvailable.isAvaible ? "border-danger" : "border-success";
                statusColor = !CheckslotAvailable.isAvaible ? "text-danger" : "text-success";
            }
           

            let timeinfo = "";
            
            //console.log("bookingStartTime :", CheckslotAvailable.bookingStartTime);
            //console.log("bookingEndTime :", CheckslotAvailable.bookingEndTime);

            if (!CheckslotAvailable.isAvaible && CheckslotAvailable.bookingStartTime && CheckslotAvailable.bookingEndTime) {
                const date = new Date(CheckslotAvailable.bookingStartTime).toLocaleDateString();


                const start = new Date(CheckslotAvailable.bookingStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
                const end = new Date(CheckslotAvailable.bookingEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                
                timeinfo = `
    <div class="mt-2">
        <span class="badge bg-secondary">Booked: ${date}</span><br/>
        <span class="badge bg-light text-dark">Time: ${start} - ${end}</span>
    </div>`;




            }


            html += `<div class="col-md-3 mb-3">
								<div class="card ${cardClass}">
									<div class="card-body">

									<h5 class="card-title">Slot ${slot.slotNumber}</h5>

										<p class="${statusColor} fw-bold">Type: ${slotType} | Status: ${statusText}</p>
                                       
                                       ${timeinfo}
                                       



									</div>
								</div>
							</div>`;

            document.getElementById("slotsContainer").innerHTML = html;
        })
        
        
       

    }

    
});



/*<a class="btn btn-success" onclick="StoreBookingData(${slot.slotId},'${slot.slotNumber}','${slotType}','${locationId}')">Book Now</a>*/

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





function ClickforBooking() {
    const userid = sessionStorage.getItem('UserId');
    if (userid) {
        window.location.href = '/ToUser/BookParkingSlot';
    }
    else {
        window.location.href = '/ToAuthentication/LoginPage';
    }
}