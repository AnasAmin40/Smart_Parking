
var roleOption = '';

$(document).ready(function () {
    //alert('Test Page Loaded Successfully!');
    DataTable();
    //getdata();
});

function DataTable() {
    $('#userTable').DataTable({
        processing: true,
        lengthChange: true,
        lengthMenu: [[4, 10, 15, -1], [4, 10, 15, "All"]],
        searching: true,
        pagging: true,
        ordering: true,

        ajax: {
            url: '/ToUser/GetAllUser',
            type: 'get',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            dataSrc: ''
        },
        columns: [

            { data: 'id' },
            { data: 'name' },
            { data: 'email' },
            { data: 'mobileNumber' },

            {
                data: 'role.roles',
                render: function (data) {
                    return data ? data : 'No Role';
                }
            },
            //{ data: 'role.roles' },
            { data: 'active', render: function (data) { return data ? 'Active' : 'InActive' } },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="btn btn-primary btn-sm" onclick="Edit(' + row.id + ')">Edit</button>';

                }
            }
        ]
    });
}



//Click Add User Button
$('#AddUserBtn').click(function () {
    $('#UserModal').modal('show');
    ForSelectRole();
    $('#passwordinput').show();
    $('#Confirmpasswordinput').show();

    $('#ModalHeading').html('Add New User');
    $('#AddUser').show();
    $('#UpdateUser').hide();
});

//Close Modal
function CloseModal() {
    $('#UserModal').modal('hide');
    $('#UserName').val('');
    $('#UserMail').val('');
    $('#Mobile').val('');
    $('#Password').val('');
    $('#ConfirmPassword').val('');
    $('#active').prop('checked', false);
    $('#roles').val('');
    var table = $('#userTable').DataTable();
    table.ajax.reload(null, false);
}
function ForSelectRole() {

    return $.ajax({
        url: '/ToRole/GetRoleList',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        suppressGlobalErrorHandling: true, // Custom flag
        success: function (result) {
            roleOption = '<option value="">Select Role</option>';
            $.each(result, function (index, item) {
                roleOption += '<option value="' + item.roleId + '">' + item.roles + '</option>';
            });
            $('#roles').html(roleOption);


        },
        error: function () {
            alert('Failed to load roles.');
        }
    });
}


function getdata() {
    $.ajax({
        url: 'ToUser/GetAllUser',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;chatset=utf-8',
        success: function (result) {
            alert('Success');
        },
        error: function () {

        }
    });
}

function AddUser() {
    if ($('#Password').val() !== $('#ConfirmPassword').val()) {
        alert("Password and Confirm Password do not match.");
        return;
    }


    var objData = {
        Name: $('#UserName').val(),
        Email: $('#UserMail').val(),
        MobileNumber: $('#Mobile').val(),
        Password: $('#Password').val(),
        ConfirmPassword: $('#ConfirmPassword').val(),
        Active: $('#active').prop('checked'),
        RoleId: parseInt($('#roles').val())
    }

    $.ajax({
        url: '/ToUser/AddUserUsingAjax',
        type: 'post',
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
    });
}


function Edit(id) {
    $.ajax({
        url: '/ToUser/EditUserByAjax?id=' + id,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            
            $('#UserIdHidden').val(result.id);
            $('#UserId').val(result.id);


            $('#UserModal').modal('show');
            $('#UserName').val(result.name);
            $('#UserMail').val(result.email);
            $('#Mobile').val(result.mobileNumber);
            $('#active').prop('checked', result.active);

            ForSelectRole().done(function () {
                debugger
                var selectedRoleId = result.role ? result.role.roleId.toString() : '';
                $('#roles').val(selectedRoleId);
            });

            $('#ModalHeading').html('Update User');
            $('#AddUser').hide();
            $('#UpdateUser').show();


            $('#passwordinput').hide();
            $('#Confirmpasswordinput').hide();
        },
        error: function () {
            alert("Data can't be fetched");
        }
    });
}



function UpdateUser() {

    var objData = {
        Id: parseInt($('#UserIdHidden').val()),
        Name: $('#UserName').val(),
        Email: $('#UserMail').val(),
        MobileNumber: $('#Mobile').val(),
        Active: $('#active').prop('checked'),
        RoleId: parseInt($('#roles').val())
    }
    $.ajax({
        url: '/ToUser/UpdateUserUsingAjax',
        type: 'post',
        data: JSON.stringify(objData),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            alert("Data has been updated successfully");
            CloseModal();
            $('#UpdateUser').hide();
            $('#AddUser').show();
            $('#ModalHeading').html('Add New User');
        },
        error: function () {
            alert("Data can't be updated");

        }
    });
}
























//Role
//$(document).ready(function () {
//    //alert('Test Page Loaded Successfully!');
//    DataTable();
//    //GetUserData();
//});


//function DataTable() {
//    $('#RoleTable').DataTable({
//        processing: true,
//        lengthChange: true,
//        lengthMenu: [[4, 10, 15, -1], [4, 10, 15, "All"]],
//        searching: true,
//        paging: true,
//        ordering: true,
//        ajax: {
//            url: '/ToRole/GetRoleList',
//            type: 'get',
//            dataType: 'json',
//            //contentType: 'application/json;charset=utf-8',
//            dataSrc: '',
//            error: function (xhr, error, thrown) {
//                console.error('DataTables AJAX error:', error);
//                alert('Failed to load user data. Please try again.');
//            }
//        },
//        columns: [
//            { data: 'roleId' },
//            { data: 'roles' },
//            { data: 'active', render: function (data) { return data ? 'Active' : 'InActive'; } },
//            { data: 'createdTime', render: function (data) { return new Date(data).toLocaleString(); } },
//            {
//                data: null,
//                render: function (data, type, row) {
//                    return '<button class="btn btn-primary btn-sm" onclick="EditRole(' + row.roleId + ')">Edit</button>';
//                }
//            }
//        ]
//    });
//}


//function CloseModal() {
//    $('#RoleModal').modal('hide');
//    $('#roles').val('');
//    $('#active').prop('checked', false);
//    $('#createdTime').val('');
//    //$('#RoleTable').DataTable().ajax.reload();
//    var table = $('#RoleTable').DataTable();
//    table.ajax.reload(null, false); // Reload the table without resetting the pagination
//}



////Add Role Button
//$('#AddRoleBtn').click(function () {
//    $('#RoleModal').modal('show');
//    $('#ModalHeading').html('Add New Role');
//    $('#AddRole').show();
//    $('#UpdateRole').hide();
//});

////Add Role Funcation
//function AddRole() {
//    var inputTimeStr = $('#createdTime').val();

//    var inputTime = new Date(inputTimeStr);
//    var NowTime = new Date();
//    if (inputTime < NowTime) {
//        alert("Created Time cannot be less than current time.");
//        return;
//    }


//    var objData = {
//        Roles: $('#roles').val(),
//        Active: $('#active').prop('checked'),
//        CreatedTime: inputTimeStr
//    }

//    $.ajax({
//        url: '/ToRole/AddNewRole',
//        type: 'Post',
//        data: JSON.stringify(objData),
//        dataType: 'json',
//        contentType: 'application/json; charset=utf-8',
//        success: function () {
//            alert("Data has been added successfully");
//            CloseModal();
//        },
//        error: function () {
//            alert("Data can't be added");
//        }
//    })
//}

//function EditRole(roleId) {

//    $.ajax({
//        url: '/ToRole/EditRolebyAjax?id= ' + roleId,
//        type: 'get',
//        dataType: 'json',
//        contentType: 'application/json;charset=utf-8',
//        success: function (result) {

//            $('#roleIdHidden').val(result.roleId);
//            $('#roleId').val(result.roleId);

//            $('#RoleModal').modal('show');
//            $('#roles').val(result.roles);
//            $('#active').prop('checked', result.active);
//            $('#createdTime').val(new Date(result.createdTime).toISOString().slice(0, 16));
//            $('#ModalHeading').html('Update Role');
//            $('#AddRole').hide();
//            $('#UpdateRole').show();
//        },
//        error: function () {
//            alert("Data can't be fetched");
//        }
//    });
//}

//function UpdateRole() {
//    var objData = {
//        RoleId: $('#roleIdHidden').val(),
//        Roles: $('#roles').val(),
//        Active: $('#active').prop('checked'),
//        CreatedTime: $('#createdTime').val()
//    }

//    $.ajax({
//        url: '/ToRole/UpdateRoleByAjax',
//        type: 'post',
//        data: JSON.stringify(objData),
//        dataType: 'json',
//        contentType: 'application/json; charset=utf-8',
//        success: function (response) {
//            alert("Data has been updated successfully");
//            CloseModal();
//        },
//        error: function () {
//            alert("Data can't be updated");
//        }
//    });
//}


















//var roleOptions = '';

//$(document).ready(function () {
//    //alert('User Management Page Loaded Successfully!');
//    GetUserData();
//    //DataTable();

//});

//function DataTable() {
//    $('#UserTable').DataTable({
//        processing: true,
//        lengthChange: true,
//        lengthMenu: [[3, 5, 10, -1], [3, 5, 10, "All"]],
//        searching: true,
//        ordering: true,
//        paging: true,
//        ajax: {
//            url: '/ToUser/GetAllUser',
//            type: 'get',
//            dataType: 'json',
//            contentType: 'application/json;charset=utf-8',
//            dataSrc: ''
//        },
//        columns: [
//            { data: 'name' },
//            { data: 'email' },
//            { data: 'active', render: function (data) { return data ? 'Active' : 'InActive'; } },
//            { data: 'role.roles' },
//            {
//                data: null,
//                render: function (data, type, row) {
//                    return '<button class="btn btn-primary btn-sm" onclick=Edit(' + row.id + ')>Edit</button> || <button class="btn btn-danger btn-sm" onclick=Delete(' + row.id + ')>Delete</button>';
//                }
//            }
//        ]
//    });
//}

//function ClickForAddUser() {
//    forSelect();
//    var myModal = new bootstrap.Modal(document.getElementById('userModal'));
//    myModal.show();
//    $('#RoleId').html(roleOptions);
//    $('#AddUser').show();
//    $('#UpdateUser').hide();
//    $('#UserIdBox').hide();
//    $('#ModalHeading').html('Add New User');

//}

//function CloseModal() {
//    var modalEl = document.getElementById('userModal');
//    var myModal = bootstrap.Modal.getInstance(modalEl);  
//    if (myModal) {
//        myModal.hide();  
//    }
//    GetUserData();
//    $('#userName').val('');
//    $('#userEmail').val('');
//    $('#userPassword').val('');
//    $('#active').prop('checked', false);
//}

//function forSelect() {
//    $.ajax({
//        url: '/ToRole/GetRoleList',
//        type: 'Get',
//        dataType: 'json',
//        contentType: 'application/json;charset=utf-8',
//        success: function (result) {
//            console.log(result);
//            //debugger;
//            roleOptions = '<option value=""  style="background-color:#006dc3">Select Role</option>';
//            $.each(result, function (index, item) {
//                roleOptions += '<option value="' + item.roleId + '" style="background-color:#686dc3">' + item.roles + '</option>';
//            });
//            $('#RoleId').html(roleOptions);
//            //if (typeof callback === "function") {
//            //    callback();
//            //}

//        },
//        error: function () {
//            alert('Failed to load roles.');
//        }
//    });
//}


//function GetUserData() {
//    //debugger;
//    $.ajax({
//        url: '/ToUser/GetAllUser',
//        type: 'Get',
//        dataType: 'json',
//        contentType: 'application/json;charset=utf-8',
//        success: function (result) {

//            var object = '';
//            $.each(result, function (index, item) {
//                object += '<tr class="text-center">';
//                object += '<td>' + item.name + '</td>';
//                object += '<td>' + item.email + '</td>';
//                object += '<td>' + (item.active ? "Active" : "InActive") + '</td>';
//                object += '<td>' + item.role.roles + '</td>';
//                object += '<td><button class="btn btn-primary btn-sm" onclick="Edit(' + item.id + ')">Edit</button> || <button class="btn btn-danger btn-sm"  onclick="Delete(' + item.id + ')">Delete</button></td>';

//                object += '</tr>';
//            });
//            $('#UserData').html(object);
//        },
//        error: function (xhr) {
//            alert("Error " + xht.responseText);
//        }
//    })
//}





//function AddUser() {
//    var objData = {
//        Name: $('#userName').val(),
//        Email: $('#userEmail').val(),
//        Password: $('#userPassword').val(),
//        Active: $('#active').prop('checked'),
//        RoleId: parseInt($('#RoleId').val())
//    }

//    $.ajax({

//        url: '/ToUser/AddUserUsingAjax',
//        type: 'Post',
//        dataType: 'json',
//        contentType: 'application/json;charset=utf-8',
//        data: JSON.stringify(objData),
//        success: function (data) {
//            alert('Success User Added');
//            CloseModal();
//        },
//        error: function (xhr) {
//            alert("Error: " + xhr.responseText);
//        }
//    })
//}

//function Edit(id) {
//    $.ajax({
//        url: '/ToUser/EditUserByAjax?id=' + id,
//        type: 'Get',
//        dataType: 'json',
//        contentType: 'application/json;charset=utf-8',
//        success: function (result) {
//            $('#UserIdHidden').val(result.id);
//            $('#UserId').val(result.id);

//            $('#userName').val(result.name);
//            $('#userEmail').val(result.email);
//            $('#userPassword').val(result.password);
//            $('#active').prop('checked', result.active);

//            forSelect(function () {
//                $('#RoleId').val(result.roles.toString());
//            });

//            var myModal = new bootstrap.Modal(document.getElementById('userModal'));
//            myModal.show();
//            $('#AddUser').hide();
//            $('#UpdateUser').show();
//            $('#ModalHeading').html('Update User Data');


//        },
//        error: function (xhr) {
//            alert("Error: " + xhr.responseText);
//        }
//    })
//}


//function Update() {
//    var Objdata = {
//        Id: parseInt($('#UserIdHidden').val()),
//        Name: $('#userName').val(),
//        Email: $('#userEmail').val(),
//        Password: $('#userPassword').val(),
//        Active: $('#active').prop('checked'),
//        RoleId: parseInt($('#RoleId').val())
//    }

//    $.ajax({
//        url: '/ToUser/UpdateUserUsingAjax',
//        type: 'post',
//        dataType: 'json',
//        contentType: 'application/json;charset=utf-8',
//        data: JSON.stringify(Objdata),
//        success: function () {
//            alert('User Updated Successfully');
//            CloseModal();
//            $('#UserIdBox').hide();
//            parseInt($('#UserIdHidden').val(''));
//        },
//        error: function (xhr) {
//            alert("Error: " + xhr.responseText);
//        }
//    });
//}


//function Delete(id) {
    
//    if (confirm("Are you sure you want to delete this record?")) {
//        $.ajax({
//            url: '/ToUser/DeleteUserUsingAjax?id=' + id,
//            type: 'get',
//            dataType: 'json',
//            contentType: 'application/json;charset=utf-8',
//            success: function (response) {
//                alert('Deleted Successfully');
//                GetUserData();
//            },
//            error: function (xhr) {
//                alert("Error: " + xhr.responseText);
//            }
//        });
//    }
//}
