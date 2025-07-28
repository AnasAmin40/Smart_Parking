console.log("globle.js loaded");
window.getSessionValue = function (key) {
    return sessionStorage.getItem(key);
};