// Personal Info Variables
const firstName = "Anahit";       // string
const lastName = "Mkrtchyan";       // string
const birthYear = 2003;           // birth year
const currentYear = 2025;         // current year
let isStudent = false;             // about student being

const hobbies = ["coding", "reading", "gym"]; // hobbies info

const contact = {
  email: "anahit.mkrtchyan.techx.@gmail.com",
  phone: "+374-123-4567",
  city: "Yerevan"
}; // contact info 

const student = "a student";
const noStudent = "not a student";

//logging sentences
console.log(`Hi, my name is ${firstName} ${lastName}. I live in ${contact.city}.`);
console.log(`I am ${currentYear - birthYear} years old and currently ${isStudent ? student : noStudent}.`);


const ageString = "25";
const ageNumber = 25;

//compare types using in js
console.log(ageNumber == ageString)
console.log(ageNumber === ageString)


const  scoreNumber = 80;
var  score = "";

//scores
if(scoreNumber >= 90){
    console.log("A: 90-100");
    score = "A";
} else if(scoreNumber >= 80) {
    console.log("B: 80-89");
    score = "B";
} else if(scoreNumber >= 70) {
    console.log("C: 70-79");
    score = "C";
} else if(scoreNumber >= 60) {
    console.log("D: 60-69")
    score = "D";
} else {
    console.log("D: 60-69")
    score = "F";
}


switch(score){
  case "A" : console.log("Excellent work!");
    break;
  case "B" : console.log("Good job!");
    break;
  case "C" : console.log("Keep improving.");
    break;
  case "D" : console.log("Try harder.");
     break;
  default : console.log("Needs serious effort");
}

console.log(score);

score <= "C" ? console.log("You passed!") : console.log("You failed!");