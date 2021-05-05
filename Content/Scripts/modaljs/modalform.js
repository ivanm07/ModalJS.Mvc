$(function () {
    $.ajaxSetup({
        cache: false
    });
    modalformRender();
});

function modalformInitialize(bind_element) {
    $.ajaxSetup({
        cache: false
    });
    if (bind_element !== null) {
        bindForm(bind_element);
    }
}

function modalformRender() {
    $("a[data-modal='layout']").off("click").on("click", function (e) {
        // hide dropdown if any (this is used wehen invoking modal from link in bootstrap dropdown )
        //$(e.target).closest('.btn-group').children('.dropdown-toggle').dropdown('toggle');
        $("#ModalStickUpContent").load(this.href, function () {
            $("#ModalStickUp").modal({
                /*backdrop: 'static',*/
                margin_left: "auto",
                margin_right: "auto",
                keyboard: true
            }, "show");
            bindForm(this);
        });
        return false;
    });
}
var _dialog;
function bindForm(dialog) {
    _dialog = dialog;
    $("form", dialog).off("submit").submit(function () {
        $('#ModalStickUpContent > form :input[type="submit"]').prop('disabled', true);
        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: modalformSuccess,
            error: modalformError,
            complete: function () {
                $('#ModalStickUpContent > form :input[type="submit"]').prop('disabled', false);
            }
        });
        modalformInitialize();
        return false;
    });
}

function modalformSuccess(result) {
    if (result.loading) {
        eval(result.loading_script);
    }
    $("#ModalStickUp").modal("hide");
    if (result.notify) {
        swal(
            {
                icon: result.icon,
                title: result.title,
                text: result.message,
                footer: result.footer,
                position: result.position,
                timer: result.time,
            });
    }
    if (result.url !== null) {
        $(result.target).load(result.url, function () {
            //Algún evento.
        });
    }
    if (result.redirect) {
        setTimeout(function () {
            window.location = result.url;
        }, result.time);
    }
    $("#ModalStickUpContent").html(result);
    if (_dialog != null) {
        bindForm(_dialog);
    }
}
function modalformError(jqXHR, status, error) {
    console.log(jqXHR, status, error);
    swal(
        {
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: '<a href="mailto:support@domain.com">Why do I have this issue?</a>'
        });
}