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
const onClickLogout = () => {
    window.location.href = "http://localhost:3000/mainPage/notLogin";
}


export default function BoardNewPage() {
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const [clothTypeClicked, setClothTypeClicked] = useState(false);
    const [skinTypeClicked, setSkinTypeClicked] = useState(false);
    // const [username, setUsername] = useState(null);
    const [name, setName]= useState("");
    const [pw, setPw] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [shoeSize, setShoeSize] = useState("");

    const [simple, setSimple] = useState(false);
    const [modern, setModern] = useState(false);
    const [feminine, setFeminine] = useState(false);
    const [dandy, setDandy] = useState(false);
    const [retro, setRetro] = useState(false);
    const [minimal, setMinimal] = useState(false);
    const [casual, setCasual] = useState(false);
    const [street, setStreet] = useState(false);
    const [sporty, setSporty] = useState(false);
    const [urban, setUrban] = useState(false);
    const [classic, setClassic] = useState(false);
    // const [modern, setModern] = useState(false);

    const [normal, setnormal] = useState(false);
    const [dry, setdry] = useState(false);
    const [oily, setoily] = useState(false);
    const [combination, setcombination] = useState(false);
    const [sensitive, setsensitive] = useState(false);
    const [acne, setacne] = useState(false);


    const [nameError, setNameError] = useState("");
    const [pwError, setPwError] = useState("");
    const [heightError, setHeightError] = useState("");
    const [weightError, setWeightError] = useState("");
    const [shoeSizeError, setShoeSizeError] = useState("");


    const clothTypeArray = new Set();
    const skinTypeArray = new Set();

    const ClothTypeSaveValue = (buttonId) => {
        clothTypeArray.add(buttonId);
        console.log(`값 "${buttonId}"이(가) 저장되었습니다.`);
        console.log('현재 배열:', clothTypeArray);
    }
    const ClothTypeRemoveValue = (buttonId) => {
        clothTypeArray.delete(buttonId);
        console.log(`값 "${buttonId}"이(가) 제거되었습니다.`);
        console.log('현재 배열:', clothTypeArray);
    }
    const ClothTypeIsClicked = (event) => {
        const buttonId = event.target.id;

        if (!clothTypeArray.has(buttonId)) {
            ClothTypeSaveValue(buttonId);
        } else {
            ClothTypeRemoveValue(buttonId);
        }
    }

    const SkinTypeSaveValue = (buttonId) => {
        skinTypeArray.add(buttonId);
        console.log(`값 "${buttonId}"이(가) 저장되었습니다.`);
        console.log('현재 배열:', skinTypeArray);
    }
    const SkinTypeRemoveValue = (buttonId) => {
        skinTypeArray.delete(buttonId);
        console.log(`값 "${buttonId}"이(가) 제거되었습니다.`);
        console.log('현재 배열:', skinTypeArray);
    }
    const SkinTypeIsClicked = (event) => {
        const buttonId = event.target.id;

        if (!skinTypeArray.has(buttonId)) {
            SkinTypeSaveValue(buttonId);
        } else {
            SkinTypeRemoveValue(buttonId);
        }
    }

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
    const onChangeShoeSize=(event)=>{
        setShoeSize(event.target.value)
        if(event.target.value !== ""){
            setShoeSizeError("")
        }
    }
    const onClickSimple = () => {
        if (!simple){
            setSimple(!simple);
        }
        else{
            setSimple(!simple);
            setSimple(true);
        }
        else{
            setSimple(false);
        }
    }
    const onClickModern = () => {
        if (!modern){
            setModern(!modern);
        }
        else{
            setModern(!modern);
            setModern(true);
        }
        else{
            setModern(false);
        }
    }
    const onClickFeminine = () => {
        if (!feminine){
            setFeminine(!feminine);
        }
        else{
            setFeminine(!feminine);
            setFeminine(true);
        }
        else{
            setFeminine(false);
        }
    }
    const onClickDandy = () => {
        if (!dandy){
            setDandy(!dandy);
        }
        else{
            setDandy(!dandy);
            setDandy(true);
        }
        else{
            setDandy(false);
        }
    }
    const onClickRetro = () => {
        if (!retro){
            setRetro(!retro);
        }
        else{
            setRetro(!retro);
            setRetro(true);
        }
        else{
            setRetro(false);
        }
    }
    const onClickMinimal = () => {
        if (!minimal){
            setMinimal(!minimal);
        }
        else{
            setMinimal(!minimal);
            setMinimal(true);
        }
        else{
            setMinimal(false);
        }
    }
    const onClickCasual = () => {
        if (!casual){
            setCasual(!casual);
        }
        else{
            setCasual(!casual);
            setCasual(true);
        }
        else{
            setCasual(false);
        }
    }
    const onClickStreet = () => {
        if (!street){
            setStreet(!street);
        }
        else{
            setStreet(!street);
            setStreet(true);
        }
        else{
            setStreet(false);
        }
    }
    const onClickSporty = () => {
        if (!sporty){
            setSporty(!sporty);
        }
        else{
            setSporty(!sporty);
            setSporty(true);
        }
        else{
            setSporty(false);
        }
    }
    const onClickUrban = () => {
        if (!urban){
            setUrban(!urban);
        }
        else{
            setUrban(!urban);
            setUrban(true);
        }
        else{
            setUrban(false);
        }
    }
    const onClickClassic = () => {
        if (!classic){
            setClassic(!classic);
        }
        else{
            setClassic(!classic);
        }
    }

    const onClicknormal = () => {
        if (!normal){
            setnormal(!normal);
        }
        else{
            setnormal(!normal);
        }
    }
    const onClickdry = () => {
        if (!dry){
            setdry(!dry);
        }
        else{
            setdry(!dry);
        }
    }
    const onClickoily = () => {
        if (!oily){
            setoily(!oily);
        }
        else{
            setoily(!oily);
        }
    }
    const onClickcombination = () => {
        if (!combination){
            setcombination(!combination);
        }
        else{
            setcombination(!combination);
        }
    }
    const onClicksensitive = () => {
        if (!sensitive){
            setsensitive(!sensitive);
        }
        else{
            setsensitive(!sensitive);
        }
    }

    const onClickacne = () => {
        if (!acne){
            setacne(!acne);
        }
        else{
            setacne(!acne);
            setClassic(true);
        }
        else{
            setClassic(false);
        }
    }

    // const [clothTypes, setClothTypes] = useState(["Shirt", "Pants", "Jacket"]);

    // const getUserName = () => {
    //     username ? (
    //         <h1>Welcome, {username.username}!</h1>
    //     ) : (
    //         <p>Loading...</p>
    //     )
    // }

    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    const onClickSave = () => {
        // window.location.href="http://localhost:3000/myPage"
        console.log(simple)
        console.log(modern)
        console.log(feminine)
        console.log(dandy)
        console.log(retro)
        console.log(minimal)
        console.log(casual)
        console.log(street)
        console.log(sporty)
        console.log(urban)
        console.log(classic)


        axios.post('http://127.0.0.1:8000/useredit/', {
            name: name,
            pw: pw,
            weight: weight,
            height: height,
            shoeSize: shoeSize,

            // skinType: Array.from(skinTypeArray),
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })



            .catch(error => {
                console.error('서버 요청 오류:', error);
            });


        axios.post('http://127.0.0.1:8000/clothTypeSet/', {
            Simple: simple,
            Modern: modern,
            Feminine: feminine,
            Dandy: dandy,
            Retro: retro,
            Minimal: minimal,
            Casual: casual,
            Street: street,
            Sporty: sporty,
            Urban: urban,
            Classic: classic,

            // skinType: Array.from(skinTypeArray),
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })



            .catch(error => {
                console.error('서버 요청 오류:', error);
            });

        axios.post('http://127.0.0.1:8000/skinTypeSet/', {
            normal: normal,
            dry: dry,
            oily: oily,
            combination: combination,
            sensitive: sensitive,
            acne: acne,
            simple: simple,
            modern: modern,
            feminine: feminine,
            casual: casual,
            street: street,
            sporty: sporty,
            urban: urban,
            classic: classic,

            // skinType: Array.from(skinTypeArray),
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })



            .catch(error => {
                console.error('서버 요청 오류:', error);
            });

    }


    const handleClick = () => {
        // 클릭 상태를 반전시킵니다.
        setClicked(!isClicked);
    };
// 이미지 업로드 input의 onChange
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };

        // Upload the image to Django backend
        const formData = new FormData();
        formData.append('image', file);

        axios.post('http://localhost:8000/upload_image/', formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('Image uploaded successfully:', response.data);
                // Optionally, you can update the UI or perform other actions after a successful upload
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    };

    return (
        <>
            <Wrapper>
                <ConsentWrapper>
                    <Top>
                        <TitleWrapper>
                            <Title onClick={onClickHome} src="images/mofylogo.png"/>
                        </TitleWrapper>
                        <TopButton onClick={onClickLogout}>Log Out</TopButton>
                    </Top>
                    <Divide/>
                    <Mid>
                        <EditText>프로필 수정</EditText>
                        <EditImgWrapper>
                            <UserImg src={imgFile ? imgFile :"images/nothingImg.png"}/>
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
                                <EditTypeButton id={"simple"} onClick={onClickSimple}>#Simple</EditTypeButton>
                                <EditTypeButton id={"modern"} onClick={onClickModern}>#Modern</EditTypeButton>
                                <EditTypeButton id={"feminine"} onClick={onClickFeminine}>#Feminine</EditTypeButton>
                                <EditTypeButton id={"dandy"} onClick={onClickDandy}>#Dandy</EditTypeButton>
                                <EditTypeButton id={"retro"} onClick={onClickRetro}>#Retro</EditTypeButton>
                                <EditTypeButton id={"minimal"} onClick={onClickMinimal}>#Minimal</EditTypeButton>
                                <EditTypeButton id={"casual"} onClick={onClickCasual}>#Casual</EditTypeButton>
                                <EditTypeButton id={"street"} onClick={onClickStreet}>#Street</EditTypeButton>
                                <EditTypeButton id={"sporty"} onClick={onClickSporty}>#Sporty</EditTypeButton>
                                <EditTypeButton id={"urban"} onClick={onClickUrban}>#Urban</EditTypeButton>
                                <EditTypeButton id={"classic"} onClick={onClickClassic}>#Classic</EditTypeButton>
                            </EditTypeButtonWrapper>
                        </EditClothTypeWrapper>
                        <EditSkinTypeWrapper>
                            <EditSkinTypeText>피부 타입</EditSkinTypeText>
                            <EditTypeButtonWrapper>
                                <EditTypeButton id={"normal"} onClick={onClicknormal}>보통</EditTypeButton>
                                <EditTypeButton id={"dry"} onClick={onClickdry}>건성</EditTypeButton>
                                <EditTypeButton id={"oily"} onClick={onClickoily}>지성</EditTypeButton>
                                <EditTypeButton id={"sensitive"} onClick={onClickcombination}>복합성</EditTypeButton>
                                <EditTypeButton id={"combination"} onClick={onClicksensitive}>민감성</EditTypeButton>
                                <EditTypeButton id={"acne"} onClick={onClickacne}>여드름</EditTypeButton>
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
                                <EditUserSizeSubText>kg</EditUserSizeSubText>
                                <EditUserSizeInput onChange={onChangeShoeSize}/>
                                <Check>{shoeSizeError}</Check>
                                <EditUserSizeSubText>mm</EditUserSizeSubText>
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