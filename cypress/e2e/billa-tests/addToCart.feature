Feature: Billa search and add product
  As a user,
  I want to search for a product and add it to my cart on the Billa website,
  So that I can purchase it.

  Scenario: Search and add product to cart
    Given I am on the Billa website
    When I accept cookies
    And I search for a product
    And I add the product to my cart
    Then I should see the product in my cart with the correct price