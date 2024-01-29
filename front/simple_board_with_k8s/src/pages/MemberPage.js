import React from "react";
import Header from "../components/common/Header";
import Body from "../components/common/Body";
import MemberForm from "../components/member/MemberForm";

const MemberPage = () => {
    return <>
        <Header/>
        <Body>
            <MemberForm/>
        </Body>
    </>
};

export default MemberPage;