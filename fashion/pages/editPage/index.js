import {
    Wrapper, Top, Mid, Bottom, Title, TitleWrapper,
    TopButton, Divide, EditText, EditImgWrapper,
    EditNameWrapper, EditPWWrapper, EditClothTypeWrapper,
    EditSkinTypeWrapper, EditUserSizeWrapper, DeleteUser,
    UserImg, EditNameText, EditNameInput, EditPWText,
    EditPWInput, EditUserSizeInput, EditClothTypeText,
    EditSkinTypeText, EditUserSizeText, OverlayImage,
    EditUser, EditTypeButtonWrapper, EditTypeButton,
    EditUserSizeSubText, EditUserSizeSubWrapper,
    ConsentWrapper, OverlayImageInput, Check
} from '../../styles/editPageStyle'
import {useRef, useState} from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
const onClickHome = () => {
    window.location.href = "http://localhost:3000/mainPage";
}
const onClickDelete = () => {
    window.location.href = "http://localhost:3000/deletePage";
}
// 버튼을 클릭했을 때 호출되는 함수입니다.




export default function BoardNewPage() {
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const [isClicked, setClicked] = useState(false);
    // const [username, setUsername] = useState(null);
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    const [name, setName]= useState("");
    const [pw, setPw] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const[nameError, setNameError] = useState("");
    const [pwError, setPwError] = useState("");
    const[heightError, setHeightError] = useState("");
    const [weightError, setWeightError] = useState("");

    const [activeClothTypes, setActiveClothTypes] = useState([]);

    const toggleClothType = (type) => {
        // setClicked(!isClicked);
        if (activeClothTypes.includes(type)) {
            setClicked(isClicked === false);
            // 이미 배열에 있는 경우 비활성화 (제거)
            setActiveClothTypes(activeClothTypes.filter((activeClothType) => activeClothType !== type));
        } else {
            setClicked(isClicked === true);
            // 배열에 없는 경우 활성화 (추가)
            setActiveClothTypes([...activeClothTypes, type]);
        }
    };
    const onChangeName=(event)=>{
        setName(event.target.value)
        if(event.target.value !== ""){
            setNameError("")
        }
    }
    const onChangePw=(event)=>{
        setPw(event.target.value)
        if(event.target.value !== ""){
            setPwError("")
        }
    }
    const onChangeHeight=(event)=>{
        setHeight(event.target.value)
        if(event.target.value !== ""){
            setHeightError("")
        }
    }
    const onChangeWeight=(event)=>{
        setWeight(event.target.value)
        if(event.target.value !== ""){
            setWeightError("")
        }
    }
    const onClickSave = () => {
        window.location.href="http://localhost:3000/myPage"

        axios.post('http://127.0.0.1:8000/userinfo/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            name:name ,
            password: pw,
            weight: weight,
            height: height
        })
            .catch(error => {
                console.error('서버 요청 오류:', error);
            });
    }
    // const handleClick = () => {
    //     // 클릭 상태를 반전시킵니다.
    //     setClicked(!isClicked);
    // };
// 이미지 업로드 input의 onChange
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };
    return (
        <>
            <Wrapper>
                <ConsentWrapper>
                    <Top>
                        <TitleWrapper>
                            <Title onClick={onClickHome} src="images/mofylogo.png"/>
                        </TitleWrapper>
                        <TopButton>Log Out</TopButton>
                    </Top>
                    <Divide/>
                    <Mid>
                        <EditText>프로필 수정</EditText>
                        <EditImgWrapper>
                            <UserImg src={imgFile ? imgFile :"https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202304/07/kinolights/20230407081026931lbzg.jpg"}/>
                            <label>
                                <OverlayImage src={"https://cdn-icons-png.flaticon.com/512/5218/5218413.png"}/>
                                <OverlayImageInput type="file" accept="image/*" onChange={saveImgFile} ref={imgRef}/>
                            </label>
                        </EditImgWrapper>
                    </Mid>
                    <Bottom>
                        <EditNameWrapper>
                            <EditNameText>이름
                            </EditNameText>
                            <EditNameInput onChange={onChangeName}/>
                            <Check>{nameError}</Check>
                        </EditNameWrapper>
                        <EditPWWrapper>
                            <EditPWText>비밀번호
                            </EditPWText>
                            <EditPWInput onChange={onChangePw}/>
                            <Check>{pwError}</Check>
                        </EditPWWrapper>
                        <EditClothTypeWrapper>
                            <EditClothTypeText>옷 타입</EditClothTypeText>
                            <EditTypeButtonWrapper>
                                <p>활성화된 ID: {activeClothTypes.join(', ')}</p>
                                <EditTypeButton onClick={() => toggleClothType(1)} style={{ backgroundColor: isClicked ? 'pink' : 'white' }}>
                                    ID 1
                                    #Modern
                                </EditTypeButton>
                                <EditTypeButton onClick={() => toggleClothType(2)}>
                                    ID 2
                                    #Modern</EditTypeButton>
                                <EditTypeButton>#Feminine</EditTypeButton>
                                <EditTypeButton>#Dandy</EditTypeButton>
                                <EditTypeButton>#레트로</EditTypeButton>
                                <EditTypeButton>#minimul</EditTypeButton>
                                <EditTypeButton>#캐주얼</EditTypeButton>
                                <EditTypeButton>#Street</EditTypeButton>
                                <EditTypeButton>#Sporty</EditTypeButton>
                                <EditTypeButton>#Urban</EditTypeButton>
                                <EditTypeButton>#Classic</EditTypeButton>
                            </EditTypeButtonWrapper>
                        </EditClothTypeWrapper>
                        <EditSkinTypeWrapper>
                            <EditSkinTypeText>피부 타입</EditSkinTypeText>
                            <EditTypeButtonWrapper>
                                <EditTypeButton>건성</EditTypeButton>
                                <EditTypeButton>지성</EditTypeButton>
                                <EditTypeButton>복합성</EditTypeButton>
                                <EditTypeButton>민감성</EditTypeButton>
                                <EditTypeButton>여드름</EditTypeButton>
                            </EditTypeButtonWrapper>
                        </EditSkinTypeWrapper>
                        <EditUserSizeWrapper>
                            <EditUserSizeText>몸무게</EditUserSizeText>
                            <EditUserSizeSubWrapper>
                                <EditUserSizeInput onChange={onChangeHeight}/>
                                <Check>{heightError}</Check>
                                <EditUserSizeSubText>cm</EditUserSizeSubText>
                                <EditUserSizeInput onChange={onChangeWeight}/>
                                <Check>{weightError}</Check>
                                <EditUserSizeSubText>kg{weight}</EditUserSizeSubText>
                            </EditUserSizeSubWrapper>
                        </EditUserSizeWrapper>
                        <EditUser onClick={onClickSave}>저장하기</EditUser>
                        <DeleteUser onClick={onClickDelete}>탈퇴하기</DeleteUser>
                    </Bottom>
                </ConsentWrapper>
            </Wrapper>
        </>
    )
}
