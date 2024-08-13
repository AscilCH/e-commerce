import React from 'react';


 function ProfilePage({ loggedInUser }) {
  console.log('loggedInUser passed to Profile:', loggedInUser);

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  console.log('loggedInUser passed to Profile 2:', loggedInUser);
  
  if (!loggedInUser.admin) {
    return <div>User is not logged in or not an admin.</div>;
  }

  const admin = loggedInUser?.admin;
  console.log('loggedInUser passed to Profile 3:', loggedInUser?.admin);
  return (
    <div>
      <h2>Welcome, Admin {admin.nomad} {admin.prenomad}!</h2>
      <p>Email: {admin.emailad}</p>
      <p>telephone: {admin.telad}</p>
      {/* Display other profile information for the admin */}
   
    </div>
     
  );
};


export default ProfilePage;
