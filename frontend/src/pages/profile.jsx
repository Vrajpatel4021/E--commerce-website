import React, { useEffect, useState } from "react";
import AddressCard from "../components/auth/AddressCard";
import Nav from "../components/auth/nav";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useSelector } from "react-redux";

export default function Profile() {
	const [personalDetails, setPersonalDetails] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		avatarUrl: "",
	});
	const [addresses, setAddresses] = useState([]);
	const navigate = useNavigate();
	const userEmail = useSelector((state) => state.user.email);

	useEffect(() => {
		if (!userEmail) return;

		axios.get(`/api/v2/user/profile?email=${userEmail}`)
			.then((res) => {
				// assuming API sends { user: {name, email, phoneNumber, avatarUrl}, addresses: [...] }
				const { user, addresses } = res.data;

				if (user) {
					setPersonalDetails({
						name: user.name || "",
						email: user.email || "",
						phoneNumber: user.phoneNumber || "",
						avatarUrl: user.avatarUrl || "",
					});
				}

				if (addresses) {
					setAddresses(addresses);
				}
			})
			.catch((err) => {
				console.error("Error fetching profile:", err);
			});
	}, [userEmail]);

	const handleAddAddress = () => {
		navigate("/create-address");
	};

	return (
		<>
			<Nav />
			<div className="w-full min-h-screen bg-neutral-800 p-5">
				<div className="w-full h-full bg-neutral-700 rounded-lg">
					<div className="w-full h-max my-2 p-5">
						<div className="w-full h-max">
							<h1 className="text-3xl text-neutral-100">Personal Details</h1>
						</div>
						<div className="w-full h-max flex flex-col sm:flex-row p-5 gap-10">
							<div className="w-40 h-max flex flex-col justify-center items-center gap-y-3">
								<div className="w-full h-max text-2xl text-neutral-100 text-left">PICTURE</div>
								<img
									src={personalDetails.avatarUrl 
										? `${axios.defaults.baseURL}/${personalDetails.avatarUrl}`
										: `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`}
									alt="profile"
									className="w-40 h-40 rounded-full"
									onError={(e) => {
										e.target.onerror = null;
										e.target.src = `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`;
									}}
								/>
							</div>
							<div className="h-max md:flex-grow">
								<div className="w-full h-max flex flex-col justify-center items-center gap-y-3">
									<div className="w-full h-max">
										<div className="text-2xl text-neutral-100 text-left">NAME</div>
										<div className="text-lg font-light text-neutral-100 text-left break-all">
											{personalDetails.name}
										</div>
									</div>
									<div className="w-full h-max">
										<div className="text-2xl text-neutral-100 text-left">EMAIL</div>
										<div className="text-lg font-light text-neutral-100 text-left break-all">
											{personalDetails.email}
										</div>
									</div>
									<div className="w-full h-max">
										<div className="text-2xl text-neutral-100 text-left">MOBILE</div>
										<div className="text-lg font-light text-neutral-100 text-left break-all">
											{personalDetails.phoneNumber}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="w-full h-max my-2 p-5">
						<div className="w-full h-max">
							<h1 className="text-3xl text-neutral-100">Addresses</h1>
						</div>
						<div className="w-full h-max p-5">
							<button
								className="w-max px-3 py-2 bg-neutral-600 text-neutral-100 rounded-md text-center hover:bg-neutral-100 hover:text-black transition-all duration-100"
								onClick={handleAddAddress}
							>
								Add Address
							</button>
						</div>
						<div className="w-full h-max flex flex-col gap-5 p-5">
							{addresses.length === 0 ? (
								<div className="w-full h-max text-neutral-100 font-light text-left">
									No Addresses Found
								</div>
							) : (
								addresses.map((address, index) => (
									<AddressCard key={index} {...address} />
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
