
// const AdminModel = (sequelize, DataTypes) => {
//     const model = sequelize.define('admin', {
//       Admin_name: {
//         type: DataTypes.STRING,
//         required: true,
//         unique: true
//       },
//       Admin_password: {
//         type: DataTypes.STRING,
//         required: true
//       },
//       Admin_phone:{
//         type: DataTypes.INTEGER,
//       },
      
//       Admin_role: {
//         type: DataTypes.ENUM('admin'),
//         required: true,
//         defaultValue: 'admin'
//       },
     
//     //   capabilities: {
//     //     type: DataTypes.VIRTUAL,
//     //     get() {
//     //       const acl = {
//     //         admin: ['add','update','delete','get'],
//     //        
            
//     //       };
//     //       return acl[this.role];
//     //     }
//     //   }
//     });
  
    
  
//     return model;
//   }
  
//   module.exports =AdminModel;