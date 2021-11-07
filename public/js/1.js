console.log('this is code executed from 1.js');



const weatherForm= document.querySelector('form');
const loc= document.querySelector('input');
const msg1= document.querySelector('#msg-1');
const msg2= document.querySelector('#msg-2');


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    msg1.textContent= 'Loading...';
    msg2.textContent= '';

    fetch(`http://localhost:3000/weather?address=${loc.value}`).then((res)=>{
    res.json().then(
        data=>{
            if(data['error']){
                msg1.textContent= data.error;
                return;
            }

            msg1.textContent= 'Location: '+data.location;
            msg2.textContent= 'Forecast: '+ data.forecast;
        })
    });
    loc.value='';
})