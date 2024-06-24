
(function ($) {

  "use strict";

  // MENU
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });

  // CUSTOM LINK
  $('.smoothscroll').click(function () {
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $('body,html').animate({
        scrollTop: totalScroll
      }, 300);
    }
  });

})(window.jQuery);


//Paystack
// 


function payWithPaystack() {
  const name = document.getElementById("ticket-form-name").value
  const email = document.getElementById("ticket-form-email").value
  const phone_number = document.getElementById("ticket-form-phone").value
  const quantity = document.getElementById("ticket-form-number").value
  const ticket_type = Array.from(document.getElementsByName("ticket-type")).find((type) => type.checked).value

  if (quantity < 1) return alert("Don't do that.")

  let amount = 0

  if (ticket_type == "regular") {
    amount = 5000 * quantity * 100
  }
  else if (ticket_type == "vip") {
    amount = 15000 * quantity * 100
  }

  amount += (amount * 0.015) + 10000

  var handler = PaystackPop.setup({
    key: 'pk_live_716ac83b580356fd70de631a24576c5d3636d53e',
    email: email, //put your customer's email here
    amount: amount, //amount the customer is supposed to pay
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: name
        },
        {
          display_name: "Mobile Number",
          variable_name: "mobile_number",
          value: phone_number
        },
        {
          display_name: "Number of Tickets",
          variable_name: "quantity",
          value: quantity
        },
        {
          display_name: "Ticket Type",
          variable_name: "ticket_type",
          value: ticket_type
        }
      ]
    },
    callback: function (response) {
      //after the transaction have been completed
      //make post call  to the server with to verify payment 
      //using transaction reference as post data
      console.log(response.data);
      if (response.data.status == 'success') {
        // navigate to order completed page
        window.location.replace("https://babrbieparty.com/order-completed")
      } else {
        alert("There was an issue processing your payment")
      }
    },
    onClose: function () {
      //when the user close the payment modal
      alert('Transaction cancelled');
    }
  });
  handler.openIframe(); //open the paystack's payment modal
}

const dummyFunction = () => {
  alert('I am running')
}