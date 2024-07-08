# WhisperWall

WhisperWall is an anonymous social blogging platform where users can share and interact with posts without revealing their identities, fostering open and honest communication.
The project is deployed and accessible at [https://whisperwall-d2ry.onrender.com](https://whisperwall-d2ry.onrender.com).

## User Stories

### As a Guest User:

1. [x] Sign up with a unique username or Google account.
2. [x] Visit the homepage of WhisperWall containing 12 random whisper cards.
3. [x] Get new random whisper cards.

### As a Registered User:

1. [x] Sign in to the WhisperWall account.
       **Explore Whispers**
2. [x] Visit the homepage of WhisperWall containing 12 random whisper cards.
3. [x] Get new random whisper cards.
4. [x] View the details of each whisper, including full content, tag, created time, pseudonym, header image, and message board.
       **Create Whispers Anonymously**
5. [x] Create new whispers using a randomly generated pseudonym or customized pseudonym.
       **React to Whispers**
6. [x] Leave messages to whispers using a randomly generated pseudonym or customized pseudonym.
       **Manage Own Whispers**
7. [x] Update and delete own whispers.
       **User Dashboard**
8. [x] **Profile**: View and update own profile.
9. [x] **Whispers**: View own whispers.
10. [x] **Create**: Create new whispers.
11. [x] **Explore**: Explore whispers.

**Extra Authority of the Administrator**:

1.  [x] View the profile of user accounts except password.
2.  [x] Delete user accounts except for admin or demo account.
3.  [x] View all whispers in update order on the dashboard.
4.  [x] Delete or update whispers.
5.  [x] Delete messages.

## Features

1. **User Authentication**: Users can sign up and sign in with a unique username or a Google account.
2. **Profile Management**: Users can update their username, email, password, and avatar.
3. **Anonymous Posting**: Create and interact with posts without revealing personal identity.
4. **Whisper Cards**: Display 12 random whispers on the homepage, with the ability to refresh for new ones.
5. **Detailed Whisper View**: View full content, tags, created time, pseudonym, header image, and message board for each whisper.
6. **Interaction**: Leave messages on whispers using a randomly generated or customized pseudonym.
7. **Whisper Management**: Update and delete own whispers.
8. **User Dashboard**: View and update profile, view own whispers, and create new whispers.
9. **Admin Authority**: Administrators can view user profiles, delete user accounts (except admin or demo accounts), view all whispers, and manage whispers and messages.

## Technologies Used

- **Frontend**: React, TailwindCSS, Flowbite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, Google OAuth
- **State Management**: Redux Toolkit
- **Hosting**: Firebase, Heroku, Render
- **Version Control**: Git, GitHub

## Update Log

### Version 1.0.0

- Initial release of WhisperWall
- Implemented user authentication (sign up, sign in)
- Created homepage displaying 12 random whispers
- Added functionality to refresh whispers
- Enabled viewing details of whispers
- Allowed anonymous creation of whispers
- Added message board for whispers
- Implemented profile management (view and update profile)
- Created user dashboard (profile, whispers, create, explore)
- Provided admin authority features (view profiles, delete accounts, manage whispers and messages)
