var r = confirm("Acceptera avtal...");
if (r == true) {

} else {
  window.location.replace("http://google.com");
}

function calculateTotal()
{
  var form = document.forms["calc"];

  var arsvolymform = form.elements["arsvolym"];

  var arsvolym = 0;
  if(arsvolymform.value!="")
    {
        arsvolym = parseInt(arsvolymform.value);
    }

  var antalavropform = form.elements["antalavrop"];
  var antalavrop = 0;
  if(antalavropform.value!="")
    {
        antalavrop = parseInt(antalavropform.value);
    }

  var nettoviktform = form.elements["nettovikt"];
  var nettovikt = 0;
  if(nettoviktform.value!="")
    {
        nettovikt = parseInt(nettoviktform.value);
    }

  var total = arsvolym + antalavrop + nettovikt;
  document.getElementById('total').innerHTML = " " + total;
}
