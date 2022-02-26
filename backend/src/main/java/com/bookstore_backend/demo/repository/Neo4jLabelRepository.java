package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.Neo4jLabel;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

public interface Neo4jLabelRepository extends Neo4jRepository<Neo4jLabel, Long> {
     Neo4jLabel findByTag(String tag);
}