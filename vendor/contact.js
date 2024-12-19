
$(document).on('submit', "#ContactQuery", function(e){
    e.preventDefault(0);

    var AgentInfo = {
        "vAgentID": "4381",
        "vProject": "Property Finder",
        "vURL": "https://propertyfinder.org.in/contact.php",
        "thankspageurl": "",
    };
    
    $('#preferedtime').hide();

    var FormInfo = {
        "SenderControlID": "query_name",
        "SenderControlMobileID": "query_phone",
        "SenderControlEmailID": "query_email",
        "SenderControlMsgID": "query_msg"
    };

    SubmitQueryData(AgentInfo, FormInfo);

    var formData = new FormData(this);
    $.ajax({
        url : BASE_URL+'ajax/__ui_ajax.php?action=addcontactuser',
        type: "POST",
        data: formData,
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false,
        success : function(resp){
            var data=JSON.parse(JSON.stringify(resp));
            if(data.status==3){
                $('.errors').remove();
                var keys = Object.keys(data.errors);
                for (let index = 0; index < keys.length; index++) {
                    var keynam=keys[index];
                    $('#'+keynam).after('<p class="errors text-danger">'+data.errors[keynam]+'<p>');
                        if(index==0){
                            $('#'+keynam).focus();
                        }
                }
                alert(data.message);

            }else if(data.status==1){
                window.open(
                    BASE_URL+'thanks.php',
                    '_blank'
                );
                alert(data.message);

            }else{
                    window.location.reload();
                    alert(data.message);
            }
        }
    })
});

  