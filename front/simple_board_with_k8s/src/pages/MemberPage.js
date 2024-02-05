import React from "react";
import Body from "../components/common/Body";
import MemberContainer from "../containers/member/MemberContainer";
import HeaderContainer from "../containers/common/HeaderContainer";

const MemberPage = () => {
    return <>
        <HeaderContainer/>
        <Body>
            <MemberContainer/>
        </Body>
    </>
};

export default MemberPage;