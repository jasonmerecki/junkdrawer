package com.jkm.resourcetest;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class ResourceLoad {
    public static void main(String[] args)  {
        System.out.println("Starting ResourceLoad");
        String fileName = "myconfig.ini";
        StringBuilder sb = new StringBuilder();
        try (Stream<String> stream = Files.lines( Paths.get("./src/main/resources/myconfig.ini"), StandardCharsets.UTF_8))
        {
            stream.forEach(s -> sb.append(s).append("\n"));
        }
        catch (IOException e)
        {
            System.out.print("IOException loading file: " + e);
            e.printStackTrace();
        }
        String fileString = sb.toString();
        System.out.println("the file loaded string: \n" + fileString);

        StringBuilder textBuilder = new StringBuilder();
        ClassLoader cl = (new ResourceLoad()).getClass().getClassLoader();
        try (Reader ir = new InputStreamReader(cl.getResourceAsStream("fakepackage/cpconfig.ini"))) {
            System.out.println("got the class char reader " + ir);
            try (Reader reader = new BufferedReader(ir)) {
                int c = 0;
                while ((c = reader.read()) != -1) {
                    textBuilder.append((char) c);
                }
            } finally {
                System.out.println("closed out the try block" );
            }
        } catch (IOException ioe) {
            System.out.println("IOException reading resource: " + ioe);
            ioe.printStackTrace();
        } catch (Exception e) {
            System.out.println("Exception reading resource: " + e);
            e.printStackTrace();
        }

        try (Reader ir = new InputStreamReader(cl.getResourceAsStream("com/jkm/resourcetest/ResourceLoad.class"))) {
            System.out.println("got the class byte reader " + ir);
        } catch (IOException ioe) {
            System.out.println("IOException reading class resource: " + ioe);
            ioe.printStackTrace();
        } catch (Exception e) {
            System.out.println("Exception reading class resource: " + e);
            e.printStackTrace();
        }

        System.out.println("the classpath loaded string: \n" + textBuilder);


    }
}
