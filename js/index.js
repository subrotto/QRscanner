let tableBody=document.getElementById('table-body');

const StudentQR=()=>{
    const id=document.getElementById('studentId').value;
    const image=document.getElementById('imageId');
    image.setAttribute('src',`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`);
    document.getElementById('studentId').value='';
}



function domReady(fn){
    if(document.readyState==='complete' || document.readyState==='interactive'){
        setTimeout(fn,1);
    }else{
        document.addEventListener('DOMContentLoaded',fn);
    }
}

domReady(function(){
    let lastResult,countResults=0;
    function onScanSuccess(decodeText,decodeResult){
       
        if(decodeText!==lastResult){
            ++countResults;
            lastResult=decodeText;
            // alert("Your Qr is "+decodeText,decodeResult);
            fetch('https://subrotto.github.io/JSONpractice/students.json')
            .then(res=>res.json())
            .then(data=>{
                // console.log(data[decodeText]);
                const tr=document.createElement('tr');
            tr.innerHTML=`
            <td>${data[decodeText].id}</td>
            <td>${data[decodeText].name}</td>
            <td>${data[decodeText].course}</td>
            `;
        tableBody.appendChild(tr);
            });
          
        }
    }
    let htmlScanner=new Html5QrcodeScanner("qr-reader",{fps:10,qrbox:250});
    htmlScanner.render(onScanSuccess);
})

const dataAdd=data=>{
    
}

