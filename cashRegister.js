function isWholePositiveNumber(value) {
  if (Number.isInteger(value)) {
    return value > 0;
  }
  return false;
}

function getDenominationFromTill(denomAmtInDrawer, changeAmtDivideDenom, denomValue) {
  if (denomAmtInDrawer === 0) return 0;
  // if ()
  const amtToGive = Math.min(denomAmtInDrawer, changeAmtDivideDenom * denomValue);
  return amtToGive;
}

function checkRightAmt(totalChangeAmt, change) {
  let changeInHand = (Math.round(change.reduce((acc, denomination) => acc + denomination[1], 0) * 100) /100)
  console.log(totalChangeAmt, changeInHand)
  let answer = (totalChangeAmt === changeInHand) ? true : false
  return answer
}

function checkCashRegister(price, cash, cid) {
  let change = [],
    changeAmt,
    cidTotal,
    cidMinusChange,
    denominations;

  denominations = {
    "ONE HUNDRED": 100*100,
    "TWENTY": 20*100,
    "TEN": 10*100,
    "FIVE": 5*100,
    "ONE": 1*100,
    "QUARTER": 0.25*100,
    "DIME": 0.1*100,
    "NICKEL": 0.05*100,
    "PENNY": 0.01*100,
  };

  // add denominations to cid for ease
  cid.forEach((denom) => {
    denom.push(denominations[denom[0]]);
    denom[1] *= 100
  });
  price *= 100
  cash *= 100

  // Calculate price - cash
  changeAmt = (cash - price);
  

  // Calculate cidTotal - total $ money in drawer
  cidTotal = cid
      .reverse()
      .map((denomination) => denomination[1])
      .reduce((counter, denomination) => counter + denomination)
 
  // console.log("cidTotal", cidTotal)

  let totalChangeAmt = changeAmt / 100

  if (cidTotal > changeAmt) {
    cid.forEach((denom) => {
      let denomValue = denom[2];
      let denomAmtInDrawer = denom[1];
      let denomName = denom[0];
      let amtFromTill = 0;
      let changeAmtDivideDenom = Math.floor(changeAmt / denomValue);
    
    
      if (changeAmt <= 0) return;
      if (isWholePositiveNumber(changeAmtDivideDenom)) {
        amtFromTill = getDenominationFromTill(denomAmtInDrawer, changeAmtDivideDenom, denomValue);
        if (amtFromTill === 0) return
        changeAmt -= amtFromTill; // Corrected the subtraction assignment operator
        change.push([denomName, amtFromTill/100]);
      }
    });
    if (checkRightAmt(totalChangeAmt, change)) {
      return { status: "OPEN", change: change };
    }
    else {
      return {status: "INSUFFICIENT_FUNDS", change: []}
    }
  } else if (cidTotal === changeAmt) {
    return { status: "CLOSED", change: cid.reverse().map(denom => {
      return [denom[0], denom[1] / 100]
    }
    ) };
  } else {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
}

console.log(
  checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
  )

