// import React from "react";
// import DestinationInput from "../components/Itinerary/DestinationInput";
// import ItineraryCreation from "../components/Itinerary/ItineraryCreation";
// import PastItineraries from "../components/Itinerary/PastItineraries";




// const TravelItinerary = () => {
  
//   return (

//     <div>
//     <DestinationInput />
//     <ItineraryCreation />
//     <PastItineraries />
//   </div>
//     );
// };

// export default TravelItinerary;


import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import Swal from 'sweetalert2';

const TravelItinerary = () => {
  const { user } = useAuth();
  const [userDestinations, setUserDestinations] = useState([]);
  const [userItineraries, setUserItineraries] = useState([]);

  useEffect(() => {
    // Fetch user destinations
    fetch(`/users/${user.id}/destinations`)
      .then((response) => response.json())
      .then((data) => {
        setUserDestinations(data);
      })
      .catch((error) => {
        console.error('Error fetching destinations:', error);
      });

    // Fetch user itineraries
    fetch(`/users/${user.id}/itineraries`)
      .then((response) => response.json())
      .then((data) => {
        const sortedItineraries = data.sort((a, b) => {
          const aDateTime = new Date(`${a.date}T${a.time}`);
          const bDateTime = new Date(`${b.date}T${b.time}`);
          return aDateTime - bDateTime;
        });
        setUserItineraries(sortedItineraries);
      })
      .catch((error) => {
        console.error('Error fetching itineraries:', error);
      });
  }, [user.id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleAddItinerary = () => {
    Swal.fire({
      title: 'Create Itinerary',
      html: `
        <form id="itinerary-form">
          <div class="mb-4">
            <label for="destination" class="block text-sm font-medium text-gray-700">
              Select Destination
            </label>
            <select
              id="destination"
              class="border border-gray-400 p-2 w-full"
            >
              <option value="" disabled>Select a destination</option>
              ${userDestinations
                .map(
                  (destination) => `
                    <option value="${destination.id}">
                      ${destination.name}
                    </option>
                  `
                )
                .join('')}
            </select>
          </div>
          <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              class="border border-gray-400 p-2 w-full"
              placeholder="Enter date"
            />
          </div>
          <div class="mb-4">
            <label for="time" class="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              id="time"
              class="border border-gray-400 p-2 w-full"
              placeholder="Enter time"
            />
          </div>
          <div class="mb-4">
            <label for="activity" class="block text-sm font-medium text-gray-700">
              Activity
            </label>
            <textarea
              id="activity"
              class="border border-gray-400 p-2 w-full"
              placeholder="Enter activity"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="duration" class="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              class="border border-gray-400 p-2 w-full"
              placeholder="Enter duration"
            />
          </div>

          <div class="mb-4">
          <label for="duration" class="block text-sm font-medium text-gray-700">
            Budget
          </label>
          <input
            type="number"
            id="budget"
            class="border border-gray-400 p-2 w-full"
            placeholder="Enter budget"
          />
        </div> 

        </form>
      `,
      showCancelButton: true,
      focusConfirm: false,
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const form = document.getElementById('itinerary-form');
        const selectedDestination = form.destination.value;
        const selectedDate = form.date.value;
        const selectedTime = form.time.value;
        const selectedActivity = form.activity.value;
        const selectedDuration = form.duration.value;
        const selectedBudget = form.budget.value;
        return fetch('/itineraries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.id,
            destination_id: selectedDestination,
            date: selectedDate,
            time: selectedTime,
            activity: selectedActivity,
            duration: selectedDuration,
            budget: selectedBudget,
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          // Fetch updated user itineraries after successfully adding
          fetch(`/users/${user.id}/itineraries`)
            .then((response) => response.json())
            .then((updatedItineraries) => {
              setUserItineraries(updatedItineraries);
            });
  
          // Fetch updated user destinations after successfully adding
          fetch(`/users/${user.id}/destinations`)
            .then((response) => response.json())
            .then((updatedDestinations) => {
              setUserDestinations(updatedDestinations);
            });
  
          console.log('Itinerary created:', data);
          Swal.fire('Success!', 'Itinerary created successfully', 'success');
        })
        .catch((error) => {
          console.error('Error creating itinerary:', error);
          Swal.fire('Error', 'An error occurred while creating the itinerary', 'error');
        });
      },
    });
  };

  const handleAddDestination = () => {
    Swal.fire({
      title: 'Add a Destination',
      html: `
        <form id="destination-form">
          <input type="text" id="swal-input-name" class="swal2-input" placeholder="Destination Name" required>
          <input id="swal-input-description" class="swal2-input" placeholder="Description" required>
          <input type="text" id="swal-input-location" class="swal2-input" placeholder="Location" required>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save Destination',
      preConfirm: () => {
        const swalName = document.getElementById('swal-input-name').value;
        const swalDescription = document.getElementById('swal-input-description').value;
        const swalLocation = document.getElementById('swal-input-location').value;
  
        fetch('/destinations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: swalName,
            description: swalDescription,
            location: swalLocation,
            user_id: user.id,
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            setUserDestinations([...userDestinations, data]);
            Swal.fire({
              title: 'Success',
              text: 'Destination saved successfully!',
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Error saving destination. Please try again.',
              icon: 'error',
            });
          }
        })
        .catch((error) => {
          console.error('Error saving destination:', error);
        });
      },
    });
  };

  const handleDelete = (itinerary) => {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this itinerary?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/itineraries/${itinerary.id}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            // Update the userItineraries state after successful deletion
            const updatedItineraries = userItineraries.filter((item) => item.id !== itinerary.id);
            setUserItineraries([...updatedItineraries]);
  
            Swal.fire('Deleted!', 'The itinerary has been deleted.', 'success');
          } else {
            throw new Error('Failed to delete itinerary');
          }
        } catch (error) {
          console.error('Error deleting itinerary:', error);
          Swal.fire('Error', 'An error occurred while deleting the itinerary.', 'error');
        }
      }
    });
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Travel Itinerary</h2>
  
      {/* Add Destination */}
      <form onSubmit={(event) => event.preventDefault()} className="flex flex-wrap -mx-4 mb-4">
        <div className="w-full px-4 flex justify-center">
          <button
            type="button"
            onClick={handleAddDestination}
            className="bg-blue-500 text-white px-2 w-1/4 py-1 rounded"
          >
            Add Destination
          </button>
        </div>
      </form>
  
      {/* Create Itinerary */}
      <button
        onClick={handleAddItinerary}
        className="bg-blue-500 text-white px-4 py-2 rounded w-1/4 mb-4"
      >
        Add Itinerary
      </button>
  
      {/* Past Itineraries */}
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-100 text-left">Date</th>
            <th className="px-4 py-2 bg-gray-100 text-left">Time</th>
            <th className="px-4 py-2 bg-gray-100 text-left">Destination</th>
            <th className="px-4 py-2 bg-gray-100 text-left">Activity</th>
            <th className="px-4 py-2 bg-gray-100 text-left">Duration</th>
            <th className="px-4 py-2 bg-gray-100 text-left">Budget</th>
          </tr>
        </thead>
        <tbody>
          {userItineraries.map((itinerary) => (
            <tr
              key={itinerary.id}
              onClick={() => handleDelete(itinerary)}
              className="border-b hover:bg-gray-50 cursor-pointer transition-shadow shadow-md hover:shadow-lg"
            >
              <td className="px-4 py-2">{formatDate(itinerary.date)}</td>
              <td className="px-4 py-2">{formatTime(itinerary.time)}</td>
              <td className="px-4 py-2">{itinerary.destination.name}</td>
              <td className="px-4 py-2">{itinerary.activity}</td>
              <td className="px-4 py-2">{itinerary.duration}</td>
              <td className="px-4 py-2">{itinerary.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  };

export default TravelItinerary;
