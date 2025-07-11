$(document).ready(function () {
    DataTable();
});

function DataTable() {
    $('#BillTable').DataTable({
        processing: true,
        lengthChange: true,
        lengthMenu: [[4, 7, 10, -1], [4, 7, 10, "All"]],
        order: [[0, 'desc']],
        ordering: true,
        searching: true,
        sorting: true,
        paging: true,
        ajax: {
            url: '/ToBooking/GetBillList',
            type: 'get',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            dataSrc: ''
        },
        columns: [
            { data: 'billId' },
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
                data: 'durationInHours',
                render: function (data) {
                    if (data === 1) {
                        return data + ' Hour';   // singular
                    } else if (data > 1) {
                        return data + ' Hours';  // plural
                    } else {
                        return '0 Hour';         // or handle zero or null cases
                    }
                }
            },

            { data: 'amount' },
            { data: 'status', render: function (data) { return data? 'Paid' : 'UnPaid' } },
            {
                data: 'createdAt',
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
            

        ]
    });
}
