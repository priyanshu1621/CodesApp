// const Agenda = require('agenda');
// const mongoConnectionString = '';

// const agenda = new Agenda({ bd: { address: mongoConnectionString } });

// agenda.define('deleteUserProfile', async (job) => {
//     try {
//         const userId = job.attrs.data.userId;

//         // retrieve the user profile from the db using userID
//         const userProfile = await Profile.findById(userId);
//         if (userProfile) {
//             // delete the user profile
//             await userProfile.remove();
//             console.log(`Delete user Profile with ID: ${userId} `);

//         }
//         else {
//             console.log(`Delete userProfile with with ID: ${userId} not found.`);

//         }

//     } catch (error) {
//         console.error(`error in deleting the user profile: ${`error.message`}`);

//     }
// })

// // scheduling the job

// agenda.every('30 21 * * 1', 'deleteUserProfile', { userId })


//     // start the schedular
//     (async () => {
//         try {
//             await agenda.start();
//             console.log('Agenda Started');
//         }
//         catch (error) {
//             console.error('Error starting Agenda: ', error);
//         }
//     })();