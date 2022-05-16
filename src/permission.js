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
    
  async getPermissionObject(key, organization_id, type, host, apiKey) {
    try {
      socket.create({
        namespace: organization_id,
        room: null,
        host
      })
      let data = await crud.readDocuments({
        collection: "permissions",
        operator: {
          filters: [{
            name: 'key',
            operator: "$eq",
            value: [key]
          }],
        },
        apiKey: apiKey,
        organization_id: organization_id
      });

      let permission = data.data[0]
      let roles = []
      if (permission && permission.roles) {
        for (let role_id of permission.roles){
          let role = await crud.readDocument({
            collection: "permissions",
            document_id: role_id,
            apiKey: apiKey,
            organization_id: organization_id,
          });

          if (role.data)
            roles.push(role.data)
        }

        if (roles.length > 0)
          permission = this.createPermissionObject(permission, roles)
      }
      
      return permission
    } catch (err) {
      console.log(err)
      return  null;
    }
  }
}

module.exports = ApiPermission;
