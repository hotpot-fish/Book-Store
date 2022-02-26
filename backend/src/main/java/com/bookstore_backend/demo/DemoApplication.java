package com.bookstore_backend.demo;

import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Neo4jLabel;
import com.bookstore_backend.demo.service.BookService;
import com.bookstore_backend.demo.service.Neo4jLabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@SpringBootApplication
public class DemoApplication {

    @Autowired
    private BookService bookService;
    @Autowired
    private Neo4jLabelService neo4jlabelService;
/*    @Configuration
*//*    public class TomcatConfig {
        @Bean
        TomcatServletWebServerFactory tomcatServletWebServerFactory() {
            TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory(){
                @Override
                protected void postProcessContext(Context context) {
                    SecurityConstraint constraint = new SecurityConstraint();
                    constraint.setUserConstraint("CONFIDENTIAL");
                    SecurityCollection collection = new SecurityCollection();
                    collection.addPattern("/*");
                    constraint.addCollection(collection);
                    context.addConstraint(constraint);
                }
            };
            factory.addAdditionalTomcatConnectors(createTomcatConnector());
            return factory;
        }
        private Connector createTomcatConnector() {
            Connector connector = new
                    Connector("org.apache.coyote.http11.Http11NioProtocol");
            connector.setScheme("http");
            connector.setPort(8080);
            connector.setSecure(true);
            connector.setRedirectPort(9443);
            return connector;
        }
    }*/
    @Bean
    CommandLineRunner demo() {
        return args -> {
            neo4jlabelService.deleteAll();
            List<Book>books=bookService.listBooks();
            Neo4jLabel tag1=new Neo4jLabel("资料");
            Neo4jLabel tag2=new Neo4jLabel("名著");
            Neo4jLabel tag3=new Neo4jLabel("小说");

            for (Book book:books) {
                if(book.getType().contains("编程")){
                    tag1.addBook(book);
                }
            }
            for (Book book:books) {
                if((!book.getType().contains("编程"))&&(!book.getType().contains("小说"))){
                    tag2.addBook(book);
                }
            }
            for (Book book:books) {
                if(book.getType().contains("小说")){
                    tag3.addBook(book);
                }
            }
            neo4jlabelService.saveOne(tag1);
            neo4jlabelService.saveOne(tag2);
            neo4jlabelService.saveOne(tag3);
        };
    }
    public static void main(String[] args) {SpringApplication.run(DemoApplication.class, args);
    }
}
