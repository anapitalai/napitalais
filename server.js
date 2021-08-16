// Requirements
const mongoose = require("mongoose");
const express = require("express");
const AdminBro = require("admin-bro");
const AdminBroExpressjs = require("@admin-bro/express");
const bcrypt = require("bcryptjs");
const User = require("./models/User.model");
const Mother = require("./models/Mother.model");
const Immediate_family = require("./models/Immediate_family.model");
const Spouse = require("./models/Spouse.model");
const Membership_Id = require("./models/Membership_Id.model");

const Land = require("./models/Land.model");

const Child = require("./models/Child.model");

require("dotenv").config();

const adminNavigation = {
  name: "Admin",
  icon: "Restriction",
};
const restrictedNavigation = {
  name: "Restricted",
  icon: "Accessibility",
};
//
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
  theme: {
    color: {
      primary: "red",
      bck: "maroon",
    },
  },
  resources: [
    {
      resource: Immediate_family,
      options: {
        navigation: restrictedNavigation,
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
          createdAt: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
          description: { type: "richtext" },

          createdAt: {
            isVisible: { edit: false, show: false, list: false, filter: true },
          },
          updatedAt: {
            isVisible: { edit: true, show: false, list: false, filter: true },
          },
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
      resource: Land,

      options: {
        navigation: adminNavigation,
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
    //Spouse
    {
      resource: Spouse,
      options: {
        navigation: adminNavigation,
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

    //Membership ID
    {
      resource: Membership_Id,
      options: {
        navigation: adminNavigation,
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
      resource: Child,

      options: {
        navigation: adminNavigation,
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
      resource: Mother,

      options: {
        navigation: adminNavigation,
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


    
    //Users
    {
      resource: User,

      options: {
        navigation: adminNavigation,
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
          new: {isAccessible:canModifyUsers,
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
            }
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
  cookiePassword: "some-secret-password-used-to-secure-cookie",
});



app.use(adminBro.options.rootPath, router);
//
// Running the server
const run = async () => {
    // await mongoose.connect(
    //   "mongodb://" + process.env.DB_HOST_LOCAL + "/" + process.env.DB_LOCAL,
    //   {
    //     useNewUrlParser: true,
    //   }
    // );

    //mongodb+srv://<username>:<password>@nictc.ok4ic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

    // await mongoose.connect(
    //   "mongodb+srv://" +
    //     process.env.DB_USER +
    //     ":" +
    //     process.env.DB_PASS +
    //     "@" +
    //     process.env.DB_HOST +
    //     "/" +
    //     process.env.DB_LOCAL+"?retryWrites=true&w=majority",
    //   {
    //     useNewUrlParser: true,
    //   }
    // );

    await mongoose.connect(
      "mongodb+srv://" +
        process.env.DB_USER +
        ":" +
        process.env.DB_PASS +
        "@" +
        process.env.DB_HOST +
        "/" +
        process.env.DB_LOCAL+"?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    );

  await app.listen(8082, () =>
    console.log(`Example app listening on port 8082!`)
  );
};

run();
