 // Events
    $(function() {
    
 	   var edit = false;
       
       $("li.item span").live("click", function () {
       		if (!edit) {
				$(this).find("h5.editer,input.editer,button.editer").toggle();
				edit = true;
			}
	   });
	   
	    $("button[type='submit']").click(function () {
	    	edit = false;
	    });
	    
	     $('.checker').live("change", function() {
           var li = $(this).parent();
           var id = li.attr('rel');
           var name = $(li.parent(), "li[rel='" + id + "'] + h5").html(); 
           var form = li.parent();
           if (edit) {
           	 	edit = false;
           		li.find("h5.editer,input.editer,button.editer").toggle();	
           }
           li.fadeOut(500, function() {
	           $.post('/list/edit', { 'item.id': id, 'item.done': true } , function() {
	                   $('#done').prepend(li);
	                   form.remove();
	                   li.find(".checker").removeClass("checker");
	                   li.find("input.editer,button.editer").remove();
	                   li.find(".editer").removeClass("editer");
	                   li.find("input type=['checkbox']").attr("checked", true);
	                   li.fadeIn(500);
	                   init();
	           });
           });
          
       });
       
       var init = function() {
        $(".add").button({icons:{primary:"ui-icon-plus"}});
        $(".edit").button({icons:{primary:"ui-icon-pencil"}});
        $(".save").button({icons:{primary:"ui-icon-disk"}});
        $(".save.edit").button({icons:{primary:"ui-icon-disk"}},{icons:{secondary:"ui-icon-pencil"}});
        $(".save.add").button({icons:{primary:"ui-icon-disk"}},{icons:{secondary:"ui-icon-plus"}});
        $(".delete").button({icons:{primary:"ui-icon-trash"}});
        $(".cancel").button({icons:{primary:"ui-icon-cancel"}});
      };
              
       $("#add_task").click(function(e) {
       	 e.preventDefault();
       	 var name = $("#id01").val();
       	 $("#id01").val("");
         $.post('/list/create', { 'name': name},  function(data) {
         	// In case of error, display the message
         	var error = $(data).find("section.notes p");
         	$("section.notes").html(error);
       	 	// Update the list
       	    var todos = $(data).find("ul#todo");
       	    $("div#todo_container").html(todos);
       	 	edit = false;
       	 	init();
       	 });
       });
       
       $("button.editer[type='submit']").live('click', function(e) {
       	 e.preventDefault();
       	 var li = $(this).parent().parent();
     	 var id = li.attr('rel');
       	 var name = $(li).find("input.editer").val(); 
       	 var what =  $(this).attr("value"); 
       	 $.post('/list/edit', { 'item.id': id, 'item.name': name, 'what' : what},  function(data) {
       	 	// Update the value
       	 	li.effect('highlight', 2000);
       	 	// In case of error, display the message
         	var error = $(data).find("section.notes p");
         	$("section.notes").html(error);
       	 	// Update the list
       	    var todos = $(data).find("ul#todo");
       	    $("div#todo_container").html(todos);
       	 	edit = false;
       	 	init();
       	 });
       });
     
	   
	   
    });