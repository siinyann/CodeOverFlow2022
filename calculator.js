var counter = 0;
function next() {
    counter++;
    if (counter > 8){
        counter = 8;
    }
    display_qn();
}

function prev() {
    counter--;
    if (counter < 1){
        counter = 1;
    }
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
