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

//Button right here
Const button = document.getElementByClassName('ToFrom');

async function getFlightData(from, to, departure) {
  const flightResponse = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://skiplagged.com/api/search.php?from=${from}&to=${to}&depart=${departure}`)}`)
  return flightResponse.json();
}

async function submitForm(event) {
  event.preventDefault();
//Something about document.querySelector that you mentioned?
  flights = document.querySelectorAll(".to-from").forEach(ele => { const to = ele.querySelector(".to");
const from = ele.querySelector(“.from”);})


  // Lets us fire off a bunch of requests at once
  let flights = await Promise.all(
    // Something about Array to-from that you mentioned?
    new Array.from(document.querySelectorAll(".to-from")).map(ele =>…?)
      // Map lets us do something to each element in the array
      .map((_, i) => getFlightData(formData.from, formData.to, moment(formData.departure).add(i, "d").format("YYYY-MM-DD")))
  )
//This stays. This is to parse the returned results
  flights = flights.map((_, i) => [flights[i].depart[0][0][0], i]).sort(function(a, b){return a[0] - b[0]})
console.log(flights)
  URL = `https://discord.com/api/webhooks/1000930577182101506/fF_e4nrjDmGZ6X8ZuKHhdnJFPIL2rYBVAUL6IcHbMXClKOLIhESmGEeCATeoKhqUnrb8`
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

//function to create new To-From field
function addToandFrom(){
  const from= document.createElement(“input”)
  const to= document.createElement(“input”)
  from.name = from;
  to.name = to;
}

flightSearch.addEventListener("submit", submitForm);
button.addEventListener(“click”, addToandFrom);
