 /*******************************************************************************
Code generated by platkmframework 
*******************************************************************************/


package org.platkmframework.inventory.domain.service;

import org.platkmframework.inventory.domain.vo.CategoriesVO;
import org.platkmframework.inventory.domain.entity.Categories;
import org.platkmframework.inventory.domain.dao.CategoriesMapper;
import org.platkmframework.inventory.domain.dao.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
 
@Service
public class CategoriesServiceImpl implements  CategoriesService{

    @Autowired
    private CategoriesRepository categoriesRepository;
 
  @Override
  public List<CategoriesVO> listCategories(){
        return categoriesRepository.findAll().stream()
                .map(CategoriesMapper::toVO)
                .collect(Collectors.toList());
 }

  @Override
  public Page<CategoriesVO> criteriaCategories(int page, int size){
 		Pageable pageable = PageRequest.of(page, size);
		 return categoriesRepository.findAll(pageable)
	                .map(CategoriesMapper::toVO);
 }

 @Override
 public CategoriesVO createCategories(CategoriesVO categoriesVO)  {
        Categories categories= CategoriesMapper.toEntity(categoriesVO);
        return CategoriesMapper.toVO(categoriesRepository.save(categories));
 }

 @Override
 public Optional<CategoriesVO> getCategoriesById(java.lang.Long categoryId){
        return categoriesRepository.findById(categoryId)
                .map(CategoriesMapper::toVO);
 }

  @Override
  public Optional<CategoriesVO> updateCategories( CategoriesVO categoriesVO){
       return categoriesRepository.findById(categoriesVO.getCategoryId()).map(categories -> {
            CategoriesMapper.toEntity(categoriesVO, categories);
            return CategoriesMapper.toVO(categoriesRepository.save(categories));
        });
 }

	@Override
	public boolean removeCategories(java.lang.Long categoryId) {
 		return categoriesRepository.findById(categoryId).map(categories -> {
            		categoriesRepository.delete(categories);
            		return true;
        		}).orElse(false);
	}
}

