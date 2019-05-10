package com.appium.example;

import bean.Book;
import io.appium.java_client.TouchAction;
import io.appium.java_client.touch.offset.PointOption;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import uk.co.jemos.podam.api.*;
import io.appium.java_client.MobileElement;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.TakesScreenshot;

import java.util.List;
import java.io.File;
import java.io.IOException;

public class BookDriver extends BaseAppium {


    public void configureAccount(){

        WebDriverWait wait = new WebDriverWait(driver,60);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("org.gnucash.android:id/btn_save")));
        takeScreenshoot(0, "Init");
        clickNEXT();
        /*Opcion USD*/
        if(buscarOpcion("USD")){
            takeScreenshoot(0, "USD");
            clickNEXT();
            /*Opcion Create*/
            takeScreenshoot(0, "CreteDef");
            clickNEXT();
            if(buscarOpcion("Disable")){
                takeScreenshoot(0, "Disable");
                clickNEXT();
            }
        }
        takeScreenshoot(0, "Done");
        buscarBoton("DONE");
        wait = new WebDriverWait(driver,60);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("android.widget.Button")));
        takeScreenshoot(0, "THANKS");
        buscarBoton("THANKS");

        takeScreenshoot(0, "DISMISS");
        TouchAction action = new TouchAction(driver);
        action.tap(PointOption.point(100,100)).perform();
        action.tap(PointOption.point(10,10)).perform();
        takeScreenshoot(0, "End");
    }

    public void renameBook(){

        clickMENU();
        if(buscarOpcion("Settings")){
            buscarOpcionSettings("Books");
            takeScreenshoot(0, "Rename_");
            MobileElement menuBttn = (MobileElement) driver.findElementById("org.gnucash.android:id/options_menu");
            menuBttn.click();
            if (buscarOpcionSubmenu("Rename")){
                menuBttn = (MobileElement) driver.findElementById("org.gnucash.android:id/input_book_title");
                menuBttn.click();
                menuBttn.clear();
                PodamFactory factory = new PodamFactoryImpl();//This will use the default Random Data Provider Strategy
                Book book = factory.manufacturePojo(Book.class);
                menuBttn.setValue(book.getBookName());
                buscarBoton("RENAME");
                takeScreenshoot(1, "Rename_");
            }
        }
        else{
            System.err.println("No encontro opcion Settings");
        }
    }

    public void createBook(){
        int numBooksIni;
        clickMENU();
        if(buscarOpcion("Settings")){
            buscarOpcionSettings("Books");
            takeScreenshoot(0, "Create_");
            numBooksIni = countBooks();
            System.out.println("Initial book counter : "+numBooksIni);
            MobileElement menuBttn = (MobileElement) driver.findElementById("org.gnucash.android:id/menu_create_book");
            menuBttn.click();
        }
        else{
            System.err.println("No encontro opcion Settings");
        }
    }


    public boolean isBookCreated(){
        int numBooksEnd;
        WebDriverWait wait = new WebDriverWait(driver,30);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("android.widget.ImageButton")));
        clickMENU();
        numBooksEnd=1;
        if(buscarOpcion("Settings")) {
            buscarOpcionSettings("Books");
            numBooksEnd = countBooks();
            System.out.println("Initial book counter : "+numBooksEnd);
        };
        return (numBooksEnd==2);
    }

    public boolean isBookEdited(){
        String newBookName = "Book 1";
        MobileElement menuBttn = (MobileElement) driver.findElementById("org.gnucash.android:id/options_menu");
        menuBttn.click();
        if (buscarOpcionSubmenu("Rename")){
            menuBttn = (MobileElement) driver.findElementById("org.gnucash.android:id/input_book_title");
            newBookName = menuBttn.getText();
        }
        return (newBookName.compareTo("Book 1") != 0);
    }

    private boolean clickNEXT(){

        /*Boton NEXT*/
        MobileElement menuBttn = (MobileElement) driver.findElementById("org.gnucash.android:id/btn_save");
        menuBttn.click();

        return true;
    }

    private boolean buscarOpcion(String opcion){
        Boolean isClicked;
        List<WebElement> plusButton=driver.findElements(By.className("android.widget.CheckedTextView"));
        isClicked= false;
        for(int i=1; i < plusButton.size(); i++){
            WebElement boton = plusButton.get(i);
            String texto = boton.getText();
            System.out.println("Opcion: "+texto);
            if(texto.indexOf(opcion) >= 0){
                boton.click();
                isClicked = true;
                break;
            }
        }
        return isClicked;
    }

    private boolean buscarOpcionSettings(String opcion){
        Boolean isClicked;
        List<WebElement> plusButton=driver.findElements(By.className("android.widget.LinearLayout"));
        isClicked= false;
        System.out.println("OpcionesSettings["+plusButton.size()+"]");

        for(int i=0; i < plusButton.size(); i++){
            WebElement boton = plusButton.get(i);
            boton.findElement(By.className("android.widget.TextView")).getText();
            String texto = boton.findElement(By.className("android.widget.TextView")).getText();;
            System.out.println("Opcion: "+texto);
            if(texto.indexOf(opcion) >= 0){
                boton.click();
                isClicked = true;
                break;
            }
        }


        return isClicked;
    }

    private boolean buscarOpcionSubmenu(String opcion){
        Boolean isClicked;
        List<WebElement> plusButton=driver.findElements(By.className("android.widget.TextView"));
        isClicked= false;
        for(int i=0; i < plusButton.size(); i++){
            WebElement boton = plusButton.get(i);
            String texto = boton.getText();
            System.out.println("Opcion: "+texto);
            if(texto.indexOf(opcion) >= 0){
                boton.click();
                isClicked = true;
                break;
            }
        }
        return isClicked;
    }



    private boolean buscarBoton(String label){
        Boolean isClicked;
        List<WebElement> plusButton=driver.findElements(By.className("android.widget.Button"));
        isClicked= false;
        for(int i=0; i < plusButton.size(); i++){
            WebElement boton = plusButton.get(i);
            String texto = boton.getText();
            System.out.println("Opcion: "+texto);
            if(texto.indexOf(label) >= 0){
                boton.click();
                isClicked = true;
                break;
            }
        }
        return isClicked;
    }

    private boolean clickMENU(){

        /*Boton NEXT*/
        WebDriverWait wait = new WebDriverWait(driver,60);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("android.widget.ImageButton")));
        MobileElement menuBttn = (MobileElement) driver.findElement(By.className("android.widget.ImageButton"));
        menuBttn.click();

        return true;
    }

    private boolean clickSetting() {

        /*Boton NEXT*/
        MobileElement menuBttn = (MobileElement) driver.findElementById("org.gnucash.android:id/design_menu_item_text");
        menuBttn.click();

        return true;
    }


    private void takeScreenshoot(int index, String opcion){
        File file  = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
        String lsOption = opcion.replaceAll(" ","_")+index;
        try {
            FileUtils.copyFile(file, new File("vrt/1_"+index+"/Screenshot"+lsOption+".jpg"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private int countBooks() {
        int counter;
        counter = 0;
        WebElement listBook = (WebElement) driver.findElement(By.className("android.widget.ListView"));
        List<MobileElement> books = listBook.findElements(By.className("android.widget.FrameLayout"));
        //List<WebElement> books = driver.findElements(By.className("org.gnucash.android:id/primary_text"));
        counter = books.size();
        return counter;
    }

}
