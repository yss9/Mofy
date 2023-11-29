import {useRouter} from "next/router";


export default function CommunityPage(){

    const router = useRouter()

    const onClickPalette = () => {
        router.push("colorPalette/new")

    }

    return(
        <button onClick={onClickPalette}>팔레트 만들러 가기</button>
    )
}