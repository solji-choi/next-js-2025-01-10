package com.ll.next_js_2025_01_10.standard.page.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PageDto<T> {
    private final long totalItems;
    private final List<T> items;
    private final long totalPages;
    private final int currentPageNumber;
    private final int pageSize;

    public PageDto(Page<T> page) {
        this.totalItems = page.getTotalElements();
        this.items = page.getContent();
        this.totalPages = page.getTotalPages();
        this.currentPageNumber = page.getNumber() + 1;
        this.pageSize = page.getSize();
    }
}
