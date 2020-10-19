const faker = require('faker');

const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
  // clean up the db
  await User.deleteMany({});
  //------------------create user data-----------------//
  // create empty array to store fake userData
  let userData = [];
  // for loop to generate fake userData
  for (let i = 0; i < 20; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    userData.push({ username, email, password });
  }
  // create users
  let createdUsers = await User.collection.insertMany(userData);
  //------------------create book data-----------------//
  // for loop to generate fake bookData
  for (let i = 0; i < 60; i++) {
    const authors = faker.name.findName();
    const description = faker.lorem.paragraphs();
    const bookId = faker.random.number({ min: 100, max: 999 });
    const image = faker.image.imageUrl();
    const link = faker.internet.url();
    const title = faker.company.catchPhrase();
    // user that saved the book.
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          savedBooks: { authors, description, bookId, image, link, title },
        },
      },
      { runValidators: true },
    );
  }

  console.log('all done!');
  process.exit(0);
});
