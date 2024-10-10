var answer = getRndInteger(-9, 15);
console.log(answer);
var rightx = getRndInteger(-9, 10);
var rightc = getRndInteger(-9, 10);
var leftx = getRndInteger(-9, 10);
var leftc = (rightx-leftx)*answer + rightc;
var isx = false;
sign = "+";
var currop = "Add";
var helper = ""
var prepo = " to"
n = 1

function getRndInteger(min, max) {
  var RndInt = Math.floor(Math.random() * (max - min) ) + min;
  if (RndInt == 0){
      RndInt = 1;
  }
  return RndInt;
}

function renderEquation(){
    if(leftx == 0){
        $('#equationcanvas h2:last-child b:nth-child(1)').html("");
    } else if (leftx == 1){
        $('#equationcanvas h2:last-child b:nth-child(1)').html("x");
    } else if (leftx == -1){
        $('#equationcanvas h2:last-child b:nth-child(1)').html("-x");
    } else {
        $('#equationcanvas h2:last-child b:nth-child(1)').html(leftx+"x");
    }
    if (leftc > 0){
        $('#equationcanvas h2:last-child b:nth-child(2)').html(" + ");
        $('#equationcanvas h2:last-child b:nth-child(3)').removeClass('hidden')
    } else if (leftc < 0){
        $('#equationcanvas h2:last-child b:nth-child(2)').html(" - ");
        $('#equationcanvas h2:last-child b:nth-child(3)').removeClass('hidden')
    }
    else{
        $('#equationcanvas h2:last-child b:nth-child(2)').html("");
        $('#equationcanvas h2:last-child b:nth-child(3)').addClass('hidden')
    }
    $('#equationcanvas h2:last-child b:nth-child(3)').html(Math.abs(leftc));
    $('#equationcanvas h2:last-child b:nth-child(4)').html(" = ");
    if(rightx == 0){
        $('#equationcanvas h2:last-child b:nth-child(5)').html("");
    } else if (rightx == 1) {
        $('#equationcanvas h2:last-child b:nth-child(5)').html("x");
    } else if (rightx == -1) {
        $('#equationcanvas h2:last-child b:nth-child(5)').html("-x");
    } else {
        $('#equationcanvas h2:last-child b:nth-child(5)').html(rightx+"x");
    }
    if (rightc > 0){
        $('#equationcanvas h2:last-child b:nth-child(6)').html(" + ");
        $('#equationcanvas h2:last-child b:nth-child(7)').removeClass('hidden')
    } else if (rightc < 0){
        $('#equationcanvas h2:last-child b:nth-child(6)').html(" - ");
        $('#equationcanvas h2:last-child b:nth-child(7)').removeClass('hidden')
    }
    else{
        $('#equationcanvas h2:last-child b:nth-child(6)').html("");
        $('#equationcanvas h2:last-child b:nth-child(7)').addClass('hidden')
    }
    $('#equationcanvas h2:last-child b:nth-child(7)').html(Math.abs(rightc));

}

$(document).ready(function(){
    // Initial equation generation
    renderEquation();

    // event handler for number keys
    $('.number').click(function(){
        var input = $("#numval");
        input.html(input.html() + this.innerHTML);
    });

    //event handler for operation keys
    $('.operation').click(function(){
        console.log(this.innerHTML);
        $('#nummod').removeClass('hidden');
        $('#currop').html(this.innerHTML);
        currop = this.innerHTML;
    });

    //event handler for sign change
    $('#signchange').click(function(){
        console.log(this.innerHTML);
        if (sign == "+"){
            sign = "-";
        } else {
            sign = "+";
        }
        $('#signlabel').html(sign);
    });

    //event handler for "x" label
    $('#xtoggle').click(function(){
        console.log(this.innerHTML);
        $('#xlabel').toggleClass('hidden');
        isx = !isx;
    });

    //event handler for delete
    $('#delete').click(function(){
        var input = $("#numval");
        input.html(input.html().slice(0, -1));
    });

    //event handler for Go
    $('#go').click(function(){
        var input = $("#numval");
        var k = input.html();
        netval = parseInt((sign+k),10);
        if (netval == 0 || isNaN(netval)){
            return
        }
        console.log(netval);
        switch(currop){
            case "Add":
                helper = ""
                prepo = " to"
                if (isx){
                    leftx += netval;
                    rightx += netval;
                } else {
                    leftc += netval;
                    rightc += netval;
                }
                break;
            case "Subtract":
                helper = ""
                prepo = " from"
                if (isx){
                    leftx -= netval;
                    rightx -= netval;
                } else {
                    leftc -= netval;
                    rightc -= netval;
                }
                break;
            case "Divide":
                helper = " by"
                prepo = " on"
                leftx /= netval;
                rightx /= netval;
                leftc /= netval;
                rightc /= netval;
                break;
            case "Multiply":
                helper = " by"
                prepo = " on"
                leftx *= netval;
                rightx *= netval;
                leftc *= netval;
                rightc *= netval;
                break;
            }
        // render the equation and reset inputs
        opstring = "<h4 class = 'operationlog'>"+currop+helper+" "+(netval == 1 ? "":netval)+(isx ? "x":"")+prepo+" both sides</h4>"
        $("#equationcanvas").append(opstring)
        $("#equationcanvas").append("<h2 class = 'math equation'><b></b><b></b><b></b><b class='equal'></b><b></b><b></b><b></b></h2>")
        renderEquation();
        input.html("");
        $('#xlabel').addClass('hidden');
        isx = false;
        if(leftx == 1 && leftc == 0 && rightx == 0){
            $('#equationcanvas h2:last-child').addClass("bg-success");
        }

    });


});