import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'; 
import { FaEdit, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import { AuthContext } from '../AuthContext/AuthContext';
import Loader from '../Components/Loader';
import { ImBin } from "react-icons/im";

const MyActivities = () => {
    const { user } = useContext(AuthContext);  
    const [userChallenges, setUserChallenges] = useState([]);
    const [createdChallenges, setCreatedChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChallenge, setSelectedChallenge] = useState(null); 
    const [newStatus, setNewStatus] = useState(''); 
    const STATUS_OPTIONS = ['Not Started', 'Ongoing', 'Finished'];

    const fetchUserChallenges = async () => {
        if (!user?.email) return;

        setLoading(true);

        const joinedRes = await axios.get(`https://tera-connect-server.vercel.app/user-challenges?buyer_email=${user.email}`);
        const fullData = await Promise.all(joinedRes.data.map(async (uc) => {
            try {
                const chRes = await axios.get(`https://tera-connect-server.vercel.app/challenges/${uc.challenge_id}`);
                return { ...uc, challengeDetails: chRes.data };
            } catch (err) {
                console.error(`Failed to fetch details for ID ${uc.challenge_id}`, err);
                return uc;
            }
        }));
        setUserChallenges(fullData);

        const createdRes = await axios.get(`https://tera-connect-server.vercel.app/challenges`);
        setCreatedChallenges(createdRes.data.filter(ch => ch.createdBy === user.email));

        setLoading(false);
    };

    useEffect(() => {
        fetchUserChallenges();
    }, [user]);

    const handleStatusUpdate = async () => {
        
        const userChallengeId = selectedChallenge._id;
        const res = await axios.patch(`https://tera-connect-server.vercel.app/user-challenges/${userChallengeId}`, { status: newStatus });
        

        if (res.data.result.modifiedCount > 0) {
            Swal.fire({
                title: "Updated!",
                text: `Challenge status set to: ${newStatus}`,
                icon: "success",
                confirmButtonColor: "#22577a",
            });
            setSelectedChallenge(null);
            fetchUserChallenges();
        }
    };

    const handleDelete = async (challengeId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete your challenge permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            await axios.delete(`https://tera-connect-server.vercel.app/challenges/${challengeId}`, {
  data: { userEmail: user.email }});
            Swal.fire('Deleted!', 'Your challenge has been deleted.', 'success');
            setCreatedChallenges(prev => prev.filter(ch => ch._id !== challengeId));
        }
    };

    const openStatusModal = (challenge) => {
        setSelectedChallenge(challenge);
        setNewStatus(challenge.status); 
        document.getElementById('status_modal').showModal();
    };
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

    if (loading) return <Loader/>;
return(
     <div className="container mx-auto min-h-screen p-2">
            <div>
                <h2 className='text-xl text-accent mt-5'>Challenges You Joined</h2>
            <div className="overflow-x-auto  bg-white shadow-lg rounded-lg">
<table className="table w-full">
    <thead>
        <tr className="bg-base-200">
            <th className="text-left max-md:hidden">#</th>
            <th className="text-left max-md:hidden">Challenge</th>
            <th className="text-left max-md:hidden">Category</th>
            <th className="text-left max-md:hidden">Status</th>
            <th className="text-center max-md:hidden">Action</th>
        </tr>
    </thead>
    <tbody>
        {userChallenges.filter(uc => uc.challengeDetails).map((uc, index) => (
            <tr key={uc._id} className="hover:bg-gray-50 ">
                <td className='max-md:hidden'>{index + 1}</td>
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
                    <div className="text-sm opacity-50">
Updated: {uc.updatedAt ? new Date(uc.updatedAt).toLocaleString() : "Not updated yet"}
</div>

<div className="text-sm font-semibold">
Progress: {uc.progress ?? 0}%
</div>
                                </div>
                            </div>
                        </td>
                        <td className='max-md:hidden'>{uc.challengeDetails?.category}</td>
                        
                        <td className='max-md:hidden'>
                            <StatusBadge className='max-md:hidden' status={uc.status} />
                        </td>
                        <td className="text-center ">
                            <button
                                onClick={() => openStatusModal(uc)}
                                className="btn btn-primary btn-sm btn-outline md:gap-2"
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
    <div>
<h2 className='text-xl text-accent mt-5'>Challenges You Added</h2>
<div className="overflow-x-auto bg-white shadow-lg rounded-lg mb-5">
<table className="table w-full">
    <thead>
        <tr className="bg-base-200">
            <th className="text-left max-md:hidden">#</th>
            <th className="text-left max-md:hidden">Challenge</th>
            <th className="text-left max-md:hidden">Category</th>
            <th className="text-left max-md:hidden">Start Date</th>
            <th className="text-left max-md:hidden">End Date</th>
            <th className="text-center max-md:hidden">Action</th>
        </tr>
    </thead>
    <tbody>
        {createdChallenges.map((ch, index) => (
            <tr key={ch._id} className="hover:bg-gray-50">
                <td className='max-md:hidden'>{index + 1}</td>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img src={ch.imageUrl} alt={ch.title} />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{ch.title}</div>
                        </div>
                    </div>
                </td>
                <td className='max-md:hidden'>{ch.category}</td>
                <td className='max-md:hidden'>{new Date(ch.startDate).toLocaleDateString()}</td>
                <td className='max-md:hidden'>{new Date(ch.endDate).toLocaleDateString()}</td>
                <td className="text-center">
                    <button
                        onClick={() => handleDelete(ch._id)}
                        className="btn btn-primary btn-sm btn-outline gap-2"
                    >
                        <ImBin /> Delete
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
</div>
</div>

</div>
)
};

export default MyActivities;
