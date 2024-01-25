namespace ModalJS
{
    public enum ResponseType
    {
        Success,
        Error
    }

    public enum AlertTypes
    {
        success,
        error,
        warning,
        info,
        question
    }
    public class ModalResponse
    {
        public ModalResponse(ResponseType response, bool _Redirect = true, string _Url = "", bool _Loading = true, bool _Notify = false, AlertTypes AlertType = AlertTypes.info, string Title = "", string Message = "", string Footer = "", string Position = "", int? Timer = null, bool _Hide = true, string _Render = "")
        {
            switch (response)
            {
                case ResponseType.Success:
                    success = true;
                    break;
                case ResponseType.Error:
                    success = false;
                    break;
                default:
                    break;
            }
            redirect = _Redirect;
            url = _Url;
            loading = _Loading;
            notify = _Notify;
            render = _Render;
            if (notify)
            {
                alertType = AlertType;
                title = Title;
                message = Message;
                footer = Footer;
                position = Position;
                timer = Timer;
                hide = _Hide;
            }
        }
        public bool success { get; set; }
        public bool notify { get; set; }
        public bool hide { get; set; }
        public bool redirect { get; set; }
        public bool loading { get; set; }
        public string loading_script
        { get; set; } = ""; /* Value for loading script */
        public string url { get; set; }
        public AlertTypes alertType { get; set; }
        public string icon => alertType.ToString() ?? "";
        public string title { get; set; }
        public string message { get; set; }
        public string footer { get; set; }
        public string position { get; set; }
        public int? timer { get; set; }
        public string render { get; set; }
    }
}