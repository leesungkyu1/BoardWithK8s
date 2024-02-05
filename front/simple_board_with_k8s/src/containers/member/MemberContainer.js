import React, {useEffect} from "react";
import MemberForm from "../../components/member/MemberForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "../../../node_modules/react-router-dom/dist/index";
import { changeValue, initErr, initForm, loginAction, memberInsertAction } from "../../modules/member";

const MemberContainer = () => {
    const location = useLocation().pathname;
    const joinFormSw = location === "/memberJoin";

    const dispatch = useDispatch();

    const {userId, userPw, userName, userPhone, message, token} = useSelector(({member}) => ({
        userId: member.userId, 
        userPw: member.userPw, 
        userName: member.userName, 
        userPhone: member.userPhone,
        message: member.message,
        token: member.token
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

            window.location.href = "/";
        }else{
            dispatch(loginAction({userId, userPw}));
        }
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

    useEffect(() => {
        if(token){
            try{
                localStorage.setItem('token', JSON.stringify(token));
                window.location.href = "/";
            }catch(e){
                console.log("localStorage is not working");
            }
        }
    }, [token]);

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