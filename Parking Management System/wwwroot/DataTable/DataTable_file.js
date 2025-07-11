$(document).ready(function () {
    GetRoleTable();
});

function GetRoleTable() {
    $.ajax({
        url: '/ToRole/GetRoleList',
        type: 'Get',
        dataSrc: 'data'
        dataType: 'json',
        success: function () {

        }
    })
}


$('#DataTableId').dataTable({

});

function OnSuccess(response) {

    if ($.fn.DataTable.isDataTable('#DataTableId')) {
        $('#DataTableId').DataTable().clear().destroy();
    }


    $('#DataTableId').DataTable({
        processing: true,
        lengthChange: true,
        lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "All"]],
        searching: true,
        ordering: true,
        paging: true,
        data: response,
        columns: [
            { data: 'RoleId' },
            { data: 'Roles' },
            { data: 'Active' },
            { data: 'CreatedTime' }
        ]

    })
}