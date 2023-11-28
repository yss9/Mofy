import CommunityDetail from "../../../../../testDjango/testDjangoReact/restapi/src/community/detail/CommunityDetail-container";
import BoardCommentWrite from "../../../../../testDjango/testDjangoReact/restapi/src/boardComment/write/boardCommentWrite";
import BoardCommentList from "../../../../../testDjango/testDjangoReact/restapi/src/boardComment/list/boardCommentList";
import {useState} from "react";
import {useRouter} from "next/router";




export default function CommunityDetailPage(){
    return (
        <>
            <CommunityDetail/>
            <BoardCommentWrite/>
            <BoardCommentList/>
        </>

    )



}