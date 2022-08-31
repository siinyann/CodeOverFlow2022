var counter = 0;
var carbonFootprint;
var offset;
var tax;
var higher;
var calcData = {"Electric":"",
                "Gas":"",
                "Oil":"",
                "Mileage":"",
                "Flights":"",
                "Hours":"",
                "Newspaper":"",
                "Metal":""};

function hidearrow() {
    if(counter==1){
        document.getElementById('left-arrow').style.visibility = 'hidden';
    }
    else if(counter==8){
        document.getElementById('right-arrow').style.visibility = 'hidden';
    }
    else if(counter==9){
        document.getElementById('right-arrow').style.visibility = 'hidden';
        document.getElementById('left-arrow').style.visibility = 'hidden';
    }
    else{
        document.getElementById('right-arrow').style.visibility = 'visible';
        document.getElementById('left-arrow').style.visibility= 'visible';
    }
}

function next() {
    counter++;
    if (counter > 9){
        counter = 9;
    }
    hidearrow();
    display_qn();
}

function prev() {
    counter--;
    if (counter < 1){
        counter = 1;
    }
    hidearrow();
    display_qn();
}

function display_qn() {
    if (counter > 0){
        var container = document.getElementById('container');
            container.style.display = 'block'; 
        var start = document.getElementById('start')
            start.style.display = 'none';
    }

    var qn = document.getElementsByClassName('qn');
    for (var i=0;i<qn.length;i++){
        qn[i].style.display = 'none';
    }
    qn[counter-1].style.display = 'block';
}

function getValue(a) {
    var value = a.value;
    if (a.name == 'Newspaper'){
        calcData.Newspaper = value;
    }
    else if (a.name == 'Metal'){
        calcData.Metal = value;
    }
    else{
        calcData.Hours = value;
    }
}

function result() {
    var data = document.getElementsByClassName('data');
    for(var i=0;i<data.length;i++){
        if(data[i].name=='Electric'){
            calcData.Electric = data[i].value;
        }
        else if(data[i].name=='Gas'){
            calcData.Gas = data[i].value;
        }
        else if(data[i].name=='Oil'){
            calcData.Oil = data[i].value;
        }
        else if(data[i].name=='Mileage'){
            calcData.Mileage = data[i].value;
        }
        else{
            calcData.Flights = data[i].value;
        }
    }
    for (const [key, value] of Object.entries(calcData)) {
        console.log(`${key}: ${value}`);
        if (value==''){
            alert('Please fill in all the parts')
            return
        }
      }
    Calc();
    display_result();
    window.scrollTo(0, document.body.scrollHeight);
    next();
}

function Calc(){
    var Electric = calcData.Electric * 105;
    var Gas = calcData.Gas * 105;
    var Oil = calcData.Oil * 113;
    var Mileage = calcData.Mileage * 0.79;
    if(calcData.Hours=="yes"){
        var Flights = calcData.Flights * 4400;
    }
    else{
        var Flights = calcData.Flights * 1100;
    }
    carbonFootprint = Electric + Gas + Oil + Mileage + Flights
    if(calcData.Newspaper=="yes"){
        carbonFootprint = carbonFootprint + 184;
    }
    if(calcData.Metal=="yes"){
        carbonFootprint = carbonFootprint + 166;
    }
    
    var t = carbonFootprint/2205
    if (t>7.4){
        offset = t - 7.4
        tax = offset * 5
        higher = true;
    }
    else{
        offset = 7.4 - t;
        higher = false;
    }
}

function display_result() {
    var cf = document.getElementById('carbonfootprint');
    var compare = document.getElementById('compare');
    var value = document.getElementById('value');
    var price = document.getElementById('price');
    var result = document.getElementById('result');
    if(higher) {
        document.getElementById('good').style.display = 'none';
        compare.innerText = 'higher';
        compare.style.color = '#dc3545';
        value.innerText = offset.toFixed(2);
        price.innerText = tax.toFixed(2);
    }
    else {
        document.getElementById('bad').style.display = 'none';
        compare.innerText = 'lower';
        value.innerText = offset.toFixed(2);
        compare.style.color = '#198754';
    }
    cf.innerText = (carbonFootprint/2205).toFixed(2);
    
    result.classList.toggle('show')

}