$(document).on('click','.jobformsumit',function(){
    debugger;
    var job_id=$(this).attr('dataid');
    $("#apply_modal").modal('show');

$(document).on('submit',"#jobenquiry", function(e){
		
    e.preventDefault(0);
    debugger;
    var formData = new FormData(this);
   
    formData.append('job_id',job_id);
    debugger;
    $.ajax({
        url : '__ajax.php?action=jobenquiry',
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
                $('#'+keynam).after('<p class="errors">'+data.errors[keynam]+'<p>');
                    if(index==0){
                        $('#'+keynam).focus();
                    }
            }
            alert(data.message);

        }else if(data.status==1){
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
$(document).ready(function(){
    $('.work_with_us_section .career_box .box').each(function(){
        var totalLength = $(this).find('.key_points li').length;
        $(this).find('.key_points li:nth-child(4)').text('+'+(totalLength - 3)).addClass('selected');
    })
})

