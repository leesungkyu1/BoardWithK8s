import React, {useEffect} from "react";
import MemberForm from "../../components/member/MemberForm";
import { useDispatch } from "react-redux";
import { useLocation } from "../../../node_modules/react-router-dom/dist/index";

const MemberContainer = () => {
    const location = useLocation().pathname;
    const joinFormSw = location === "/memberJoin";

    return <>
        <MemberForm
            joinFormSw={joinFormSw}
        />
    </>;
};

export default MemberContainer;