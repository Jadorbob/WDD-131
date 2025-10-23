const steps = ["one", "two", "three"];

function listTemplate(steps) {
  return steps.map(step => `<li>${step}</li>`).join("");
}

const stepsHtml = listTemplate(steps);

document.querySelector("#myList").innerHTML = stepsHtml;

// -------------------------------------------

const grades = ["A", "B", "A"];
function convertGradeToPoints(grade) {
  let points = 0;
  if (grade === "A") {
    points = 4;
  } else if (grade === "B") {
    points = 3;
  }
  return points;
}
const gpaPoints = grades.map(convertGradeToPoints);

// --------------------------------------------

const pointsTotal = gpaPoints.reduce(function (total, item) {
  return total + item;
});
const gpa = pointsTotal / gpaPoints.length;

const words = ["watermelon", "peach", "apple", "tomato", "grape"];
const shortWords = words.filter(function (word) {
  return word.length < 6;
});

// ----------------------------------------

const myArray = [12, 34, 21, 54];
const luckyNumber = 21;
let luckyIndex = myArray.indexOf(luckyNumber);