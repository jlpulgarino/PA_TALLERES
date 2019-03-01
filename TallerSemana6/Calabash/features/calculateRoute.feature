Feature: Calculate Route

  Scenario: As a user I want to be able to calculate the best route
    Given I press "Planear viaje en Trans([^\"]*)"               
    When I press "Troncales" 
    And I press "Autonorte"
    And I press "Terminal"
    And I press "Autonorte"
    And I press "Alcalá"
    Then I should see "K16"