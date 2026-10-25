document.addEventListener('DOMContentLoaded',()=>{
  const broadband=document.getElementById('calc-broadband');
  const mobile=document.getElementById('calc-mobile');
  const tv=document.getElementById('calc-tv');
  if(!broadband||!mobile||!tv)return;
  function update(){
    const total=Number(broadband.value)+Number(mobile.value)+(tv.checked?12:0);
    document.getElementById('calc-total').textContent=`₹${total} / month`;
    document.getElementById('calc-breakdown').textContent=`Broadband ₹${broadband.value} + Mobile ₹${mobile.value} + TV ₹${tv.checked?12:0}`;
  }
  [broadband,mobile,tv].forEach(control=>control.addEventListener('change',update));
  update();
});
