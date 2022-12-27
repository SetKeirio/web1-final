window.onload = function() {
  let i = sessionStorage.getItem("count");
  i = parseInt(i, 10);
  for (let j = 0; j < i; j++){
    let temp = sessionStorage.getItem(j);
    $('#status-table').append(temp);
  }
}

  /**$.ajax({
    url: 'http://localhost:3000/script.php',
    method: 'POST',
    data: $(this).serialize(),
    dataType: "json",
    beforeSend: function() {
      $('.button').attr('disabled', 'disabled');
    },
    success: function(data) {
      $('.button').attr('disabled', false);
      //if (data.validate) {
        alert(data);
        data.array.forEach(({ x, y, r, validate, nowTime, executeTime, inArea}) => {
          
          //let y = data.y.replace(",", ".");
          const table = document.getElementById("status-table");
          const newRow = document.createElement("tr");
          const x2 = document.createElement("td");
          x2.innerText = x;
          const y2 = document.createElement("td");
          y2.innerText = y;
          const r2 = document.createElement("td");
          r2.innerText = r;
          const executeTime2 = document.createElement("td");
          executeTime2.innerText = executeTime;
          const nowTime2 = document.createElement("td");
          nowTime2.innerText = nowTime;
          const inArea2 = document.createElement("td");
          inArea2.innerText = inArea;
          newRow.appendChild(x2);
          newRow.appendChild(y2);
          newRow.appendChild(r);
          newRow.appendChild(executeTime);
          newRow.appendChild(nowTime);
          newRow.appendChild(inArea);
          table.appendChild(newRow);
        });
        
    
        /*currentCase = '<tr>';
        currentCase += '<td>' + data.x + '</td>';
        currentCase += '<td>' + y + '</td>';
        currentCase += '<td>' + data.r + '</td>';
        currentCase += '<td>' + data.executeTime + '</td>';
        currentCase += '<td>' + data.nowTime + '</td>';
        currentCase += '<td>' + data.inArea + '</td>';
        $('#status-table').append(currentCase);
      //}
    }
  });*/
  
$(function(){

function checkR(){
    let input = $("#r-buttons");
    let rval;
    let radio = document.querySelectorAll("input[name=\"rval\"]");
    for (let i = 0; i < radio.length; i++){
      if (radio[i].checked){
        rval = radio[i].value;
      }
    }
    if ($(".r-button").is(":checked") && (rval == 1 || rval == 1.5 || rval == 2 || rval == 2.5 || rval == 3)){
      let c = document.getElementById("r-status");
      if (c != null){
        c.parentNode.removeChild(c);
      }
        return true;
    }
    let c = document.getElementById("r-status");
    if (c == null){
      c = document.createElement("div");
      c.innerText = "Проверьте правильность переменной R!";
      c.className = "validation-status";
      c.id = "r-status";
      input.after(c);
    }
    return false;
}

function checkX(){
    let input = $("#x-buttons");
    let xval;
    let radio = document.querySelectorAll("input[name=\"xval\"]");
    for (let i = 0; i < radio.length; i++){
      if (radio[i].checked){
        xval = radio[i].value;
      }
    }
    if ($(".x-button").is(":checked") && (xval == -2 || xval == -1.5 || xval == -1 || xval == -0.5 || xval == 0 || xval == 0.5 || xval == 1 || xval == 1.5 || xval == 2)){
      let c = document.getElementById("x-status");
      if (c != null){
        c.parentNode.removeChild(c);
      }
      return true;
      }
    let c = document.getElementById("x-status");
    if (c == null){
      c = document.createElement("div");
      c.innerText = "Проверьте правильность переменной x!";
      c.className = "validation-status";
      c.id = "x-status";
      input.after(c);
    }
    return false;
}

function checkY(){
    let input = $("#text-y");
    let y = input.val();
    y = y.replace(",", ".");
    if (isNumber(y) && y <= 3 && y >= -3){
        let c = document.getElementById("y-status");
        if (c != null){
          c.parentNode.removeChild(c);
        }
        return true;
    }
    let c = document.getElementById("y-status");
    if (c == null){
      c = document.createElement("div");
      c.innerText = "Проверьте правильность переменной y!";
      c.className = "validation-status";
      c.id = "y-status";
      input.after(c);
    }

    return false;
}

function validate(){
    return checkR() && checkX() && checkY();
}

function isNumber(a){
    return isFinite(a) && !isNaN(parseFloat(a));
}

$('#dataform').on('submit', function(event) {
    event.preventDefault();
    if (!validate()){
      alt = "Проверьте правильность следующих переменных: ";
      if (!checkX()){
        alt += "x, ";
      }
      if (!checkY()){
        alt += "y, ";
      }
      if (!checkR()){
        alt += "R, ";
      }
      //alert(alt.substring(0, alt.length - 2));
      let input = $("#alert");
      input.textContent = alt.substring(0, alt.length - 2);
      return;
    }
    else{
      let input = $("#alert");
      input.textContent = "";
    }
    $.ajax({
      //url: 'http://localhost:3000/script.php',
      url: location.protocol + "//" + location.host + "/script.php",
      method: 'POST',
      data: $(this).serialize(),
      dataType: "json",
      beforeSend: function() {
        $('.button').attr('disabled', 'disabled');
      },
      success: function(data) {
        $('.button').attr('disabled', false);
        /*data.forEach(({ x, y, r, validate, nowTime, executeTime, inArea }) => {
          alert(x + y + r + validate + nowTime + executeTime + inArea + data.length);
        });*/
        if (data.validate){
          let y = data.y.replace(",", ".");
          const table = document.getElementById("status-table");
          const newRow = document.createElement("tr");
          const x = document.createElement("td");
          x.innerText = data.x;
          const y2 = document.createElement("td");
          y2.innerText = data.y;
          const r = document.createElement("td");
          r.innerText = data.r;
          const executeTime = document.createElement("td");
          executeTime.innerText = data.executeTime;
          const nowTime = document.createElement("td");
          nowTime.innerText = data.nowTime;
          const inArea = document.createElement("td");
          inArea.innerText = data.inArea;
          newRow.appendChild(x);
          newRow.appendChild(y2);
          newRow.appendChild(r);
          newRow.appendChild(executeTime);
          newRow.appendChild(nowTime);
          newRow.appendChild(inArea);
          table.appendChild(newRow);
          currentCase = '<tr>';
          currentCase += '<td>' + data.x + '</td>';
          currentCase += '<td>' + y + '</td>';
          currentCase += '<td>' + data.r + '</td>';
          currentCase += '<td>' + data.executeTime + '</td>';
          currentCase += '<td>' + data.nowTime + '</td>';
          currentCase += '<td>' + data.inArea + '</td>';
          let i = sessionStorage.getItem("count");
          i = parseInt(i, 10);
          if (!isNumber(i)){
            i = 0;
          }
          sessionStorage.setItem(i, currentCase);
          sessionStorage.setItem("count", i+1);
          window.open(location.protocol + "//" + location.host + "/table.html");
        }
      }
    });
  });
});
