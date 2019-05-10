package com.appium.steppdefinitions;

import bean.Book;
import com.appium.example.BaseAppium;
import com.appium.example.BookDriver;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.After;
import org.junit.Assert;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class CreateBookSteps {
    Properties prop = new Properties();
    Book book;

    @Given("^we are a user$")
    public void we_are_user(){
        try {
            File file = new File("");
            String propertiesFileName = file.getAbsolutePath()+"\\src\\test\\resources\\params.properties";
            //System.out.println(propertiesFileName);
            FileInputStream in = new FileInputStream(propertiesFileName);
            prop.load(in);
            book = new Book();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @And("^we enter to application$")
    public void we_enter_to_application(){
        BaseAppium aseAppium = new BaseAppium();
        try {
            aseAppium.init();
        } catch (Exception e) {
            System.out.println("Error connecting to Appium Service.");
            e.printStackTrace();
        }
    }

    @And("^we configure account")
    public void we_configure_account1(){
        BookDriver bookDriver = new BookDriver();
        bookDriver.configureAccount();
    }

    @When("^we create book")
    public void we_create_book(){
        BookDriver bookDriver = new BookDriver();
        bookDriver.createBook();
    }

    @When("^we rename book")
    public void we_rename_book(){
        BookDriver bookDriver = new BookDriver();
        bookDriver.renameBook();
    }

    @Then("^the book list increase")
    public void the_book_list_increase(){
        BookDriver bookDriver = new BookDriver();
        Assert.assertTrue(bookDriver.isBookCreated());
    }

    @Then("^the book has changed")
    public void the_book_has_changed(){
        BookDriver bookDriver = new BookDriver();
        Assert.assertTrue(bookDriver.isBookEdited());
    }

    @After
    public void close(){
        BaseAppium baseAppium = new BaseAppium();
        baseAppium.tearDown();
    }
}
