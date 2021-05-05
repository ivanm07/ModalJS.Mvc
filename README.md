# ModalJS
Plugin for create modal dynamically with jQuery in an ASP.NET MVC Project<br>
Use SweetAlert plugin 2.1.2+ -> https://sweetalert.js.org/
<br>
<hr>

## 1.- Add this code to your layout page:
```
<!--begin::Modal-->
  <div class="modal fade" id="ModalStickUp" tabindex="-1" role="dialog" aria-labelledby="ModalStickUp" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div id="ModalStickUpContent" class="modal-content">
      </div>
    </div>
  </div>
<!--end::Modal-->
```
## 2.- Add the [data-modal] attribute to your HTML controls
<!--begin::data-modal-->
```<a href="@Url.Action("","")" data-modal="layout" class="btn">Link</a>```
<!--end::data-modal-->

## 3.- Modify the controller to return the ModalResponse ViewModel as JSON

### View

```
<div class="modal" tabindex="-1" role="dialog">

</div>
</div>
```

### Controller
<pre>
[HttpGet]
public ActionResult Create()
{
  return View();
}
</pre>

<pre>
[HttpPost] 
public async Task<ActionResult> Create(ClassModel model)
{
  return Json(new ModalResponse(ResponseType.Success,
          _Redirect: true,
          _Url: Url.Action("", ""),
          _Loading: false,
          _Notify: true,
          AlertType: AlertTypes.success,
          Title: "Purchase requisition generated succesfully!"), JsonRequestBehavior.DenyGet);
}
</pre>
