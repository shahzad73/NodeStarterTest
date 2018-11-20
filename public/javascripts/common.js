function Common_CallAjax(weburl)
{

                        $.ajax({
                              url: weburl,
                              global: false,
                              type: "POST",
                              cache:false,
                              data:{},
                              dataType: "text",
                              success: function(msg)
                              {									
                                    var json = eval("(" + msg + ")");
									
									$(json).each(function(i, itm){
										alert(itm.name + "  " + itm.id);
									});
									
                              }

                        }); 
						
}