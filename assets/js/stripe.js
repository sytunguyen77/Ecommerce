const stripe = Stripe(
   // Stripe Account Required
   "pk_test_51MkrFtFVdPT8iFZdIBMtRtFoj3pzdPyGEBK9Tb6T6fw1BvJzoCdY2pD3O1bWyl5dw3Ly3cn5eWGj6HPqf2rnX5S900LwN1jHIe"
);
document.getElementById("checkout").addEventListener("click", function () {
   stripe
      .redirectToCheckout({
         lineItems: [
            {
               price: "price_1MkrfPFVdPT8iFZdxqD9gwHC",
               quantity: 1,
            },
         ],
         mode: "subscription",
         successUrl: "https://www.google.com",
         cancelUrl: "https://www.twitter.com",
      })
      .then(function (result) {});
});
