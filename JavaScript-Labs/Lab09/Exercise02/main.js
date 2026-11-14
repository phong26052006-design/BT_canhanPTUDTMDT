// Exercise 9.2 — DOM Family Relations
var first=document.getElementById('first');
console.log('first:',first,'firstChild:',first.firstChild,
    'nextSibling:',first.firstChild.nextSibling,'parent:',first.parentNode);
var stories=document.getElementById('stories');
var rows=[];
for(var i=0;i<stories.childNodes.length;i++) {
    var node=stories.childNodes[i];
    var row='child '+i+' = '+node.nodeName+' nodeType='+node.nodeType;
    console.log(row);rows.push(row);
    if(node.nodeType===1)node.style.backgroundColor='lightyellow';
}
for(var i=0;i<first.childNodes.length;i++) {
    if(first.childNodes[i].nodeType===1)first.childNodes[i].style.backgroundColor='lightyellow';
}
document.getElementById('exercise-result').textContent=rows.join(' | ');
