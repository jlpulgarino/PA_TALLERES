Feature: Registry into losestudiantes
    As an user I want to register myself within losestudiantes website in order to rate teachers


Scenario Outline: Register failed with wrong inputs

  Given I go to losestudiantes home screen
    When I open the login screen
    And I fill register with <fname> and <sname> and <email> and <password> and <acepta>
    And I try to register
    Then I expect to see <error>

    Examples:
      | fname            | sname     | email                 | password     |acepta| error                    |
      | josel            | ortiza    |                       |              | N    | Ingresa tu correo        |
      | josel            | ortiza    | mitestin2@example.com |              | N    | Ingresa una contraseña   |
      | josel            | ortiza    | mitestin2@example.com | testing1234  | N    | Debes aceptar los t      |

Scenario Outline: Register failed with empty inputs

  Given I go to losestudiantes home screen
    When I open the login screen
    And I fill register with <fname> and <sname> and <email> and <password> and <acepta>
    And I try to register
    Then I expect to sees <error>

    Examples:
      | fname            | sname     | email                 | password     |acepta| error                  |
      |                  |           | mitestin2@example.com | testing1234  | Y    | Campo obligatorio      |
      | josel            |           | mitestin2@example.com | testing1234  | Y    | Campo obligatorio      |
      |                  | ortiza    | mitestin2@example.com | testing1234  | Y    | Campo obligatorio      |
