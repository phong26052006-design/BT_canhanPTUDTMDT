// Exercise 8.6 — Using Built in JavaScript Objects
var stringOne = new String('Test'); // Constructor được dùng để đối chiếu theo Lab.
var stringTwo = 'Test';
var stringThree = 'Test';
var stringFour = new String('Test');
document.write('<p>typeof stringOne = ' + typeof stringOne + '</p>');
document.write('<p>typeof stringThree = ' + typeof stringThree + '</p>');
document.write('<ul><li>stringOne == stringTwo: ' + (stringOne == stringTwo) + '</li>');
document.write('<li>stringOne == stringFour: ' + (stringOne == stringFour) + '</li>');
document.write('<li>stringOne === stringTwo: ' + (stringOne === stringTwo) + '</li>');
document.write('<li>stringTwo === stringThree: ' + (stringTwo === stringThree) + '</li>');
document.write('<li>stringTwo === stringFour: ' + (stringTwo === stringFour) + '</li></ul>');
var dateOne = new Date();
document.write('<p>Date hiện tại: ' + dateOne.toString() + '</p>');
document.write('<p>Math.PI = ' + Math.PI + '<br>Math.sqrt(4) = ' + Math.sqrt(4) +
    '<br>Math.random() = ' + Math.random() + '</p>');
