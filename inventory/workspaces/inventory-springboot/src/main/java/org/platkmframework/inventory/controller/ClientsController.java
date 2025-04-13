/*******************************************************************************
Code generated by platkmframework 
*******************************************************************************/


package org.platkmframework.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

import org.platkmframework.inventory.domain.service.ClientsService;
import org.platkmframework.inventory.domain.vo.ClientsVO;

@RestController
@RequestMapping("/clients")
public class ClientsController{

  @Autowired
  private ClientsService clientsService;

  @GetMapping("/criteria")
  public Page<ClientsVO> criteriaClients(@RequestParam(defaultValue = "0", name="page") int page, 
		  @RequestParam(defaultValue = "10", name="size") int size){
       return  clientsService.criteriaClients(page, size);
  }

  @GetMapping("/list")
  public List<ClientsVO> listClients(){
       return  clientsService.listClients();
  }

  @PostMapping
   public ClientsVO createClients(@RequestBody ClientsVO  clientsVO) {
        return  clientsService.createClients( clientsVO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientsVO> getClientsById(@PathVariable(name="id")  java.lang.Long clientId) {
        return  clientsService.getClientsById(clientId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<ClientsVO> updateClients(@RequestBody ClientsVO  clients) {
        return  clientsService.updateClients(clients)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeClients(@PathVariable(name="id") java.lang.Long clientId) {
        return clientsService.removeClients(clientId) ?
                ResponseEntity.noContent().build() :
                ResponseEntity.notFound().build();
    }

}