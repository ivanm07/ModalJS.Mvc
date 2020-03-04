$(function() {
    $.ajaxSetup({
        cache: false
    });
    $("a[data-modal='layout']").off("click").on("click", function(e) {
        // hide dropdown if any (this is used wehen invoking modal from link in bootstrap dropdown )
        //$(e.target).closest('.btn-group').children('.dropdown-toggle').dropdown('toggle');
        $("#ModalStickUpContent").load(this.href, function() {
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
});

function modalformInitialize(bind_element) {
    $.ajaxSetup({
        cache: false
    });
    if (bind_element !== null) {
        bindForm(bind_element);
    }
}

function bindForm(dialog) {
    $("form", dialog).off("submit").submit(function () {
        $('#ModalStickUpContent > form :input[type="submit"]').prop('disabled', true);
        $.ajax({
            url: this.action,
            type: this.method,
            data: new FormData(this),
            success: function(result) {
                if (result.success) {
                    if (result.loading) {
                        eval(result.loading_script);
                    }
                    $("#ModalStickUp").modal("hide");
                    if (result.notify) {
                        //notify(result.style, result.title, result.message, result.position, result.time, result.type, result.icono, result.where);
                        Swal.fire(
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
                } else {
                    $("#ModalStickUpContent").html(result);
                    bindForm(dialog);
                }
            },
            error: function(jqXHR, status, error) {
                console.log(jqXHR, status, error);
                Swal.fire(
                    {
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                        footer: '<a href="mailto:helpdesk@carlisleit.com">Why do I have this issue?</a>'
                    });
            },
            complete: function () {
                $('#ModalStickUpContent > form :input[type="submit"]').prop('disabled', false);
            }
        });
        modalformInitialize();
        return false;
    });
}