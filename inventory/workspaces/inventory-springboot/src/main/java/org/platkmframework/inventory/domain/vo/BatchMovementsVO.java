/*******************************************************************************
Code generated by platkmframework 
*******************************************************************************/

package org.platkmframework.inventory.domain.vo;

import java.io.Serializable;

public class BatchMovementsVO  implements Serializable{

 private static final long serialVersionUID = 1L;

private java.lang.Long movementId;

private java.lang.Integer batchId;

private java.lang.String movementType;

private java.lang.Float quantity;

private java.time.LocalDateTime movementDate;

private java.lang.Integer userId;

private java.lang.String notes;

 
  public  java.lang.Long getMovementId(){
    return this.movementId;
  }

  public  BatchMovementsVO setMovementId (java.lang.Long movementId){
    this.movementId = movementId;
    return this;
  }

  public  java.lang.Integer getBatchId(){
    return this.batchId;
  }

  public  BatchMovementsVO setBatchId (java.lang.Integer batchId){
    this.batchId = batchId;
    return this;
  }

  public  java.lang.String getMovementType(){
    return this.movementType;
  }

  public  BatchMovementsVO setMovementType (java.lang.String movementType){
    this.movementType = movementType;
    return this;
  }

  public  java.lang.Float getQuantity(){
    return this.quantity;
  }

  public  BatchMovementsVO setQuantity (java.lang.Float quantity){
    this.quantity = quantity;
    return this;
  }

  public  java.time.LocalDateTime getMovementDate(){
    return this.movementDate;
  }

  public  BatchMovementsVO setMovementDate (java.time.LocalDateTime movementDate){
    this.movementDate = movementDate;
    return this;
  }

  public  java.lang.Integer getUserId(){
    return this.userId;
  }

  public  BatchMovementsVO setUserId (java.lang.Integer userId){
    this.userId = userId;
    return this;
  }

  public  java.lang.String getNotes(){
    return this.notes;
  }

  public  BatchMovementsVO setNotes (java.lang.String notes){
    this.notes = notes;
    return this;
  }




}