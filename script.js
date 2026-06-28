function scrollBooking(){
document.getElementById("booking").scrollIntoView({
behavior:"smooth"
});
}

document.getElementById("bookingForm")
.addEventListener("submit",function(e){

e.preventDefault();

document.getElementById("message").innerHTML =
"Booking Request Submitted Successfully!";

this.reset();

});

function showPackage(type){

let title="";
let details="";

if(type==="silver"){

title="Silver Package - ₹50,000";

details=
"Decoration, Seating Arrangement, Parking Facility, Sound System, Basic Lighting. Capacity: 300 Guests.";

}

else if(type==="gold"){

title="Gold Package - ₹1,00,000";

details=
"Premium Decoration, AC Hall, Catering Support, Photography Stage, DJ Setup, Generator Backup. Capacity: 600 Guests.";

}

else{

title="Platinum Package - ₹2,00,000";

details=
"Luxury Decoration, VIP Seating, Premium Dining, Event Management, Premium Lighting Setup. Capacity: 1000 Guests.";

}

document.getElementById("packageTitle").innerText=title;
document.getElementById("packageDetails").innerText=details;

document.getElementById("packageModal").style.display="block";

}

function closeModal(){

document.getElementById("packageModal").style.display="none";

}

window.onclick=function(event){

const modal=document.getElementById("packageModal");

if(event.target==modal){

modal.style.display="none";

}

}
