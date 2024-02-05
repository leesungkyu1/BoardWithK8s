import React from "react";
import Header from "../../components/common/Header";
import { useSelector } from "react-redux";

const HeaderContainer = () => {
    const {token} = useSelector(({member}) => ({
        token: member.token
    }));

    return <>
        <Header
            token={token}
        />
    </>
};

export default HeaderContainer;