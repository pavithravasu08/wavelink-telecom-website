document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('contact-form');
  if(form){
    const fields={name:document.getElementById('name'),email:document.getElementById('email'),phone:document.getElementById('phone'),message:document.getElementById('message')};
    const button=document.getElementById('submit-contact');
    function validate(showErrors=true){
      const values=Object.fromEntries(Object.entries(fields).map(([key,input])=>[key,input.value.trim()]));
      const errors={
        name:values.name.length>=2?'':'Enter at least 2 characters.',
        email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)?'':'Enter a valid email address.',
        phone:!values.phone||/^[+\d\s()-]{7,20}$/.test(values.phone)?'':'Enter a valid phone number or leave it blank.',
        message:values.message.length>=10?'':'Enter at least 10 characters.'
      };
      if(showErrors)Object.keys(errors).forEach(key=>document.getElementById(`${key}-error`).textContent=errors[key]);
      const valid=Object.values(errors).every(error=>!error);
      button.disabled=!valid;
      return valid;
    }
    Object.values(fields).forEach(input=>input.addEventListener('input',()=>{validate();document.getElementById('form-result').textContent='';}));
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(!validate())return;
      document.getElementById('form-result').textContent='Demo success: Your message passed validation. No message was sent to a server.';
      form.reset();validate(false);
    });
    validate(false);
  }
  const faqSearch=document.getElementById('faq-search');
  if(faqSearch){
    faqSearch.addEventListener('input',()=>{
      const query=faqSearch.value.trim().toLowerCase();
      let count=0;
      document.querySelectorAll('.faq-item').forEach(item=>{
        const show=item.textContent.toLowerCase().includes(query);
        item.classList.toggle('hidden',!show);
        if(show)count++;
      });
      document.getElementById('faq-empty').classList.toggle('hidden',count>0);
    });
    document.querySelectorAll('.faq-question').forEach(button=>button.addEventListener('click',()=>{
      const item=button.closest('.faq-item');
      const open=item.classList.toggle('open');
      button.setAttribute('aria-expanded',String(open));
    }));
  }
});
