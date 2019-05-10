package com.appium.example;

import java.io.FileInputStream;
import java.util.Properties;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.AndroidMobileCapabilityType;
import io.appium.java_client.remote.MobileCapabilityType;
import io.appium.java_client.service.local.AppiumDriverLocalService;
import io.appium.java_client.service.local.AppiumServiceBuilder;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import java.io.File;

public class BaseAppium {

    public static AppiumDriverLocalService service;
    public static AndroidDriver<WebElement> driver;

    public void init() throws Exception{
        //Carga propiedades
        Properties prop = new Properties();
        File file = new File("");
        String propertiesFileName = file.getAbsolutePath()+"\\src\\test\\resources\\params.properties";
        //System.out.println(propertiesFileName);
        FileInputStream in = new FileInputStream(propertiesFileName);
        prop.load(in);
        //Recuperracion de la ruta y nombre de la applicacion
        File app = new File(prop.getProperty("apkDir"));
        //Geeracion de Capabilities a nivel de servicio Appium
        DesiredCapabilities desiredCapabilities = new DesiredCapabilities();
        desiredCapabilities.setCapability(MobileCapabilityType.NEW_COMMAND_TIMEOUT, 60);
        System.out.println("apkDir: " + prop.getProperty("apkDir")+prop.getProperty("apkName"));
        //desiredCapabilities.setCapability(MobileCapabilityType.APP, app.getAbsolutePath());
        desiredCapabilities.setCapability(MobileCapabilityType.APP, prop.getProperty("apkDir")+prop.getProperty("apkName"));

        DesiredCapabilities clientCapabilities = new DesiredCapabilities();
        clientCapabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
        clientCapabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "8.0");
        //clientCapabilities.setCapability(MobileCapabilityType.UDID, prop.getProperty("udid"));
        clientCapabilities.setCapability(MobileCapabilityType.DEVICE_NAME , "Android Device");
        clientCapabilities.setCapability (MobileCapabilityType.CLEAR_SYSTEM_FILES, true);
        clientCapabilities.setCapability(AndroidMobileCapabilityType.APP_WAIT_ACTIVITY, "org.gnucash.android.*");

        try{
            //Appium service
            AppiumServiceBuilder builder = new AppiumServiceBuilder().withCapabilities(desiredCapabilities)
                    .withAppiumJS(new File("C:\\MISO_WRKSPACE\\PruebasAuto\\AppiumExampleTest\\node_modules\\appium\\build\\lib\\main.js"))
                    .withIPAddress(prop.getProperty("IPAddress"))
                    .usingPort(Integer.valueOf(prop.getProperty("Port")).intValue());
            service = builder.build();
            service.start();
			String appiumServiceUrl = service.getUrl().toString();
			System.out.println("Appium Service Address : - " + appiumServiceUrl);

			// Start Appium Service
/*	appiumService = AppiumDriverLocalService
			.buildService(new AppiumServiceBuilder().usingAnyFreePort()
					.usingDriverExecutable(new File("C:/Program Files (x86)/Appium/node.exe"))
					.withAppiumJS(new File("C:/Program Files (x86)/Appium/node_modules/appium/bin/appium.js")));
	appiumService.start();
	appiumServiceUrl = appiumService.getUrl().toString();
	System.out.println("Appium Service Address : - " + appiumServiceUrl);
			
	*/		
            //Driver
            driver = new AndroidDriver<WebElement>(service.getUrl(),clientCapabilities );
        }catch(Exception e){
            e.printStackTrace();
        }

    }

    public void tearDown(){
        if(driver != null){
            driver.quit();
        }
    }

}
