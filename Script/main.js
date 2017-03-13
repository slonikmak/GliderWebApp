$(function(){
    console.log("start!");
    
    
    var statusController = {
        voltage : $("#voltage-label"),
        amperage : $("#aperage-lable"),
        battery : $(".progress-bar"),
        presure : $("#presure-lable"),
        hummidity : $("#hummidity-lable"),
        cpuTemp : $("#cputemp-lable"),
        insideTemp : $("#insidetemp-lable"),
    
        setProperty : function(propName, value){
            if(propName=="battery") {
                this.setBattery(value);
                return;
            }
            this[propName].text(value);
        },
        
        setBattery: function(value){
            this.battery.css("width", value+"%");
            this.battery.text(value+"%");
        },
        setProperties : function(props){
            for(var p  in props){
                this.setProperty(p, props[p]);
            }
        }
    }
    
    
    
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
    
    //update();    
    initMap();
    
    function update(){
        $.get("/status", function(data){
            statusController.setProperties(data);
        });
        setTimeout(update, 1000);
    }
    
})

