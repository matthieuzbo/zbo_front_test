const fs = require("fs");
const briefsFile = "../data/briefs.json";
const briefs = require(briefsFile);

const now = Date.now();
const briefMaxDuration = 60;
const startFromNow = 30;

for (var key in briefs) {
  var brief = briefs[key];

  var notStarted = random(2);
  var start = random(startFromNow);
  brief.startDate = addDaysToDate(notStarted?start:start*-1, brief.startDate);
  var end = random(briefMaxDuration);
  brief.endDate = addDaysToDate(end, brief.startDate);
}

let json = JSON.stringify(briefs, null, 2);
fs.writeFile(briefsFile, json, "utf-8", function (err) {
  if (err) throw err;
  console.log("complete");
});

function random(i) {
  return Math.floor(Math.random() * i);
}

function addDays() {
  var limit = 30;
  var r1 = random(5);
  if (r1 <= 1) {
    return random(limit);
  }

  return limit + random(200 - limit);
}

function addDaysToDate(days, currentDate) {
  var date = new Date(currentDate);
  date.setDate(date.getDate() + days);

  return date;
}
