import CommunityDetail from "../../../src/community/detail/CommunityDetail-container";
import BoardCommentWrite from "../../../src/boardComment/write/boardCommentWrite";
import BoardCommentList from "../../../src/boardComment/list/boardCommentList";





export default function CommunityDetailPage(){
    return (
        <>
            <CommunityDetail/>
            <BoardCommentWrite/>
            <BoardCommentList/>
        </>

    )



}