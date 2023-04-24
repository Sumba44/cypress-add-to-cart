import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Declare a variable to store the product price
let productPrice = 0;

// Define a Given step that opens the Billa website
Given("I am on the Billa website", () => {
  cy.visit("https://shop.billa.cz/");
});

// Define a When step that accepts the cookies banner
When("I accept cookies", () => {
  cy.get("#onetrust-accept-btn-handler").click();
});

// Define a When step that searches for a product
When("I search for a product", () => {
  // Get the search bar element and type in a product name
  const searchBar = cy.get('[data-test="header-search"]');
  searchBar.click();
  searchBar.type("voda");
});

// Define a When step that adds a product to the cart
When("I add the product to my cart", () => {
  // Get the first available product and click on it to add it to the cart
  cy.get(".ws-btn--primary.ws-action-button.ws-btn:not(:disabled):first").then(
    ($el) => {
      // Store the product price
      productPrice = $el.children(".ws-product-price-type__value").text();
      // Click on the product
      $el.click();
    }
  );

  // Type in a delivery address and select the first option
  cy.get('[data-test="google-maps-position-finder-input"]').type(
    "treboradicka 37"
  );
  cy.get("#google-maps-position-finder__option--0").click();

  // Click on the button to add the product to the cart
  cy.get(".vue-portal-target .ws-btn--primary.ws-btn--primary").click();
});

// Define a Then step that verifies the product is added to the cart with the correct price
Then("I should see the product in my cart with the correct price", () => {
  // Verify that the product price is displayed correctly in the cart
  cy.get('[data-test="quick-link-Košík"] .ws-header-quick-link__text').should(
    "contain",
    productPrice
  );
});
