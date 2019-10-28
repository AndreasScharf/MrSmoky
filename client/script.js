const socket = io();
document.addEventListener('DOMContentLoaded', ()=>{

    const stateObj = { foo: "bar" };
    history.pushState(stateObj, "login", "login.html");

    socket.on('show_login', (reqData)=>{
        const stateObj = { foo: "bar" };
        history.pushState(stateObj, "login", "login.html");

        login_Box.style.display = 'grid';
        main_Box.style.display = 'none';

    });
    const login_Box = document.querySelector('.login');
    const main_Box = document.querySelector('.main');

    const nav_login = document.querySelectorAll('.login ul li')[0];
    const nav_register = document.querySelectorAll('.login ul li')[1];
    const login_inputs = document.querySelectorAll('.login input');
    const submit_button = document.querySelector('.login button');
    login_inputs[2].style.display = 'none';

    nav_login.addEventListener('click', (e)=>{
        nav_register.classList.remove('activeloginNav');
        nav_login.classList.add('activeloginNav');
        login_inputs[2].style.display = 'none';
    });
    nav_register.addEventListener('click', (e)=>{
        nav_login.classList.remove('activeloginNav');
        nav_register.classList.add('activeloginNav');
        login_inputs[2].style.display = 'block';
    });
    submit_button.addEventListener('click', (e)=>{
        if(login_inputs[2].style.display == 'block')
            socket.emit('register', {username: login_inputs[0].value, password:login_inputs[1].value, password_w: login_inputs[2].value});
        else
            socket.emit('login', {username: login_inputs[0].value, password:login_inputs[1].value});
    });

    //history.pushState = function(e){
    //    console.log('url changed')
    //};
    window.addEventListener('locationchange', function(){
        console.log('location changed!');
    });
    //window.onbeforeunload = function() { console.log('hey');
    //return "Your work will be lost."; };
    socket.on('show_main', (reqData)=>{
        var stateObj = { foo: "bar" };
        history.pushState(stateObj, "main", "bar.html");
        login_Box.style.display = 'none';
        main_Box.style.display = 'grid';
    });
    const menu = document.querySelector('.main .header');
    const menu_icon = document.querySelector('.burger');

    menu_icon.addEventListener('click', (e)=>{
        menu.classList.toggle('active');
        menu_icon.classList.toggle('active');
    });
});
