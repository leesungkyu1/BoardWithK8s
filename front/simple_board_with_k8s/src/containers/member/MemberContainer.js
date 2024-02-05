import React, {useEffect} from "react";
import MemberForm from "../../components/member/MemberForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "../../../node_modules/react-router-dom/dist/index";
import { changeValue, initErr, initForm, loginAction, memberInsertAction } from "../../modules/member";

const MemberContainer = () => {
    const location = useLocation().pathname;
    const joinFormSw = location === "/memberJoin";

    const dispatch = useDispatch();

    const {userId, userPw, userName, userPhone, message} = useSelector(({member}) => ({
        userId: member.userId, 
        userPw: member.userPw, 
        userName: member.userName, 
        userPhone: member.userPhone,
        message: member.message
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

        if(joinFormSw){
            dispatch(memberInsertAction({userId, userPw, userName, userPhone}));

            alert("회원가입이 완료되었습니다.");
        }else{
            dispatch(loginAction({userId, userPw}));
        }

        //window.location.href = "/";
    };

    const onChangeValue = (e) => {
        const {name, value} = e.target;

        dispatch(changeValue({key: name, value}));
    };

    useEffect(() => {
        dispatch(initForm());
    }, [dispatch]);

    useEffect(() => {
        if(message){
            alert(message);
            dispatch(initErr());
        }
    }, [dispatch, message]);

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