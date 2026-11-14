// Exercise 8.9 — Functions as Objects
var isCanadian = true;
function calculateTax(amount, tax) { return amount * tax(); }
function calculateTotal(price, quantity) {
    var amount = price * quantity;
    return amount + calculateTax(amount, function () { return isCanadian ? 0.05 : 0; });
}
