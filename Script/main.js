$(function(){
    console.log("start!");
    
    $("li").click(function(){
        var elemId = $(this).attr('data-elem');
        var elem = $('#'+elemId);
        var checkbox = $(this).find("input");
        if (checkbox.prop("checked")){
            console.log("checked");
            elem.css("display", "none");
            checkbox.removeAttr("checked");
        } else {
            elem.css("display", "block");
            checkbox.attr('checked', 'checked');
        }
        console.log(elemId);
        console.log($(this).find("input").attr("checked"))
    })
})