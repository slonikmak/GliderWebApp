$(function(){
    console.log("start!");
    
    
    var statusController = {
        voltage : $("#voltage-label"),
        amperage : $("#amperage-lable"),
        charge : $(".progress-bar"),
        pressure : $("#presure-lable"),
        humidity : $("#hummidity-lable"),
        temperature_cpu : $("#cputemp-lable"),
        temperature_hull : $("#insidetemp-lable"),
    
        setProperty : function(propName, value){
            if(propName=="charge") {
                this.setBattery(value);
                return;
            }
            this[propName].text(value);
        },
        
        setBattery: function(value){
            this.charge.css("width", value+"%");
            this.charge.text(value+"%");
        },
        setProperties : function(props){
            for(var p  in props){
                this.setProperty(p, props[p]);
            }
        }
    }  
    
    var logsController = {
        updateLogs: function(){
            $("#log").html("");
            $.get("/logs", function(data){
                var logs = data["logs"];
                for (l in logs){
                    $("#log").append($("<a class='logItem' href='/log?name="+logs[l]+"'>"+logs[l]+"</a>"));
                }
            })
            $("#log").click(function(e){
                console.log($(e.target).attr("href"));
                e.preventDefault();
                return false;
            })
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
    var map = initMap();
    
    logsController.updateLogs();
    
    function update(){
        $.get("/status", function(data){
            statusController.setProperties(data);
        });
        setTimeout(update, 1000);
    }
    
})

