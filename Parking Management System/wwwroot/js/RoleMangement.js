$(document).ready(function () {

    //alert('Test Page Loaded Successfully!');
    DataTable();
    //GetUserData();
});


function DataTable() {
    $('#RoleTable').DataTable({
        processing: true,
        lengthChange: true,
        lengthMenu: [[4, 10, 15, -1], [4, 10, 15, "All"]],
        searching: true,
        paging: true,
        ordering: true,

        ajax: {
            url: '/ToRole/GetRoleList',
            type: 'get',
            dataType: 'json',
            dataSrc: '',
            error: function (xhr, error, thrown) {
                console.error('DataTables AJAX error:', error);
                alert('Failed to load user data. Please try again.');
            }
        },
        columns: [
            { data: 'roleId' },

            { data: 'roles' },
            { data: 'active', render: function (data) { return data ? 'Active' : 'InActive'; } },
            { data: 'createdTime', render: function (data) { return new Date(data).toLocaleString(); } },
            {
                data: null,
                render: function (data, type, row) {

                    return '<button class="btn btn-primary btn-sm" onclick="EditRole(' + row.roleId + ')">Edit</button>';

                }
            }
        ]
    });
}


function CloseModal() {
    $('#RoleModal').modal('hide');
    $('#roles').val('');
    $('#active').prop('checked', false);
    $('#createdTime').val('');
    //$('#RoleTable').DataTable().ajax.reload();
    var table = $('#RoleTable').DataTable();
    table.ajax.reload(null, false); // Reload the table without resetting the pagination
}



//Add Role Button
$('#AddRoleBtn').click(function () {
    $('#RoleModal').modal('show');
    $('#ModalHeading').html('Add New Role');
    $('#AddRole').show();
    $('#UpdateRole').hide();
});

//Add Role Funcation
function AddRole() {
    var inputTimeStr = $('#createdTime').val();

    var inputTime = new Date(inputTimeStr);
    var NowTime = new Date();
    


    var objData = {
        Roles: $('#roles').val(),
        Active: $('#active').prop('checked'),
        CreatedTime: inputTimeStr

    }

    $.ajax({
        url: '/ToRole/AddNewRole',
        type: 'Post',
        data: JSON.stringify(objData),
        dataType: 'json',

        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert("Data has been added successfully");
            CloseModal();
        },
        error: function () {
            alert("Data can't be added");
        }
    })
}

function EditRole(roleId) {

    $.ajax({
        url: '/ToRole/EditRolebyAjax?id= ' + roleId,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {

            $('#roleIdHidden').val(result.roleId);
            $('#roleId').val(result.roleId);

            $('#RoleModal').modal('show');
            $('#roles').val(result.roles);
            $('#active').prop('checked', result.active);
            $('#createdTime').val(new Date(result.createdTime).toISOString().slice(0, 16));
            $('#ModalHeading').html('Update Role');

            $('#AddRole').hide();
            $('#UpdateRole').show();
        },
        error: function () {

            alert("Data can't be fetched");
        }
    });
}

function UpdateRole() {
    var objData = {
        RoleId: $('#roleIdHidden').val(),
        Roles: $('#roles').val(),
        Active: $('#active').prop('checked'),
        CreatedTime: $('#createdTime').val()
    }

    $.ajax({
        url: '/ToRole/UpdateRoleByAjax',
        type: 'post',
        data: JSON.stringify(objData),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            alert("Data has been updated successfully");
            CloseModal();
        },
        error: function () {
            alert("Data can't be updated");
        }

    });
}










//function datatablecopy() {
//    $('#RoleDataTable').DataTable({
//        processing: true,
//        lengthChange: true,
//        lengthMenu: [[3, 5, 10, -1], [3, 5, 10, "All"]],
//        searching: true,
//        ordering: true,
//        paging: true,

//        ajax: {
//            url: '/ToRole/GetRoleList',
//            type: 'get',
//            dataType: 'json',
//            contentType: 'application/json;charset=utf-8',
//            dataSrc: ''
//        },
//        columns: [

//            { data: 'roles' },
//            { data: 'active', render: function (data) { return data ? 'Active' : 'InActive' } },
//            { data: 'createdTime', render: function (data) { return new Date(data).toLocaleString(); } },
//            {
//                data: null,
//                render: function (data, type, row) {
//                    return '<button class="btn btn-primary btn-sm" onclick=Edit(' + row.roleId + ')>Edit</button> || <button class="btn btn-danger btn-sm " onclick=Delete(' + row.roleId + ')>Delete</button>';
//                }
//            }
//        ]

//    });
//}

//function DataTable() {
//    $('#RoleDataTable').DataTable({
//        processing: true,
//        lengthChange: true,
//        lengthMenu: [[2, 3, 25, -1], [2, 3, 25, "All"]],
//        searching: true,
//        ordering: true,
//        paging: true,
//        ajax: {
//            url: '/ToRole/GetRoleList',
//            type: 'GET',
//            dataType: 'json',
//            contentType: 'application/json;charset=utf-8',
//            dataSrc: ''
//        },
//        columns: [
//            { data: 'roles' },
//            { data: 'active', render: function (data) { return data ? 'Active' : 'InActive'; } },
//            { data: 'createdTime', render: function (data) { return new Date(data).toLocaleString(); } },
//            {
//                data: null,
//                render: function (data, type, row) {
//                    return '<button class="btn btn-primary btn-sm" onclick="Edit(' + row.roleId + ')">Edit</button> || <button class="btn btn-danger btn-sm" onclick="Delete(' + row.roleId + ')">Delete</button>';
//                }
//            }
//        ]
//    });
//}

//function setTime() {
//    var now = new Date();
//    var localTime = now.toISOString().slice(0, 16);
//    $('#createdTime').val(localTime);
//}

//function CloseModal() {
//    $('#RoleModal').modal('hide');
//    $('#role').val('');
//    $('#active').prop('checked', false);
//    setTime();
//}

//function ShowData() {

//    $('#table_data').html('<tr><td colspan="5">Loading...</td></tr>');
//    $.ajax({
//        url: '/ToRole/GetRoleList',
//        type: 'GET',
//        dataType: 'json',
//        contentType: 'application/json;charset=utf-8',
//        success: function (result) {
//            var object = '';
//            $.each(result, function (index, item) {
//                object += '<tr>';
//                object += '<td>' + item.roles + '</td>';
//                object += '<td>' + (item.active ? 'Active' : 'InActive') + '</td>';
//                object += '<td>' + new Date(item.createdTime).toLocaleString() + '</td>';
//                object += '<td><button class="btn btn-primary btn-sm" onclick="Edit(' + item.roleId + ')">Edit</button> || <button class="btn btn-danger btn-sm" onclick="Delete(' + item.roleId + ')">Delete</button></td>';
//                object += '</tr>';
//            });
//            $('#table_data').html(object);
//            //if ($.fn.dataTable && $.fn.dataTable.isDataTable('#roleTable')) {
//            //    $('#roleTable').DataTable().clear().destroy();
//            //}
//            //$('#roleTable').DataTable();

//        },
//        error: function () {
//            alert("Data can't get");
//        }
//    });
//}

////function ShowData() {
////    $('#table_data').html('<tr><td colspan="5">Loading...</td></tr>');
////    $.ajax({
////        url: '/ToRole/GetRoleList',
////        type: 'Get',
////        dataType: 'json',
////        contentType: 'application/json;charset=utf-8',
////        success: function (result, status, xhr) {
////            //console.log(result);
////            var object = '';
////            $.each(result, function (index, item) {
////                object += '<tr>';
////                object += '<td>' + item.roleId + '</td>';
////                object += '<td>' + item.roles + '</td>';
////                object += '<td>' + (item.active ? 'Active' : 'InActive') + '</td>';
////                object += '<td>' + new Date(item.createdTime).toLocaleString() + '</td>';
////                object += '<td><a class="btn btn-primary btn-sm" onclick="Edit(' + item.roleId +')"  >Edit</a> || <a class="btn btn-danger btn-sm" onclick="Delete('+item.roleId+')">Delete</a></td>';


////                object += '</tr>';
////            });
////            $('#table_data').html(object);
////        },
////        error: function () {
////            alert("Data can't get");
////        }
////    });
////}

//$('#btnAddRole').click(function () {
//    $('#RoleModal').modal('show');
//    $('#AddRole').show();
//    $('#UpdateRole').hide();
//    $('#roleIdBox').hide();
//    $('#ModalHeading').text('Add New Role');
//});

//function AddRole() {
//    var objData = {
//        Roles: $('#role').val(),
//        Active: $('#active').prop('checked'),
//        CreatedTime: $('#createdTime').val()
//    }

//    $.ajax({
//        url: '/ToRole/AddNewRole',
//        type: 'Post',
//        data: JSON.stringify(objData),
//        dataType: 'json',
//        contentType: 'application/json;charset=utf-8',
//        success: function () {
//            alert('Data Saved');
//            ShowData();
//            CloseModal();
//        },
//        error: function () {
//            alert("Data can't Saved");
//        }
//    });

//}
//function Edit(roleId) {
//    //debugger
//    $.ajax({
//        url: '/ToRole/EditRolebyAjax?id=' + roleId,
//        type: 'Get',
//        dataType: 'json',
//        contentType: 'application/json; charset=utf-8',
//        success: function (response) {
            
//            $('#RoleModal').modal('show');

//            $('#roleIdHidden').val(response.roleId);
//            $('#roleId').val(response.roleId);

//            $('#role').val(response.roles);
//            $('#active').prop('checked', response.active);
//            $('#createdTime').val(new Date(response.createdTime).toISOString().slice(0, 16));

//            $('#roleIdBox').show();
//            $('#ModalHeading').text('Update Role Record');
//            $('#AddRole').hide();
//            $('#UpdateRole').show();
//        },
//        error: function () {
//            alert("Data can't get");
//        }
//    })
//}

//function UpdateRole() {


//    var objData = {
//        RoleId: parseInt($('#roleIdHidden').val()),
//        Roles: $('#role').val(),
//        Active: $('#active').prop('checked'),
//        CreatedTime: $('#createdTime').val()
//    };

//    $.ajax({

//        url: '/ToRole/UpdateRoleByAjax',
//        type: 'post',
//        data: JSON.stringify(objData),
//        contentType: 'application/json;charset=utf-8',
//        dataType: 'json',
//        success: function (response) {

//            alert('Data Updated');
//            ShowData();
//            CloseModal();
//        },
//        error: function (xhr) {
//            alert("NO Update Data, Error: " + xhr.responseText);
//        }

//    });
//}

//function Delete(id) {
//    if (confirm("Are you sure you want to delete this record?")) {
//        $.ajax({
//            url: '/ToRole/DeleteRoleWithAjax?id=' + id,
//            type: 'get',
//            dataType: 'json',
//            contentType: 'application/json;charset=utf-8',
//            success: function (response) {
//                alert('Deleted Successfully');
//                ShowData();
//            },
//            error: function (xhr) {
//                alert("Error: " + xhr.responseText);
//            }

//        });
//    };

//}
