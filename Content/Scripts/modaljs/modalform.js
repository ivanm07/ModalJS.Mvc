$(function () {
    $.ajaxSetup({
        cache: false
    });
    try {
        modalformRender();
    }
    catch (e) {
        console.log(e);
        $("#ModalStickUpContent").html(null);
    }
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
        var loading = swal.fire({
            html: "<div class='d-flex justify-content-center'><div class='spinner spinner-primary' style='height:10rem;'></div></div>",
            //imageUrl: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
            showConfirmButton: false,
            allowOutsideClick: false
        });
        // hide dropdown if any (this is used wehen invoking modal from link in bootstrap dropdown )
        //$(e.target).closest('.btn-group').children('.dropdown-toggle').dropdown('toggle');
        $("#ModalStickUpContent").load(this.href, function (response, status, xhr) {
            loading.close();
            console.log(status, xhr);
            $("#ModalStickUp").modal({
                /*backdrop: 'static',*/
                margin_left: "auto",
                margin_right: "auto",
                keyboard: true
            }, "show");
            if (status == "error") {
                _dialog = null;
                $("#ModalStickUpContent").html(response);
                return false;
            }
            bindForm(this);
        });
        return false;
    });
}
var _dialog;
function bindForm(dialog) {
    if (dialog != null) {
        _dialog = dialog;
    }
    $("form", dialog).off("submit").submit(function (e) {
        //e.preventDefault(); // stop the standard form submission
        $('#ModalStickUpContent > form :input[type="submit"]').prop('disabled', true);
        var formData = new FormData();
        $(this).serializeArray().forEach(function (item, i, array) {
            formData.append(item.name, item.value);
        });
        $('input[type="file"]').each(function (i, el) {
            for (i = 0; i < el.files.length; i++) {
                //Appending each file to FormData object
                formData.append(el.name + "[" + i + "]", el.files[i]);
            }
        });
        $.ajax({
            url: this.action,
            type: this.method,
            data: formData,
            success: modalformSuccess,
            error: modalformError,
            processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
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
    //$("#ModalStickUp").modal("hide");
    if (result.notify) {
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
    if (result.url !== undefined) {
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
    Swal.fire(
        {
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: '<a href="mailto:support@domain.com">Why do I have this issue?</a>'
        });
}