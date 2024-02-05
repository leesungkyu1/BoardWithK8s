import React, {useEffect} from "react";
import MemberForm from "../../components/member/MemberForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "../../../node_modules/react-router-dom/dist/index";
import { changeValue } from "../../modules/member";

const MemberContainer = () => {
    const location = useLocation().pathname;
    const joinFormSw = location === "/memberJoin";

    const dispatch = useDispatch();

    const {userId, userPw, userName, userPhone} = useSelector(({member}) => ({
        userId: member.userId, 
        userPw: member.userPw, 
        userName: member.userName, 
        userPhone: member.userPhone
    }));

    const writeBtnClick = ({userId, userPw, userName, userPhone, joinFormSw}) => {
        if(!userId){
            alert("아이디를 입력하세요.");
            return;
        }else if(!userPw){
            alert("비밀번호를 입력하세요.");
            return;
        }

        if(joinFormSw){
            if(!userName){
                alert("이름을 입력하세요.");
                return;
            }else if(!userPhone){
                alert("핸드폰번호를 입력하세요.");
                return;
            }
        }
    };

    const onChangeValue = (e) => {
        const {name, value} = e.target;

        dispatch(changeValue({key: name, value}));
    };

    return <>
        <MemberForm
            userId={userId}
            userPw={userPw} 
            userName={userName}
            userPhone={userPhone}
            joinFormSw={joinFormSw}
            onChangeValue={onChangeValue}
            writeBtnClick={writeBtnClick}
        />
    </>;
};

export default MemberContainer;