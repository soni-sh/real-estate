 
 
$(document).ready(function () {
     $(document).on('submit', '#bannerform', function (e) {
          e.preventDefault(0);

          var slc_city = $("#citylist").val();
          var slc_cat = $("#property_cat").val();
          var projectlist = $("#projectlist").val();
 
          window.location.href = BASE_URL+"platter.php?cat_="+slc_cat+"&city="+slc_city+"&project="+projectlist;
     });
});
 
 
function getAllProjjects(project) {
     $.ajax({
          url: BASE_URL+'__ajax.php?action=getProjects',
          type: 'POST',
          success: function (resp) {
             
               var data = JSON.parse(resp);

               if(data.status == 1){
                    const projects = data.data;
                    var listitem = "<option value='all-project'>Select Project</option>";
                    projects.forEach(item => {
                         
                         listitem += `<option value="${item.page_url}"  ${item.page_url === project ? "selected" : ""}>${item.name}</option>`;
                    });
                    $("#projectlist").html(listitem);
      
                    $('#projectlist').select2();
               }

          }
     })
}
 
 