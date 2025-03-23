require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
const { globSync } = require('glob');
const fs = require('fs');
const { generate: uniqueId } = require('shortid');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);

async function setupApp() {
  try {
    const Admin = require('../models/coreModels/Admin');
    const AdminPassword = require('../models/coreModels/AdminPassword');
    const newAdminPassword = new AdminPassword();

    const salt = uniqueId();

    const passwordHash = newAdminPassword.generateHash(salt, 'admin123');

    const demoAdmin = {
      email: 'admin@demo.com',
      name: 'IDURAR',
      surname: 'Admin',
      enabled: true,
      role: 'owner',
    };

    const demoAdmin1 = {
      email: 'harsh@demo.com',
      name: 'IDURAR',
      surname: 'Admin',
      enabled: true,
      role: 'owner',
    };

    const demoAdmin2 = {
      email: 'laxit@demo.com',
      name: 'IDURAR',
      surname: 'Admin',
      enabled: true,
      role: 'owner',
    };

    const demoAdmin3 = {
      email: 'ishant@demo.com',
      name: 'IDURAR',
      surname: 'Admin',
      enabled: true,
      role: 'owner',
    };
    const demoAdmin4 = {
      email: 'khanak@demo.com',
      name: 'IDURAR',
      surname: 'Admin',
      enabled: true,
      role: 'owner',
    };
    const demoAdmin5 = {
      email: 'ashutosh@demo.com',
      name: 'IDURAR',
      surname: 'Admin',
      enabled: true,
      role: 'owner',
    };

    const result = await new Admin(demoAdmin).save();
    const result1 = await new Admin(demoAdmin1).save();
    const result2 = await new Admin(demoAdmin2).save();
    const result3 = await new Admin(demoAdmin3).save();
    const result4 = await new Admin(demoAdmin4).save();
    const result5 = await new Admin(demoAdmin5).save();

    const AdminPasswordData = {
      password: passwordHash,
      emailVerified: true,
      salt: salt,
      user: result._id,
    };
    const AdminPasswordData1 = {
      password: passwordHash,
      emailVerified: true,
      salt: salt,
      user: result1._id,
    };
    const AdminPasswordData2 = {
      password: passwordHash,
      emailVerified: true,
      salt: salt,
      user: result2._id,
    };
    const AdminPasswordData3 = {
      password: passwordHash,
      emailVerified: true,
      salt: salt,
      user: result3._id,
    };
    const AdminPasswordData4 = {
      password: passwordHash,
      emailVerified: true,
      salt: salt,
      user: result4._id,
    };
    const AdminPasswordData5 = {
      password: passwordHash,
      emailVerified: true,
      salt: salt,
      user: result5._id,
    };
    await new AdminPassword(AdminPasswordData).save();
    await new AdminPassword(AdminPasswordData1).save();
    await new AdminPassword(AdminPasswordData2).save();
    await new AdminPassword(AdminPasswordData3).save();
    await new AdminPassword(AdminPasswordData4).save();
    await new AdminPassword(AdminPasswordData5).save();

    console.log('👍 Admin created : Done!');

    const Setting = require('../models/coreModels/Setting');

    const settingFiles = [];

    const settingsFiles = globSync('./src/setup/defaultSettings/**/*.json');

    for (const filePath of settingsFiles) {
      const file = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      settingFiles.push(...file);
    }

    await Setting.insertMany(settingFiles);

    console.log('👍 Settings created : Done!');

    const PaymentMode = require('../models/appModels/PaymentMode');
    const Taxes = require('../models/appModels/Taxes');

    await Taxes.insertMany([{ taxName: 'Tax 0%', taxValue: '0', isDefault: true }]);
    console.log('👍 Taxes created : Done!');

    await PaymentMode.insertMany([
      {
        name: 'Default Payment',
        description: 'Default Payment Mode (Cash , Wire Transfert)',
        isDefault: true,
      },
    ]);
    console.log('👍 PaymentMode created : Done!');

    console.log('🥳 Setup completed :Success!');
    process.exit();
  } catch (e) {
    console.log('\n🚫 Error! The Error info is below');
    console.log(e);
    process.exit();
  }
}

setupApp();
