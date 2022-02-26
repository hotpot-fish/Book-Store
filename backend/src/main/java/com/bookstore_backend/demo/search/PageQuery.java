package  com.bookstore_backend.demo.search;

import org.apache.lucene.search.Sort;

import java.awt.print.Pageable;
import java.util.Map;
import java.util.List;

public class PageQuery<T> {
    private Pageable pageable;
    /**
     * 排序字段
     */
    private Sort sort;
    /**
     * 查询参数类
     */
    private T params;
    /**
     * 返回结果集
     */
    private List<T> results;
    /**
     * 不在T类中的参数
     */
    private Map<String, String> queryParam;
}
