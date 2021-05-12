// Requirements
const mongoose = require("mongoose");
const express = require("express");
const AdminBro = require("admin-bro");
const AdminBroExpressjs = require("@admin-bro/express");
const bcrypt = require("bcryptjs");
const User = require("./models/User.model");
const GE = require("./models/GE.model");
const Asset = require("./models/Family.model");
const Donor = require("./models/Donor.model");
const Brand = require("./models/Brand.model");
const Supplier = require("./models/Member.model");
const Staff = require("./models/Staff.model");
const Room = require("./models/Room.model");
const Category = require("./models/Category.model");
const Borrow = require("./models/Borrow.model");
const Registry = require("./models/Registry.model");

 const adminNavigation = {
  name: 'Admin',
  icon: 'Restriction',
}
const restrictedNavigation = {
  name: 'Restricted',
  icon: 'Accessibility',
}



// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require("@admin-bro/mongoose"));

// express server definition
const app = express();

// RBAC functions
const canEditRecords = ({ currentAdmin, record }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "admin" ||
      currentAdmin._id === record.param("ownerId"))
  );
};
const canModifyUsers = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";

// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  branding: {
    companyName: "Napitalais",
    logo: "",
  },
  theme:{color:{
    primary:'red',
    bck:'maroon'
}},
  resources: [
    {
      resource: Asset,
      options: {
        navigation:restrictedNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
          createdAt: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
          description: { type: "richtext" },

          createdAt:{
            isVisible:{edit: false, show: false, list: false, filter: true}
          },
          updatedAt:{
            isVisible:{edit: true, show: false, list: false, filter: true}
          }
        },
        actions: {
          edit: { isAccessible: canEditRecords },
          delete: { isAccessible: canEditRecords },
          new: {
            before: async (request, { currentAdmin }) => {
              request.payload = {
                ...request.payload,
                ownerId: currentAdmin._id,
              };
              return request;
            },
          },
        },
      },
    },
    //category
    {
      resource: Category,
      
      options: {
        navigation:adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },

        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },
    //brand
    {
      resource: Brand, 
      options: {
        navigation:adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },

        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },

    //staff
    {
      resource: Staff,
      options: {
        navigation:adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },

        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },
    //supplier
    {
      resource: Supplier,
      options: {
        navigation:adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },

        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },
    //borrowed asset
    {
      resource: Borrow,
     
      options: {
        navigation:adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },

        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },
    //GE Registry
    {
      resource: Registry,
      
      options: {
        navigation:adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
          createdAt: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
        },
        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },

    //GE
    {
      resource: GE,
      
      options: {
        navigation:adminNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
          createdAt: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
        },

        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },


    //Donors
    {
      resource: Donor,
      
      options: {
        navigation:adminNavigation,
        properties: {
          encryptedPassword: { isVisible: false },
          createdAt: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(
                    request.payload.password,
                    10
                  ),
                  password: undefined,
                };
              }
              return request;
            },
          },
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },

    //Rooms
    {
      resource: Room,
      
      options: {
        navigation:adminNavigation,
        properties: {
          encryptedPassword: { isVisible: false },
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(
                    request.payload.password,
                    10
                  ),
                  password: undefined,
                };
              }
              return request;
            },
          },
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },

    //Users
    {
      resource: User,
      
      options: {
        navigation:adminNavigation,
        properties: {
          encryptedPassword: { isVisible: false },
          password: {
            type: "string",
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(
                    request.payload.password,
                    10
                  ),
                  password: undefined,
                };
              }
              return request;
            },
          },
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          //new: { isAccessible: canModifyUsers },
          bulkDelete: { isAccessible: canModifyUsers },
        },
      },
    },
  ],
  rootPath: "/admin",
});

// Build and use a router which will handle all AdminBro routes buildAuthenticatedRouter
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.encryptedPassword);
      if (matched) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: "some-secret-password-used-to-secure-cookie"
}
);

//no auth
//const router = AdminBroExpressjs.buildRouter(adminBro
  //   , {
  //   authenticate: async (email, password) => {
  //     const user = await User.findOne({ email });
  //     if (user) {
  //       const matched = await bcrypt.compare(password, user.encryptedPassword);
  //       if (matched) {
  //         return user;
  //       }
  //     }
  //     return false;
  //   },
  //   cookiePassword: "some-secret-password-used-to-secure-cookie"
  // }
  //);

app.use(adminBro.options.rootPath, router);

// Running the server
const run = async () => {
  await mongoose.connect("mongodb://202.1.39.189/napitalai", {
    useNewUrlParser: true
  });
  await app.listen(8082, () =>
    console.log(`Example app listening on port 8082!`)
  );
};

run();
