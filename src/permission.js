const CoCreatePermission = require('@cocreate/permissions');
const crud = require('@cocreate/crud-client');

const socketClient = require('@cocreate/socket-client')
let socket = new socketClient("ws");
crud.setSocket(socket);

class ApiPermission extends CoCreatePermission {
  constructor() {
    super();
    this.initEvent()
  }
  
  initEvent() {
    const self = this;
    crud.listen('updateDocument', (data) => self.refreshPermission(data))
    crud.listen('createDocument', (data) => self.refreshPermission(data))
    crud.listen('deleteDocument', (data) => self.refreshPermission(data))
  }
  
  async refreshPermission(data) {
    const {collection, document_id, organization_id, data : permissionData } = data
    if (collection === 'permissions' && this.hasPermission(permissionData.key)) {
      let new_permission = await this.getPermissionObject(permissionData.key, organization_id)
      this.setPermissionObject(permissionData.key, new_permission)
    }
  }
    
  async getPermissionObject(key, organization_id, type, host) {
    try {
      socket.create({
        namespace: organization_id,
        room: null,
        host
      })
      
      let response = await crud.readDocumentList({
        collection: "permissions",
        operator: {
          filters: [{
            name: 'key',
            operator: "$eq",
            value: [key]
          }],
        },
        apiKey: key,
        organization_id: organization_id
      });
      
      // console.log('Permissions Ready', response)
      return (response && response.data != null) ?  response.data[0] : null;
    } catch (err) {
      console.log(err)
      return  null;
    }
  }
}

module.exports = ApiPermission;
