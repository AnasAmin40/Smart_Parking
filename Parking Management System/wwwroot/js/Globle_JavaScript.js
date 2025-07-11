$(document).ajaxError(function (event, jqxhr, settings) {
    // Skip if manually handled
    if (settings.suppressGlobalErrorHandling) return;

    if (jqxhr.status === 401) {
        alert("Session expired. Please log in again.");
        window.location.href = "/ToAuthentication/LoginPage";
    } else if (jqxhr.status === 403) {
        alert("You are not authorized to access this resource.");
        window.location.href = "/ToAuthentication/AccessDenied";
    }
});


