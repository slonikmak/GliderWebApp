class StatusController {
    constructor() {
        this.voltage = $("#voltage-label");
        this.amperage = $("#amperage-lable");
        this.charge = $(".progress-bar");
        this.pressure = $("#presure-lable");
        this.humidity = $("#hummidity-lable");
        this.temperature_cpu = $("#cputemp-lable");
        this.temperature_hull = $("#insidetemp-lable");
    }

    setProperty(propName, value) {
        if (propName == "charge") {
            this.setBattery(value);
            return;
        }
        this[propName].text(value);
    };

    setBattery(value) {
        this.charge.css("width", value + "%");
        this.charge.text(value + "%");
    };

    setProperties(props) {
        for (let p  in props) {
            StatusController.setProperty(p, props[p]);

        }
    };

    update(){
        let that = this;
        $.get("/status", this.setProperties);
        setTimeout(this.update, 1000);
    }
}

class LogsController {

    constructor(){
        this.elem =  $("#log");
        this.elem.html("");
        $.get("/journals", function (data) {
            let logs = data["logs"];
            console.log(logs);
            for (let l in logs) {
                $("#log").append($("<a class='logItem' href='/journal?name=" + logs[l] + "'>" + logs[l] + "</a>"));
            }
        });
        this.elem.click(function (e) {
            e.preventDefault();
            let that = this;

            let href = $(e.target).attr("href");
            console.log(href);
            that.showLog(href);

            return false;
        });

        this.logTextArea = this.elem.append($("<div id='log-text-area'></div>"));

        //console.log(LogsController.prototype)
    }

    updateLogs() {

    }

    showLog(logPath){
        let that = this;
        $.get(logPath, function (data) {
            let logs = data[0];
            for (let l in logs){
                that.logTextArea.append($("<div class='log-item'>"+l+"</div>"));
            }
        })
    }


}