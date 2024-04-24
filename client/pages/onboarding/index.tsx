import React from "react";
import { useAuth } from "@/context/authcontext";

export default function Onboarding() {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Onboarding</h1>

        </div>
    );
}