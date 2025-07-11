function AddNewUserByUser(event) {
	event.preventDefault();

	var objData = {

		Name: $('#name').val(),
		Email: $('#Email').val(),
		MobileNumber: $('#mobileNumber').val(),
		Password: $('#password').val(),
		ConfirmPassword: $('#ConfirmPassword').val()
	}

	if (!objData.Name || !objData.Email || !objData.MobileNumber || !objData.Password || !objData.ConfirmPassword) {
		alert("Please fill all the fields");
		return;
	}

	if (objData.Password !== objData.ConfirmPassword) {
		alert("Password and Confirm Password do not match");
		return;
	}

	$.ajax({
		url: '/ToUser/AdduserByUser',
		type: 'post',
		data: JSON.stringify(objData),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		success: function () {
			alert("Data has been added successfully");
			window.location.href = '/ToAuthentication/LoginPage';
		},
		error: function () {
			alert("Data can't be added");
		}
	});
}