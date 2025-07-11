
function Login(event) {
    event.preventDefault();

    var Login = {
        Email: $('#LoginEmail').val(),
        Password: $('#LoginPassword').val()
    }


    $.ajax({
        url: '/ToAuthentication/LoginData',
        type: 'POST',
        data: JSON.stringify(Login),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            debugger;
            console.log(response);
            if (response.success && response.token) {
                sessionStorage.setItem('UserId', response.userId);
                sessionStorage.setItem('Name', response.name);
                sessionStorage.setItem('Token', response.token);
                sessionStorage.setItem('Role', response.roles);
                if (response.roles === "Admin") {
                    window.location.href = '/ToAuthentication/AdminDashBoard';
                } else if (response.roles === "User") {
                    window.location.href = '/ToUser/DashBoard';

                }
                alert('Login Success');

            } else {
                alert(response.message);
            }
        },
        error: function (xhr, status, error) {
            console.log("Error:", xhr.responseText);
        }

    });

}