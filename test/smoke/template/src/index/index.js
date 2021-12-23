import { helloworld } from './helloworld';
// import style from './index.less';
import $ from 'jquery';

$(document.body).html(`<h1>Hello</h1><br/><div style="font-size: 20px;">${helloworld()}</div>`);
// console.log(style["search-text"]);
// console.log(helloworld());
// document.body.innerHTML = helloworld()+"fasfasd"
// document.writeln("ccccc")
