import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import logo from "../../../public/logo512.png";

function Welcome() {
    const { loading, data } = useQuery(QUERY_ME);
    const me = data?.me || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Welcome Back To Clarity {me.firstName}</h3>
        </div>
    );
}

export default Welcome;
