// Defines object that maps playIDs to their details: name and type.
let plays = {
  "hamlet": { "name": "Hamlet", "type": "tragedy" },
  "as-like": { "name": "As You Like It", "type": "comedy" },
  "othello": { "name": "Othello", "type": "tragedy" }
};

// Defines invoice for a customer and a list of performances attended.
let invoice = {
  customer: "BigCo",
  performances: [
    { playID: "hamlet", audience: 55 },     // 55 people watched Hamlet
    { playID: "as-like", audience: 35 },    // 35 people watched As You Like It
    { playID: "othello", audience: 40 }     // 40 people watched Othello
  ]
};

// Main function generates statement for given invoice and play list.
function statement(invoice, plays) {
  // Start building result string with customers name.
  let result = `Statement for ${invoice.customer}\n`;

  // Loops through each performance.
  for (let perf of invoice.performances) {
    // Adds line for each play including name, price, and audience size.
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
  }

  // Add totalAmount to result string.
  result += `Amount owed is ${usd(totalAmount())}\n`;
  // Add totalVolumeCredits to result string.
  result += `You earned ${totalVolumeCredits()} credits\n`;

  return result; // Return final formatted statement.


  // Calculates totalAmount for all performances.
  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf); // Add cost for each performance.
    }
    return result;
  }

  // Calculates totalVolumeCredits across all performances.
  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf); // Add credits earned from each performance.
    }
    return result;
  }

  // Calculates cost for each singular performance.
  function amountFor(aPerformance) {
    let result = 0;
    // Determines price based on play type.
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000; // Base price.
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30); // Extra charge per attendee over 30.
        }
        break;
      case "comedy":
        result = 30000; // Base price.
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20); // Extra charge for more than 20 attendees.
        }
        result += 300 * aPerformance.audience; // Additional per-attendee charge for comedy.
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`); // Error if play type is unknown.
    }
    return result; // Return final cost.
  }

  // Calculates the volume credits earned for a performance.
  function volumeCreditsFor(perf) {
    let result = Math.max(perf.audience - 30, 0); // 1 credit per attendee above 30.
    if (playFor(perf).type === "comedy") {
      result += Math.floor(perf.audience / 5); // Extra credit for every 5 attendees in a comedy.
    }
    return result; // Returns totalVolumeCredits.
  }

  // Function that gets details such as name and type from aPerformance.
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  // Function that declares aNumber to "currency", making it to money with decimal places.
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100); // Divides currency by 100 to convert a penny to a dollar.
  }
}

// Acts as a "System.out.log" and calls the statement function and logs the result to the console to print it out!
console.log(statement(invoice, plays));