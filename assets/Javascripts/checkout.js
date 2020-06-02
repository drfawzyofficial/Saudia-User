var checkoutHandler = StripeCheckout.configure({
    key: "pk_test_k3FUnEZpECELGCz68glrX3mx00kvhB9s6j",
    locale: "auto"
});
var button = document.getElementById("buttonCheckout");
button.addEventListener("click", function (ev) {
    checkoutHandler.open({
        name: "Sample Store",
        description: "Example Purchase",
        token: handleToken
    });
});
function handleToken(token) {
    fetch("/shoppingCart", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(token)
      })
      .then(response => {
        if (!response.ok)
          throw response;
        return response.json();
      })
      .then(output => {
        console.log("Purchase succeeded:", output);
      })
      .catch(err => {
        console.log("Purchase failed:", err);
      })
}