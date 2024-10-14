const { User } = require('your-utility-package-name');

// ตัวอย่างการใช้งานฟังก์ชันใน User Model
const newUser = User.createUser('Alice', 'alice@example.com');
const user = User.getUserById(newUser.id);
console.log(user);