// const datapage = document.querySelector('#result');
// const form = document.getElementById('form');
// const datapage_original = document.getElementById('form');
//Note: (script.js from index.js has the cdn url. CDN is used to run live moment.js
//Anytime you need to run a Javascript library in client-side, you search up CDN and the name of the library)

// let To;
// let From;
// let Departure_date;
// let Results_Count;
// let DATES_TO_GET = 30;
//Filling out the Form
// form.addEventListener('keypress', (e) => {
//   if (e.key === 'Enter') {
//     if (document.getElementById('data')) { while (document.getElementById('data')) { document.getElementById('data').remove() } }
//     To = document.getElementById('box1').value
//     From = document.getElementById('box2').value
//     Departure_date = document.getElementById('box3').value
//     Results_Count = document.getElementById('box4').value
//     fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://skiplagged.com/api/search.php?from=${From}&to=${To}&depart=${Departure_date}`)}`)
//       .then((response) => response.json())
//       .then((data) => {
//         for (let i = 0; i < Results_Count; i++) {
//           let flight_No = data.depart[i][3]
//           console.log(data);
//           datapage.insertAdjacentHTML(
//             'beforeend',
//             `<tr id=data>
// <td>${data.flights[flight_No][0].map(ele => { return ele[0] })}</td>
// <td id=${i}>${(data.depart[i][0]).map(ele => { return '$' + ele / 100 })}</td>
// </tr>`
//           );
//         }
//       }).then(Webhook)
//       .catch((err) => window.alert(err))
//   }
//   ;
// });


function Webhook() {
URL = `https://discord.com/api/webhooks/1009303429715333182/CjTAkOgzUb6p9llA85rVAW1UFQTrtvvdLgTXgzyTxLYadiBH_atvu2zglEWwozooNaNr`
   fetch(URL, {
     "method": "POST",
    "headers": { "Content-Type": "application/json" },
     "body": JSON.stringify({
      "content": `The cheapest price from ${formData.from} to ${formData.to} in the last 30 days is : ${flights[0]}`
    })
  })
 }
//Selection Sort
//let minimum;

//Loop Date
// function LoopDate(a) {
//   document.getElementById('box3').value = moment().add(a, 'd').format("YYYY-MM-DD")
//   setTimeout("", 5000);
//   document.body.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }))
// }

async function getFlightData(from, to, departure) {
  const flightResponse = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://skiplagged.com/api/search.php?from=${from}&to=${to}&depart=${departure}`)}`)
  return flightResponse.json();
}

async function submitForm(event) {
  event.preventDefault();
  const formData = Array.from(event.target.querySelectorAll("input")).map(e => ({ name: e.name, value: e.value }))
    .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value}), {});
  console.log(formData);

  // Lets us fire off a bunch of requests at once
  let flights = await Promise.all(
    // Inline way of doing a loop
    new Array(Number(formData.results)).fill(null)
      // Map lets us do something to each element in the array
      .map((_, i) => getFlightData(formData.from, formData.to, moment(formData.departure).add(i, "d").format("YYYY-MM-DD")))
  )

  flights = flights.map((_, i) => [flights[i].depart[0][0][0], i]).sort(function(a, b){return a[0] - b[0]})
console.log(flights)
  URL = `https://discord.com/api/webhooks/1009303429715333182/CjTAkOgzUb6p9llA85rVAW1UFQTrtvvdLgTXgzyTxLYadiBH_atvu2zglEWwozooNaNr`
   fetch(URL, {
     "method": "POST",
    "headers": { "Content-Type": "application/json" },
     "body": JSON.stringify({
      "content": `The cheapest price from ${formData.from} to ${formData.to} in the next ${flights.length} days from ${moment(formData.time).format("YYYY-MM-DD")} is : $${flights[0][0]/100} on Date: ${moment(formData.time).add(flights[0][1], "d").format("YYYY-MM-DD")}`
    })
  })
  setTimeout(() => {
    submitForm(event)
  }, 8000);
}

flightSearch.addEventListener("submit", submitForm);
