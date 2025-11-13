import React, { use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'; 
import { FaEdit, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import { AuthContext } from '../AuthContext/AuthContext';
import Loader from '../Components/Loader';

const MyActivities = () => {
 const { user } = use(AuthContext); 
    const [userChallenges, setUserChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChallenge, setSelectedChallenge] = useState(null); 
    const [newStatus, setNewStatus] = useState(''); 

    const STATUS_OPTIONS = ['Not Started', 'Ongoing', 'Finished'];

    const fetchUserChallenges = () => {
        if (!user?.email) return;

        setLoading(true);
        axios.get(`http://localhost:5000/user-challenges?buyer_email=${user.email}`)
            .then(res => {                
                const fetchDetailsPromises = res.data.map(userChallenge => 
                    axios.get(`http://localhost:5000/challenges/${userChallenge.challenge_id}`)
                        .then(challengeRes => ({
                            ...userChallenge,
                            challengeDetails: challengeRes.data 
                        }))
                        .catch(err => {
                            console.error(`Failed to fetch details for ID ${userChallenge.challenge_id}`, err);
                            return userChallenge; 
                        })
                );

                Promise.all(fetchDetailsPromises)
                    .then(fullData => {
                        setUserChallenges(fullData);
                        setLoading(false);
                    })
            })
            .catch(err => {
                console.error('Error fetching user challenges:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUserChallenges();
    }, [user]);

    const handleStatusUpdate = () => {

        const userChallengeId = selectedChallenge._id;
        axios.patch(`http://localhost:5000/user-challenges/${userChallengeId}`, {
            status: newStatus
        })
        .then(res => {
            if (res.data.result.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: `Challenge status set to: ${newStatus}`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
                
                setSelectedChallenge(null);
                fetchUserChallenges(); 
            }
        })
       
    };
    
    const openStatusModal = (challenge) => {
        setSelectedChallenge(challenge);
        setNewStatus(challenge.status); 
        document.getElementById('status_modal').showModal();
    };

    if (loading) {
        return <Loader/>;
    }

    if (userChallenges.length === 0) {
        return <div className="text-accent text-center text-3xl  py-10">You haven't joined any challenges yet!</div>;
    }

    const StatusBadge = ({ status }) => {
        let badgeClass = "badge";
        let icon = <FaTimesCircle />;
        
        if (status === 'Not Started') {
            badgeClass += " badge-warning";
            icon = <FaHourglassHalf />;
        } else if (status === 'Ongoing') {
            badgeClass += " badge-info";
            icon = <FaEdit />;
        } else if (status === 'Finished') {
            badgeClass += " badge-success";
            icon = <FaCheckCircle />;
        }
        
        return <div className={`${badgeClass} badge-outline gap-1`}>{icon} {status}</div>;
    };


    return (
        <div className="container mx-auto min-h-screen">
            <div className="overflow-x-auto mt-5 bg-white shadow-lg rounded-lg">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th className="text-left">#</th>
                            <th className="text-left">Challenge</th>
                            <th className="text-left">Category</th>
                            <th className="text-left">Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userChallenges.map((uc, index) => (
                            <tr key={uc._id} className="hover:bg-gray-50">
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={uc.challengeDetails?.imageUrl }
                                                    alt={uc.challengeDetails?.title} 
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{uc.challengeDetails?.title || 'Challenge Not Found'}</div>
                                            <div className="text-sm opacity-50">Joined: {new Date(uc.join_date).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{uc.challengeDetails?.category}</td>
                                
                                <td>
                                    <StatusBadge status={uc.status} />
                                </td>
                                <td className="text-center">
                                    <button
                                        onClick={() => openStatusModal(uc)}
                                        className="btn btn-primary btn-sm btn-outline gap-2"
                                    >
                                        <FaEdit /> Change Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <dialog id="status_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Update Status for: {selectedChallenge?.challengeDetails?.title}</h3>
                    
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Select new status:</span>
                        </label>
                        <select 
                            className="select select-bordered w-full"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                        >
                            {STATUS_OPTIONS.map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn mr-2">Close</button>
                        </form>
                        <button className="btn btn-success" onClick={handleStatusUpdate}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyActivities;

