 /*******************************************************************************
Code generated by cplatkm 
*******************************************************************************/

class Clients {
  
  static tableName = 'clients';

  static schema = {
		client_id:{type:'number', primary: true}
		,name:{type:'string'}
		,address:{type:'string'}
		,phone:{type:'string'}
		,email:{type:'string'}
  };

 	constructor({client_id,name,address,phone,email}) {
		this.client_id = client_id;
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.email = email;
  }
}

module.exports = Clients;