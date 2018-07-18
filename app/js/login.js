$(document).ready(function () {
    "use strict";
    var body = $("body");
    /* ===== Login and Recover Password ===== */
    $('#to-recover').on("click", function () {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });
});