import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    transition: 'background-color 0.3s', // Add transition for smooth color change
    backgroundColor: 'rgba(255, 255, 0, 0.1)', // Transparent yellow by default
  },
  accepted: {
    backgroundColor: 'rgba(0, 255, 0, 0.1)', // Green
  },
  declined: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)', // Red
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between', // To place buttons on the same line
    marginTop: '8px',
  },
  showLessButton: {
    marginLeft: '5px',
  },
}));

const DemandPage = () => {
  const [demands, setDemands] = useState([]);
  const apiUrl = 'http://localhost:3002/api/Demands';
  const [userData, setUserData] = useState({});
  const [showUserData, setShowUserData] = useState({});

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setDemands(response.data);
      })
      .catch((error) => {
        console.error('Error fetching demands:', error);
      });
  }, []);

  const getUserData = (userId) => {
    axios
      .get(`http://localhost:3002/api/users/${userId}`)
      .then((response) => {
        setUserData((prevUserData) => ({
          ...prevUserData,
          [userId]: response.data,
        }));
        toggleShowUserData(userId);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setUserData((prevUserData) => ({
          ...prevUserData,
          [userId]: null,
        }));
      });
  };

  const toggleShowUserData = (userId) => {
    setShowUserData((prevShowUserData) => ({
      ...prevShowUserData,
      [userId]: !prevShowUserData[userId],
    }));
  };

  const handleAccept = (demandId) => {
    console.log(`Accepted demand with ID: ${demandId}`);
    const updatedDemands = demands.map((demand) =>
      demand._id === demandId ? { ...demand, etatdem: 'Accepted' } : demand
    );
    setDemands(updatedDemands);
  };

  const handleDecline = (demandId) => {
    console.log(`Declined demand with ID: ${demandId}`);
    const updatedDemands = demands.map((demand) =>
      demand._id === demandId ? { ...demand, etatdem: 'Declined' } : demand
    );
    setDemands(updatedDemands);
  };

  const handleReset = (demandId) => {
    console.log(`Reset demand with ID: ${demandId}`);
    const updatedDemands = demands.map((demand) =>
      demand._id === demandId ? { ...demand, etatdem: 'Pending' } : demand
    );
    setDemands(updatedDemands);
  };

  const classes = useStyles();

  return (
    <div>
      <h1>Demands</h1>
      <div>
        {demands.map((demand) => (
          <div
            key={demand._id}
            className={`${classes.card} ${
              demand.etatdem === 'Accepted'
                ? classes.accepted
                : demand.etatdem === 'Declined'
                ? classes.declined
                : ''
            }`}
          >
            <h2>CIN: {demand.cin}</h2>
            <img src={demand.photo} alt="" style={{ maxWidth: '100%' }} />
            <p>Description: {demand.desc}</p>
            <p>Status: {demand.etatdem}</p>
            <p>User ID: {demand.userID}</p>

            {showUserData[demand.userID] && (
              <div>
                <p>User Data:</p>
                <p>First Name: {userData[demand.userID]?.prenom}</p>
                <p>Last Name: {userData[demand.userID]?.nom}</p>
                <p>Email: {userData[demand.userID]?.email}</p>
              </div>
            )}

            {showUserData[demand.userID] ? (
              <div className={classes.buttonContainer}>
                {demand.etatdem === 'Pending' && (
                  <>
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: '#4CAF50', // Green
                        color: 'white',
                        marginRight: '5vh',
                        marginBottom: '5vh',
                      }}
                      onClick={() => handleAccept(demand._id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: '#F44336', // Red
                        color: 'white',
                        marginRight: '5vh',
                        marginBottom: '5vh',
                      }}
                      onClick={() => handleDecline(demand._id)}
                    >
                      Decline
                    </Button>
                  </>
                )}

                {['Accepted', 'Declined'].includes(demand.etatdem) && (
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: '#2196F3', // Blue (for Reset)
                      color: 'white',
                      marginRight: '5vh',
                      marginBottom: '5vh',
                    }}
                    onClick={() => handleReset(demand._id)}
                  >
                    Reset
                  </Button>
                )}

                <Button
                                    variant="outlined"
                                    style={{
                                      backgroundColor: '#2196F3', // Blue (for Reset)
                                      color: 'white',
                                      marginRight: '5vh',
                                      marginBottom: '5vh',
                                    }}
                  onClick={() => toggleShowUserData(demand.userID)}
                >
                  Show Less
                </Button>
              </div>
            ) : (
              <Button
              variant="outlined"
              style={{
                backgroundColor: '#2196F3', // Blue (for Reset)
                color: 'white',
                marginRight: '5vh',
                marginBottom: '5vh',
              }}
                onClick={() => getUserData(demand.userID)}
              >
                Show More
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandPage;
