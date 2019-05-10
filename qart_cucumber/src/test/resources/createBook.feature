Feature: Create a book
  As a user
  I want to create a book

  Background:
    Given we are a user
    And we enter to application
    And we configure account

  Scenario: Edit a book
    When we rename book
    Then the book has changed

  Scenario: Create a book
    When we create book
    Then the book list increase
