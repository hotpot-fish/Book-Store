package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.BookDescription;
import org.springframework.data.mongodb.repository.MongoRepository;

//@RepositoryRestResource(collectionResourceRel = "personicon", path = "personicon")
public interface BookDescriptionRepository extends MongoRepository<BookDescription, Integer> {

}
