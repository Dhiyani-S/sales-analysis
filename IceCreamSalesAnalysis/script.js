/* -------- CSV DATASET (LEARNING ONLY - HIDDEN) -------- */
let learnedTrend = {};

fetch("sales_data.csv")
  .then(res => res.text())
  .then(data => {
    let rows = data.trim().split("\n");
    rows.shift(); // remove header

    rows.forEach(row => {
      let c = row.split(",");
      let season = c[1];
      let total = Number(c[2]) + Number(c[3]) + Number(c[4]);
      if(!learnedTrend[season]) learnedTrend[season] = 0;
      learnedTrend[season] += total;
    });
  });

let chartInstance = null;

/* -------- MAIN ANALYSIS -------- */
function analyzeSales(){

  let summer = Number(document.getElementById("summer").value);
  let winter = Number(document.getElementById("winter").value);
  let rainy  = Number(document.getElementById("rainy").value);

  let cones  = Number(document.getElementById("cones").value);
  let tubs   = Number(document.getElementById("tubs").value);
  let sundae = Number(document.getElementById("sundae").value);

  if(!summer || !winter || !rainy){
    alert("Please enter all sales values");
    return;
  }

  /* ---------- BAR GRAPH (#840694 BARS + LAVENDER BACKGROUND) ---------- */
  let ctx = document.getElementById("salesChart");

  if(chartInstance) chartInstance.destroy();

  const lavenderBackground = {
    id: 'lavenderBackground',
    beforeDraw: (chart) => {
      const {ctx, chartArea} = chart;
      ctx.save();
      ctx.fillStyle = "#E6E6FA"; // lavender
      ctx.fillRect(chartArea.left, chartArea.top,
                   chartArea.right - chartArea.left,
                   chartArea.bottom - chartArea.top);
      ctx.restore();
    }
  };

  chartInstance = new Chart(ctx,{
    type:"bar",
    data:{
      labels:["Summer","Winter","Rainy"],
      datasets:[{
        label:"Seasonal Sales",
        data:[summer,winter,rainy],
        backgroundColor:"#840694",
        borderColor:"#840694",
        borderWidth:1
      }]
    },
    options:{
      scales:{
        x:{ ticks:{color:"black"} },
        y:{ ticks:{color:"black"} }
      },
      plugins:{
        legend:{ labels:{color:"black"} }
      }
    },
    plugins:[lavenderBackground]
  });

  /* -------- ANALYSIS -------- */
  let seasons={Summer:summer,Winter:winter,Rainy:rainy};
  let highest=Object.keys(seasons).reduce((a,b)=>seasons[a]>seasons[b]?a:b);
  let lowest =Object.keys(seasons).reduce((a,b)=>seasons[a]<seasons[b]?a:b);

  let suggestion="";

  /* ---------- SEASONAL UNIQUE SUGGESTIONS ---------- */
  if(lowest==="Winter"){
    suggestion+=`
    <strong>Winter Improvement Suggestions:</strong><br>
    • Introduce hot brownie & ice cream combos<br>
    • Add coffee, tea & hot chocolate menu<br>
    • Provide “Buy 1 Get 1” on warm desserts<br>
    • Launch festive season discounts & coupons<br>
    • Organize weekend ice-cream tasting events<br><br>`;
  }
  else if(lowest==="Rainy"){
    suggestion+=`
    <strong>Monsoon Improvement Suggestions:</strong><br>
    • Promote home delivery & online orders<br>
    • Introduce family combo packs & bulk discounts<br>
    • Offer rainy-day discount coupons via WhatsApp<br>
    • Add seasonal flavors like chocolate fudge & hot toppings<br>
    • Run social media rainy-day challenges<br><br>`;
  }
  else{
    suggestion+=`
    <strong>Summer Improvement Suggestions:</strong><br>
    • Launch student evening offers & happy hours<br>
    • Introduce party pack & birthday special combos<br>
    • Free toppings or ice cream with cold drinks<br>
    • Organize “Ice Cream Festival” weekends<br>
    • Offer loyalty points for frequent buyers<br><br>`;
  }

  /* ---------- PRODUCT-WISE UNIQUE SUGGESTIONS ---------- */
  suggestion+=`<strong>Product-wise Suggestions:</strong><br>`;
  if(cones<tubs) suggestion+="• Buy 2 Get 1 offer on Cones<br>";
  if(sundae<cones) suggestion+="• Promote Sundaes as budget-friendly choice<br>";
  if(tubs<cones || tubs<sundae) suggestion+="• Family Tubs: Introduce discount for bulk purchase<br>";
  if(cones>tubs && cones>sundae) suggestion+="• Highlight cones as summer special<br>";
  if(sundae>cones && sundae>tubs) suggestion+="• Introduce Sundae combo with toppings<br>";

  if(learnedTrend[lowest] && learnedTrend[lowest]<learnedTrend[highest]){
    suggestion+="<br>• Historical dataset confirms this seasonal pattern<br>";
  }

  document.getElementById("output").innerHTML=`
    <strong>Highest Sales Season:</strong> ${highest}<br>
    <strong>Lowest Sales Season:</strong> ${lowest}<br><br>
    ${suggestion}
  `;
}
