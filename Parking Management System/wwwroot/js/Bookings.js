$(document).ready(function () {
    DataTable();
    GetActiveBookings();
    UpcomingBooking();
    BookingHistory();
    UserUpcomingBooking();
    UserActiveBooking();
    
});


function DataTable() {
    $('#Tableid').DataTable({
        processing: true,
        lengthChange: true,
        lengthMenu: [[4, 7, 10, -1], [4, 7, 10, "All"]],
        order:[[0,'desc']],
        ordering: true,
        searching: true,
        sorting: true,
        paging: true,
        ajax: {
            url: '/ToBooking/GetAllBooking',
            type: 'get',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            dataSrc: ''
        },
        columns: [
            { data: 'bookingId' },
            {
                data: 'user',
                render: function (data) {
                    return data && data.name ? data.name : 'No Name';
                }
            },
            {
                data: 'parkingLocation',
                render: function (data) {
                    return data && data.name ? data.name : 'No Location';
                }
            },
            {
                data: 'parkingSlot',
                render: function (data) {
                    return data && data.slotNumber ? data.slotNumber : 'No Slot'
                }
            },
            {
                data: 'startTime',
                render: function (data) {
                    if (!data) return '';

                    const date = new Date(data);

                    let hours = date.getHours();
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const year = date.getFullYear();

                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // 0 => 12

                    hours = hours.toString().padStart(2, '0');

                    return `${hours}:${minutes} ${ampm} ${day}/${month}/${year}`;
                }
            },
            {
                data: 'exitTime',
                render: function (data) {
                    if (!data) return '';

                    const date = new Date(data);

                    let hours = date.getHours();
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const year = date.getFullYear();

                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // 0 => 12

                    hours = hours.toString().padStart(2, '0');

                    return `${hours}:${minutes} ${ampm} ${day}/${month}/${year}`;
                }
            },


            { data: 'durationHours' },
            { data: 'totalCost' },
            {
                data: 'isPaid',
                render: function (data) {
                    return data? 'Paid' : 'UnPaid';
                }
            },
            { data: 'status' },
            {
                data: null,
                render: function (data, type, row) {
                    const isDisable = (row.status === 'Active' || row.status === 'Completed' || row.status === 'Cancelled' || row.isPaid === true);
                    const forDisable = isDisable ? 'disabled' : '';
                    if (forDisable) {
                        if (row.status === 'Cancelled') {
                            Btn = 'btn-warning';
                        } else if (row.status === 'Active' || row.status === 'Completed') {
                            Btn = 'btn-success';
                        }
                    } else {
                        Btn = 'btn-primary';
                    }
                    
                    //const Btn = isDisable ? 'btn-warning' : 'btn-primary';
                    return `<button class="btn ${Btn} btn-sm " ${forDisable}  onClick="Paid(${row.bookingId})">Paid</button>`;
                }
            }

        ]
    });
}


function GetActiveBookings() {
    let UserId = sessionStorage.getItem("UserId");

    $.ajax({
        url: '/ToBooking/GetActiveBooking?userId=' + UserId,
        type: 'GET',
        success: function (data) {
            
            let cards = '';

            if (data.length === 0) {
                cards = `
                <div class="alert alert-info text-center mt-5 w-50 mx-auto">
                 <strong> 😕 No Active bookings found.</strong>
                 </div>`;

            }
            else {
                data.forEach(booking => {
                    cards += `
            <div class="col-md-4 mb-3">
                <div class="card shadow-sm border-success bg-light booking-card">
                    <div class="card-body">
                        <h5 class="card-title text-success">Booking ID: #${booking.bookingId}</h5>
                        <p><strong>Location:</strong> ${booking.locationName}</p>
                        <p><strong>Slot Number:</strong> #${booking.slotNumber}</p>
                        <p><strong>Slot Type:</strong> ${booking.slotType}</p>
                        <p><strong>Start Time:</strong> ${new Date(booking.startTime).toLocaleString()}</p>
                        <p><strong>End Time:</strong> ${booking.exitTime ? new Date(booking.exitTime).toLocaleString() : 'Still Active'}</p>
                        
                    </div>
                </div>
            </div>`;
                });


            }
            $('#activeBookingsContainer').html(cards);
        },

        error: function () {
            $('#activeBookingsContainer').html('<p class="text-danger">❌ Failed to load bookings.</p>');
        }
    });

}


function UpcomingBooking() {
    let UserId = sessionStorage.getItem("UserId");

    $.ajax({
        url: '/ToBooking/GetUpcomingBooking?userId=' + UserId,
        type: 'GET',
        success: function (data) {
            console.log(data);
            let cards = '';

            if (data.length === 0) {
                cards = `
                <div class="alert alert-info text-center mt-5 w-50 mx-auto">
                 <strong> 😕 No Upcoming bookings found.</strong>
                 </div>`;

            }
            else {
                data.forEach(booking => {
                    cards += `
            <div class="col-md-4 mb-3">
                <div class="card shadow-sm border-success bg-light booking-card">
                    <div class="card-body">
                        <h5 class="card-title text-success">Booking ID: #${booking.bookingId}</h5>
                        <p><strong>Location:</strong> ${booking.locationName}</p>
                        <p><strong>Slot Number:</strong> #${booking.slotNumber}</p>
                        <p><strong>Slot Type:</strong> ${booking.slotType}</p>
                        <p><strong>Start Time:</strong> ${new Date(booking.startTime).toLocaleString()}</p>
                        <p><strong>End Time:</strong> ${booking.exitTime ? new Date(booking.exitTime).toLocaleString() : 'Still Active'}</p>
                        <button class="btn btn-primary btn-sm" onclick="Cancel(${booking.bookingId});" ">Cancel Booking</button>
                    </div>
                </div>
            </div>`;
                });


            }
            $('#UpcomingBookingsContainer').html(cards);
        },

        error: function () {
            $('#UpcomingBookingsContainer').html('<p class="text-danger">❌ Failed to load bookings.</p>');
        }
    });

}
function AddOneHour(bookingId) {
    if (confirm("Do you want to add 1 extra hour? ")) {
        $.ajax({
            url: '/ToBooking/AddOneHour?bookingId=' + bookingId,
            type: 'POST',
            success: function () {
                alert('One Hour Time Added');
                UpcomingBooking();
            },
            error: function () {
                alert('Error to Add One Hour');
            }
        });
    }
    
}

function Cancel(bookingId) {
    if (confirm("Do you want to Cancel Booking? ")) {
        $.ajax({
            url: '/ToBooking/CancelBooking?bookingId=' + bookingId,
            type: 'POST',
            success: function () {
                alert('Cancelled Booking');
                UpcomingBooking();
            },
            error: function () {
                alert('Error to Cancelled Booking');
            }
        });
    }
    
}

function BookingHistory() {
   
    var userid = sessionStorage.getItem("UserId");
    $('#BookingHistoryTable').DataTable({
        processing: true,
        lengthChange: true,
        lengthMenu: [[4, 7, 10, -1], [4, 7, 10, "All"]],
        ordering: true,
        order: [[0, 'desc']],
        searching: true,
        sorting: true,
        paging: true,
        ajax: {
            url: '/ToBooking/BookingHistory?userId=' + userid,
            type: 'get',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            dataSrc: ''
        },
        columns: [
            { data: 'bookingId' }, 
            {
                data: 'locationName',
                render: function (data) {
                    return data ? data : 'No Location';
                }
            }, 
            {
                data: 'slotNumber',
                render: function (data) {
                    return data ? data : 'No Slot';
                }
            }, 
            {
                data: 'slotType',
                render: function (data) {
                    return data ? data : 'No SlotType';
                }
            }, 
            {
                data: 'startTime',
                render: function (data) {
                   
                    if (!data) return '';

                    const date = new Date(data);
                  

                    let hours = date.getHours();
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const year = date.getFullYear();

                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // 0 => 12

                    hours = hours.toString().padStart(2, '0');

                    return `${hours}:${minutes} ${ampm} ${day}/${month}/${year}`;
                }
            }, 
            {
                data: 'exitTime',
                render: function (data, type, row) {
                    console.log("Booking ID:", row.bookingId, "End Time:", data);
                    if (!data) return '';

                    const date = new Date(data);

                    let hours = date.getHours();
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const year = date.getFullYear();

                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // 0 => 12

                    hours = hours.toString().padStart(2, '0');

                    return `${hours}:${minutes} ${ampm} ${day}/${month}/${year}`;
                }
            },
            {
                data: 'status',
                render: function (data, type, row) {
                    let color = 'btn-primary';
                    let label = 'Active';

                    if (row.status === 'Completed') {
                        color = 'btn-success';
                        label = 'Completed';
                    } else if (row.status === 'Cancelled') {
                        color = 'btn-danger';
                        label = 'Cancelled';
                    }

                    return `<button class="btn ${color} btn-sm">${label}</button>`;
                }
            }

        ]
    })
}




var activeBookings = 0;
var upcomingBookings = 0;
function UserActiveBooking() {
    var userid = sessionStorage.getItem("UserId");

    $.ajax({
        url: '/ToBooking/ActiveBooing?userid=' + userid,
        type: 'get',
        success: function (data) {
            activeBookings = parseInt(data);
            $('#TotalActiveBookings').text(data);
            updateTotalBooking()
        },
        error: function () {
            $('#TotalActiveBookings').text('Error');
        }
    })
}

function UserUpcomingBooking() {
    var userid = sessionStorage.getItem("UserId");

    $.ajax({
        url: '/ToBooking/UpcomingBooing?userid=' + userid,
        type: 'get',
        success: function (data) {
            upcomingBookings = parseInt(data);
            $('#TotalUpcomingBookings').text(data);
            updateTotalBooking();
        },
        error: function () {
            $('#TotalUpcomingBookings').text('Error');
        }
    })
}

function updateTotalBooking() {
    var total = activeBookings + upcomingBookings;
    $('#TotalBooking').text(total);
}


function Paid(bookingid) {
    $.ajax({
        url: '/ToBooking/PaidBooking?bookingId=' + bookingid,
        type: 'POST',
        success: function (response) {
            console.log("response :",response);
            if (response.success) {
                alert('Booking is Paid');
                GetActiveBookings();
                UpcomingBooking();
                var table = $('#Tableid').DataTable();
                table.ajax.reload(null, false);
            } else {
                alert(response.message);
            }
        },
        error: function () {
            alert('Error activating booking');
        }
    })
}
