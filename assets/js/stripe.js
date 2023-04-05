var stripe = Stripe(
   // Stripe Account Required
   // https://dashboard.stripe.com/test/apikeys
   "pk_test_51MkrFtFVdPT8iFZdIBMtRtFoj3pzdPyGEBK9Tb6T6fw1BvJzoCdY2pD3O1bWyl5dw3Ly3cn5eWGj6HPqf2rnX5S900LwN1jHIe"
);

document.getElementById("checkout").addEventListener("click", function () {
   stripe
      .redirectToCheckout({
         lineItems: [
            {
               price: "price_1MtQ1kFVdPT8iFZdQbJFj40s",
               quantity: 1,
            },
         ],
         mode: "payment",
         successUrl: "https://www.google.com",
         cancelUrl: "https://ecommerce-sytu.netlify.app/",
      })
      .then(function (result) {
         alert(result);
      });
});
