/*******************************************************************************
Code generated by platkmframework 
*******************************************************************************/

package org.platkmframework.inventory.domain.vo;

import java.io.Serializable;

public class CategoriesVO  implements Serializable{

 private static final long serialVersionUID = 1L;

private java.lang.Long categoryId;

private java.lang.String name;

private java.lang.String description;

 
  public  java.lang.Long getCategoryId(){
    return this.categoryId;
  }

  public  CategoriesVO setCategoryId (java.lang.Long categoryId){
    this.categoryId = categoryId;
    return this;
  }

  public  java.lang.String getName(){
    return this.name;
  }

  public  CategoriesVO setName (java.lang.String name){
    this.name = name;
    return this;
  }

  public  java.lang.String getDescription(){
    return this.description;
  }

  public  CategoriesVO setDescription (java.lang.String description){
    this.description = description;
    return this;
  }




}