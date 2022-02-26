package com.bookstore_backend.demo.daoimpl;


import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.*;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.Term;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.bookstore_backend.demo.dao.LuceneDao;
import com.bookstore_backend.demo.search.BookSearch;
;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class LuceneDaoImpl implements LuceneDao {
    @Autowired(required = false)
    IndexWriter indexWriter;

    @Autowired(required = false)
    Analyzer analyzer;

    @Autowired(required = false)
    SearcherManager searcherManager;
    @Override
    public void createBookIndex(List<BookSearch> bookSearches){
        List<Document> documents = new ArrayList<>();
        for(BookSearch b:bookSearches){
            Document doc = new Document();
            Integer id=b.getId();
            doc.add(new StringField("id",id.toString(), Field.Store.YES));
            doc.add(new TextField("description",b.getDescription(),Field.Store.NO));
            documents.add(doc);
        }
        try {
            indexWriter.addDocuments(documents);
            indexWriter.commit();
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    @Override
    public  List<BookSearch> getBookByWord(String word){
        try {
            searcherManager.maybeRefresh();
            IndexSearcher indexSearcher = searcherManager.acquire();
            QueryParser queryParser = new QueryParser("description",analyzer);
            Query query =queryParser.parse(word);
            TopDocs topDocs = indexSearcher.search(query,10);
//            BooleanQuery.Builder builder = new BooleanQuery.Builder();
//            builder.add(new QueryParser("description", analyzer).parse(word), BooleanClause.Occur.MUST);
//            TopDocs topDocs = indexSearcher.search(builder.build(), 10);
            ScoreDoc[] hits = topDocs.scoreDocs;
            List<BookSearch> bookSearches=new ArrayList<>();
            IndexReader reader=indexSearcher.getIndexReader();
            Document m=reader.document(15);
            for(int i=0;i<hits.length;i++){
                Document doc = indexSearcher.doc(hits[i].doc);
                String id=doc.get("id");
                BookSearch bookSearch=new BookSearch();
                bookSearch.setId(Integer.parseInt(id));
                bookSearches.add(bookSearch);
            }
            return bookSearches;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
    @Override
    public void deleteBookIndex(Integer bookId){
        try {
            String strId = bookId.toString();
            indexWriter.deleteDocuments(new Term("id", strId));
            indexWriter.commit();
        }catch (IOException e){
            e.printStackTrace();
        }
    }
    @Override
    public void updateBookIndex(Integer bookId,String des){
        try{
                Document doc = new Document();
                doc.add(new StringField("id",bookId.toString(), Field.Store.YES));
                doc.add(new TextField("description",des,Field.Store.NO));
                indexWriter.updateDocument(new Term("id",bookId.toString()),doc);
                indexWriter.commit();
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}
