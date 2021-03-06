/* Roll Command
=================================*/
async function roll(args) {
  var number = 1;
  var dice = 20;
  var modifier = 0;

  const error = `Oops, syntax for a dice roll is as follows<br/>
  /roll <i style="opacity:.6">[# of dice]</i> d[# of sides] <i style="opacity:.6">+/-[# modifier]</i>`

  // set up potential arguments
  const a1 = getType(args[1])
  const a2 = getType(args[2])
  const a3 = getType(args[3])

  // check if first arg is a number, or a dice
  if (a1 == "number") { number = parseInt(args[1]) }
  else if (a1 == "dice") { dice = args[1].substring(1); }
  else { return error }

  // check if second arg is a dice or modifier
  if (a2 == "number") { dice = parseInt(args[2]) }
  else if (a2 == "dice") { dice = args[2].substring(1); }
  else if (a2 == "empty" && a1 == "dice") { return rollLogic(number, dice, modifier) }
  else { return error }

  // check if third arg is a modifier
  if (a3 == "number") { modifier = parseInt(args[3]) }
  else if (a3 == "modifier") { modifier = parseInt(args[3]) }
  else if (a3 == "dice") { return error }
  else if (a3 == "empty" || a1 == "dice") { return rollLogic(number, dice, modifier) }
  else { return error }

  // all done, return results
  return rollLogic(number, dice, modifier);

}

// Logic for determining argument type
function getType(arg) {
  //get first character to help identify function
  if(!arg){return "empty"}
  const preface = arg[0].toLowerCase();

  if (!isNaN(arg)) {
    return "number";
  }
  // check if arg is dice to roll
  else if (preface == "d") {
    if (!isNaN(arg.substring(1))) {
      return "dice"
    }
  }
  else if (["-", "+"].includes(preface)) {
    if (!isNaN(arg.substring(1))) {
      return "modifier";
    }
  }
  else if (arg == "") {
    return "empty"
  }

  return "invalid";
}

// logic for randomized rolls, and formating results
function rollLogic(number, dice, modifier) {
  const rolls = []
  var sum = modifier;
  for (i = 0; i < number; i++){
    const roll = 1+Math.floor(Math.random()*dice);
    rolls.push(roll);
    sum+=roll;
  }

  //return ("All Valid! number:"+number+" dice:"+dice+" modifier:"+modifier);
  return (`
    <div class="dice-container">
      ${rolls.map(roll => `
        <div class="die${roll==1? " fail" : roll==dice?" crit" : "" }">
          ${roll}
        </div>
      `).join("")}
    </div>
    <div class="dice-results">
      <div class="result">${number<2?"Result":"Sum"}: ${sum}</div>
      ${dice==20 && number==2 ?(`
        <div class="result"> Advantage: ${modifier+Math.max.apply(null, rolls)}</div>
        <div class="result"> Disadvantage: ${modifier+Math.min.apply(null, rolls)}</div>
      `):""
      }
    </div>
  `);
}

module.exports = roll;
