import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./AuthContextProvider";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) router.push("/login");
	}, [user, router]);

	return <>{user ? children : null}</>;
};

export default ProtectedRoute;
