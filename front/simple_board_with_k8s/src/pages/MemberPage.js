import React from "react";
import Header from "../components/common/Header";
import Body from "../components/common/Body";
import MemberContainer from "../containers/member/MemberContainer";

const MemberPage = () => {
    return <>
        <Header/>
        <Body>
            <MemberContainer/>
        </Body>
    </>
};

export default MemberPage;