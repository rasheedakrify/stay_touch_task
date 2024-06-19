# CrudApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.29 and Used NPM 14.
3. Simple CRUD operation with pagination/search and Authentication with local storage:-

Step 1:- Simple Authentication page with admin/admin as username and password.

Step 2: Once authorized display a simple table with the following fields

        First name
        Last name
        email
        Phone
        address
        meeting time

        At the top of the table place a search which allows you to search using first name/last name, email, phone

        if more than 10 rows present in the table paginate the table, pagination should work for both list and search results

        At the top of the table place button "Create meeting"

Step 3: When you click the button "Create meeting", display the form with following fields

        First name (Mandatory)
        Last name
        Email (Mandatory) (check for email validation)
        Phone number with country picker (check for phone validation) (Mandatory)
        Address with Google location picker
        Meeting time with datetime picker (Mandatory)

        Save button to save the data in local storage

Step 4: on the table list display a column with edit link which take to the edit form to edit the data


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
