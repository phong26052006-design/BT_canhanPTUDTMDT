// Exercise 8.10 — Creating JavaScript Objects
// Các cách tạo đối tượng: thuộc tính dấu chấm, ngoặc vuông, object literal.
var literalOrder = {product:'Self Portrait in a Straw Hat', price:15, quantity:2,
    total:function(){return this.price*this.quantity;}};
console.log('literal, dot, bracket:', literalOrder.product, literalOrder['product']);
function Order(product, price, quantity) {
    this.product=product;
    this.price=price;
    this.quantity=quantity;
    this.total=function(){return this.price*this.quantity;};
    this.output=function(){
        document.write('<div class="order"><p>Product='+this.product+'</p><p>Price='+this.price+
            '</p><p>Quantity='+this.quantity+'</p><p>Total='+this.total()+'</p></div>');
    };
}
var example1=new Order('Self Portrait in a Straw Hat',15,2);
var example2=new Order('Untitled #23',10,4);
example1.output();
example2.output();
console.log('total là hàm:',typeof example1.total,'total() là số:',example1.total());
