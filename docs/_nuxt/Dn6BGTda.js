const e="guestUserId",r=()=>{let t=localStorage.getItem(e);return t||(t=String(9e8+Math.floor(Math.random()*99999999)),localStorage.setItem(e,t)),Number(t)};export{r as g};
