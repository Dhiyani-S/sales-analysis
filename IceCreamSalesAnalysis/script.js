function analyzeSales() {

  let summer = document.getElementById("summer").value;
  let winter = document.getElementById("winter").value;
  let rainy  = document.getElementById("rainy").value;

  let cones  = document.getElementById("cones").value;
  let tubs   = document.getElementById("tubs").value;
  let sundae = document.getElementById("sundae").value;

  if(summer === "" || winter === "" || rainy === "" ||
     cones === "" || tubs === "" || sundae === ""){
    alert("Please enter all sales values");
    return;
  }

  summer = Number(summer);
  winter = Number(winter);
  rainy  = Number(rainy);
  cones  = Number(cones);
  tubs   = Number(tubs);
  sundae = Number(sundae);

  let seasons = { Summer: summer, Winter: winter, Rainy: rainy };

  let highest = Object.keys(seasons).reduce((a,b) =>
    seasons[a] > seasons[b] ? a : b
  );

  let lowest = Object.keys(seasons).reduce((a,b) =>
    seasons[a] < seasons[b] ? a : b
  );

  let suggestion = "";

  if(lowest === "Winter"){
    suggestion += `
    <strong>Low Winter Sales:</strong><br>
    • Hot Brownie + Ice-Cream<br>
    • Coffee & Hot Chocolate<br><br>`;
  }
  else if(lowest === "Rainy"){
    suggestion += `
    <strong>Low Monsoon Sales:</strong><br>
    • Home Delivery Offers<br>
    • Combo Packs<br><br>`;
  }
  else{
    suggestion += `
    <strong>Low Summer Sales:</strong><br>
    • Student Offers<br>
    • Party Packs<br><br>`;
  }

  suggestion += "<strong>Product-wise Suggestions:</strong><br>";

  if(cones < tubs) suggestion += "• Buy 2 Get 1 on Cones<br>";
  if(sundae < tubs) suggestion += "• Promote Sundaes<br>";
  if(tubs < cones) suggestion += "• Family Tubs Discount<br>";

  document.getElementById("output").innerHTML = `
    <strong>Highest Sales Season:</strong> ${highest}<br>
    <strong>Lowest Sales Season:</strong> ${lowest}<br><br>
    ${suggestion}
  `;
}
