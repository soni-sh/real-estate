    $(document).on('submit', '#micro_site_contactForm', function(e){
        e.preventDefault(0);

        var AgentInfo = {
            "vAgentID": "4381",
            "vProject": $("#query_project_name").val(),
            "vURL": $("#query_page_url").val(),
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


        var formdata = new FormData(this);
        $.ajax({
            url : BASE_URL+'ajax/__ui_ajax.php?action=addmicrocontactform',
            type: "POST",
            data: formdata,
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


    $(document).on('submit', '#touchwithusform', function(e){
        e.preventDefault(0);

        var AgentInfo = {
            "vAgentID": "4381",
            "vProject": $("#getprojectname").val(),
            "vURL": $("#getpageurl").val(),
            "thankspageurl": "",
        };

        $('#preferedtime').hide();

        var FormInfo = {
            "SenderControlID": "getname",
            "SenderControlMobileID": "getphone",
            "SenderControlEmailID": "getemail",
            "SenderControlMsgID": "getcomment"
        };

        SubmitQueryData(AgentInfo, FormInfo);

        
        var formdata = new FormData(this);
        $.ajax({
            url : BASE_URL+'ajax/__ui_ajax.php?action=addtouchwithusform',
            type: "POST",
            data: formdata,
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

    $(document).on('click', '.submitintrestedform', function(){
        // debugger;

        var dataid = $(this).attr('dataid');
        var datatype = $(this).attr('data-brochure-type');

        $.ajax({
            url : BASE_URL+'ajax/__ui_ajax.php?action=editmodaldata',
            type : 'POST',
            data : {'id':dataid},
            success : function(res){
                var jsonData = JSON.parse(res);
                if(jsonData.status==1){
                    var row = jsonData['data'];

                    
                    // $("#modalprojectname").html(row.name);
                    // $("#developerId").val(row.developer_id);
                    // $("#modalpropertyaddress").val(row.address);
                    // $("#modalpropertytype").val(jsonData.property_type);
                }else{ 
                    alert(data.message);
                }
            }
        });
        $("#insterteduser").modal('show');


        $(document).on('submit','#modaldatasubmitmicrosite', function(e){
        e.preventDefault(0);

        var AgentInfo = {
            "vAgentID": "4381",
            "vProject": $("#modalprojectname").html(),
            "vURL": $("#modalpageurl").val(),
            "thankspageurl": "",
        };

        $('#preferedtime').hide();

        var FormInfo = {
            "SenderControlID": "modalinsname",
            "SenderControlMobileID": "modalinsphone",
            "SenderControlEmailID": "modalinsemail",
            "SenderControlMsgID": "modalinscomment"
        };

        SubmitQueryData(AgentInfo, FormInfo);

        var formData = new FormData(this);
        formData.append('eid',dataid);
        formData.append('etype',datatype);
        formData.append('projectname', $("#modalprojectname").html());

            $.ajax({
                url : BASE_URL+'ajax/__ui_ajax.php?action=addmodaldatamicrosite',
                type: "POST",
                data: formData,
                dataType: 'json',
                contentType: false,
                cache: false,
                processData: false,
                enctype: 'multipart/form-data',
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
                        $("#insterteduser").modal('show');

                    }else if(data.status==1){
                        if(data.type != 0){
                            downloadFile(BASE_URL+'admin/uploads/microsite/brochure/'+data.type);
                            window.open(
                                BASE_URL+'thanks.php',
                                '_blank'
                            );
                            alert(data.message);
                        }else{
                            window.open(
                                BASE_URL+'thanks.php',
                                '_blank'
                            );
                            alert(data.message);
                        }

                    }else if(data.status == 0){
                        window.location.reload();
                        alert(data.message);
                    
                    }else{
                        window.location.reload();
                        alert(data.message);
                    }
                }
            })

        });
    });